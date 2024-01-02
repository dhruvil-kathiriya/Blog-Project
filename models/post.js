const mongoose = require('mongoose');
const multer = require("multer");

const imagePath = "/uploades/posts";
const path = require("path");

const postSchema = mongoose.Schema({
    tital: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    create_date: {
        type: String,
        required: true
    },
    update_date: {
        type: String,
        required: true
    },
})

const ImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imagePath));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

postSchema.statics.postuploadImage = multer({ storage: ImageStorage }).single("postImage");
postSchema.statics.postImgPath = imagePath;

const post = mongoose.model("post", postSchema);
module.exports = post;