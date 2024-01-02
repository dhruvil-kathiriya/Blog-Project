const express = require('express');
const port = 8002;
const app = express();
const path = require('path');
// const db = require("./config/mongoose");
const mongoose = require('mongoose');

mongoose.connect(("mongodb+srv://dskathiriya:Dhruvil156@cluster0.q17dt2h.mongodb.net/Blog_Project"), {
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
    secret: "dhruvil",
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