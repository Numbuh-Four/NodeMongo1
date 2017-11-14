(function (data) {

    var seedData = require("./seedData");
    var seedDataTodo = require("./seedDataTodo");
    var database = require("./database");

    //Get data with filters
    data.getNodeCategories = function (next) {
        database.getDB(function (err, db) {
            if (err)
            { next(err, null); }
            else
            {
                //db.users.find({ id: { $gt: 2 } })
                db.users.aggregate([{ $lookup: { from: "todo", localField: "id", foreignField: "userId", as: "tasks" } }]).toArray(function (err, res) {
                    if (err)
                    { next(err, null); }
                    else
                    { next(null, res);}
                });
            }
        });
        //next(null, seedData.InitalNotes);
    };


    //Get tasks all
    data.getTasks = function (next) {
        database.getDB(function (err, db) {
            if (err)
            { next(err, null); }
            else {
                db.todo.find({}).toArray(function (err, res) {
                    if (err)
                    { next(err, null); }
                    else
                    { next(null, res); }
                });
            }
        });
    };

    //Get user details from UserId
    data.getUserDetails = function (userName,next) {
        database.getDB(function (err, db) {
            if (err)
            { next(err, null); }
            else {
                //db.users.findOne({ username: userName }
                db.users.aggregate([{ $lookup: { from: "todo", localField: "id", foreignField: "userId", as: "tasks" } }, { $match: { "username": userName } }], function (err, res) {
                    if (err) {
                        console.log("Error fetching user details. " + userName);
                    }
                    else if (res.length == 0)
                    {
                        next("No deatils found for user :" + userName, null);
                    }
                    else
                    { next(null,res[0]);}
                });
            }
        });
        //next(null, seedData.InitalNotes);
    };


    //GetUser API Function
    data.GetUsers = function (userName, next) {
        database.getDB(function (err, db) {
            if (err)
            { next(err, null); }
            else {
                if (userName) {
                    db.users.findOne({ username: userName }, next);
                }
                else
                {
                    db.users.find({}).toArray(function (err, res) {
                        if (err)
                        { console.log("error in get api"); }
                        else
                        { next(res); }
                    });
                }
            }
        });
    };

    //Save user API Function
    data.addUser = function (user, userToInsert, next) {
        database.getDB(function (err, db) {
            if (err)
            { next(err, null); }
            else {
                db.users.insert(userToInsert, function (err) {
                    if (err) { next(err); }
                    else { next(null); }
                });
            }
            });
    };
    
    //Save user
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

    //Seed DB
    function seedDatabase()
    {
        database.getDB(function (err,db) {

            if (err)
            {
                console.log("Database seeding failed : " + err);
            }
            else
            {
                //Seed user DB
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
                        { console.log("user DB already seeded"); }
                    }
                })

                //Seed Todo db
                db.todo.count(function (err, count) {
                    if (err) {
                        console.log("Count returned error : " + err);
                    }
                    else {
                        if (count == 0) {
                            { console.log("Seeding todo DB...."); }
                            seedDataTodo.InitialData.forEach(function (itm) {
                                db.todo.insert(itm, function (err) {
                                    if (err) { console.log("error inserting item." + err); }
                                });
                            });

                            console.log("DB seeding finished.");
                        }
                        else
                        { console.log("todo DB already seeded"); }
                    }
                })
            }
        });
    }

    seedDatabase();

})(module.exports);