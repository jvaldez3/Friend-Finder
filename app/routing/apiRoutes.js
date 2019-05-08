var friends = require("../data/friends.js")

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends)
    })

    app.post("/api/friends", function (req, res) {
        var match = {
            name: "",
            photo: "",
            compare: 100
        };

        var data = req.body;
        var friendScore = data.scores;
        var friendName = data.name;
        var friendPhoto = data.photo;

        var scoreDiff = 0;

        for (var i = 0; i < friends.length - 1; i++) {
            console.log(friends[i].name);
            scoreDiff = 0;

            for (var j = 0; j < 10; j++) {
                scoreDiff += Math.abs(parseInt(friendScore[j]) - parseInt(friends[i].scores[j]));
                if (scoreDiff <= match.compare) {
                    match.name = friends[i].name;
                    match.photo = friends[i].photo;
                    match.compare = scoreDiff;
                }
            }
        }
        friends.push(data);
        res.json(match);
    })
}