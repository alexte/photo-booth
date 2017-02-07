//--------------------------------------------------
// Photo-booth service
// by: Alexander Terczka <alex@mail.at>
//--------------------------------------------------

// --- settings
var slideshowdir = "images/slideshow/";
var port = 8082;

// --- requires
var fs = require('fs');
var express = require('express');
var exec = require('child_process').exec;

var app = express();

function read_slideshow_dir(callback)
{
    fs.readdir(slideshowdir,function (err,files) {
	if (err) { throw new Error(err); }
	callback(files);
    });
}

//
// ----  API URLs
//
    app.get("/capture",function(req,res) {
        // Capture a photo using die capture shell script
	// and send the name to the browser or error text
        exec('./capture-photo.sh', function (error, stdout, stderr) {
  	    if (error) res.send({error: "Capture Script Fehler"});
  	    else if (stdout.trim()=="ERROR") res.send({error: "Kamera Fehler"});
  	    else res.send({image:stdout.trim()});
	});
    });

    app.get("/images.json",function(req,res) {
        read_slideshow_dir(function (data) { res.send(data); });
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
    app.use("/images",express.static('images/slideshow/'));

//
// ---- Startup
//


// 
// ---- GO!
// 
    app.listen(port, function () { console.log("Photo-booth service listening on port "+port+"!"); });
