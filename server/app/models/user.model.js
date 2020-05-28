/**
 * @swagger
 *  definitions:
 *      users:
 *        type: object
 *        required:
 *          - title
 *          - content
 *          - user
 *          - author
 *        properties:
 *          
 *          title:
 *              type: string
 *              format: email
 *              description: Email for the user, needs to be unique.
 *          content:
 *              type: string
 *              format: email
 *              description: Email for the user, needs to be unique.
 *          user:
 *              type: string
 *              format: email
 *              description: Email for the user, needs to be unique.
 *          author:
 *              type: string
 *              format: email
 *              description: Email for the user, needs to be unique.
 *          date:
 *              type: string
 *              format: email
 *              description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
 
 
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    secrettoken:String,
    active: Boolean,
    gender: String,
    password: String,
    aboutme: String,
    city: String,
    website: String,
    posts : [
      {type: mongoose.Schema.Types.ObjectId,ref:'Posts'}
  ],

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  });

module.exports = mongoose.model('User', UserSchema);
