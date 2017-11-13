(function (data) {

    var seedData = require("./seedData");
    var database = require("./database");
    data.getNodeCategories = function (next) {
        database.getDB(function (err, db) {
            if (err)
            { next(err, null); }
            else
            {
                db.users.find({ id: { $gt: 2} }).toArray(function (err, res) {
                    if (err)
                    { next(err, null); }
                    else
                    { next(null, res);}
                });
            }
        });
        //next(null, seedData.InitalNotes);
    };

    //data.getMaxID = function (next) {
    //    database.getDB(function (err, db) {
    //        if (err)
    //        { next(err, null); }
    //        else {
    //            db.users.find({ id: { $gt: 5 } }).toArray(function (err, res) {
    //                if (err)
    //                { next(err, null); }
    //                else
    //                { next(null, res); }
    //            });
    //        }
    //    });
    //};

    data.createNewUser = function (userName,email, name, next) {

        database.getDB(function (err, db) {
            if (err)
            { next(err, null); }
            else {
                //db.users.findOne({ $query: { sort: {id:1}, limit:1 } }, function (err, res){
                var re = db.users.findOne({},{sort:[["id",-1]]}, function (err, res){

                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(res.name);

                        db.users.find({ username: userName }).count(function (err, count) {

                            if (err)
                            { next(err); }
                            else {
                                if (count != 0)
                                { next("Username exists"); }
                                else {
                                    var user = {
                                        id: res.id + 1,
                                        name: name,
                                        username: userName,
                                        email: email
                                    };

                                    db.users.insert(user, function (err) {
                                        if (err) { next(err); }
                                        else { next(null); }
                                    });

                                }

                            }
                        });                      
                        
                    }
                });
            }
        });



       
    };
    //    });
    //};

    function seedDatabase()
    {
        database.getDB(function (err,db) {

            if (err)
            {
                console.log("Database seeding failed : " + err);
            }
            else
            {
                db.users.count(function (err, count) {
                    if (err) {
                        console.log("Count returned error : " + err);
                    }
                    else
                    {
                        if (count == 0) {
                            { console.log("Seeding DB...."); }
                            seedData.InitalNotes.forEach(function (itm) {
                                db.users.insert(itm, function (err) {
                                    if (err) { console.log("error inserting item." + err); }
                                });
                            });

                            console.log("DB seeding finished.");
                        }
                        else
                        { console.log("DB already seeded"); }
                    }
                })
            }
        });
    }

    seedDatabase();

})(module.exports);