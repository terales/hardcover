// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

// TODO Add 3D sides to hardcover front

import shaderVertexSource from './shaderVertex.glsl'
import shaderFragmentSource from './shaderFragment.glsl'

import shaderCreate from './shaderCreate'
import programCreate from './programCreate'
import canvasResize from './canvasResize'
import webglUI from '../node_modules/webgl-fundamentals/webgl/resources/webgl-lessons-ui'
import hardcoverSetGeometry from './hardcoverSetGeometry'
import hardcoverSetColor from './hardcoverSetColor'
import {m4} from '../node_modules/twgl.js/dist/3.x/twgl-full'

/**
 * Initialization
 */
const radiansPerDegree = Math.PI / 180

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
const colorAttributeLocation = gl.getAttribLocation(program, 'a_color')

// Create a buffer and put three 2d clip space points in it
const positionBuffer = gl.createBuffer()
const colorBuffer = gl.createBuffer()
hardcoverSetColor({gl, colorAttributeLocation, colorBuffer})

// look up uniform locations
const matrixLocation = gl.getUniformLocation(program, 'u_matrix')

let {translation, rotation, scale, fieldOfView, cameraAngle} = drawScene()

// Setup UI
webglUI.setupSlider('#cameraAngle', {slide: updateCameraAngle, min: -360, step: 1, max: 360, value: cameraAngle})
webglUI.setupSlider('#fieldOfView', {slide: updateFieldOfView, min: 1, step: 1, max: 179, value: fieldOfView})
webglUI.setupSlider('#x', {slide: updatePosition(0), min: -500, step: 1, max: canvas.clientWidth, value: translation[0]})
webglUI.setupSlider('#y', {slide: updatePosition(1), min: -500, step: 1, max: canvas.clientHeight, value: translation[1]})
webglUI.setupSlider('#z', {slide: updatePosition(2), min: -500, step: 1, max: 1000, value: translation[2]})
webglUI.setupSlider('#rotationY', {slide: updateAngle, min: 0, step: 1, max: 360, precision: 0, value: rotation})
webglUI.setupSlider('#scale', {slide: updateScale, min: -5, step: 0.01, max: 5, precision: 2, value: scale})

function updateCameraAngle(event, ui) {
  cameraAngle = ui.value
  drawScene(translation, rotation, scale, fieldOfView, cameraAngle)
}

function updateFieldOfView(event, ui) {
  fieldOfView = ui.value
  drawScene(translation, rotation, scale, fieldOfView, cameraAngle)
}

function updatePosition (index) {
  return function (event, ui) {
    translation[index] = ui.value
    drawScene(translation, rotation, scale, fieldOfView, cameraAngle)
  }
}

function updateAngle (event, ui) {
  rotation = ui.value
  drawScene(translation, rotation, scale, fieldOfView, cameraAngle)
}

function updateScale (event, ui) {
  scale = ui.value
  drawScene(translation, rotation, scale, fieldOfView, cameraAngle)
}

/**
 * Rendering
 */

// https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html
/* eslint-disable max-statements */
function drawScene (translation, rotation = 10, scale = 1, fieldOfView = 60, cameraAngle = 0) {
  // Set canvas and viewport size
  const viewport = canvasResize(gl.canvas)
  gl.viewport(0, 0, viewport.width, viewport.height)

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)

  // Tell canvas to use our program (pair of shaders)
  gl.useProgram(program)

  const hadcoverDimentions = hardcoverSetGeometry({
    gl, positionAttributeLocation, positionBuffer, viewport
  })

  if (!translation) {
    translation = [
      (viewport.width - hadcoverDimentions.width) / 2,
      viewport.height * 0.1, // 0.1 of screen from http://artgorbunov.ru/projects/book-ui/
      -360
    ]
  }

  // Compute the matrices
  const aspect = viewport.width / viewport.height
  const near = 1
  const far = 2000
  const projectionMatrix = m4.perspective(fieldOfView * radiansPerDegree, aspect, near, far)
  
  // Compute a matrix for the camera
  const numFs = 5
  const radius = 200
  let  cameraMatrix = m4.rotationY(cameraAngle * radiansPerDegree)
  cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5)

  const viewMatrix = m4.inverse(cameraMatrix)

  let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix)

  let matrix = m4.translate(viewProjectionMatrix, translation)
  matrix = m4.rotateY(matrix, rotation * radiansPerDegree)
  matrix = m4.scale(matrix, [scale, scale, 1])

  // Set the matrix.
  gl.uniformMatrix4fv(matrixLocation, false, matrix)

  // Draw passet atributes
  const primitiveType = gl.TRIANGLES
  const drawOffset = 0
  const count = 6 * 2 // one rectangle for Front cover and one for Front cover depth
  gl.drawArrays(primitiveType, drawOffset, count)

  console.log('drawn')
  return { translation, rotation, scale, fieldOfView, cameraAngle }
}
/* eslint-enable max-statements */
