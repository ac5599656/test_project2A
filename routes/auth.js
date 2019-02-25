const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
let db = require("../models");
// let path = require('path');
let passport = require("passport");
const {
    ensureAuthenticated
} = require("../config/auth");

// let USER_SESSION = null;

// function signInUser(req, res, error, user, info) {
//   if (error) {
//     res.redirect("/login");
//   }
//   if (!user) {
//     res.redirect("/login");
//   }

//   USER_SESSION = user;
//   console.log(USER_SESSION);
//   res.redirect("/view/account");
// }

// domRouter.get('/', function (req, res) {
//     res.render('index');
// });

authRouter.get("/", function (req, res) {
    res.render("index");
});

authRouter.get("/signup", function (req, res) {
    res.render("signup");
});

authRouter.get("/login", function (req, res) {
    res.render("login");
});

// domRouter.post('/user/login', function (req, res, next) {
//     passport.authenticate('local', function (error, user, info))
// })

authRouter.post("/signup", (req, res) => {
    const {
        firstname,
        lastname,
        email,
        age,
        gender,
        password,
        password2
    } = req.body;
    let errors = [];
    console.log(`${firstname}`);

    if (!firstname || !lastname || !age || !gender || !email || !password || !password2) {
        errors.push({
            msg: "Please enter all fields"
        });
        // res.render("signup", { errors: errors });
    }

    if (password != password2) {
        errors.push({
            msg: "Passwords do not match"
        });
        // res.render("signup", {errors: errors});
    }

    if (password.length < 8) {
        errors.push({
            msg: "Password must be at least 8 characters"
        });
        // res.render("signup" {errors: errors});
    }

    if (errors.length > 0) {
        res.render("signup", {
            errors,
            firstname,
            lastname,
            email,
            age,
            gender,
            password,
            password2
        });
    } else {
        console.log("I bet we see this");
        db.User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (user) {
                errors.push({
                    msg: "Email already exists"
                });
                res.render("signup", {
                    errors,
                    firstname,
                    lastname,
                    email,
                    age,
                    gender,
                    password,
                    password2
                });
            } else {
                const newUser = {
                    firstname,
                    lastname,
                    email,
                    age,
                    gender,
                    password
                };

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newUser.password = hash;
                        db.User.create(newUser)
                            .then(user => {
                                res.redirect("/auth/login");
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

//Login
authRouter.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login"
    })
);

//Logout
authRouter.get("/logout", ensureAuthenticated, (req, res) => {
    req.logout();
    res.redirect("/auth/login");
});

module.exports = authRouter;