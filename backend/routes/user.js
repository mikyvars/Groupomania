const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

router.get('/:id', auth, userController.getUser)
router.get('/:id/posts', auth, userController.getUserPosts)

module.exports = router
