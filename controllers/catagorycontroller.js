const catagory = require('../models/catagory')
const subcatagory = require('../models/subcatagory')
const path = require('path')
const fs = require('fs')

module.exports.add_catagorydata = async (req, res) => {

    req.body.isActive = true;
    req.body.create_date = new Date().toLocaleString();
    req.body.update_date = new Date().toLocaleString();
    let catagorys = await catagory.create(req.body);
    return res.redirect('back')
}

// view 
module.exports.view_catagory = async (req, res) => {
    try {

        let search = '';
        if (req.query.search) {
            console.log(req.query.search);
            search = req.query.search;
        }
        if (req.query.page) {
            page = req.query.page;
        }
        else {
            page = 0;
        }
        var perpage = 2;
        // total rec found 
        let totaladmindata = await catagory.find({
            $or: [

                { "name": { $regex: ".*" + search + ".*", $options: "i" } },
                { "email": { $regex: ".*" + search + ".*", $options: "i" } },
                { "gender": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments();
        let data = await catagory.find({
            $or: [

                { "name": { $regex: ".*" + search + ".*", $options: "i" } },
                { "email": { $regex: ".*" + search + ".*", $options: "i" } },
                { "gender": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        })
            .limit(perpage)
            .skip(perpage * page);
        return res.render("view_catagory", {
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
module.exports.setDeactive = async (req, res) => {
    try {
        if (req.params.id) {
            let activeData = await catagory.findByIdAndUpdate(req.params.id, { isActive: false });

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
module.exports.setActive = async (req, res) => {
    try {
        if (req.params.id) {
            let activeData = await catagory.findByIdAndUpdate(req.params.id, { isActive: true });

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
module.exports.deletecatagorydata = async (req, res) => {
    await catagory.findByIdAndDelete(req.params.id);
    return res.redirect("back");

}

module.exports.deleteall = async (req, res) => {
    await catagory.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back');
}
