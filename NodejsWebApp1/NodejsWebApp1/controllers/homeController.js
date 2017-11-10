(function (homeController)
{
    var data = require("../data");

    homeController.init = function (app) {
        app.get("/", function (req, res) {

            data.getNodeCategories(function (err, result){

            res.render("index", { title: "Express + vash + controller",error:err,categories:result });
        });
        });

        app.post("/newUser", function (req, res) {
            var userName = req.body.userName;
            data.createNewUser(userName, function (err) {
                if (err) { console.Log(err); res.redirect("/"); }
                else
                {
                    res.redirect("/");
                }
            });

            });
       
    };

   
    

})(module.exports);