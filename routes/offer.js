const express = require('express');
const routs = express.Router();
const offermodel = require('../models/offermodel')
const offercontroller = require('../controllers/offercontroller');

routs.get('/offer', async (req, res) => {
    return res.render('offer')
})
routs.post('/insertofferData', offercontroller.insertofferData);

module.exports = routs;