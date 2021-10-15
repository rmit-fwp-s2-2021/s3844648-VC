module.exports = (express, app) => {
  const controller = require("../controllers/follow.controller.js");
  const router = express.Router();

  // Follow
  router.post("/", controller.create);

  // Unfollow
  router.delete("/delete", controller.delete);

  // Add routes to server.
  app.use("/api/follows", router);
};
