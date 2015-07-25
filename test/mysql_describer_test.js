/**
 * Test case for mysqlDescriber.
 * Runs with nodeunit.
 */

var MysqlDescriber = require('../lib/describing/mysql_describer.js');

var testDbConfig = require('../ci/configs/test_db_config'),
    setupTestDb = require('../ci/helpers/setup_test_db');

exports.setUp = function (done) {
    setupTestDb(function (err) {
        done();
    });
};

exports['Describe database'] = function (test) {
    var describer = new MysqlDescriber(testDbConfig);
    describer.describeDatabase('descmysql_test', function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            "TEST_PERSON",
            "TEST_PRODUCT",
            "TEST_SHOP"
        ]);
        test.ok(data);
        test.done();
    });
};

exports['Describe table'] = function (test) {
    var describer = new MysqlDescriber(testDbConfig);
    describer.describeTable('descmysql_test', 'TEST_PERSON', function (err, data) {
        test.deepEqual(Object.keys(data), [
            "id",
            "last_name",
            "first_name",
            "address",
            "city"
        ]);
        test.ifError(err);
        test.done();
    });
};

exports['Describe key column usage.'] = function (test) {
    var describer = new MysqlDescriber(testDbConfig);
    describer.describeDatabaseKeyColumnUsage('descmysql_test', function (err, data) {
        test.ifError(err);
        test.deepEqual(data, {
            TEST_PERSON: {},
            TEST_PRODUCT: {
                id: {
                    CONSTRAINT_CATALOG: 'def',
                    CONSTRAINT_SCHEMA: 'descmysql_test',
                    CONSTRAINT_NAME: 'PRIMARY',
                    TABLE_CATALOG: 'def',
                    ORDINAL_POSITION: 1
                },
                shop_id: {
                    CONSTRAINT_CATALOG: 'def',
                    CONSTRAINT_SCHEMA: 'descmysql_test',
                    CONSTRAINT_NAME: 'test_product_ibfk_1',
                    TABLE_CATALOG: 'def',
                    ORDINAL_POSITION: 1,
                    POSITION_IN_UNIQUE_CONSTRAINT: 1,
                    REFERENCED_TABLE_SCHEMA: 'descmysql_test',
                    REFERENCED_TABLE_NAME: 'TEST_SHOP',
                    REFERENCED_COLUMN_NAME: 'id'
                }
            },
            TEST_SHOP: {
                id: {
                    CONSTRAINT_CATALOG: 'def',
                    CONSTRAINT_SCHEMA: 'descmysql_test',
                    CONSTRAINT_NAME: 'PRIMARY',
                    TABLE_CATALOG: 'def',
                    ORDINAL_POSITION: 1
                }
            }
        });
        test.done();
    });
};

exports['Describe table key column usage.'] = function (test) {
    var describer = new MysqlDescriber(testDbConfig);
    describer.describeTableKeyColumnUsage('descmysql_test', 'TEST_PRODUCT', function (err, data) {
        test.ifError(err);
        test.deepEqual(Object.keys(data), [
            "id", "shop_id"
        ]);
        test.done();
    });

};



