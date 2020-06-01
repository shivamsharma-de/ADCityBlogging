  const db = require("../models");
const ROLES = db.ROLES;
const redisClient = require("../config/redis.config"); 

const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

isLoggedin = (req, res, next) => {

  const Id  = req.sessionID
  console.log(Id)
   
  redisClient.get(Id, (err, data) => {
      if (err) {
          console.log(err)
          res.status(500).send(err);
      }
      if (data ==! null) {
          res.send(data);
      } else next();
  });
  console.log("inside isloggedin")
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted, isLoggedin

};

module.exports = verifySignUp;
