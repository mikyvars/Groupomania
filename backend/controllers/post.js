const Post = require('../models/Post')

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.addPost = (req, res, next) => {}

exports.modifyPost = (req, res, next) => {}

exports.deletePost = (req, res, next) => {}

exports.likePost = (req, res, next) => {}
