// /** @format */

// const cors = require("cors");

// const whitelist = new Set(["http://localhost:3000"]);
// const corsOptions = {
// 	optionsSuccessStatus: 200,
// 	origin: function (origin, callback) {
// 		if (whitelist.has(origin)) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error("Not allowed by CORS"));
// 		}
// 	},
// 	credentials: true,
//     allowedHeaders: "Content-Type, Authorization, X-Requested-With",
//     exposedHeaders: 'Set-Cookie'
// };

// module.exports = cors(corsOptions);
