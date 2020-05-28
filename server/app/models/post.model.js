
/**
 * @swagger
 *  definitions:
 *      Posts:
 *        type: object

 *        properties:
 *         
 *          title:
 *              type: string
 *           
 *              description: Title for the post.
 *          content:
 *              type: string
 *              
 *              description: Content inside the post.
 *          user:
 *              type: string
 *             
 *              description: Object ID reference to User Model
 *          author:
 *              type: string
 *            
 *              description: username by which the post is added.
 *          date:
 *              type: date
 *             
 *              description: Automatically add the timestamp.
*        example:
 *          title: This is the dummy post for swagger api documentation.
 *          content: Dont have content for this.
 *          user: 5ea3209a68b1cbb8071fbe32
 *          author: shivam
 *          date: date
 *        required:
 *          - title
 *          - content
 *          - user
 *          - author
 *              
 */               
const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
  
    title: String, 

    content: String,
        
   
     user :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      
  
    },
    author :{
      type:String,
      
    },
    date: {
        type: Date,
        default:Date.now() 
     },


});


module.exports = mongoose.model('Posts', PostSchema);
