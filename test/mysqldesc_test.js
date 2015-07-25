/**
 * Test case for mysqldesc.
 * Runs with nodeunit.
 */

var mysqldesc = require('../lib/mysqldesc.js');

var testDbConfig = require('../ci/configs/test_db_config'),
    setupTestDb = require('../ci/setup_test_db');

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
            'TEST_PERSON', 'TEST_SHOP'
        ]);
        test.done();
    });
};

exports['Mysqldesc'] = function (test) {
    mysqldesc(testDbConfig, 'descmysql_test', function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            'TEST_PERSON', 'TEST_SHOP'
        ]);
        test.done();
    });
};

exports['Mysqldesc'] = function (test) {
    mysqldesc(testDbConfig, 'descmysql_test', 'TEST_PERSON', function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            'PersonID', 'LastName', 'FirstName', 'Address', 'City'
        ]);
        test.done();
    });
};

