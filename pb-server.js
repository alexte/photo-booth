//--------------------------------------------------
// Photo-booth service
// by: Alexander Terczka <alex@mail.at>
//--------------------------------------------------

// --- settings
var slideshowdir = "images/slideshow/";
var inactive_slideshowdir = "images/inactive_slideshow/";
var port = 8082;

// --- requires
var fs = require('fs');
var express = require('express');
var exec = require('child_process').exec;

var app = express();

function read_slideshow_dir(dir,callback)
{
    fs.readdir(dir,function (err,files) {
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
        read_slideshow_dir(slideshowdir,function (data) { res.send(data); });
    });

    app.get("/inactive.images.json",function(req,res) {
        read_slideshow_dir(inactive_slideshowdir,function (data) { res.send(data); });
    });

    app.get("/deactivate",function(req,res) {
	var img=req.query.img;
	if (img.match("^[a-zA-Z0-9][a-zA-Z.0-9_-]+$")==null) { res.send("invalid filename"); return; }
	fs.renameSync(slideshowdir+img,inactive_slideshowdir+img);
  	res.send("OK");
    });

    app.get("/reactivate",function(req,res) {
	var img=req.query.img;
	if (img.match("^[a-zA-Z0-9][a-zA-Z.0-9_-]+$")==null) { res.send("invalid filename"); return; }
	fs.renameSync(inactive_slideshowdir+img,slideshowdir+img);
  	res.send("OK");
    });
//
// ---- Client Libraries
//
    app.use("/jquery",express.static('node_modules/jquery/dist/'));

//
// ----  serve static files from "htdocs" files
//
    app.get('/', function (req, res) { res.sendFile(__dirname+"/htdocs/index.html"); });
    app.get('/admin', function (req, res) { res.sendFile(__dirname+"/htdocs/admin.html"); });

    app.use(express.static('htdocs'));
    app.use("/images",express.static('images/slideshow/'));
    app.use("/inactive-images",express.static('images/inactive_slideshow/'));

//
// ---- Startup
//


// 
// ---- GO!
// 
    app.listen(port, function () { console.log("Photo-booth service listening on port "+port+"!"); });
