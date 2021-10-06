const express = require('express')
const router = express.Router();
const { addUser, LogUser, getAllUsers, deleteUser } = require('../controller/userCtrl.js')

router.post('/signup', addUser)
router.post('/login', LogUser)
router.get('/', getAllUsers)
router.delete('/', deleteUser)



module.exports = router