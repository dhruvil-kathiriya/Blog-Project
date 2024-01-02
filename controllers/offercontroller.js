const offermodel = require('../models/offermodel');
const path = require('path');

module.exports.insertofferData = async (req, res) => {
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString();
    const offerdata = await offermodel.create(req.body)

    return res.redirect('back');
}