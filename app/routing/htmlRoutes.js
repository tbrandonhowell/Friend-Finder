const path = require("path");

module.exports = function(app) {

    app.get("/:whatever?", function(req,res) {
        if (req.params.whatever === "survey") {
            res.sendFile(path.join(__dirname, "../public/survey.html"));
        } else {
            res.sendFile(path.join(__dirname, "../public/home.html"));
        }
    });

}
