const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: { type: String, default: null },
    avatarUrl: { type: String, default: null },
    isAdmin: { type: Boolean, default: false },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
