const connection = require('./config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
        "password": hashedPassword
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
               const Usertoken = jwt.sign({_id: user._id, email: user.email, username: user.username}, 'katanagatari', {expiresIn: '1h'})
               res.json({
                   Usertoken: Usertoken,
                   status: true,
                   message: 'successfully authenticated',
                   user: {
                       id: user.id,
                       email: user.email,
                       username: user.username
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


module.exports = { 
    addUser,
    LogUser
}