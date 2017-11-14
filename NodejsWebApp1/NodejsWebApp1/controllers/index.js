(function (controllers) {

    var homeController = require("./homeController");
    var testController = require("./testController");
    var userController = require("./userController");

    controllers.init = function (app)
    {
        homeController.init(app);
        testController.init(app);
        userController.init(app);
    };

})(module.exports);