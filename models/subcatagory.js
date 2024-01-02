const mongoose = require('mongoose');
const multer = require("multer");

const imagePath = "/uploades/catagoryimg";
const path = require("path");

const subcatagorySchema = mongoose.Schema({
    tital: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "catagory",
        required: true
    },
    catagoryImage: {
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
    }
})

const ImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imagePath));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

subcatagorySchema.statics.catagoryuploadImage = multer({ storage: ImageStorage }).single("catagoryImage");
subcatagorySchema.statics.catagoryImgPath = imagePath;

const subcatagory = mongoose.model("subcatagory", subcatagorySchema);
module.exports = subcatagory;