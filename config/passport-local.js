const passport = require("passport");

const passportlocal = require("passport-local").Strategy;
const Admin = require("../models/admin");

passport.use(
  new passportlocal(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      let admindata = await Admin.findOne({ email: email });

      if (admindata) {
        if (password == admindata.password) {
          return done(null, admindata);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    }
  )
);

passport.serializeUser(async (admin, done) => {
  return done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
  let adminrecord = await Admin.findById(id);
  if (adminrecord) {
    return done(null, adminrecord);
  } else {
    return done(null, false);
  }
});

passport.setAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  return next();
};

passport.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/admin/");
  }
};

module.exports = passport;
