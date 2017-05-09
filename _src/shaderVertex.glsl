// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

// an attribute will receive data from a buffer
attribute vec4 a_position;
attribute vec4 a_color;

uniform mat4 u_matrix;

varying vec4 v_color; // will be passed to shaderFragment

// all shaders have a main function
void main() {
  gl_Position = u_matrix * a_position;
  
  // Pass the color to the fragment shader.
  v_color = a_color;
}
