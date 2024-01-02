const express = require('express');
const routs = express.Router();
const catagory = require('../models/catagory');
const catagoryController = require('../controllers/catagorycontroller');
const subcatagory = require('../models/subcatagory');

routs.get('/add_catagory', async (req, res) => {
    return res.render('add_catagory');
})

routs.post('/add_catagorydata', catagoryController.add_catagorydata);

routs.get('/view_catagory', catagoryController.view_catagory);
routs.get("/setDeactive/:id", catagoryController.setDeactive);
routs.get("/setActive/:id", catagoryController.setActive);
routs.get("/deletecatagorydata/:id", catagoryController.deletecatagorydata);
routs.post("/deleteall", catagoryController.deleteall);

module.exports = routs;