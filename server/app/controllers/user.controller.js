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
// exports.userconfirmation = async (req, res) => {
//   await User.updateOne(
//     { username: req.params.username,
//       secrettoken:req.params.token
    
//     },
//     const user = await User.fi(username)
//     {
//       $set: {
//         active: true
//       },
//     }
//   );
// // http://our.api.com/Product?id=101404&id=7267261
//   res.send("User was updated successfully!");
// };
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