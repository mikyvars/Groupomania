const express = require('express')
const router = express.Router()
const newsController = require('../controllers/news')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

router.get('/', auth, newsController.getNews)
router.post('/', auth, admin, newsController.addNews)

module.exports = router
