// baselines
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

// if a POST request is involved, you have to teach express to handle the post requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// get the routes
require("./routing/apiRoutes.js")(app);
require("./routing/htmlRoutes.js")(app);

// listener:
app.listen(PORT, function() {
    console.log("Listening on port " + PORT);
})