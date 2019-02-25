const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
// const MySql = require("MySql");
const bcrypt = require("bcryptjs");

// Load User model
const db = require("../models");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    db.User.findByPk(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});

passport.use(
    new LocalStrategy({
            usernameField: "email"
        },
        (email, password, done) => {
            console.log("asdhfjlasjdflajsdf;", email);
            // Match user
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (!user) {
                    return done(null, false, {
                        message: "That email is not registered"
                    });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log("THERE WAS AN ERROR CHECKING PASSWORD");
                        throw err;
                    }
                    if (isMatch) {
                        console.log("THERE WAS A MATCH!!!!!");
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Password incorrect"
                        });
                    }
                });
            });
        }
    )
);