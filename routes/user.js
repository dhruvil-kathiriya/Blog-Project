const express = require('express');
const routs = express.Router();
const comment = require('../models/comment')
const userController = require('../controllers/userController');

routs.get('/', userController.home);

routs.get('/viewblog/:id', userController.viewblog);

routs.post('/addcomment', comment.commentuploadImage, userController.addcomment);

routs.get('/catagory', userController.catagory);

routs.get('/contact', userController.contact);

routs.post('/addcontactdeails', userController.addcontactdeails);

module.exports = routs;