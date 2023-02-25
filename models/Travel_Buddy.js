const mongoose = require('mongoose')

const travelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: String,
    img: String,
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 }

}, { timestamps: true })

const Travel = mongoose.model('Travel', travelSchema)

module.exports = Travel