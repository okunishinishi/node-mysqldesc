mysqldesc
=========

Describe mysql database. Get table names, column specs as a json object.

<!-- Badge start -->

[![Build Status][my_travis_badge_url]][my_travis_url]
[![Code Climate][my_codeclimate_badge_url]][my_codeclimate_url]
[![Code Coverage][my_codeclimate_coverage_badge_url]][my_codeclimate_url]
[![npm version][my_npm_budge_url]][my_npm_url]

Installation
------------

```bash
$ npm install descmysql --save-dev
```

Usage
-----

Describe database data.

```javascript
var descmysql =  require('descmysql');

// Mysql connect config.
var config = {
     user: 'root',
     password: 'my_password',
     host: 'localhost',
     database: 'my_db'
};
// Desc connected database
descmysql(config, function (err, data) {
    console.log(data);
});
```

This will result like:

```javascript
{
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
     },
     "TEST_SHOP": {
          /*...*/
     }
```

API
------

| Signature | Description |
| --------- | ----------- |
| descmysql(config, callback) | Describe connected database |
| descmysql(config, databaseName, callback) | Describe specific database | 
| descmysql(config, databaseName, tableName, callback) | Describe specific table | 


Tips
----

### Connection Options

`mysqldesc` uses [node-mysql][node_mysql_url] as connector.
For more advanced setting, see the [node-mysql documents about Connection options][node_mysql_connection_doc_url]

License
-------
This software is released under the [MIT License][my_license_url].


Links
-----

+ [node-mysql][node_mysql_url] 


<!-- Links start -->

[nodejs_url]: http://nodejs.org/
[node_mysql_url]: https://github.com/felixge/node-mysql/
[node_mysql_connection_doc_url]: https://github.com/felixge/node-mysql/#connection-options
[npm_url]: https://www.npmjs.com/
[nvm_url]: https://github.com/creationix/nvm
[bitdeli_url]: https://bitdeli.com/free
[my_bitdeli_badge_url]: https://d2weczhvl823v0.cloudfront.net/okunishinishi/node-descmysql/trend.png
[my_repo_url]: https://github.com/okunishinishi/node-descmysql
[my_travis_url]: http://travis-ci.org/okunishinishi/node-descmysql
[my_travis_badge_url]: http://img.shields.io/travis/okunishinishi/node-descmysql.svg?style=flat
[my_license_url]: https://github.com/okunishinishi/node-descmysql/blob/master/LICENSE
[my_codeclimate_url]: http://codeclimate.com/github/okunishinishi/node-descmysql
[my_codeclimate_badge_url]: http://img.shields.io/codeclimate/github/okunishinishi/node-descmysql.svg?style=flat
[my_codeclimate_coverage_badge_url]: http://img.shields.io/codeclimate/coverage/github/okunishinishi/node-descmysql.svg?style=flat
[my_apiguide_url]: http://okunishinishi.github.io/node-descmysql/apiguide
[my_lib_apiguide_url]: http://okunishinishi.github.io/node-descmysql/apiguide/module-descmysql_lib.html
[my_coverage_url]: http://okunishinishi.github.io/node-descmysql/coverage/lcov-report
[my_coverage_report_url]: http://okunishinishi.github.io/node-descmysql/coverage/lcov-report/
[my_gratipay_url]: https://gratipay.com/okunishinishi/
[my_gratipay_budge_url]: http://img.shields.io/gratipay/okunishinishi.svg?style=flat
[my_npm_url]: http://www.npmjs.org/package/descmysql
[my_npm_budge_url]: http://img.shields.io/npm/v/descmysql.svg?style=flat
[my_tag_url]: http://github.com/okunishinishi/node-descmysql/releases/tag/
[my_tag_badge_url]: http://img.shields.io/github/tag/okunishinishi/node-descmysql.svg?style=flat
