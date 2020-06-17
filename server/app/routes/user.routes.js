const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      // "x-access-token, Origin, Content-Type, Accept"
      " Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/specificuser/:id", controller.specificUser);

  app.get("/api/test/specificuserposts/:id", controller.postsByUser);
  app.put("/api/test/profileupdate/:id", controller.profileupdate);

  app.get("/api/test/user", [authJwt.authenticate], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.authenticate, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin/:id",
    [ authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/test/admin/users",
    [authJwt.authenticate, authJwt.isAdmin],
    controller.adminBoard
  );
  app.post("/api/test/follow/:id/:id2", controller.follow);
  app.post("/api/test/unfollow/:id/:id2", controller.unfollow);
  app.post("/api/test/searchuser/:id/:q", controller.searchuser);
};
