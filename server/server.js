/** @format */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const corsMiddleware = require("./app/middlewares/cors");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// require('dotenv').config();

//REDIS SETUP
const session = require("./app/middlewares/session");
app.use(cookieParser());
app.use(session);

//CORS logic
// app.options("*", corsMiddleware);
// app.use(corsMiddleware);

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//app.use(cors());

// swagger definition
const swaggerOptions = {
	swaggerDefinition: {
		components: {},
		info: {
			title: "Blog MIA API",
			description:
				"A brief intoduction to all the endpoints available fo this particular Project.",
			contact: {
				name: "Amazing Developer",
			},
			servers: ["http://localhost:5000"],
		},
	},
	// ['.routes/*.js']
	apis: ["./app/routes/*.routes.js", "./app/models/*.model.js"],
};

// initialize swagger-jsdoc

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
	.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
		// user:process.env.DB_USER,
		// pass:process.env.DB_PWD,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connect to MongoDB.");
		initial();
	})
	.catch((err) => {
		console.error("Connection error", err);
		process.exit();
	});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/config/neo4j.coinfig");
// const driver = require("./app/config/neo4j.coinfig");
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: "user",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'user' to roles collection");
			});

			new Role({
				name: "moderator",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'moderator' to roles collection");
			});

			new Role({
				name: "admin",
			}).save((err) => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'admin' to roles collection");
			});
		}
	});
}
