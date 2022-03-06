const connection = require('./config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'groupomania'
})


/*************************************************************
 * *********************  SIGNUP  *****************************
 ************************************************************/
const addUser = async (req, res) => {
    console.log('hit addUser');

    const password = req.body.password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const imgPP = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    const user = {
        "username": req.body.username,
        "email": req.body.email,
        "password": hashedPassword,
        "profilePicture": imgPP
    }

    connection.query('INSERT INTO users SET ?', user, function (err, results) {
        if (err) {
            console.log('problem to insert');
            res.json({
                status: false,
                message: 'there is a problem with query'
                
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            })
        }
    })
}

const LogUser = async (req, res) => {

   const email = req.body.email
   const password = req.body.password
   

   connection.query( 'SELECT * FROM users WHERE email = ?', [email], async function (err, results) {
       const user = results[0]
       const validPassword = await bcrypt.compare(password, user.password);
       if (err) {
            res.json({
                status: false,
                message: 'there is a problem with query'
            })
       } else {
           if (results.length > 0 && validPassword) {   
               const Usertoken = jwt.sign({_id: user._id, email: user.email, username: user.username, profilePicture: user.profilePicture}, 'katanagatari', {expiresIn: '1h'})
               res.json({
                   Usertoken: Usertoken,
                   status: true,
                   message: 'successfully authenticated',
                   user: {
                       id: user.id,
                       email: user.email,
                       username: user.username,
                       profilePicture: user.profilePicture
                   }
               })
               
           } else {
               res.json({
                   status: false,
                   message: 'email and password does not match'
               });
           }
       }
   })

}

const getAllUsers = async (req, res) => {
    pool.getConnection( async (err, connection) => {
        if (err) throw err
        //query
        connection.query('SELECT * from users', (err, rows) => {
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

 const deleteUser = (req, res) => {

     pool.getConnection((err, connection) => {
        if (err) throw err

        //query
        connection.query('DELETE from users WHERE id = ?', [req.body.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`post with id: ${[req.body.id]} has been deleted`)
            } else {
                res.json({
                    message: 'Impossible to delete User'
                })
            }
        })
    })
 }


module.exports = { 
    addUser,
    LogUser,
    getAllUsers,
    deleteUser
}