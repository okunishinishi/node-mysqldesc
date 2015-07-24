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
     * Show databases.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    showDatabases: function (callback) {
        var s = this;
        s.execute("SHOW DATABASES;", callback);
        return s;
    },
    /**
     * Show tables.
     * @param {string} schema - Name of schema.
     * @param {function} callback - Callback when done.
     */
    showTables: function (schema, callback) {
        var s = this;
        var command = ["SHOW TABLES IN", schema].join(' ');
        s.execute(command, callback);
    },
    /**
     * Desc table.
     * @param {string} schema - Name of schema.
     * @param {string} table - Name of table.
     * @param {function} callback - Callback when done.
     * @returns {MysqlDescriber}
     */
    descTable: function (schema, table, callback) {
        var s = this;
        var command = ["DESC", [schema, table].join('.')].join(' ');
        s.execute(command, callback);
        return s;
    }
};

module.exports = MysqlDescriber;