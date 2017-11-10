(function (testController) {
    testController.init = function (app) {
        app.get("/test", function (req, res) {
            res.render("index", { title: "test Controller" });
        });
    };


})(module.exports);