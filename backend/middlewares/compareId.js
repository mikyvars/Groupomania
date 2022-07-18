const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')

module.exports = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            const token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
            const userId = decodedToken.userId

            if (post.userId && post.userId === userId) {
                next()
            } else {
                User.findOne({ _id: userId })
                    .then((user) => {
                        if (user.isAdmin && user.isAdmin === true) {
                            next()
                        } else {
                            res.status(403).json({ message: 'Requête non authorisée.' })
                        }
                    })
                    .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
            }
        })
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}
