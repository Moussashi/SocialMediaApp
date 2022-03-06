const mysql = require('mysql')

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'groupomania'
})
connection.connect(function(err) {
    if (!err) {
        console.log('connection to database');
    } else {
        console.log('connection failed');
    }
})

module.exports = connection