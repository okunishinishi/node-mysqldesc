/**
 * Describer for mysql.
 * @memberof module:descmysql/lib
 * @constructor MysqlDescriber
 * @param {object} config - Mysql configuration.
 */

"use strict";

var mysql = require('mysql'),
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
     * Execute a sql.
     * @param {string} sql - SQL String to execute.
     * @param {string[]} values - Values to apply
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    execute: function (sql, values, callback) {
        var args = argx(arguments);
        callback = args.pop('function');
        sql = args.shift();
        values = args.shift() || [];
        var s = this;
        s._connection.query(sql, values, callback);
        return s;
    },
    /**
     * Show tables.
     * @param {string} schema - Name of schema.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    tableNames: function (schema, callback) {
        var s = this;
        s.execute("select TABLE_NAME from information_schema.tables where TABLE_SCHEMA=?;", schema, function (err, rows) {
            var tableNames = rows.map(function (data) {
                return data['TABLE_NAME'];
            });
            callback(err, tableNames)
        });
        return s;
    }
};

module.exports = MysqlDescriber;