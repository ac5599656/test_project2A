const db = require("../models");

const {
    ensureAuthenticated
} = require("../config/auth");

module.exports = (app) => {
    app.get("/api/people", ensureAuthenticated, (req, res) => {
        console.log(req.user.id);
        let firstname = req.user.firstname;
        let lastname = req.user.lastname;
        res.json({
            ok: true,
            firstname: firstname,
            lastname: lastname
        });
        // db.User.findOne({
        //     console.log("email");
        //     where: {

        //         email: email
        //     }
        // }).then((dbUser) => {
        // console.log(dbUser.dataValues.firstname);
        // console.log(dbUser.dataValues.lastname);
        //     console.log("Where are you?");
        //     let firstname = dbUser.dataValues.firstname;
        //     let lastname = dbUser.dataValues.lastname;
        //     console.log(firstname);
        //     console.log(lastname);
        //     res.json({
        //         ok: true,
        //         firstname: firstname,
        //         lastname: lastname
        //     });
        // });
    });

    app.get("/api/people/:id", ensureAuthenticated, (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            //include: [db.Post]
        }).then((dbUser) => {
            res.json(dbUser)
        });
    });

    app.post("/api/people", ensureAuthenticated, (req, res) => {
        db.User.create(req.body).then((dbUser) => {
            res.json(dbUser)
        });
    });

    app.delete("/api/people/:id", ensureAuthenticated, (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then((dbUser) => {
            res.json(dbUser)
        });
    });

};