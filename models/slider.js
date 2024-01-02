const mongoose = require('mongoose');
const sliderPath = '/uploades/slider';
const path = require('path')
const multer = require('multer');

const sliderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sliderImage: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    }
})

const sliderStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", sliderPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})
sliderSchema.statics.sliderUploadImage = multer({ storage: sliderStorage }).single("sliderImage");
sliderSchema.statics.sliderImgPath = sliderPath;

const sliderData = mongoose.model('slider', sliderSchema);
module.exports = sliderData;