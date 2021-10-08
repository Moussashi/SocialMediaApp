const express = require('express')
const router = express.Router();
const { addUser, LogUser, getAllUsers, deleteUser } = require('../controller/userCtrl.js')
const multer = require('../middleware/multer-config')

router.post('/signup', multer, addUser)
router.post('/login', LogUser)
router.get('/', getAllUsers)
router.delete('/', deleteUser)



module.exports = router