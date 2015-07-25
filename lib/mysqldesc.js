/**
 * Describe tables in the connected database.
 * @function descmysql
 * @param {MysqlConfig} config - Mysql Connect configuration.
 * @param {function} callback - Callback when done.
 * @example
 *  descmysql({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306,
 *      database: 'my_db'
 *  }, function (err, data) {
 *  });
 */


/**
 * Describe mysql tables in a database.
 * @function descmysql
 * @param {object} config - Connect configuration.
 * @param {string} database - Name of database.
 * @param {function} callback - Callback when done.
 * @example
 *  descmysql({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *  }, 'my_db', function (err, data) {
 *  });
 */


/**
 * Describe a mysql table
 * @function descmysql
 * @param {object} config - Connect configuration.
 * @param {string} database - Name of database.
 * @param {string} table - Name of table to describe.
 * @param {function} callback - Callback when done.
 * @example
 *  descmysql({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *  }, 'my_db', 'some_table', function (err, data) {
 *  });
 */


"use strict";

var argx = require('argx'),
    MysqlDescriber = require('./describing/mysql_describer');

/** @lends descmysql */
function descmysql(config, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    config = args.shift();
    var database = args.shift('string') || config.database;
    if (!database) {
        callback(new Error('database is required.'));
        return;
    }
    var table = args.shift('string');
    if (table) {
        descmysql.describeTable(config, database, table, callback);
    } else {
        descmysql.describeDatabase(config, database, callback);
    }
}

/**
 * Describe a database.
 * @param {MysqlConfig} config - Mysql config.
 * @param {string} database - Name of database.
 * @param {function} callback - Callback when done.
 */
descmysql.describeDatabase = function (config, database, callback) {
    new MysqlDescriber(config).describeDatabase(database, callback);
};

/**
 * Describe a database.
 * @param {MysqlConfig} config - Mysql config.
 * @param {string} database - Name of database.
 * @param {string} table - Name of table.
 * @param {function} callback - Callback when done.
 */
descmysql.describeTable = function (config, database, table, callback) {
    new MysqlDescriber(config).describeTable(database, table, callback);
};

module.exports = descmysql;


/**
 * @memberof module:descmysql
 * @inner
 * @typedef {object} MysqlConfig
 * @property  {string} host - Mysql host name.
 * @property  {number} port - Mysql port
 * @property  {string} user - Mysql user name.
 * @property  {string} password - Mysql password
 * @property {string} database - Database name.
 */