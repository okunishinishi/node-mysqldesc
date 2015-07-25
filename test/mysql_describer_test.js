/**
 * Test case for mysqlDescriber.
 * Runs with nodeunit.
 */

var MysqlDescriber = require('../lib/describing/mysql_describer.js');

var testDbConfig = require('../ci/configs/test_db_config'),
    setupTestDb = require('../ci/setup_test_db');

exports.setUp = function (done) {
    setupTestDb(function (err) {
        done();
    });
};

exports['Describe database'] = function (test) {
    var describer = new MysqlDescriber(testDbConfig);
    describer.describeDatabase('descmysql_test', function (err, data) {
        test.ifError(err);
        test.deepEqual(data, {
            "TEST_PERSON": {
                "PersonID": {
                    "Type": "int(11)",
                    "Null": "YES",
                    "Key": "",
                    "Default": null,
                    "Extra": ""
                },
                "LastName": {
                    "Type": "varchar(255)",
                    "Null": "YES",
                    "Key": "",
                    "Default": null,
                    "Extra": ""
                },
                "FirstName": {
                    "Type": "varchar(255)",
                    "Null": "YES",
                    "Key": "",
                    "Default": null,
                    "Extra": ""
                },
                "Address": {
                    "Type": "varchar(255)",
                    "Null": "YES",
                    "Key": "",
                    "Default": null,
                    "Extra": ""
                },
                "City": {
                    "Type": "varchar(255)",
                    "Null": "YES",
                    "Key": "",
                    "Default": null,
                    "Extra": ""
                }
            },
            "TEST_SHOP": {
                "article": {
                    "Type": "int(4) unsigned zerofill",
                    "Null": "NO",
                    "Key": "PRI",
                    "Default": "0000",
                    "Extra": ""
                },
                "dealer": {
                    "Type": "char(20)",
                    "Null": "NO",
                    "Key": "PRI",
                    "Default": "",
                    "Extra": ""
                },
                "price": {
                    "Type": "double(16,2)",
                    "Null": "NO",
                    "Key": "",
                    "Default": "0.00",
                    "Extra": ""
                }
            }
        });
        test.ok(data);
        test.done();
    });
};

exports['Describe table'] = function (test) {
    var describer = new MysqlDescriber(testDbConfig);
    describer.describeTable('descmysql_test', 'TEST_PERSON', function (err, data) {
        test.deepEqual(data, {
            "PersonID": {
                "Type": "int(11)",
                "Null": "YES",
                "Key": "",
                "Default": null,
                "Extra": ""
            },
            "LastName": {
                "Type": "varchar(255)",
                "Null": "YES",
                "Key": "",
                "Default": null,
                "Extra": ""
            },
            "FirstName": {
                "Type": "varchar(255)",
                "Null": "YES",
                "Key": "",
                "Default": null,
                "Extra": ""
            },
            "Address": {
                "Type": "varchar(255)",
                "Null": "YES",
                "Key": "",
                "Default": null,
                "Extra": ""
            },
            "City": {
                "Type": "varchar(255)",
                "Null": "YES",
                "Key": "",
                "Default": null,
                "Extra": ""
            }
        });
        test.ifError(err);
        test.done();
    });
};



