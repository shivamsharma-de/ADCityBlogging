// const express = require('express');
const { verifySignUp } = require("../middlewares");
// const router = new express.Router;
// const User = require('../controllers/user.controller');
// const Post = require('../controllers/post.controller');

const controller = require('../controllers/posts.controller');

module.exports = function(app) {
/**
 * @swagger
 * paths:
 *  /api/test/posts:
 *    get:
 *      tags:
 *        - Posts
 *      description: Use to request all posts
 *      responses:
 *        '200':
 *          description: A successful response
 *        
 * 
 */
   
    app.get("/api/test/postsss", isLoggedin, controller.getPost);

/**
 * @swagger
 * paths:
 *  /api/test/createpost/{id}:
 *    post:
 *      summary: creates a new post
 *      tags:
 *        - Posts
 *      description: Enter the details for the post
 *      parameters:
 *          - in : path
 *            name: userId
 *            type: string
 *            required: true
 *            description: The user Id for the post
 *      model:
 *        type: object
 *        required:
 *            - title
 *            - content
 *        properties:
 *          title: 
 *            type: string
 *          content:
 *            type: string
 *        
 *      responses:
 *        '200':
 *          description: Successfully created Post
 *        
 * 
 */

  
    app.post("/api/test/createpost/:id", controller.submitPost);
/**
 * @swagger
 * paths:
 *  /api/test/posts/{postId}:
 *    get:
 *      tags:
 *        - Posts
 *      description: Returns a specific Post with maching object id
 *      parameters:
 *          - in : path
 *            name: postId
 *            type: string
 *            required: true
 *            description: ID of the post to get.
 *        
 *      responses:
 *        '200':
 *          description: Success Post Retrival
 *        
 * 
 */
    app.get(
        "/api/test/posts/:id", controller.specificPost
  
      );
  
    app.delete(
      "/api/test/deletepost/:id", controller.deletePost

    );

      app.put(
        "/api/test/updatepost/:id", controller.updatepost
  
      );
      /**
 * @swagger
 * paths:
 *  /api/find/{query}:
 *    get:
 *      tags:
 *        - Posts
 *      description: Returns matching posts with maching keyword entered. 
 *      parameters:
 *          - in : path
 *            name: query
 *            type: string
 *            required: true
 *            description: query string to fetch the results for author, title or content
 *        
 *      responses:
 *        '200':
 *          description: Success Post Retrival
 *        
 * 
 */


      app.post(
        "/api/test/comment", controller.createcomment
  
      );
      app.post(
        "/api/test/getcomments", controller.getcomments
  
      );
      app.post(
        "/api/test/likepost", controller.likepost
  
      );
      app.post(
        "/api/test/searchpost/:id", controller.searchpost
  
      );
  };