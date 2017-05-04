// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
export default function createProgram (gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  const isCreated = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (isCreated) {
    return program
  }

  console.error(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}
