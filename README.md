Photo Booth
============

A software to make a photo booth from a DSLR, a webcam, a gamepad and a Linux box.

Quick Howto
-----------

Setup a Linux box with nodejs, gphoto2, Chromium browser and "convert" from ImageMagick, .

Connect the following gear to the Linux box:

- a Canon DSLR. I tested with Canon 100D
- a Linux compatible webcam. I tested with "Logitech HD Pro Webcam C920"
- a Joystick/Gamepad. I tested with "Speed-Link Competition Pro"
- a 1080 display.

Start the pb-server.js server process in background:

```
nodejs pb-server.js
```

Open the browser and go to http://localhost:8082/
Use the joystick/gamepad buttons to active the webcam (viewfinder) and camera.

Long Howto
----------

Not written yet...

File an issue, or fork me on github if you need more infos.

Pitfalls
--------

Chrome does not activate the webcam, because Google thinks http://localhost is not secure enough, and 
they insist on https. Really Google ? So you have to use chromium, or use https with a real certificate
for https://localhost/ ;-)

You might want to deactivate the screen blanker, and the camera auto shutdown.

Security
---------

None! 

Don't use this on a public accessible IP address. It even works disconnected after install.

