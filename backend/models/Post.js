const express = require('express')
const postSchema = express.Schema({
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    usersLiked: { type: [String], default: [] },
})

module.exports = mongoose.model('Post', postSchema)
