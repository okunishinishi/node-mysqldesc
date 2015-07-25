/**
 * Test case for mysqldesc.
 * Runs with nodeunit.
 */

var mysqldesc = require('../lib/mysqldesc.js');

var testDbConfig = require('../ci/configs/test_db_config'),
    setupTestDb = require('../ci/helpers/setup_test_db');

exports.setUp = function (done) {
    setupTestDb(function (err) {
        testDbConfig.database = 'descmysql_test';
        done();
    });
};
exports.tearDown = function (done) {
    delete testDbConfig.database;
    done();
};

exports['Mysqldesc'] = function (test) {
    mysqldesc(testDbConfig, function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            'TEST_PERSON', 'TEST_PRODUCT', 'TEST_SHOP'
        ]);
        test.done();
    });
};

exports['Mysqldesc with database'] = function (test) {
    mysqldesc(testDbConfig, 'descmysql_test', function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            'TEST_PERSON', 'TEST_PRODUCT', 'TEST_SHOP'
        ]);
        test.done();
    });
};

exports['Mysqldesc with database and table'] = function (test) {
    mysqldesc(testDbConfig, 'descmysql_test', 'TEST_PERSON', function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            'id', 'last_name', 'first_name', 'address', 'city'
        ]);
        test.done();
    });
};

exports['Key column usage'] = function (test) {
    mysqldesc.keyColumnUsage(testDbConfig, function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            'TEST_PERSON', 'TEST_PRODUCT', 'TEST_SHOP'
        ]);
        test.done();
    });
};

exports['Key column usage with database'] = function (test) {
    mysqldesc.keyColumnUsage(testDbConfig, 'descmysql_test', function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            'TEST_PERSON', 'TEST_PRODUCT', 'TEST_SHOP'
        ]);
        test.done();
    });
};

exports['Key column usage with database and table'] = function (test) {
    mysqldesc.keyColumnUsage(testDbConfig, 'descmysql_test', 'TEST_PRODUCT', function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            'id', 'shop_id'
        ]);
        test.done();
    });
};