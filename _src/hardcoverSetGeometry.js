import hardcoverWidthClipspace from './hardcoverWidthClipspace'

const height = -2 // Hardcover heigth is equal to canvas height

// For gl.vertexAttribPointer()
const size = 2          // 2 components per iteration
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
  const width = hardcoverWidthClipspace(
    viewport.width,
    viewport.height)

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
        // first triangle
        0,     0,      // top left
        width, 0,      // top right
        0,     height, // bottom left
        // second triangle
        0,     height, // bottom left
        width, 0,      // top right
        width, height  // bottom right
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
