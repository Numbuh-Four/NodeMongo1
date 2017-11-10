var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");
var bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "vash");
app.use(express.static(__dirname + "/public"));         
controllers.init(app);



var server = http.createServer(app);
//var server = http.createServer(function (req, res)
//{
//    console.log(req.url);
//    res.write("<html><body><h2> hello "+ req.url + "</h2></body></html>");
//    res.end();
//}
//);

console.log("hello1");
server.listen(3000);