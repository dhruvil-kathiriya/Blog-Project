const mongoose = require('mongoose');
const path = require("path");

const catagorySchema = mongoose.Schema({
    name: {
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

const catagory = mongoose.model("catagory", catagorySchema);
module.exports = catagory;