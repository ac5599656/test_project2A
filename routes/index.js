// var db = require("../models");
const express = require("express");
const authRouter = express.Router();
const {
    ensureAuthenticated
} = require("../config/auth");
const passport = require("passport");

// Welcome Page
authRouter.get("/", (req, res) => res.render("index"));

// Dashboard
authRouter.get("/dashboard", ensureAuthenticated, (req, res) =>
    res.render("dashboard", {
        user: req.user
    })
);

module.exports = authRouter;