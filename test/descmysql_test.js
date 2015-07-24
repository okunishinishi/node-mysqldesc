/**
 * Test case for descmysql.
 * Runs with nodeunit.
 */

var descmysql = require('../lib/descmysql.js'),
    mysql = require('mysql');

var connection;

exports.setUp = function (done) {
    var isTravis = String(process.env.TRAVIS) === "true";
    if (isTravis) {
        mysql.createConnection({})
    } else {
        connection = mysql.createConnection({
            user: 'roo'
        });
        connection.connect();
    }
    done();
};
exports.tearDown = function (done) {
    connection.end();
    done();
};

exports['Descmysql'] = function (test) {

    test.done();
};

