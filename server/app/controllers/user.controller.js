const User = require("../models/user.model");
const driver = require("../config/neo4j.coinfig");

const paginate = require("jw-paginate");

exports.find = async (req, res) => {
  const user = await User.find();
  return res.send(user);
};
exports.specificUser = async (req, res) => {
  user = req.params;
  id = user.id;
  const specificUser = await User.findById(id);
  const session4 = driver.session();
  const pidm = id;

  session4
    .run(
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
      follower = followers;
    })

    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session4.close(() => {});
      const session5 = driver.session();

      session5
        .run(
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
          following = followings;
          res.status(200).send({
            id: user._id,
            firstname: specificUser.firstname,
            lastname: specificUser.lastname,
            username: specificUser.username,
            email: specificUser.email,

            aboutme: specificUser.aboutme,
            city: specificUser.city,
            website: specificUser.website,

            follower,
            following,
            //accessToken: token
          });
        })

        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          session5.close(() => {});
        });
    });
};
//FOLLOW
exports.follow = async (req, res) => {
  const session = driver.session();
  const id1 = req.params.id;
  const id2 = req.params.id2;
  session
    .run(
      "MATCH (a:Person), (b:Person) WHERE a.pidm = $id1 AND b.pidm =  $id2 MERGE (a)-[: Follows {created_at: TIMESTAMP()}]->(b) ",
      {
        id1: id1,
        id2: id2,
      }
    )
    .then(() => {
      session.close(() => {
        console.log(` Followed`);
      });
    });
  res.status(200).send(`$username1 followed $username2`);
};
//UNFOLLOW
exports.unfollow = async (req, res) => {
  const session = driver.session();
  const u = req.params;
  const id1 = u.id;
  const id2 = req.params.id2;

  session
    .run(
      "MATCH (a:Person)-[r: Follows]->(b:Person) WHERE a.pidm = $id1 AND b.pidm = $id2 DELETE r ",
      {
        id1: id1,
        id2: id2,
      }
    )
    .then(() => {
      session.close(() => {
        console.log(` Unfollowed`);
      });
    });
  res.status(200).send(`${id1} unfollowed ${id2}`);
};

exports.postsByUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("posts");

  res.send(user.posts);
};

exports.profileupdate = async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        city: req.body.city,
        email: req.body.email,
        aboutme: req.body.aboutme,
        website: req.body.website,
      },
    }
  );

  res.send("User was updated successfully!");
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = async (req, res) => {
  const users = await User.find(
    {},

    { username: 1, email: 1, firstname: 1, lastname: 1, active: 1 }
  );

  res.status(200).send({ users });
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.searchuser = (req, res) => {
  const session = driver.session();
  const userid = req.params.id;
  const kkeyword = req.params.q;
  session
    .run(
      ` MATCH (p:Person)
    WHERE p.pidm= $id
    MATCH (p)-[:Follows]->(following)
    WITH collect(following.pidm) AS followers
    WITH "(" + apoc.text.join( followers, " OR " ) + ")^3" AS queryPart 
    CALL db.index.fulltext.queryNodes('persons', 'fullname: ${kkeyword}  pidm: ' + queryPart)
    YIELD node, score 
    RETURN node.pidm, node.fullname,  score `,
      {
        id: userid,
        kkeyword: kkeyword,
      }
    )
    .then((result) => {
      console.log(result);
      const data = [];
      result.records.forEach((record) => {
        data.push({
          id: record._fields[0],
          name: record._fields[1],
          score: record._fields[2],
        });
      });

      res.send(data).status(200);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      session.close(() => {});
    });
};

//posts
// ` MATCH (p:Person) WHERE p.fullname = "Donald Trump" MATCH (p)-[:Wrote]->(post) WITH collect(post.pidm) AS myposts WITH "(" + apoc.text.join(myposts , " OR ") + ")^2" AS str CALL db.index.fulltext.queryNodes('searchposts', 'title: visa pidm: ' + str) YIELD node, score RETURN node.pidm, node.title, score`
// users
//     ` MATCH (p:Person {fullname: 'Dinesh Chugtai'})-[:Follows]->(following) WITH "(" + apoc.text.join( collect(following.idm), ' OR ') + ")^2" AS queryPart CALL db.index.fulltext.queryNodes('findperson', 'fullname: monica idm: ' + queryPart) YIELD node, score RETURN node.idm, node.fullname, score`,
