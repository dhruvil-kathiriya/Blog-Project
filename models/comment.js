
const mongoose = require('mongoose');
const multer = require("multer");

const imagePath = "/uploades/commentimg";
const path = require("path");

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    postid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
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

commentSchema.statics.commentuploadImage = multer({ storage: ImageStorage }).single("userImage");
commentSchema.statics.commentImgPath = imagePath;

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;