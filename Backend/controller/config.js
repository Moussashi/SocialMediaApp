const mysql = require('mysql')

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'p7'
})
connection.connect(function(err) {
    if (!err) {
        console.log('connection');
    } else {
        console.log('connection failed');
    }
})

module.exports = connection