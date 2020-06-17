/** @format */
var cookieParser = require("cookie-parser");

const config = require("../config/auth.config");
const driver = require("../config/neo4j.coinfig");
const db = require("../models");

const express = require("express");
const User = db.user;
const Role = db.role;

// var jwt = require("jsonwebtoken");
// const app = express();

var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    gender: req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8),
    active: true,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
  const session = driver.session();
  idm = user.id;
  const fullname = user.firstname + " " + user.lastname;
  console.log(fullname);

  await session
    .run("CREATE (n:Person {name: $username, pidm:$idm, fullname:$fullname})", {
      username: req.body.username,
      idm: idm,
      fullname: fullname,
    })
    .then(() => {
      session.close(() => {
        console.log(` addded in Person`);
      });
    });
  const cgt = req.body.cgt;

  cgt.forEach(createrel);
  async function createrel(categoryName) {
    const session2 = driver.session();
    console.log(categoryName);
    const username = req.body.username;
    await session2.run(
      "MATCH (a:Person), (b:Category) WHERE a.idm = $idm AND b.name =  $categoryName CREATE (a)-[: Have_interests_in {created_at: TIMESTAMP()}]->(b) ",
      {
        categoryName: categoryName,
        idm: idm,
      }
    );

    await session2.close();
  }
};

// exports.verifyemail = async (req,res) =>{

//   await User.updateOne(
//     { username: req.params._id },

//     {
//       $set: {
//       active:true
//       },

//     }
//   );

//   res.send("hi");

// }
exports.deactivateuser = async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },

    {
      $set: {
        active: false,
      },
    }
  );
  res.send("deactivated");
};
exports.activateuser = async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },

    {
      $set: {
        active: true,
      },
    }
  );
  res.send("Activate");
};
exports.signin = async (req, res) => {
  


  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          //accessToken: null,
          message: "Invalid Password!",
        });
      }
      if (!user.active === true) {
        return res.status(401).send({
          //accessToken: null,
          message:
            "Your account has been deactivated. Kindly contact administrator.",
        });
      }

      // var token = jwt.sign({ id: user.id }, config.secret, {
      //   expiresIn: 86400 // 24 hours
      // });
      req.session.user = user;

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }


      const session4 = driver.session();
      const pidm = user._id;
 
      session4 .run(
          `MATCH (p1:Person)
          WHERE p1.pidm= "${pidm}"
          MATCH (p1:Person)<-[:Follows]-(p3:Person)
          RETURN  p3.pidm  , p3.fullname `,
          {
            pidm: pidm,
          }
        )
        .then((result) => {
         
          const followers = [];
          result.records.forEach((record) => {
            followers.push({
              id: record._fields[0],
              fullname: record._fields[1],
            });
         
          });
          // const following = []
          // result.records.forEach((record) => {
          //   following.push({
          //     id: record._fields[2],
          //     fullname: record._fields[3],
          //   });
         
          // });
          follower = followers
        })
     
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          session4.close(() => {
          });
          const session5 = driver.session();
 
 
      session5 .run(
          `MATCH (p1:Person)
          WHERE p1.pidm= "${pidm}"
          MATCH (p1:Person)-[:Follows]->(p3:Person)
          RETURN  p3.pidm  , p3.fullname `,
          {
            pidm: pidm,
          }
        )
        .then((result) => {
         
          const followings = [];
          result.records.forEach((record) => {
            followings.push({
              id: record._fields[0],
              fullname: record._fields[1],
            });
         
          });
          following = followings
          res.status(200).send(  {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            roles: authorities,
            aboutme: user.aboutme,
            city: user.city,
            website: user.website,
            posts: user.posts,
            follower,following
            //accessToken: token
          });
        })
     
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          session5.close(() => {
          });
        });
        });
      
        
      


  
      // res.status(200).send(  {
      //   id: user._id,
      //   firstname: user.firstname,
      //   lastname: user.lastname,
      //   username: user.username,
      //   email: user.email,
      //   roles: authorities,
      //   aboutme: user.aboutme,
      //   city: user.city,
      //   website: user.website,
      //   posts: user.posts,
      //   followers1,
      //   // followings
      //   //accessToken: token
      // });
    });
};

exports.signout = (req, res) => {
  if (req.session.user) {
    req.session.destroy(function () {
      res.clearCookie("sessionId").status(200).send("Cookie deleted.");
      // res.status(200).send('OK');
      // res.redirect('/');
    });
  } else {
    res.json({ message: "Session persistence failed!" });
  }
};
