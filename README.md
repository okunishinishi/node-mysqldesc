mysqldesc
==========

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/okunishinishi/node-mysqldesc
[bd_travis_url]: http://travis-ci.org/okunishinishi/node-mysqldesc
[bd_travis_shield_url]: http://img.shields.io/travis/okunishinishi/node-mysqldesc.svg?style=flat
[bd_license_url]: https://github.com/okunishinishi/node-mysqldesc/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/okunishinishi/node-mysqldesc
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/okunishinishi/node-mysqldesc.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/okunishinishi/node-mysqldesc.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/okunishinishi/node-mysqldesc
[bd_gemnasium_shield_url]: https://gemnasium.com/okunishinishi/node-mysqldesc.svg
[bd_npm_url]: http://www.npmjs.org/package/mysqldesc
[bd_npm_shield_url]: http://img.shields.io/npm/v/mysqldesc.svg?style=flat

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Describe mysql database. Get table names, column specs as a json object.

<!-- Description End -->



<!-- Sections Start -->
<a name="sections"></a>

Installation
-----

```bash
npm install mysqldesc --save-dev
```

Usage
-------

Describe database data.

```Javascript
var mysqldesc = require('mysqldesc');

// Mysql connect config.
var config = {
    user: 'root',
    password: 'my_password',
    host: 'localhost',
    database: 'my_db'
};
// Desc connected database
mysqldesc(config, function (err, data) {
    console.log("structure=" + JSON.stringify(data, null, 4));
});
```

This will result like:

```Javascript
data = { // Tables in "my_db" database.
    "TEST_PERSON": { // Columns in "TEST_PERSON" table.
        "PersonID": { // Spec of "TEST_PERSON.PersonID" column.
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
        }
    },
    "TEST_SHOP": {
        /*...*/
    }
};
```
API
------

| Signature | Description |
| --------- | ----------- |
| mysqldesc(config, callback) | Describe tables in the connected database. |
| mysqldesc(config, databaseName, callback) | Describe tables in a specific database. |
| mysqldesc(config, databaseName, tableName, callback) | Describe  a specific table. |
| mysqldesc.keyColumnUsage(config, callback) | Describe key column usage in the connected database. |
| mysqldesc.keyColumnUsage(config, databaseName, callback) | Describe key column usage in a specific database. |
| mysqldesc.keyColumnUsage(config, databaseName, tableName, callback) | Describe  key column usage in a specific table. |

Tips
----

### Connection Options

`mysqldesc` uses [node-mysql](https://github.com/felixge/node-mysql/) as connector.
For more advanced setting, see the [node-mysql documents about Connection options](https://github.com/felixge/node-mysql/#connection-options)


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/okunishinishi/node-mysqldesc/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [node-mysql](https://github.com/felixge/node-mysql/)

<!-- Links End -->
