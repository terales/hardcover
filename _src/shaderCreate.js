// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
export default function createShader (gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  const isCreated = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (isCreated) {
    return shader
  }

  console.error(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}
