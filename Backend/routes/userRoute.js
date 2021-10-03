const express = require('express')
const router = express.Router();
const { addUser, LogUser } = require('../controller/userCtrl.js')

router.post('/signup', addUser)
router.post('/login', LogUser)


module.exports = router