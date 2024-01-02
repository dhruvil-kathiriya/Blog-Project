const express = require('express');
const port = process.env.PORT || 8002;
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@cluster0.q17dt2h.mongodb.net/Blog_Project`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

const Admin = require("./models/admin");
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "user_assets")));

app.use(session({
    name: "dhruvil",
    secret: `${process.env.session_secret}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}))

app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuth);

app.use('/', require('./routes/user'));
app.use("/admin", require("./routes/admin"));
app.use("/uploades", express.static(path.join(__dirname, "uploades")));


app.listen(port, function (err) {
    if (err) console.log(err);

    console.log(`Server is running port :${port}`);
})