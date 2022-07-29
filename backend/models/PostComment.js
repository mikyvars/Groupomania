const mongoose = require('mongoose')
const postCommentSchema = mongoose.Schema({
    content: { type: String, required: true },
    postId: { type: String, required: true },
    posted: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('PostComment', postCommentSchema)
