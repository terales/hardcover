// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
// https://github.com/emoller/WebGL101
// Quick overview: https://nickdesaulniers.github.io/RawWebGL/

// TODO Calc hardcover and camera positions to achieve initial one as in http://artgorbunov.ru/books/ui/demo/
// Reference https://webglfundamentals.org/webgl/lessons/webgl-3d-camera.html

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
const upVector = [0, 1, 0]

const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl', {alpha: false})

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

let {translation, rotation, scale, fieldOfView, cameraPosition} = drawScene()

// Setup UI
webglUI.setupSlider('#fieldOfView', {slide: updateFieldOfView, min: 1, step: 1, max: 179, value: fieldOfView})
webglUI.setupSlider('#cameraX', {slide: updateCameraPosition(0), min: -4000, step: 1, max: 4000, value: cameraPosition[0]})
webglUI.setupSlider('#cameraY', {slide: updateCameraPosition(1), min: -4000, step: 1, max: 4000, value: cameraPosition[1]})
webglUI.setupSlider('#cameraZ', {slide: updateCameraPosition(2), min: -4000, step: 1, max: 4000, value: cameraPosition[2]})
webglUI.setupSlider('#hardcoverX', {slide: updatePosition(0), min: -4000, step: 1, max: 4000, value: translation[0]})
webglUI.setupSlider('#hardcoverY', {slide: updatePosition(1), min: -4000, step: 1, max: 4000, value: translation[1]})
webglUI.setupSlider('#hardcoverZ', {slide: updatePosition(2), min: -4000, step: 1, max: 4000, value: translation[2]})
webglUI.setupSlider('#hardcoverRotationY', {slide: updateAngle, min: -360, step: 1, max: 360, precision: 0, value: rotation})
webglUI.setupSlider('#scale', {slide: updateScale, min: -10, step: 0.01, max: 10, precision: 2, value: scale})

function updateCameraPosition(index) {
  return function (event, ui) {
    cameraPosition[index] = ui.value
    drawScene(translation, rotation, scale, fieldOfView, cameraPosition)
  }
}

function updateFieldOfView(event, ui) {
  fieldOfView = ui.value
  drawScene(translation, rotation, scale, fieldOfView, cameraPosition)
}

function updatePosition (index) {
  return function (event, ui) {
    translation[index] = ui.value
    drawScene(translation, rotation, scale, fieldOfView, cameraPosition)
  }
}

function updateAngle (event, ui) {
  rotation = ui.value
  drawScene(translation, rotation, scale, fieldOfView, cameraPosition)
}

function updateScale (event, ui) {
  scale = ui.value
  drawScene(translation, rotation, scale, fieldOfView, cameraPosition)
}

/**
 * Rendering
 */

// https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html
/* eslint-disable max-statements */
function drawScene (translation, rotation = 0, scale = 1, fieldOfView = 45, cameraPosition) {
  // Set canvas and viewport size
  const viewport = canvasResize(gl.canvas)
  gl.viewport(0, 0, viewport.width, viewport.height)

  // Clear the canvas
  gl.colorMask(true, true, true, true)
  gl.clearColor(1, 1, 1, 1)
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
      0, // (viewport.width - hadcoverDimentions.width) / 2,
      0, // viewport.height * 0.1, // 0.1 of screen from http://artgorbunov.ru/projects/book-ui/
      0
    ]
  }

  const aspect = viewport.width / viewport.height

  if (!cameraPosition) {
    // TODO Get the math of calculating these constants to the camera position
    // Constants got from fullhd full screen example
    cameraPosition = [
      346, // from pixel perfect experiments // Math.round((viewport.width / 2 -  hadcoverDimentions.width / 2) / aspect), // x
      585, // from pixel perfect experiments // Math.round(viewport.height / 2 + viewport.height * 0.1), // y
      -1207 // z - from pixel perfect experiments
    ]
  }

  // Compute the matrices
  const near = (cameraPosition[2] + hadcoverDimentions.width) * -1
  const far = (cameraPosition[2] - hadcoverDimentions.width) * -1
  const projectionMatrix = m4.perspective(fieldOfView * radiansPerDegree, aspect, near, far)

  // Compute a matrix for the camera
  let  cameraMatrix = m4.lookAt(cameraPosition,
    [
      translation[0] + cameraPosition[0], // look at the horizontal center of front cover
      translation[1] + cameraPosition[1], // look at the vertical center of front cover
      translation[2]
    ], upVector)

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
  return { translation, rotation, scale, fieldOfView, cameraPosition }
}
/* eslint-enable max-statements */
