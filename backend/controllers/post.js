const fs = require('fs')
const Post = require('../models/Post')

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.addPost = (req, res, next) => {
    const postObject = req.body.post
    const post = new Post({
        ...postObject,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
    })

    post.save()
        .then(() => res.status(201).json({ message: 'Votre publication a bien été envoyée.' }))
        .catch((error) => res.status(500).json({ error }))
}

exports.modifyPost = (req, res, next) => {
    const postObject = req.file
        ? {
              ...req.body.post,
              imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
          }
        : { ...req.body.post }

    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Votre publication a bien été mise à jour.' }))
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
}

exports.deletePost = (req, res, next) => {
    console.log(req.params.id)
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Votre publication a bien été supprimée.' }))
                    .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
            })
        })
        .catch((error) => res.status(500).json({ error }))
}

exports.likePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.usersLiked.indexOf(req.body.userId) == -1) {
                post.usersLiked.push(req.body.userId)
            } else {
                const index = post.usersLiked.findIndex((user) => user === req.body.userId)
                post.usersLiked.splice(index, 1)
            }

            post.save()
                .then(() => res.status(200).json({ message: 'Vous aimé like/dislike cette publication.' }))
                .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
        })
        .catch(() => res.status(500).json({ error: 'Une erreur est survenue.' }))
}
