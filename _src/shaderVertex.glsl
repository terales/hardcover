// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

// an attribute will receive data from a buffer
attribute vec2 a_position;
uniform vec2 u_translation; // https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html
uniform vec2 u_rotation; // https://webglfundamentals.org/webgl/lessons/webgl-2d-rotation.html

// all shaders have a main function
void main() {
  // Add in the 2D rotation
  vec2 rotatedPosition = vec2(
    a_position.x * u_rotation.y + a_position.y * u_rotation.x,
    a_position.y * u_rotation.y - a_position.x * u_rotation.x);

  // Add in the translation.
  vec2 position = rotatedPosition + u_translation;
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = vec4(position, 0, 1);
}
