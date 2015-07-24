/**
 * Describe mysql tables.
 * @function descmysql
 * @param {string} database - Database name to describe.
 * @param {object} config - Connect configuration.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    MysqlDescriber = require('./mysql_describer');

/** @lends descmysql */
function descmysql(database, config, callback) {
    new MysqlDescriber(config).describe(database, callback);
}

module.exports = descmysql;