const Admin = require("../models/admin");
const path = require("path");
const fs = require('fs');
const nodemailer = require("nodemailer");

// home page
module.exports.deshboard = async (req, res) => {
    return res.render("deshboard");
}

// admin page
module.exports.add_admin = async (req, res) => {
    var adminRecord = req.cookies.adminName;
    return res.render("add_admin", {
        admin: adminRecord
    });
}

// add admin data
module.exports.addAdminData = async (req, res) => {
    try {
        var imagePath = '';
        req.body.name = req.body.fname + " " + req.body.lname;
        req.body.isActive = true;
        req.body.create_date = new Date().toLocaleString();
        req.body.update_date = new Date().toLocaleString();
        if (req.file) {
            imagePath = Admin.imageAdminPath + "/" + req.file.filename;
        }
        req.body.adminImage = imagePath;
        let addData = await Admin.create(req.body);
        if (addData) {
            console.log("Data Insert successfuly");
            return res.redirect("/admin/add_admin");
        }
        else {
            console.log("Data Not Inserted");
            return res.redirect("/admin/add_admin");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

// view admin data
module.exports.view_admin = async (req, res) => {
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
        let totaladmindata = await Admin.find({
            $or: [

                { "name": { $regex: ".*" + search + ".*", $options: "i" } },
                { "email": { $regex: ".*" + search + ".*", $options: "i" } },
                { "gender": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments();
        let data = await Admin.find({
            $or: [

                { "name": { $regex: ".*" + search + ".*", $options: "i" } },
                { "email": { $regex: ".*" + search + ".*", $options: "i" } },
                { "gender": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        })
            .limit(perpage)
            .skip(perpage * page);

        var adminRecord = req.cookies.adminName;
        return res.render("view_admin", {
            adminData: data,
            admin: adminRecord,
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
            let activeData = await Admin.findByIdAndUpdate(req.params.id, { isActive: false });

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
            let activeData = await Admin.findByIdAndUpdate(req.params.id, { isActive: true });

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
module.exports.deleteAdminData = async (req, res) => {
    try {
        let oldData = await Admin.findById(req.params.id);
        if (oldData) {
            var oldImage = oldData.adminImage;
            if (oldImage) {
                let FullPath = path.join(__dirname, "..", oldData.adminImage);
                await fs.unlinkSync(FullPath);
            }
        }
        else {
            console.log("Image Path is Worng");
            return res.redirect("back");
        }
        await Admin.findByIdAndDelete(req.params.id);
        return res.redirect("back");
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}

// update page
module.exports.updateAdminData = async (req, res) => {
    let record = await Admin.findById(req.params.id);
    var adminRecord = req.cookies.adminName;
    return res.render("update_admin", {
        up: record,
        admin: adminRecord
    });
}

// Edit update data
module.exports.EditAdminData = async (req, res) => {
    let oldData = await Admin.findById(req.body.EditId);
    req.body.name = req.body.fname + " " + req.body.lname;
    req.body.isActive = true;
    req.body.update_date = new Date().toLocaleString();
    if (req.file) {
        if (oldData.adminImage) {
            let FullPath = path.join(__dirname, "..", oldData.adminImage);
            await fs.unlinkSync(FullPath);
        }
        var imagePath = '';
        imagePath = Admin.imageAdminPath + "/" + req.file.filename;
        req.body.adminImage = imagePath;
    }
    else {
        req.body.adminImage = imagePath;
    }
    await Admin.findByIdAndUpdate(req.body.EditId, req.body);
    return res.redirect("view_admin")
}

// login page data
module.exports.checklogin = async (req, res) => {
    return res.redirect('/admin/deshboard');
}

module.exports.changepassword = async (req, res) => {
    try {
        var adminRecord = req.cookies.adminName;
        return res.render("changepassword", {
            admin: req.user
        });
    }
    catch {
        console.log(err);
        return res.redirect("back");
    }
}
module.exports.modifypass = async (req, res) => {
    var adminRecord = req.user;

    console.log(adminRecord.password);
    if (adminRecord.password == req.body.cpass) {
        if (req.body.cpass != req.body.npass) {
            if (req.body.npass == req.body.copass) {
                let alladmin = await Admin.findById(adminRecord._id)
                if (alladmin) {
                    let editpass = await Admin.findByIdAndUpdate(alladmin._id, { 'password': req.body.npass })
                    if (editpass) {
                        return res.redirect("/admin/logout");
                    }
                }
            }
            else {
                console.log("Password does not match!");
                return res.redirect("back");
            }
        }
        else {
            console.log("same password");
        }
    }
    else {
        console.log("Password not matched")

    }
    return res.redirect("back");
}

module.exports.profile = async (req, res) => {
    return res.render("profile");
}


module.exports.updateProfile = async (req, res) => {
    if (req.cookies.adminName == undefined) {
        return res.redirect("/admin");
    }

    return res.render("update_profile", {
        admin: req.cookies.adminName
    });
}

// forget pass
module.exports.checkmail = async (req, res) => {
    try {
        let emaildata = await Admin.findOne({ email: req.body.email })
        if (emaildata) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "clownfish156@gmail.com",
                    pass: "lfvcykzhqjeeehsd",
                },
            });

            let OTP = Math.floor(Math.random() * 90000) + 10000;
            const info = await transporter.sendMail({
                from: 'clownfish156@gmail.com', // sender address
                to: `${req.body.email}`, // list of receivers
                subject: "OTP", // Subject line
                text: "Hello world?", // plain text body
                html: `<b>OTP HERE : ${OTP}</b>`, // html body
            });

            if (info) {
                return res.redirect("otppage");
            }
            else {
                return res.redirect("back");
            }
        }
    }
    catch (err) {
        console.log("somthing wrong", err)
        return res.redirect("back")
    }

}

module.exports.deleteall = async (req, res) => {
    await Admin.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back');
}