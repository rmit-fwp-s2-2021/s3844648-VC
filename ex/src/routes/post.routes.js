module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Select all comments from a user.
  router.get("/select/:username", controller.byUser);

  // Create a new post.
  router.post("/", controller.create);

  // Add routes to server.
  app.use("/api/posts", router);
};
