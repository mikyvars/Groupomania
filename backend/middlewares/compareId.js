const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')

module.exports = (req, res, next) => {
    try {
        Post.findOne({ _id: req.params.id })
            .then((post) => {
                const token = req.headers.authorization.split(' ')[1]
                const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
                const userId = decodedToken.userId

                if (!userId || post.postedBy !== userId) {
                    res.status(403).json({ message: 'Requête non authorisée.' })
                } else {
                    next()
                }
            })
            .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
    } catch (error) {
        res.status(401).json({ error })
    }
}
