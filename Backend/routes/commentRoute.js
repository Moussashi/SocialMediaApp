const express = require('express')
const router = express.Router();
const { getComments, deleteComment, createComment, getOneComment} = require('../controller/commentCtrl')

router.get('/', getComments);

router.get('/:id', getOneComment);

router.post('/', createComment);

router.delete('/', deleteComment)

module.exports = router;