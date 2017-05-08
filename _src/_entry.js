// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

import shaderVertexSource from './shaderVertex.glsl'
import shaderFragmentSource from './shaderFragment.glsl'

import shaderCreate from './shaderCreate'
import programCreate from './programCreate'
import canvasResize from './canvasResize'
import webglUI from '../node_modules/webgl-fundamentals/webgl/resources/webgl-lessons-ui'
import hardcoverSetGeometry from './hardcoverSetGeometry'
import Math3d from './math3d'

/**
 * Initialization
 */
const radiansPerDegree = Math.PI / 180
const math3d = new Math3d()

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
const matrixLocation = gl.getUniformLocation(program, 'u_matrix')
const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

// Create a buffer and put three 2d clip space points in it
const positionBuffer = gl.createBuffer()

let {translation, rotation, scale} = drawScene()

// Setup UI
webglUI.setupSlider('#x', {slide: updatePosition(0), min: 0, step: 1, max: canvas.clientWidth, value: translation[0]})
webglUI.setupSlider('#y', {slide: updatePosition(1), min: 0, step: 1, max: canvas.clientHeight, value: translation[1]})
webglUI.setupSlider('#rotation', {slide: updateAngle(), min: 0, step: 1, max: 360, precision: 0, value: rotation})
webglUI.setupSlider('#scale', {slide: updateScale(), min: -5, step: 0.01, max: 5, precision: 2, value: scale})

function updatePosition (index) {
  return function (event, ui) {
    translation[index] = ui.value
    drawScene(translation, rotation, scale)
  }
}

function updateAngle () {
  return function (event, ui) {
    rotation = ui.value
    drawScene(translation, rotation, scale)
  }
}

function updateScale () {
  return function (event, ui) {
    scale = ui.value
    drawScene(translation, rotation, scale)
  }
}

/**
 * Rendering
 */

// https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html
/* eslint-disable max-statements */
function drawScene (translation, rotation = 0, scale = 1) {
  // Set canvas and viewport size
  const viewport = canvasResize(gl.canvas)
  gl.viewport(0, 0, viewport.width, viewport.height)

  // RGBA(254, 116, 40, 1) - color of http://artgorbunov.ru/projects/book-ui/
  const hardcoverColor = new Float32Array([254 / 255, 116 / 255, 40 / 255, 1])

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Tell canvas to use our program (pair of shaders)
  gl.useProgram(program)

  const hadcoverDimentions = hardcoverSetGeometry({
    gl, positionAttributeLocation, positionBuffer, viewport
  })
  
  if (!translation) {
    translation = [
      (viewport.width - hadcoverDimentions.width) / 2, // left by half of hardcover width
      viewport.height * 0.2 // 0.8 of screen from http://artgorbunov.ru/projects/book-ui/
    ]
  }

  // Compute the matrices
  const projectionMatrix = math3d.projection(viewport.width, viewport.height)
  const translationMatrix = math3d.translation(translation[0], translation[1])
  const rotationMatrix = math3d.rotation(rotation * radiansPerDegree)
  const scaleMatrix = math3d.scaling(scale, scale)

  // Multiply the matrices
  let matrix = math3d.multiply(projectionMatrix, translationMatrix)
  matrix = math3d.multiply(matrix, rotationMatrix)
  matrix = math3d.multiply(matrix, scaleMatrix)

  // Set the matrix.
  gl.uniformMatrix3fv(matrixLocation, false, matrix)

  // Set color
  gl.uniform4fv(colorUniformLocation, hardcoverColor)

  // Draw passet atributes
  const primitiveType = gl.TRIANGLES
  const drawOffset = 0
  const count = 6
  gl.drawArrays(primitiveType, drawOffset, count)

  console.log('drawn')
  return { translation, rotation, scale }
}
/* eslint-enable max-statements */
