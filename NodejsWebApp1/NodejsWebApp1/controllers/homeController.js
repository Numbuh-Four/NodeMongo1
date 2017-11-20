(function (homeController)
{
    var data = require("../data");

    homeController.init = function (app) {

        //Get home page data
        app.get("/", function (req, res) {
            data.getNodeCategories(function (err, result){

                res.render("index", {
                    title: "Users",
                    error: err,
                    categories: result,
                    newUserError: req.flash("newUser"),
                    user : req.user
                });
        });
        });

        //Get all the tasks
        app.get("/tasks", function (req, res) {

            data.getTasks(function (err, result) {

                res.render("tasks", {
                    title: "Tasks",
                    error: err,
                    tasks: result,
                    newUserError: req.flash("newUser")
                });
            });
        });

        //Get user data
        app.get("/userDetail/:username", function (req, res) {

            var user = req.params.username;

            data.getUserDetails(user,function (err, result) {

                res.render("userDetail", {
                    title: "User Details",
                    error: err,
                    user: result,
                    newUserError: req.flash("newUser")
                });
            });
        });

        //Get user tasks
        app.get("/Tasks/:username", function (req, res) {

            var user = req.params.username;

            data.getUserDetails(user, function (err, result) {

                res.render("userTasks", {
                    title: "Tasks",
                    error: err,
                    user: result,
                    newUserError: req.flash("newUser")
                });
            });
        });

        app.get("/notes/:username", function (req, res) {
            var user = req.params.username;

            res.render("notes", {"title":user});
        });

        //app.get("/register", function (req, res) {

        //    res.render("register", {
        //        title: "Register"
        //    });
        //});

        //Create new User
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

        //Update task
        app.post("/updateTask/:id", function (req, res) {
            var taskId = parseInt( req.params.id);
            data.updateTask(taskId,  function (err) {
                if (err) {
                    req.flash("newUser", err);
                    res.redirect("/");
                }
                else {
                    res.redirect("back");
                }
            });

        });

        //delete task
        app.post("/deleteTask/:id", function (req, res) {
            var taskId = parseInt(req.params.id);
            data.deleteTask(taskId, function (err) {
                if (err) {
                    req.flash("newUser", err);
                    res.redirect("/");
                }
                else {
                    res.redirect("back");
                }
            });

        });
       
    };

   
    

})(module.exports);