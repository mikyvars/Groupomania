const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

const auth = require('../middlewares/auth')
//const compareId = require('../middlewares/compareId')
//const multer = require('../middlewares/multer-config')

router.get('/', auth, postController.getPosts)
router.post('/', auth, postController.addPost)
router.put('/:id', auth, postController.modifyPost)
router.delete('/:id', auth, postController.deletePost)
router.post('/:id/like', auth, postController.likePost)

module.exports = router
