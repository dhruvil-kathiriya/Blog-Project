const slider = require('../models/slider');

module.exports.insertSliderData = async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    let imgPath = '';
    if (req.file) {
        imgPath = slider.sliderImgPath + "/" + req.file.filename;
    }
    req.body.sliderImage = imgPath;
    req.body.isActive = true;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    let sliderData = await slider.create(req.body);
    res.redirect('back')
}