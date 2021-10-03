const express = require('express')
const router = express.Router();
const { getPosts, getOnePost, deletePost, createPost, updatePost } = require('../controller/postCtrl')
const { auth } = require('../controller/authCtrl')

router.get('/', auth, getPosts);

router.post('/', createPost);

router.get('/:id', auth, getOnePost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;