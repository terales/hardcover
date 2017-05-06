// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

// an attribute will receive data from a buffer
attribute vec2 a_position;
uniform vec2 u_translation; // https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html

// all shaders have a main function
void main() {
  // Add in the translation.
  vec2 position = a_position + u_translation;
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = vec4(position, 0, 1);
}
