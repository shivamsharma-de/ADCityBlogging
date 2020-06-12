/** @format */

const { verifySignUp } = require("../middlewares");
// const profileimg = require("../controllers/auth.controller");
const controller = require("../controllers/auth.controller");
const corsMiddleware = require("../middlewares/cors");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Set-Cookie"
		);
		res.header("Access-Control-Expose-Headers", "Set-Cookie");
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Methods", "*"); // enables all the methods to take place
		next();
	});

	app.post(
		"/api/auth/signup",
		[
			verifySignUp.checkDuplicateUsernameOrEmail,
			verifySignUp.checkRolesExisted,
		],
		controller.signup
	);
	// app.post(
	//   "api/auth/verification/:token/:username", controller.verifyemail

	// );
	app.patch("/api/auth/disable/:id", controller.deactivateuser);
	app.patch("/api/auth/activate/:id", controller.activateuser);
	app.post("/api/auth/signin", controller.signin);

	app.delete("/api/auth/signout", controller.signout);
};
