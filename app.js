const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser')
const ejs = require("ejs");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/secrets", (req, res) => {
    res.render("secrets");
});
app.get("/submit", (req, res) => {
    res.render("submit");
});

app.listen(3000, (req, res) => {
    console.log("Connected to port 3000");
});