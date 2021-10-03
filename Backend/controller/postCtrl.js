const mysql = require('mysql')




const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'p7'
})

// GET ALL POSTS
const getPosts = async (req, res) => {
     pool.getConnection( async (err, connection) => {
        if (err) throw err
        console.log('connected');
        //query
        connection.query('SELECT * from posts', (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.header()
                res.send(rows)
            } else {
                res.status(401).json({
                    message: 'error in query'
                })
            }
        })
    })

}

// GET ONE POST

const getOnePost = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected');

        //query
        connection.query('SELECT * from posts WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(rows)
            } else {
                res.send(err)
            }
        })
    })
}

// DELETE ONE POST
 const deletePost = (req, res) => {

     pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected');

        //query
        connection.query('DELETE from posts WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`post with id: ${[req.params.id]} has been deleted`)
            } else {
                
            }
        })
    })
 }

 // CREATE ONE POST

 const createPost = (req, res) => {
     console.log('one');

    pool.getConnection((err, connection) => {
        console.log('connected create post');

        const params = req.body

        //query
        connection.query('INSERT INTO posts SET ?', params , (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`new post with title: ${params.title} has been added`)
            } else {
                res.json({
                    message: 'Problem with create'
                })
            }
        })
    })
 }

 // MODIFY POST

 const updatePost = (req, res) => {
      pool.getConnection((err, connection) => {
        if (err) throw err

        const { id, title, img } = req.body

        //query
        connection.query('UPDATE posts SET title = ? WHERE id = ?', [title, id, img] , (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`post with title: ${title} has been modified`)
            } else {
                
            }
        })
    })
 }
module.exports = {
    getPosts,
    getOnePost,
    deletePost,
    createPost, 
    updatePost
}