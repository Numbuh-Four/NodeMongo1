(function (database)
{
    var mongo = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/theBoard";//mongodb://localhost:27017/mydb
    var theDB = null;

    database.getDB = function (next) {
        if (!theDB)
        {
            mongo.MongoClient.connect(mongoUrl, function (err, db) {
                if (err)
                {
                    console.log(err);
                    throw err;//next(err, null);
                }
                else {
                    theDB = {
                        db: db,
                        users: db.collection("users"),
                        todo: db.collection("todo")
                    };
                    next(null, theDB);
                }
            });
        }
        else
        {
            next(null, theDB);
        }
    }
})(module.exports)