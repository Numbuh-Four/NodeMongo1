(function (homeController)
{
    var data = require("../data");

    homeController.init = function (app) {
        app.get("/", function (req, res) {

            data.getNodeCategories(function (err, result){

                res.render("index", {
                    title: "Express + vash + controller",
                    error: err,
                    categories: result,
                    newUserError: req.flash("newUser")
                });
        });
        });

        app.post("/newUser", function (req, res) {
            var userName = req.body.userName;
            var email = req.body.email;
            var name = req.body.name;
            data.createNewUser(userName,email,name, function (err) {
                if (err) {
                    req.flash("newUser", err);
                    res.redirect("/");
                }
                else
                {
                    res.redirect("/");
                }
            });

            });
       
    };

   
    

})(module.exports);