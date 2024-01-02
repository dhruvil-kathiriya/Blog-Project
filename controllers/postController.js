const post = require('../models/post');
const path = require('path')
const fs = require('fs')

module.exports.insertpostData = async (req, res) => {
    req.body.username = req.user.name;
    let imgPath = '';
    if (req.file) {
        imgPath = post.postImgPath + "/" + req.file.filename;
    }

    req.body.postImage = imgPath;
    req.body.isActive = true;
    req.body.create_date = new Date().toLocaleString();
    req.body.update_date = new Date().toLocaleString();
    let posts = await post.create(req.body);
    return res.redirect('back')
}

module.exports.view_posts = async (req, res) => {
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
        let totaladmindata = await post.find({
            $or: [

                { "tital": { $regex: ".*" + search + ".*", $options: "i" } },
                { "username": { $regex: ".*" + search + ".*", $options: "i" } },
                { "category": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments();
        let data = await post.find({
            $or: [

                { "tital": { $regex: ".*" + search + ".*", $options: "i" } },
                { "username": { $regex: ".*" + search + ".*", $options: "i" } },
                { "category": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        })
            .limit(perpage)
            .skip(perpage * page);
        return res.render("view_post", {
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
            let activeData = await post.findByIdAndUpdate(req.params.id, { isActive: false });

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
            let activeData = await post.findByIdAndUpdate(req.params.id, { isActive: true });

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
module.exports.deletepostdata = async (req, res) => {
    let oldData = await post.findById(req.params.id);
    if (oldData) {
        var oldImage = oldData.postImage;
        if (oldImage) {
            let FullPath = path.join(__dirname, "..", oldData.postImage);
            await fs.unlinkSync(FullPath);
        }
    }
    else {
        console.log("Image Path is Worng");
        return res.redirect("back");
    }
    await post.findByIdAndDelete(req.params.id);
    return res.redirect("back");

}

module.exports.deleteall = async (req, res) => {
    await post.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back');
}

