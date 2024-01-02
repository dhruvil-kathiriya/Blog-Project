const express = require('express');
const routes = express.Router();
const adminController = require("../controllers/adminController");
const Admin = require("../models/admin");
const passport = require('passport');

routes.get("/", async (req, res) => {
    if (req.cookies.adminName) {
        return res.redirect("/admin/deshboard");
    }
    return res.render('login');
});

routes.get("/deshboard", passport.checkAuth, adminController.deshboard);

routes.get("/add_admin", passport.checkAuth, adminController.add_admin);

routes.post("/addAdminData", Admin.uploadAdminImage, passport.checkAuth, adminController.addAdminData);

routes.get("/view_admin", passport.checkAuth, adminController.view_admin);

routes.get("/setDeactive/:id", passport.checkAuth, adminController.setDeactive);

routes.get("/setActive/:id", passport.checkAuth, adminController.setActive);

routes.get("/deleteAdminData/:id", passport.checkAuth, adminController.deleteAdminData);

routes.get("/updateAdminData/:id", passport.checkAuth, adminController.updateAdminData);

routes.post("/EditAdminData", passport.checkAuth, Admin.uploadAdminImage, adminController.EditAdminData);

routes.post("/checklogin", passport.authenticate('local', { failureRedirect: "/admin/" }), adminController.checklogin);

routes.get("/changepassword", passport.checkAuth, adminController.changepassword);

routes.post("/modifypass", passport.checkAuth, adminController.modifypass);

routes.get("/profile", passport.checkAuth, adminController.profile);

routes.get("/updateProfile", passport.checkAuth, adminController.updateProfile);

routes.post("/deleteall", passport.checkAuth, adminController.deleteall);

routes.get("/logout", async (req, res) => {
    res.clearCookie("adminName");
    return res.redirect("/admin");
});

routes.get("/mailpage", async (req, res) => {
    return res.render("forgetpass/mailpage")
})

routes.post("/checkmail", adminController.checkmail);

routes.get("/otppage", async (req, res) => {
    return res.render("forgetpass/otppage");
})

routes.use('/slider', passport.checkAuth, require('./slider'));
routes.use('/post', passport.checkAuth, require('./post'));
routes.use('/comment', passport.checkAuth, require('./comment'));
routes.use('/catagory', passport.checkAuth, require('./catagory'));
routes.use('/subcat', passport.checkAuth, require('./subcat'));
routes.use('/offer', passport.checkAuth, require('./offer'));

module.exports = routes;