const User = require('../models/User')
const Post = require('../models/Post')

exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) =>
            res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                biography: user.biography,
                avatarUrl: user.avatarUrl,
                isAdmin: user.isAdmin,
            })
        )
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.getUserPosts = (req, res) => {
    Post.find({ postedBy: req.params.id })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}
