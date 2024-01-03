const mongoose = require("mongoose")
const {Schema} = mongoose

const photoSchema = newSchema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
}, {
    timestamps: true
})

const Photo = mongoose.model("Photo", photoSchema)

module.exports = Photo;