/*************************************************************
 * *********************  auth token  *****************************
 ************************************************************/

const jwt = require('jsonwebtoken');

const auth= (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', ' ')

        if (token === null) return res.sendStatus(401)

        jwt.verify(token, 'katanagatari', (err, User) => {
            
            if (err) return console.log('probleme verif token');
            console.log('authenticated');
            next()
        })
        
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = { auth };

// RAS