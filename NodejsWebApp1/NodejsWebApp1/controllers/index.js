(function (controllers) {

    var homeController = require("./homeController");
    var testController = require("./testController");

    controllers.init = function (app)
    {
        homeController.init(app);
        testController.init(app);
    };

})(module.exports);