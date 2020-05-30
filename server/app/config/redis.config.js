const redis = require("redis");

const redisClient = redis.createClient({
	port: 6379,
	host: "localhost",
});

redisClient.on('connect', function() {
    console.log('Successfully connect to Redis');
  });
  redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
  });

module.exports = redisClient;