const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser')
const ejs = require("ejs");
const md5 = require("md5");
const bcrypt = require('bcrypt');
const saltRounds = 10;

require("dotenv").config();

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


const userSchema = new mongoose.Schema({
    username : String,
    password : String
});



const userList = mongoose.model("userList",userSchema);

app.get("/", (req, res) => {
    res.render("home");
});

app.route("/login")
.get((req, res) => {
    res.render("login");
}).post((req,res)=>{
    
   userList.findOne({username:req.body.username}).then((foundUser)=>{    
     bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
            if(result == true){
            res.render("secrets");
            }
        });
     
   });
});

app.route("/register")
.get((req, res) => {
    res.render("register");
})
.post((req,res) => {

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user = new userList({
            username: req.body.username,
            password: hash
           });
           user.save().then((foundUser)=>{
               res.render("secrets");
           }).catch((err)=>{
               console.log(err);
           });
    });
    
    
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