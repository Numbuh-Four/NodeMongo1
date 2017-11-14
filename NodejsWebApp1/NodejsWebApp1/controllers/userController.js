(function (userController) {
    var data = require("../data");

    userController.init = function (app) {

        app.get("/api/users/:userName", function (req, res) {

            var user = req.params.userName;
            data.GetUsers(user, function (err, usernm) {

                if (err)
                {
                    res.send(400, err);
                }
                else {
                    res.set("Content-Type", "application/json");
                    res.send(usernm);
                }

            });            
        });



        app.get("/api/users", function (req, res) {
            
            data.GetUsers("", function (err, usernm) {

                if (err) {
                    res.send(400, err);
                }
                else {
                    res.set("Content-Type", "application/json");
                    res.send(usernm);
                }

            });
        });



        app.post("/api/users/:userName", function (req, res) {
            var user = req.params.userName;

            var user = req.params.userName;
            var userToInsert = {
                id: req.body.id,
                name: req.body.name,
                username:req.body.username,
                email :req.body.email
            };

            data.addUser(user, userToInsert, function (err) {

                if (err) {
                    res.send(400, "Failed to save user");
                }
                else
                {
                    res.set("Content-Type", "application/json");
                    res.send(201, userToInsert);
                }
            });

        });
    };
})(module.exports);