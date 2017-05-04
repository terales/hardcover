// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
export default function rectangleAdd ({gl, x, y, width, height}) {
  const x1 = x
  const x2 = x + width
  const y1 = y
  const y2 = y - height

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2
    ]),
    gl.STATIC_DRAW
  )
}
