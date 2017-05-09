const BOOK_ASPECT_RATIO = 0.71 // from http://artgorbunov.ru/projects/book-ui/
const FRONT_COVER_DEPTH = 10 // 3 -  from http://artgorbunov.ru/projects/book-ui/

// For gl.vertexAttribPointer()
const size = 3          // 2 components per iteration
const normalize = false // don't normalize the data
const bufferOffset = 0  // start at the beginning of the buffer
const stride = 0        // 0 = move forward size * sizeof(type) each iteration
                        // to get the next position

export default function hardcoverSetGeometry ({
  gl,
  positionAttributeLocation,
  positionBuffer,
  viewport
}) {
  const height = viewport.height // Hardcover heigth is equal to canvas height
  const width = height * BOOK_ASPECT_RATIO
  const depth = FRONT_COVER_DEPTH

  // tell WebGL how to take data from the buffer we setup above
  // and supply it to the attribute in the shader
  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation)

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  gl.bufferData(
      gl.ARRAY_BUFFER,
      /* eslint-disable no-multi-spaces */
      new Float32Array([
        // Front cover
        0,     0,      0,     // top left front
        0,     height, 0,     // bottom left front
        width, 0,      0,     // top right front
        0,     height, 0,     // bottom left front
        width, height, 0,     // bottom right front
        width, 0,      0,     // top right front

        // Front cover right side
        width, 0,      0,      // top right front
        width, height, 0,     // bottom right front
        width, 0,      depth, // top right back        
        width, height, 0,     // bottom right front        
        width, height, depth, // bottom right back
        width, 0,      depth, // top right back
      ]),
      /* eslint-enable no-multi-spaces */
      gl.STATIC_DRAW)

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    gl.FLOAT,
    normalize,
    stride,
    bufferOffset)

  return { height, width }
}
