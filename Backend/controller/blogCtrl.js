const mysql = require('mysql')




const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'p7'
})

const getBlogPosts = async (req, res) => {
     pool.getConnection( async (err, connection) => {
        if (err) throw err
        console.log('connected');
        //query
        connection.query('SELECT * from blogs', (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(rows)
            } else {
                res.status(401).json({
                    message: 'error in query'
                })
            }
        })
    })

}

const createBlogPost = async (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected');

        const params = req.body

        //query
        connection.query('INSERT INTO blogs SET ?', params , (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                
                res.send(`new blog post with title: ${params.title} has been added`)
            } else {
                console.log(params);
                res.json({
                    status: false,
                    message: 'error creating new blog post'
                })
            }
        })
    })
}
module.exports = {
    getBlogPosts,
    createBlogPost
}