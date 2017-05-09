// See ./hardcoverSetGeometry for order
// RGBA(254, 116, 40, 1) - color of http://artgorbunov.ru/projects/book-ui/
const hardcoverColor = [254, 116, 40, 1]
const color = new Uint8Array([
  // Front cover
  hardcoverColor[0],  hardcoverColor[1], hardcoverColor[2],
  hardcoverColor[0],  hardcoverColor[1], hardcoverColor[2],
  hardcoverColor[0],  hardcoverColor[1], hardcoverColor[2],
  hardcoverColor[0],  hardcoverColor[1], hardcoverColor[2],
  hardcoverColor[0],  hardcoverColor[1], hardcoverColor[2],
  hardcoverColor[0],  hardcoverColor[1], hardcoverColor[2],

  // Front cover right side
  200,  70, 120,
  200,  70, 120,
  200,  70, 120,
  200,  70, 120,
  200,  70, 120,
  200,  70, 120
])

// For gl.vertexAttribPointer()
const size = 3          // 2 components per iteration
const normalize = true  // normalize the data (convert from 0-255 to 0-1)
const bufferOffset = 0  // start at the beginning of the buffer
const stride = 0        // 0 = move forward size * sizeof(type) each iteration
                        // to get the next position

export default function hardcoverSetColor({gl, colorAttributeLocation, colorBuffer}) {
  // tell WebGL how to take data from the buffer we setup above
  // and supply it to the attribute in the shader
  // Turn on the attribute
  gl.enableVertexAttribArray(colorAttributeLocation)

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)

  // Send data to GPU
  gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW)

  gl.vertexAttribPointer(
    colorAttributeLocation,
    size,
    gl.UNSIGNED_BYTE, // the data is 8bit unsigned values
    normalize,
    stride,
    bufferOffset)
}
