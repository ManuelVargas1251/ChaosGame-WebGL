/*
Manuel Vargas
Date 2/1/17
Due 2/8/17

Notes: lines 42-106 is where most of the program is. Any other modification are found outside such as point size but are marked. I used 'HelloPoint2' from Chapter 2 of Matsuda and Lea's textbook as a template.

MultiPoint.js (c) 2012 matsuda
*/
'use strict';

// Vertex shader program
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'void main() {\n' +
	'  gl_Position = a_Position;\n' +
	'  gl_PointSize = 1.0;\n' + 						//POINT SIZE
	'}\n';

// Fragment shader program
var FSHADER_SOURCE =
	'void main() {\n' +
	'  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n' + 	//POINT COLOR
	'}\n';

/***********************/
/**    Main - Draw    **/
/***********************/
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl);								//calling function
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.1, 0.2, 0.75, 1);				//CANVAS COLOR

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw three points
  gl.drawArrays(gl.POINTS, 0, n);
}

/***********************/
/** initVertexBuffers **/
/***********************/
function initVertexBuffers(gl) {
	/***********************/
	/**       Choas       **/
	/***********************/
	//original vertices; 3 points of the triangle
	var o_vertices = [0.0, 0.5, -0.5, -0.5, 0.5, -0.5];
	
	console.log("--beginning of chaos--");//console message
	
	//same original verts but these will be used to calculate midpoints
	var v1=[ 0.0,  0.5];
	var v2=[-0.5, -0.5];
	var v3=[ 0.5, -0.5];
	var p =[ 0.0,  0.0];	//Origin
	
	var k=40000	//how many time the loop will occur
	
	var midpoints=[0,0];	//a new array to store all calculated midpoints
	
	for(var i=0;i < k-1;i++) {	//will run n-1 times
		//randomly select 1 of the 3 verts
		var rand_vert = Math.floor((Math.random()*3)+1);
		console.log("random vertex: "+rand_vert);
		
		//depending on which vertex it chooses that will become the new value of 'p'
		//remember 'p' is an array with two values that need to be replaced
		if(rand_vert==1) {
			p[0] = (p[0]+v1[0])/2;	//storing to first location
			p[1] = (p[1]+v1[1])/2;	//storing to second location
		}
		if(rand_vert==2) {
			p[0] = (p[0]+v2[0])/2;	//...
			p[1] = (p[1]+v2[1])/2;	//...
		}		
		if(rand_vert==3) {
			p[0] = (p[0]+v3[0])/2;	//...
			p[1] = (p[1]+v3[1])/2;	//...
		}		
		//printing to console the results of the new value of 'p'
		console.log("px: "+p[0]);
		console.log("py: "+p[1]);
		
		//pushing new midpoints 'p' into our midpoints array
		//this creates an array with allll of our midpoints
		midpoints.push(p[0]);
		midpoints.push(p[1]);
	}
	
	//we now concat midpoints array to original vertices array
	var m_vertices=o_vertices.concat(midpoints); 	
	
	//and convnert to 32 float because thats what webgl knows how to process
	var vertices=Float32Array.from(m_vertices);		
	
	//printing final vertex
	//console.log("final: "+vertices)
	
	// The number of vertices=original + new midpoints
	var n = 3+k; 	//number of vertices
	console.log("--end of chaos--");
	
	/***********************/
	/**    End of Choas   **/
	/***********************/	
  
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}