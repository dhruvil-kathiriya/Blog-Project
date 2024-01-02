const mongoose = require('mongoose');
const path = require("path");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
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

const contact = mongoose.model("contact", contactSchema);
module.exports = contact;