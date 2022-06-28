const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

const auth = require('../middlewares/auth')
const compareId = require('../middlewares/compareId')

router.get('/', auth, postController.getPosts)
router.post('/', auth, postController.addPost)
router.put('/:id', auth, compareId, postController.modifyPost)
router.delete('/:id', auth, compareId, postController.deletePost)
router.post('/:id/like', auth, postController.likePost)

module.exports = router
