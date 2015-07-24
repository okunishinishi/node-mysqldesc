/**
 * Describer for mysql.
 * @memberof module:descmysql/lib
 * @constructor MysqlDescriber
 * @param {object} config - Mysql configuration.
 */

"use strict";

var mysql = require('mysql'),
    async = require('async'),
    argx = require('argx');

/** @lends MysqlDescriber */
function MysqlDescriber(config) {
    var s = this;
    s._config = config;
}

MysqlDescriber.prototype = {
    _config: undefined,
    _connection: undefined,
    /**
     * Connect to database.
     * @returns {MysqlDescriber} - Returns self.
     */
    connect: function () {
        var s = this;
        s._connection = mysql.createConnection(s._config);
        return s;
    },
    /**
     * Disconnect from data base.
     * @returns {MysqlDescriber} - Returns self.
     */
    disconnect: function () {
        var s = this;
        if (s._connection) {
            s._connection.end();
        }
        return s;
    },
    /**
     * Describe database.
     * @param {string} database - Name of database.
     * @param {function} callback - Callback when done.
     */
    describe: function (database, callback) {
        var s = this;
        async.waterfall([
            function (callback) {
                s._showTables(database, function (err, tables) {
                    callback(err, tables);
                });
            },
            function (tables, callback) {
                var tableNames = tables.map(function (data) {
                    return data[Object.keys(data).shift()];
                });
                callback(null, tableNames);
            },
            function (tableNames, callback) {
                async.map(tableNames, function (table, callback) {
                    s._descTable(database, table, function (err, data) {
                        callback(err, data);
                    });
                }, callback);
            }
        ], callback);
        return s;
    },
    /**
     * Execute a sql.
     * @param {string} sql - SQL String to execute.
     * @param {string[]} values - Values to apply
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    _execute: function (sql, values, callback) {
        var args = argx(arguments);
        callback = args.pop('function');
        sql = args.shift();
        values = args.shift() || [];
        var s = this;
        s._connection.query(sql, values, callback);
        return s;
    },
    /**
     * Show databases.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    _showDatabases: function (callback) {
        var s = this;
        s._execute("SHOW DATABASES;", callback);
        return s;
    },
    /**
     * Show tables.
     * @param {string} database - Name of database.
     * @param {function} callback - Callback when done.
     */
    _showTables: function (database, callback) {
        var s = this;
        var command = ["SHOW TABLES IN", database].join(' ');
        s._execute(command, callback);
    },
    /**
     * Desc table.
     * @param {string} database - Name of database.
     * @param {string} table - Name of table.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    _descTable: function (database, table, callback) {
        var s = this;
        var command = ["DESC", [database, table].join('.')].join(' ');
        s._execute(command, callback);
        return s;
    }
};

module.exports = MysqlDescriber;