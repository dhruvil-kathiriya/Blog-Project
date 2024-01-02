const mongoose = require('mongoose');
const path = require('path');

const offerschema = mongoose.Schema({
    Heading: {
        type: String,
        required: true
    },
    Icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    currentDate: {
        type: String,
        required: true
    },
    updateDate: {
        type: String,
        required: true
    }
})

const offermodel = mongoose.model('offermodel', offerschema);
module.exports = offermodel;