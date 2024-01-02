const express = require('express');
const routs = express.Router();
const contact = require('../models/contact');
const contactcontroller = require('../controllers/contactController');

routs.get('/view_contact', contactcontroller.view_contact);

module.exports = routs;


