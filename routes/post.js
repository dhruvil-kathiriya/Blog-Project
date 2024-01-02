const express = require('express');
const routs = express.Router();
const posts = require('../models/post');
const postController = require('../controllers/postController');

routs.get('/add_posts', async (req, res) => {
    return res.render('add_post')
})
routs.post('/insertpostData', posts.postuploadImage, postController.insertpostData);

routs.get('/view_posts', postController.view_posts);

routs.get("/setDeactive/:id", postController.setDeactive);

routs.get("/setActive/:id", postController.setActive);

routs.get("/deletepostdata/:id", postController.deletepostdata);

routs.post("/deleteall", postController.deleteall);

module.exports = routs;