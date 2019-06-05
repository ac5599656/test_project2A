const db = require("../models");
const { ensureAuthenticated } = require("../config/auth");

module.exports = app => {
  app.get("/api/comments", ensureAuthenticated, (req, res) => {
    console.log(req);
    const query = {};
    // console.log(query);
    if (req.query.person_id) {
      query.Person_id = req.query.person_id;
    }

    db.Comment.findAll({
      where: query,
      include: [db.Person, db.Post]
    }).then(dbComment => {
      console.log(dbComment);
      res.json(dbComment);
    });
  });

  app.get("/api/comments/:id", ensureAuthenticated, (req, res) => {
    db.Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(dbComment => {
      // console.log(dbComment);
      res.json(dbComment);
    });
  });

  app.post("/api/comments", ensureAuthenticated, (req, res) => {
    // console.log("trying to add a comment for user:", req);
    let firstname = req.user.firstname;
    let lastname = req.user.lastname;
    let create = req.user.updatedAt;
    db.Comment.create({
      ...req.body,
      UserId: req.user.id,

      include: [db.Person, db.Post]
    }).then(dbComment => {
      // console.log("successfully inputted in the comment database!");
      console.log(dbComment);
      // console.log(dbComment.PostId);
      // console.log(dbComment.body);

      let comment = dbComment.body;
      res.json({
        ok: true,

        comment: comment,
        firstname: firstname,
        lastname: lastname,
        create: create
      });
    });
  });

  app.delete("/api/comments/:id", ensureAuthenticated, (req, res) => {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbComment => {
      res.json(dbComment);
    });
  });

  app.put("/api/comments", ensureAuthenticated, (req, res) => {
    db.Comment.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbComment => {
      res.json(dbComment);
    });
  });
};
