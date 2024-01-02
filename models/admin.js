const mongoose = require('mongoose');
const multer = require("multer");

const imagePath = "/uploades/adminImages";
const path = require("path");

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: Array,
        required: true
    },
    adminImage: {
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

AdminSchema.statics.uploadAdminImage = multer({ storage: ImageStorage }).single("adminImage");
AdminSchema.statics.imageAdminPath = imagePath;

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;