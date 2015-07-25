/**
 * Test case for mysqlQuerier.
 * Runs with nodeunit.
 */

var MysqlQuerier = require('../lib/querying/mysql_querier.js'),
    async = require('async');

var testDbConfig = require('../ci/configs/test_db_config'),
    setupTestDb = require('../ci/helpers/setup_test_db');

exports.setUp = function (done) {
    setupTestDb(function (err) {
        done();
    });
};

exports['Mysql querier'] = function (test) {
    var querier = new MysqlQuerier();
    test.ok(querier);
    test.done();
};


exports['Do query'] = function (test) {
    var querier = new MysqlQuerier(testDbConfig);
    querier.connect();
    async.series([
        function (callback) {
            querier.showDatabases(function (err, names) {
                test.ifError(err);
                test.ok(names);
                callback(err);
            });
        },
        function (callback) {
            querier.showTables('descmysql_test', function (err, names) {
                test.ifError(err);
                test.ok(names);
                callback(err);
            });
        },
        function (callback) {
            querier.descTable('descmysql_test', 'TEST_PERSON', function (err) {
                test.ifError(err);
                callback(err);
            });
        },
        function (callback) {
            querier.selectKeyColumnUsage('descmysql_test', 'TEST_PRODUCT', function (err, data) {
                test.ifError(err);
                callback(err);
            });
        }

    ], function (err) {
        test.ifError(err);
        querier.disconnect();
        test.done();
    });
};
