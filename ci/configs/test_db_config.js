/**
 * Configuration for test database.
 * @module mysqldesc/ci/configs/testDbConfig
 */

"use strict";


var localConfig = {
        user: 'root',
        multipleStatements: true,
        database: 'descmysql_test'
    },
    travisConfig = {
        user: 'root',
        multipleStatements: true,
        database: 'descmysql_test'
    };

var isTravis = String(process.env.TRAVIS) === "true";
module.exports = isTravis ? travisConfig : localConfig;