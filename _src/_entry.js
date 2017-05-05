// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

import shaderVertexSource from './shaderVertex.glsl'
import shaderFragmentSource from './shaderFragment.glsl'

import shaderCreate from './shaderCreate'
import programCreate from './programCreate'
import canvasResize from './canvasResize'
import rectangleAdd from './rectangleAdd'
import hardcoverWidthClipspace from './hardcoverWidthClipspace'

/**
 * Initialization
 */

const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl')

// create GLSL shaders, upload the GLSL source, compile the shaders
const vertexShader = shaderCreate(
  gl, gl.VERTEX_SHADER, shaderVertexSource)

const fragmentShader = shaderCreate(
  gl, gl.FRAGMENT_SHADER, shaderFragmentSource)

// Link the two shaders into a program
const program = programCreate(gl, vertexShader, fragmentShader)

// look up where the vertex data needs to go
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')

// look up uniform locations
const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

// Create a buffer and put three 2d clip space points in it
const positionBuffer = gl.createBuffer()

// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

// three 2d points
const positions = [
  0, 0,
  0, 0.5,
  0.7, 0
]

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

drawScene()

/**
 * Rendering
 */

// https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html
function drawScene () {
  // Set canvas and viewport size
  const viewport = canvasResize(gl.canvas)
  gl.viewport(0, 0, viewport.width, viewport.height)

  // Set up hardcover dimensions, position and color
  const hardcoverWidth = hardcoverWidthClipspace(viewport.width, viewport.height)
  const hardcoverHeight = 2 // Full canvas width
  const hardcoverTranslation = [
    -hardcoverWidth / 2, // move left from screen center by half of hardcover width
    0.8 // from http://artgorbunov.ru/projects/book-ui/
  ]
  // RGBA(254, 116, 40, 1) - color of http://artgorbunov.ru/projects/book-ui/
  const hardcoverColor = new Float32Array([254/255, 116/255, 40/255, 1])

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Tell canvas to use our program (pair of shaders)
  gl.useProgram(program)

  // tell WebGL how to take data from the buffer we setup above
  // and supply it to the attribute in the shader
  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation)

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  rectangleAdd({
    gl,
    x: hardcoverTranslation[0], 
    y: hardcoverTranslation[1],
    width: hardcoverWidth,
    height: hardcoverHeight
  })

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2          // 2 components per iteration
  const normalize = false // don't normalize the data
  const bufferOffset = 0  // start at the beginning of the buffer
  const type = gl.FLOAT   // the data is 32bit floats
  const stride = 0        // 0 = move forward size * sizeof(type) each iteration
                          // to get the next position
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, bufferOffset)

  // Set color
  gl.uniform4fv(colorUniformLocation, hardcoverColor)

  // Draw passet atributes
  const primitiveType = gl.TRIANGLES
  const drawOffset = 0
  const count = 6
  gl.drawArrays(primitiveType, drawOffset, count)

  console.log('drawn')
}
