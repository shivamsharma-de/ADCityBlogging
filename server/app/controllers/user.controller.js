const User = require("../models/user.model");
const driver = require("../config/neo4j.coinfig");

const paginate = require('jw-paginate');

exports.find = async (req, res) => {
  const user = await User.find();
  return res.send(user);
};
exports.specificUser = async (req, res) => {
  user = req.params;
  id = user.id;
  const specificUser = await User.findById(id);
  res.status(200).send({
    id: specificUser.id,
    firstname: specificUser.firstname,
    lastname: specificUser.lastname,
    username: specificUser.username,
    email: specificUser.email,
    aboutme: specificUser.aboutme,
    city: specificUser.city,
    website: specificUser.website,
  });
};
exports.follow = async (req, res) =>{
  const session = driver.session();
  const u  = req.params;
  const id1 = u.id
  const id2  = req.body.id2;
  
  const user1 =  await User.findById(id1);
  const user2 =  await User.findById(id2);
  const username1 = user1.username;
  
  const username2 =  user2.username;
  console.log(username1,username2)

  session
  .run(
    "MATCH (a:Person), (b:Person) WHERE a.name = $username1 AND b.name =  $username2 MERGE (a)-[: Follows {created_at: TIMESTAMP()}]->(b) ",
    {
      username1: username1,
      username2: username2,
    }
  )
  .then(() => {

    session.close(() => {
      console.log(` Followed`);
    });
  });
res.status(200).send(`$username1 followed $username2`)
}
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
}


exports.adminBoard = async (req, res) => {
  const users =  await User.find( {},
    
    {username:1,
    email:1,
    firstname:1,
    lastname:1,
  active:1})
   

  res.status(200).send({ users });
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
}

exports.searchuser=(req,res) => {
  const session = driver.session();
  const id = req.params.id
  const keyword = req.body.keyword

  session
  .run(
    `MATCH (p:Person {idm: $id})-[:Follows]->(following) WITH "(" + apoc.text.join( collect(following.idm), ' OR ') + ")^2" AS queryPart CALL db.index.fulltext.queryNodes('findperson', 'fullname: $keyword idm: ' + queryPart) YIELD node, score RETURN node.idm as userid, node.fullname as username, score`,
    {
      id: id,
      keyword:keyword ,
    }
  )
  .then(result => {
    const commentarray =[];
    result.records.forEach(record => {
        commentarray.push({
            userid: record._fields[0],
            username: record._fields[1],
            score: record._fields[2],
        })
    })

    res.send(commentarray)
  })
  .catch(error => {
    console.log(error)
  })
  .then(() => {

    session.close(() => {
      console.log(` Followed`);
    });
  });
}

//posts
// ` MATCH (p:Person) WHERE p.fullname = "Donald Trump" MATCH (p)-[:Wrote]->(post) WITH collect(post.pidm) AS myposts WITH "(" + apoc.text.join(myposts , " OR ") + ")^2" AS str CALL db.index.fulltext.queryNodes('searchposts', 'title: visa pidm: ' + str) YIELD node, score RETURN node.pidm, node.title, score`
 // users
 //     ` MATCH (p:Person {fullname: 'Dinesh Chugtai'})-[:Follows]->(following) WITH "(" + apoc.text.join( collect(following.idm), ' OR ') + ")^2" AS queryPart CALL db.index.fulltext.queryNodes('findperson', 'fullname: monica idm: ' + queryPart) YIELD node, score RETURN node.idm, node.fullname, score`,
//  MATCH (p:Person)
//  WHERE p.idm= "5edf426bf327d8954b13fb63"
//  MATCH (p)-[:Wrote]->(post)
//  WITH collect(post.pidm) AS myposts
//  WITH "(" + apoc.text.join( myposts, " , " ) + ")^1" AS queryPart 
//  CALL db.index.fulltext.queryNodes('posts', 'title: uk  visa  p.idm: ' + queryPart)
//  YIELD node, score 
//  RETURN node.pidm, node.title, score as totalscore, queryPart
//  order by totalscore desc