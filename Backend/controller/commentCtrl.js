const mysql = require('mysql')




const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'groupomania'
})

// GET ALL COMMENTS
const getComments = async (req, res) => {
     pool.getConnection( async (err, connection) => {
        if (err) throw err

        //query
        connection.query('SELECT * from comments', (err, rows) => {
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

// GET ONE COMMENT

const getOneComment = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('hit getOne comment');

        //query
        connection.query('SELECT * from comments WHERE id_post = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                console.log(rows)
                res.send(rows)
            } else {
                console.log('query error');
                throw err
            }
        })
    })
}

// DELETE ONE Comment
 const deleteComment = (req, res) => {

     pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query('DELETE from comments WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`post with id: ${[req.params.id]} has been deleted`)
            } else {
                res.json({
                    message: 'error in delete'
                })
            }
        })
    })
 }

 // Create Comment
  const createComment = (req, res) => {

    pool.getConnection((err, connection) => {
        const commentdate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        
        const params = {
            id_user: req.body.id_user,
            id_post: req.body.id_post,
            text: req.body.text,
            date_comment: commentdate
        } //date

        //query
        connection.query('INSERT INTO comments SET ?', params , (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`new comment has been added`)
            } else {
                res.json({
                    message: 'Problem with create'
                })
            }
        })
    })
 }

 module.exports = {
     getComments,
     deleteComment,
     createComment,
     getOneComment
 }