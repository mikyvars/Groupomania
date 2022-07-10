const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    content: { type: String, required: true },
    imageUrl: { type: String, required: false },
    usersLiked: { type: [String], default: [] },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Post', postSchema)
