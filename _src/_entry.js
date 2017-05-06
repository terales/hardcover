// https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

import shaderVertexSource from './shaderVertex.glsl'
import shaderFragmentSource from './shaderFragment.glsl'

import shaderCreate from './shaderCreate'
import programCreate from './programCreate'
import canvasResize from './canvasResize'
import hardcoverWidthClipspace from './hardcoverWidthClipspace'
import webglUI from '../node_modules/webgl-fundamentals/webgl/resources/webgl-lessons-ui'
import hardcoverSetGeometry from './hardcoverSetGeometry'
import hardcoverSetTranslation from './hardcoverSetTranslation'
import hardcoverSetRotation from './hardcoverSetRotation'

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
const translationUniformLocation = gl.getUniformLocation(program, 'u_translation')
const rotationLocation = gl.getUniformLocation(program, 'u_rotation')
const colorUniformLocation = gl.getUniformLocation(program, 'u_color')

// Create a buffer and put three 2d clip space points in it
const positionBuffer = gl.createBuffer()

let {translation: actualTranslation, rotation: actualRotation} = drawScene()

// Setup UI
webglUI.setupSlider('#x', {slide: updatePosition(0), min: -1, step: 0.01, max: 1, precision: 3, value: actualTranslation[0]})
webglUI.setupSlider('#y', {slide: updatePosition(1), min: -1, step: 0.01, max: 1, precision: 3, value: actualTranslation[1]})
webglUI.setupSlider('#rotation', {slide: updateAngle(), min: 0, step: 1, max: 360, precision: 0, value: actualRotation})

function updatePosition (index) {
  return function (event, ui) {
    actualTranslation[index] = ui.value
    drawScene(actualTranslation, actualRotation)
  }
}

function updateAngle () {
  return function (event, ui) {
    actualRotation = ui.value
    drawScene(actualTranslation,actualRotation)
  }
}

/**
 * Rendering
 */

// https://webglfundamentals.org/webgl/lessons/webgl-2d-translation.html
/* eslint-disable max-statements */
function drawScene (translation, rotation) {
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
  const hardcoverTranslation = hardcoverSetTranslation({
    gl,
    translationUniformLocation, 
    desiredTranslation: translation,
    hardcoverWidth: hadcoverDimentions.width
  })

  const hadcoverRotation = hardcoverSetRotation({gl, rotationLocation, rotation})

  // Set color
  gl.uniform4fv(colorUniformLocation, hardcoverColor)

  // Draw passet atributes
  const primitiveType = gl.TRIANGLES
  const drawOffset = 0
  const count = 6
  gl.drawArrays(primitiveType, drawOffset, count)

  console.log('drawn')
  return {
    translation: hardcoverTranslation,
    rotation: hadcoverRotation
  }
}
/* eslint-enable max-statements */
