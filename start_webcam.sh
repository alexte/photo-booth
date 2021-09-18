#!/bin/bash

gphoto2 --capture-movie --stdout | ffmpeg -loglevel error -i - -vcodec rawvideo -pix_fmt yuv420p  -f v4l2 /dev/video0

