
// TODO: need to move this to friends.js
let friends = [
    {
        "name":"Ahmed",
        "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        "scores":[
            5,
            1,
            4,
            4,
            5,
            1,
            2,
            5,
            4,
            1
            ]
    }
]



// baselines
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;


// standard routing
// TODO: move this to the routing js files
app.get("/:whatever?", function(req,res) {
    if (req.params.whatever === "survey") {
        res.sendFile(path.join(__dirname, "/public/survey.html"));
    } else {
        res.sendFile(path.join(__dirname, "/public/home.html"));
    }
});


// api GET routing
app.get("/api/friends", function(req,res) {
    res.send("<h1>This is the API GET route</h1>");
});

// if a post request is involved, you have to teach express to handle the post requests
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// POST routing
app.post("/api/friends", function(req,res) {
    console.log("We received a post");
    // get the data that was sent
    const data = {
        name: req.body.name,
        photo: req.body.image,
        scores: [
            parseInt(req.body.q1),
            parseInt(req.body.q2),
            parseInt(req.body.q3),
            parseInt(req.body.q4),
            parseInt(req.body.q5),
            parseInt(req.body.q6),
            parseInt(req.body.q7),
            parseInt(req.body.q8),
            parseInt(req.body.q9),
            parseInt(req.body.q10)
        ]
    };
    console.log(data);
    friends.push(data);
    console.log("friends array:");
    console.log(friends);
    // comparison logic
    let closestScore;
    let closestName;
    let closestPhoto;
    // TODO: scoping issue here. closestScore/Name/Photo aren't being touched.
    for (let i = 0; i<friends.length; i++) {
        let scoreDiff;
        for (let x = 0; x<friends[i].scores.length; x++) {
            scoreDiff += Math.abs(friends[i].scores[x] - data.scores[x]);
        }
        if (closestScore = undefined) {
            closestScore = scoreDiff;
            closestName = data.name;
            closestPhoto = data.photo;
        } else if (scoreDiff < closestScore) {
            closestScore = scoreDiff;
            closestName = data.name;
            closestPhoto = data.photo;
        }
    }
    // this is what we send back:
    res.json({
        responseMessage: 'We received your data.',
        matchScore: closestScore,
        matchName: closestName,
        matchPhoto: closestPhoto
    });
});


// listener:
app.listen(PORT, function() {
    console.log("Listening on port " + PORT);
})