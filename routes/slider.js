const express = require('express');
const routs = express.Router();
const slider = require('../models/slider');
const sliderController = require('../controllers/sliderController');

routs.get('/add_slider', async (req, res) => {
    return res.render('add_slider')
})
routs.post('/insertSliderData', slider.sliderUploadImage, sliderController.insertSliderData);


module.exports = routs;