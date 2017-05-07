// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

// an attribute will receive data from a buffer
attribute vec2 a_position;
uniform mat3 u_matrix;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  vec2 position = (u_matrix * vec3(a_position, 1)).xy;
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = vec4(position, 0, 1);
}
