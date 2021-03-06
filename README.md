

# Description - 
The City Blog is a social media application focusing on the particular geographical location i.e. a city. The application focuses on linking the community of a city together. This application is for the community of international students arriving in Deutschland for their education or job. This application focuses on solving their common issues which almost everyone faces and forms a community. This will help the university administrative staff to reduce the load. End-Users can Follow other Users, Create, Comment, and Like Posts and many other things that are present on the application. Another user would be an administrator who can upload some static information/ news and has the right to moderate the content of the post on the application and it has the power to remove and update the user status.

For this project, we are using NodeJS for server, ReactJS for Client. MongoDB, Neo4j and Redis as our polyglot persistence.
 

# Installation Steps - 
Installation steps - 

1. Download or clone the repository from - 
	
2. Two strategies to run and up the project. 

      i. If you have docker installed on your machine then just build the containers using 
      the terminal by going to the project root directory and 
      running this command 
      ` docker-compose build  ` after the build is complete ` docker-compose up. ` 
      in the same terminal to run the project.

      ii. If docker is not available you can just execute the command 
      `   npm install ` in both the folders Client/Blogui and Server.
          npm install will take the dependencies from the package.json file.

            a. Go to server/app/config/db.config.js and change the  HOST from  ‘mongo ’ to ‘localhost’. 
            b. After it is complete then just ` npm start ` in Client/Blogui and Server folder.
            c. Kindly make sure that you have mongodb-community version installed on your local machine and
                is running on port 27017. Redis on 6379 and Neo4j on 7474,7687
		
3. The project utilizes 3 ports as follows 
    PORT 3000 - Frontend 
    PORT 5000 - Backend
    PORT 27017 - MongoDB
    PORT 7474/7687 - Neo4j
    PORT 6379 - Redis


4. Go to the browser and Check out the http://localhost:3000/ for the frontend.
When installed the database will be empty so for testing purposes, there is a dummy data in the JSON format in the Dummy Data folder with the files - users.json and posts.json. Import the data into your local MongoDB collections accordingly.


6. Based upon the roles the frontend behaviour changes as admin gets 
    another functionality which can disable the users logging into the system.

7. One can also make a user role to admin by manually entering the role ID of admin 
  in the array of roles[] of that particular object in the user collection. 

