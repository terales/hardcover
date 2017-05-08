// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

// an attribute will receive data from a buffer
attribute vec4 a_position;
uniform mat4 u_matrix;

// all shaders have a main function
void main() {
  gl_Position = u_matrix * a_position;
}
