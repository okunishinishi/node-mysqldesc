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