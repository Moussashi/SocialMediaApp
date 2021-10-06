const connection = require('./config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'p7'
})


/*************************************************************
 * *********************  SIGNUP  *****************************
 ************************************************************/
const addUser = async (req, res) => {

    const password = req.body.password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = {
        "username": req.body.username,
        "email": req.body.email,
        "password": hashedPassword,
        "ProfilePicture": req.body.ProfilePicture
    }

    connection.query('INSERT INTO user SET ?', user, function (err, results) {
        if (err) {
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
   const ProfilePicture = req.body.ProfilePicture
   

   connection.query( 'SELECT * FROM user WHERE email = ?', [email], async function (err, results) {
       const user = results[0]
       const validPassword = await bcrypt.compare(password, user.password);
       if (err) {
            res.json({
                status: false,
                message: 'there is a problem with query'
            })
       } else {
           if (results.length > 0 && validPassword) {   
               const Usertoken = jwt.sign({_id: user._id, email: user.email, username: user.username, ProfilePicture: user.ProfilePicture}, 'katanagatari', {expiresIn: '1h'})
               res.json({
                   Usertoken: Usertoken,
                   status: true,
                   message: 'successfully authenticated',
                   user: {
                       id: user.id,
                       email: user.email,
                       username: user.username,
                       ProfilePicture: user.ProfilePicture
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
        console.log('connected all users');
        //query
        connection.query('SELECT * from user', (err, rows) => {
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
        console.log('connected delete User');
        console.log(req.body.id);

        //query
        connection.query('DELETE from user WHERE id = ?', [req.body.id], (err, rows) => {
            connection.release() // return the connection pool

            if (!err) {
                res.send(`post with id: ${[req.params.id]} has been deleted`)
            } else {
                
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