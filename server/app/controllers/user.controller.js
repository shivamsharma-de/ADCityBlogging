const User = require("../models/user.model");

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