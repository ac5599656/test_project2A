const db = require("../models");
const { ensureAuthenticated } = require("../config/auth");

module.exports = app => {
  app.get("/api/posts", ensureAuthenticated, (req, res) => {
    const query = {
      //UserId : user.id
    };

    db.Post.findAll({
      include: [db.User]
    }).then(dbPost => {
      for (var i = 0; i < dbPost.length; i++) {
        dbPost[i].dataValues.currentUser = req.user.id;
      }
      // console.log(dbPost);
      res.json(dbPost);
    });
  });

  app.get("/api/posts/:id", (req, res) => {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: db.User
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  app.post("/api/posts", ensureAuthenticated, (req, res) => {
    let data = {
      ...req.body,
      UserId: req.user.id
    };
    // console.log(req.body);
    // console.log(req.body.favBar);
    // console.log(data);
    let favBar = req.body.favBar;
    db.Post.create(data).then(dbPost => {
      res.json(dbPost);
      // console.log(dbPost.dataValues.id);
    });
  });

  app.delete("/api/posts/:id", ensureAuthenticated, (req, res) => {
    // console.log(req);
    db.Post.destroy({
      where: {
        // TODO: double check author and user _id keys
        UserId: req.user.id,
        id: req.params.id
      }
    })
      .then(dbPost => {
        res.json(dbPost);
      })
      .catch(err => {
        console.error(err);
        // either the destroy failed because of an invalid id
        // or it failed because the logged in user was not the author
      });
  });

  app.put("/api/posts", ensureAuthenticated, (req, res) => {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
};
