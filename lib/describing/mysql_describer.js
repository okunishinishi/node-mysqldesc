/**
 * Database describer.
 * @memberof module:mysqldesc/lib/describing
 * @inner
 * @constructor MysqlDescriber
 * @param {MysqlConfig} config - Mysql configuration.
 */

"use strict";

var async = require('async'),
    extend = require('extend');

var MysqlQuerier = require('../querying/mysql_querier');

/** @lends MysqlDescriber */
function MysqlDescriber(config) {
    var s = this;
    s._querier = new MysqlQuerier(config);
}

MysqlDescriber.prototype = {
    _querier: undefined,
    /**
     * Describe database.
     * @param {string} database - Name of database.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber} - Returns self.
     */
    describeDatabase: function (database, callback) {
        var s = this,
            querier = s._querier;
        querier.connect();
        async.waterfall([
            function (callback) {
                querier.showTables(database, function (err, tables) {
                    callback(err, tables);
                });
            },
            function (tables, callback) {
                var tableNames = s._parseTableNames(tables);
                async.map(tableNames, function (table, callback) {
                    querier.descTable(database, table, function (err, data) {
                        callback(err, {
                            name: table,
                            columns: s._parseTableData(data)
                        });
                    });
                }, callback);
            },
            function (data, callback) {
                var database = {};
                data.forEach(function (data) {
                    database[data.name] = data.columns;
                });
                callback(null, database);
            }
        ], function (err, result) {
            querier.disconnect();
            callback(err, result);
        });
        return s;
    },
    /**
     * Describe mysql table.
     * @param {string} database - Name of database.
     * @param {string} table - Name of table.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    describeTable: function (database, table, callback) {
        var s = this,
            querier = s._querier;
        querier.connect();
        querier.descTable(database, table, function (err, data) {
            querier.disconnect();
            callback(err, s._parseTableData(data || {}));
        });
        return s;
    },
    /**
     * Describe key column usages in database.
     * @param {string} database - Name of database.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    describeDatabaseKeyColumnUsage: function (database, callback) {
        var s = this,
            querier = s._querier;
        querier.connect();
        async.waterfall([
            function (callback) {
                querier.showTables(database, function (err, tables) {
                    callback(err, tables);
                });
            },
            function (tables, callback) {
                var tableNames = s._parseTableNames(tables);
                async.map(tableNames, function (table, callback) {
                    querier.selectKeyColumnUsage(database, table, function (err, data) {
                        callback(err, {
                            name: table,
                            keyColumnUsage: s._parseTableKeyColumnUsageData(data)
                        });
                    });
                }, callback);
            },
            function (data, callback) {
                var database = {};
                data.forEach(function (data) {
                    database[data.name] = data.keyColumnUsage;
                });
                callback(null, database);
            }
        ], function (err, result) {
            querier.disconnect();
            callback(err, result);
        });
        return s;
    },
    /**
     * Describe key column usage for a table.
     * @param {string} database - Name of database.
     * @param {string} table - Name of table.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    describeTableKeyColumnUsage: function (database, table, callback) {
        var s = this,
            querier = s._querier;
        querier.connect();
        querier.selectKeyColumnUsage(database, table, function (err, data) {
            querier.disconnect();
            callback(err, s._parseTableKeyColumnUsageData(data));
        });
        return s;
    },
    _parseTableNames: function (tables) {
        return tables.map(function (data) {
            return data[Object.keys(data).shift()];
        });
    },
    _parseTableData: function (data) {
        var columns = {};
        var FIELD_NAME = 'Field';
        data.forEach(function (data) {
            data = extend({}, data);
            var key = data[FIELD_NAME];
            delete data[FIELD_NAME];
            columns[key] = data;
        });
        return columns;
    },
    _parseTableKeyColumnUsageData: function (data) {
        var usages = {};
        var DELETE_KEYS = ['TABLE_SCHEMA', 'TABLE_NAME', 'COLUMN_NAME'];
        data.forEach(function (data) {
            data = extend({}, data);
            var columnName = data['COLUMN_NAME'];
            DELETE_KEYS.forEach(function (key) {
                delete data[key];
            });
            Object.keys(data).forEach(function (key) {
                var empty = data[key] === null;
                if (empty) {
                    delete data[key];
                }
            });
            usages[columnName] = data;
        });
        return usages;
    }
};

module.exports = MysqlDescriber;