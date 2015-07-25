/**
 * Query for describing.
 * @memberof module:mysqldesc/lib/querying
 * @inner
 * @constructor MysqlQuerier
 * @param {MysqlConfig} config - Mysql configuration.
 */

"use strict";

var mysql = require('mysql'),
    argx = require('argx');

/** @lends MysqlQuerier */
function MysqlQuerier(config) {
    var s = this;
    s._config = config;
}

MysqlQuerier.prototype = {
    _connection: undefined,
    /**
     * Connect to database.
     * @returns {MysqlQuerier} - Returns self.
     */
    connect: function () {
        var s = this;
        s._connection = mysql.createConnection(s._config);
        return s;
    },
    /**
     * Disconnect from data base.
     * @returns {MysqlQuerier} - Returns self.
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
     * @param {string[]} [values] - Values to apply
     * @param {function} callback - Callback when done.
     * @returns {MysqlQuerier} - Returns self.
     */
    execute: function (sql, values, callback) {
        var args = argx(arguments);
        callback = args.pop('function');
        sql = args.shift();
        values = args.remain() || [];
        var s = this;
        s._connection.query(sql, values, callback);
        return s;
    },
    /**
     * Show databases.
     * @param {function} callback - Callback when done.
     * @returns {MysqlQuerier} - Returns self.
     */
    showDatabases: function (callback) {
        var s = this;
        s.execute("SHOW DATABASES;", callback);
        return s;
    },
    /**
     * Show tables.
     * @param {string} database - Name of database.
     * @param {function} callback - Callback when done.
     * @returns {MysqlQuerier} - Returns self.
     */
    showTables: function (database, callback) {
        var s = this;
        var sql = ["SHOW TABLES IN", database].join(' ');
        s.execute(sql, callback);
        return s;
    },
    /**
     * Desc table.
     * @param {string} database - Name of database.
     * @param {string} table - Name of table.
     * @param {function} callback - Callback when done.
     * @returns {MysqlQuerier} - Returns self.
     */
    descTable: function (database, table, callback) {
        var s = this,
            sql = ["DESC", [database, table].join('.')].join(' ');
        s.execute(sql, callback);
        return s;
    },
    /**
     * Select key column usage.
     * @param {string} database - Name of database.
     * @param {string} table - Name of table.
     * @param {function} callback - Callback when done.
     * @returns {MysqlQuerier} - Returns self.
     */
    selectKeyColumnUsage: function (database, table, callback) {
        var s = this,
            sql = 'SELECT * FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?';
        s.execute(sql, database, table, callback);
        return s;
    }
};

module.exports = MysqlQuerier;