//--------------------------------------------------
// Photo-booth service
// by: Alexander Terczka <alex@mail.at>
//--------------------------------------------------

var express = require('express');
var app = express();

var port = 8082;

//
// ----  API URLs
//
    app.get("/capture",function(req,res) {
        // TODO: Capture a photo using die capture shell script
	// and send it to the browser
        res.send("Captured");
    });

    app.get("/images.json",function(req,res) {
        // TODO: send images list to browser
        res.send("images.json");
    });

    app.get("/new.images.json",function(req,res) {
        // TODO: browser asks what images to show
	// server answers delayed (long polling) when nothing changed
        res.send("new.images.json");
    });

//
// ---- Client Libraries
//
    app.use("/jquery",express.static('node_modules/jquery/dist/'));

//
// ----  serve static files from "htdocs" files
//
    app.get('/', function (req, res) {
        res.sendFile(__dirname+"/htdocs/index.html");
    });

    app.use(express.static('htdocs'));

// 
// ---- GO!
// 
app.listen(port, function () { console.log("Photo-booth service listening on port "+port+"!"); });
