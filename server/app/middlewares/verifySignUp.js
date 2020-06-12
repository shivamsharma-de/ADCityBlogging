const db = require("../models");
const ROLES = db.ROLES;
const redisClient = require("../config/redis.config");
const session = require("./session");
var cookieParser = require("cookie-parser");

const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
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
      email: req.body.email,
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
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

isLoggedin = async (req, res, next) => {
  const w = req.cookies.sessionId;

  if (!w) {
    return res.status(400).send("No cookie");
  }
  var i = String(w);
  var a = i.substring(2, i.len);
  var b = a.substring(0, a.indexOf("."));
  var sessionid = "sess:" + b;
  console.log(sessionid);
  redisClient.get(sessionid, (err, reply) => {
    if (err || reply == null) {
      return res.status(401).send({
        message: `Session Not found`,
      });
    }
  });
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  isLoggedin,
};

module.exports = verifySignUp;
