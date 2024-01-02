
const catagory = require('../models/catagory')
const subcatagory = require('../models/subcatagory')
const path = require('path')
const fs = require('fs')

module.exports.add_subcatagory = async (req, res) => {
    let allcatagorys = await catagory.find({ isActive: true });
    return res.render('add_subcatagory', {
        'cata': allcatagorys
    });
}

module.exports.add_subcatagorydata = async (req, res) => {
    let imgPath = '';
    if (req.file) {
        imgPath = subcatagory.catagoryImgPath + "/" + req.file.filename;
    }
    req.body.catagoryImage = imgPath;
    req.body.isActive = true;
    req.body.create_date = new Date().toLocaleString();
    req.body.update_date = new Date().toLocaleString();
    let suncats = await subcatagory.create(req.body);
    return res.redirect('back')
}

module.exports.view_subcatagory = async (req, res) => {
    try {
        let search = '';
        if (req.query.search) {

            search = req.query.search;
        }
        if (req.query.page) {
            page = req.query.page;
        }
        else {
            page = 0;
        }
        var perpage = 2;
        let totaladmindata = await subcatagory.find({
            $or: [

                { "tital": { $regex: ".*" + search + ".*", $options: "i" } },
                { "description": { $regex: ".*" + search + ".*", $options: "i" } },

            ]
        }).countDocuments();
        let data = await subcatagory.find({
            $or: [

                { "tital": { $regex: ".*" + search + ".*", $options: "i" } },
                { "description": { $regex: ".*" + search + ".*", $options: "i" } },

            ]
        })
            .limit(perpage)
            .skip(perpage * page).populate('categoryid').exec();
        return res.render("view_subcatagory", {
            adminData: data,
            search: search,
            cpage: page,
            totaldoc: Math.ceil(totaladmindata / perpage)
        });
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

// de-active data
module.exports.setDeactivesub = async (req, res) => {
    try {
        if (req.params.id) {
            let activeData = await subcatagory.findByIdAndUpdate(req.params.id, { isActive: false });

            if (activeData) {
                console.log("Data is Deactive");
                return res.redirect("back");
            }
            else {
                console.log("Data is Active");
                return res.redirect("back");
            }
        }
        else {
            console.log("Params is Not Found!!!");
            return redirect("back");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}


// active data
module.exports.setActivesub = async (req, res) => {
    try {
        if (req.params.id) {
            let activeData = await subcatagory.findByIdAndUpdate(req.params.id, { isActive: true });

            if (activeData) {
                console.log("Data is Active");
                return res.redirect("back");
            }
            else {
                console.log("Data is Deactive");
                return res.redirect("back");
            }
        }
        else {
            console.log("Params is Not Found!!!");
            return redirect("back");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

// delete data
module.exports.deletesubcatagorydata = async (req, res) => {
    let oldData = await subcatagory.findById(req.params.id);
    if (oldData) {
        var oldImage = oldData.catagoryImage;
        if (oldImage) {
            let FullPath = path.join(__dirname, "..", oldData.catagoryImage);
            await fs.unlinkSync(FullPath);
        }
    }
    else {
        console.log("Image Path is Worng");
        return res.redirect("back");
    }
    await subcatagory.findByIdAndDelete(req.params.id);
    return res.redirect("back");

}

module.exports.deleteallsub = async (req, res) => {
    await subcatagory.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back');
}
