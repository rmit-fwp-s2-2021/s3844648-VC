//import the express package.
const express = require("express");
const cors = require("cors");
const db = require("./src/database");

//Database will be synced in the background
db.sync();

const app = express();

//Add CORS support
app.use(cors());

//Parse requests of content-type
app.use(express.json());

// add routes
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
