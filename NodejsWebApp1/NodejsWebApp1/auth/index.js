(function (auth) {
    var data = require("../data");
    var hasher = require("./hashfile");
    var passport = require("passport");
    var localStrategy = require("passport-local").Strategy;


    function authUser(username, password, next)
    {
        data.getCredentials(username, function (err, user) {
            if (!err && user)
            {
                var testHash = hasher.computeHash(password, user.salt);
                if (testHash === user.passwordHash)
                {
                    next(null, user);
                }
            }
            next(null, false, {message:"Invalid Credentials."});

        }); 
    }

    auth.init = function (app)
    {
        passport.use(new localStrategy(authUser));
        passport.serializeUser(function (user, next) {
            var r = user.Username;
            next(null, user.Username);
        });

        passport.deserializeUser(function (key, err) {
            data.getCredentials(key, function (err, user) {
                if (err) {
                    next(null, false, { message: "user not found." });
                }
                else
                {
                    next(null, user);
                }
            });            
        });
        app.use(passport.initialize());
        app.use(passport.session());

        app.get("/login", function (req, res) {
            res.render("login", { "title": "Login" });
        });

        app.post("/login", function (req, res, next) {
            var authFunction = passport.authenticate("local", function (err, user, info) {
                if (err)
                { next(err); }
                else
                {
                    req.logIn(user, function (err) {
                        if (err)
                        { next(err); }
                        else
                        {
                            res.redirect("/");
                        }
                    });
                }
            });
            authFunction(req, res, next);
        });

        app.get("/register", function (req, res) {
            res.render("register", {
                "title": "Registration", "message": req.flash("Registration Error") });
        });

        app.post("/register", function (req, res) {

            var salt = hasher.createSalt();

            var cred = {
                 uname : req.body.username,
                 email : req.body.email,
                 passwordHash : hasher.computeHash(req.body.password,salt),
                 salt : salt
            };
        

            data.addCredentials(cred, function (next) {
                if (next) {
                req.flash("Registration Error", "Could not save data");
                res.redirect("/register");
            }
            else
            {
                res.redirect("/login")
            }
            });
        });
    }
})(module.exports)