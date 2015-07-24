/**
 * Test case for mysqlDescriber.
 * Runs with nodeunit.
 */

var MysqlDescriber = require('../lib/mysql_describer.js'),
    fs = require('fs'),
    async = require('async'),
    path = require('path');

var isTravis = String(process.env.TRAVIS) === "true";
var config = isTravis ? {} : {user: 'root'};
config.multipleStatements = true;

var SETUP_SQL_FILE = path.resolve(__dirname, '../ci/asset/create_test_schema.sql');


exports.setUp = function (done) {
    done();
};

exports['Mysql describer'] = function (test) {
    fs.readFile(SETUP_SQL_FILE, function (err, data) {
        var setupSql = String(data);
        var describer = new MysqlDescriber(config);
        describer.connect();
        async.series([
            function (callback) {
                describer._execute(setupSql, function (err, data) {
                    callback(err);
                });
            },
            function (callback) {
                describer._showDatabases(function (err, names) {
                    test.ifError(err);
                    test.ok(names);
                    callback(err);
                });
            },
            function (callback) {
                describer._showTables('descmysql_test', function (err, names) {
                    test.ifError(err);
                    test.ok(names);
                    callback(err);
                });
            },
            function (callback) {
                describer._descTable('descmysql_test', 'TEST_PERSON', function (err) {
                    test.ifError(err);
                    callback(err);
                });
            },
            function (callback) {
                describer.describe('descmysql_test', function (err) {
                    test.ifError(err);
                    callback(err);
                });
            }
        ], function (err) {
            test.ifError(err);
            describer.disconnect();
            test.done();
        });
    });
};

