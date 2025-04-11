#!/bin/bash

filename="snap-"`date +'%F-%H%M%S'`".jpg"

gphoto2 --keep --capture-image-and-download --auto-detect \
	--filename images/orig/$filename >> ~/capture.log 2>&1

if [ -e images/orig/$filename ]; then
   # echo "------------------ CAPTURE PHOTO OK"
   convert -geometry x1080 images/orig/$filename images/slideshow/$filename
   echo $filename
else
   # echo "------------------ CAPTURE PHOTO FAILED"
   echo "ERROR"
fi

exit
