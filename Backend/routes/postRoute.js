const express = require('express')
const router = express.Router();
const { getPosts, getOnePost, deletePost, createPost, updatePost } = require('../controller/postCtrl')
const { auth } = require('../controller/authCtrl')
const multer = require("../middleware/multer-config");

router.get('/', auth, getPosts);

router.post('/', multer, createPost);

router.get('/:id', auth, getOnePost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;