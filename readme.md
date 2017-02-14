<!-- using shields.io for status buttons -->
![Programming Language](https://img.shields.io/badge/Language-Javascript-black.svg)
![Version](https://img.shields.io/badge/Version-v1-blue.svg)


#Chaos Game using WebGL
CSCE 4230 - Computer Graphics, Assignment 1

##Assignment
Write a WebGL program that implements Michael Barnsley's [Chaos Game](https://en.wikipedia.org/wiki/Chaos_game) using [Matsuda and Lea](https://sites.google.com/site/webglbook/)'s textbook example [HelloPoint2](http://rodger.global-linguist.com/webgl/ch02/HelloPoint2.html) as a template.

##Notes
Took me a while to figure out how to insert the new vertices into the buffer for them to be drawn. Also, I used normal js arrays to create and manipulate the data before I needed to convert it to a Float32 array to be read by webgl.

##Demo
The implementation created a [Sierpinski Triangle](https://en.wikipedia.org/wiki/Sierpinski_triangle) and can be viewed [here](http://manuelvargas.me/ChaosGame-WebGL/).
