 const session = require('express-session');
 const connectRedis = require("connect-redis");
 const redisClient = require("../config/redis.config"); 
 const redisStore = connectRedis(session);

 module.exports = session({
    name: "sid",
    store: new redisStore({ client: redisClient }),
    secret: "9~[Z/kk%s~5AK~Dx",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // TWO HOURS
        sameSite: true,
        secure: false,
        httpOnly: true,
    },
}) 