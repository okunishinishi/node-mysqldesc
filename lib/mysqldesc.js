/**
 * Describe tables in the connected database.
 * @function mysqldesc
 * @param {MysqlConfig} config - Mysql Connect configuration.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqldesc({
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
 * @function mysqldesc
 * @param {object} config - Connect configuration.
 * @param {string} database - Name of database.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqldesc({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *  }, 'my_db', function (err, data) {
 *  });
 */


/**
 * Describe a mysql table
 * @function mysqldesc
 * @param {object} config - Connect configuration.
 * @param {string} database - Name of database.
 * @param {string} table - Name of table to describe.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqldesc({
 *      user: 'root',
 *      password: 'my_password',
 *      host: 'localhost',
 *      port: 3306
 *  }, 'my_db', 'some_table', function (err, data) {
 *  });
 */


/**
 * Describe key column usage in the connected database.
 * @function mysqldesc.keyColumnUsage
 * @param {MysqlConfig} config - Mysql Connect configuration.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqldesc(config, function (err, data) {
 *  });
 */

/**
 * Describe key column usage in a database.
 * @function mysqldesc.keyColumnUsage
 * @param {MysqlConfig} config - Mysql Connect configuration.
 * @param {string} database - Name of database.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqldesc(config, function (err, database, data) {
 *  });
 */

/**
 * Describe key column usage in table.
 * @function mysqldesc.keyColumnUsage
 * @param {MysqlConfig} config - Mysql Connect configuration.
 * @param {string} database - Name of database.
 * @param {string} table - Name of table to describe.
 * @param {function} callback - Callback when done.
 * @example
 *  mysqldesc(config, function (err, database, table, data) {
 *  });
 */


"use strict";

var argx = require('argx'),
    MysqlDescriber = require('./describing/mysql_describer');

/** @lends mysqldesc */
function mysqldesc(config, callback) {
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
        mysqldesc.describeTable(config, database, table, callback);
    } else {
        mysqldesc.describeDatabase(config, database, callback);
    }
}

/** @lends mysqldesc.keyColumnUsage */
mysqldesc.keyColumnUsage = function (config, callback) {
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
        mysqldesc.describeTableKeyColumnUsage(config, database, table, callback);
    } else {
        mysqldesc.describeDatabaseKeyColumnUsage(config, database, callback);
    }
};

/**
 * Describe a database.
 * @param {MysqlConfig} config - Mysql config.
 * @param {string} database - Name of database.
 * @param {function} callback - Callback when done.
 */
mysqldesc.describeDatabase = function (config, database, callback) {
    return mysqldesc.describer(config).describeDatabase(database, callback);
};

/**
 * Describe a database.
 * @param {MysqlConfig} config - Mysql config.
 * @param {string} database - Name of database.
 * @param {string} table - Name of table.
 * @param {function} callback - Callback when done.
 */
mysqldesc.describeTable = function (config, database, table, callback) {
    return mysqldesc.describer(config).describeTable(database, table, callback);
};

/**
 * Describe key column usages in a database.
 * @param {MysqlConfig} config - Mysql config.
 * @param {string} database - Name of database.
 * @param {function} callback - Callback when done.
 */
mysqldesc.describeDatabaseKeyColumnUsage = function (config, database, callback) {
    return mysqldesc.describer(config).describeDatabaseKeyColumnUsage(database, callback);
};

/**
 * Describe key column usages in a database.
 * @param {MysqlConfig} config - Mysql config.
 * @param {string} database - Name of database.
 * @param {string} table - Name of table.
 * @param {function} callback - Callback when done.
 */
mysqldesc.describeTableKeyColumnUsage = function (config, database, table, callback) {
    return mysqldesc.describer(config).describeTableKeyColumnUsage(database, table, callback);
};

/**
 * Create a new mysql describer.
 * @param {MysqlConfig} config - Mysql config.
 * @returns {MysqlDescriber} - Describer instance.
 */
mysqldesc.describer = function (config) {
    return new MysqlDescriber(config);
};

module.exports = mysqldesc;


/**
 * @memberof module:mysqldesc
 * @inner
 * @typedef {object} MysqlConfig
 * @property  {string} host - Mysql host name.
 * @property  {number} port - Mysql port
 * @property  {string} user - Mysql user name.
 * @property  {string} password - Mysql password
 * @property {string} database - Database name.
 */