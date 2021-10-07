const mysql = require('mysql')




const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'p7'
})

// GET ALL COMMENTS
const getComments = async (req, res) => {
     pool.getConnection( async (err, connection) => {
        if (err) throw err
        console.log('connected');
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
        console.log('connected');

        //query
        connection.query('SELECT * from comments INNER JOIN user WHERE id_post = ? AND user.id = comments.id_user', [req.params.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(rows)
            } else {
                res.send(err)
            }
        })
    })
}

// DELETE ONE Comment
 const deleteComment = (req, res) => {

     pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected');

        //query
        connection.query('DELETE from comments WHERE id = ?', [req.body.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`comment with id: ${[req.body.id]} has been deleted`)
            } else {
                
            }
        })
    })
 }

 // Create Comment
  const createComment = (req, res) => {

    pool.getConnection((err, connection) => {
        console.log('connected create comment');
        const commentdate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        
        const params = {
            id_user: req.body.id_user,
            id_post: req.body.id_post,
            text: req.body.text,
            date_comment: commentdate
        } //date

        console.log(params);

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