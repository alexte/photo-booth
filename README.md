Photo Booth
============

A software to make a photo booth from a DSLR, a gamepad and a Linux box.

Happy Birthday Barbara!

I made this software for the birthday party of Barbara in February 2017.

Quick Howto
-----------

Setup a Linux box with nodejs, gphoto2, Chromium browser and "convert" from ImageMagick, .

Connect the following gear to the Linux box:

- a Canon DSLR. I tested with Canon 100D
- a 1080 display.

Optional:

- a Linux compatible webcam. I tested with "Logitech HD Pro Webcam C920"
- a Joystick/Gamepad. I tested with "Speed-Link Competition Pro"

Pull all needed dependencies using npm

```
npm install
```

Check if you camera works with gphoto2

```
gphoto2 --capture-image-and-download --auto-detect --filename=testimage.jpg
```

Start the pb-server.js server process in background:

```
nodejs pb-server.js
```

Open the browser and go to http://localhost:8082/
Use the joystick/gamepad buttons or a keyboard to active the webcam (viewfinder) and camera.
SPACE or left button opens/closes viewfinder and ENTER or right button captures a photo.

With Gphoto2 version 2.5.20 a Canon EOS camery can be used as both webcam and photo camera. 
pb-server.js runs "gphoto2 ---capture-movie ... | ffmpeg ..." for this. 
Every time the capture button is triggered this services is stopped 
and restarted afterwards. Chromium might use this simulated or any other webcam, 
as viewfinder. 

Long Howto
----------

Not written yet...

File an issue, or fork me on github if you need more infos.

Pitfalls
--------

Chrome does not activate the webcam, because Google thinks http://localhost is not secure enough, and 
they insist on https. Really Google ? So you have to use chromium, or use https with a real certificate
for https://localhost/ ;-)

This gphoto2/ffmpeg simulated webcam needs a module called v4l2loopback.
For chromium to find this "webcam" I had to load this module with:

```
modprobe v4l2loopback exclusive_caps=1
```

You might want to deactivate the screen blanker, the mouse cursor, and the camera auto shutdown.

Security
---------

None! 

Don't use this on a public accessible IP address. It even works disconnected after install.

