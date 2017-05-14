// @flow

// $FlowFixMe
import shaderVertex from './shaderVertex.glsl'
// $FlowFixMe
import shaderFragment from './shaderFragment.glsl'

// Import third-party modules
import twgl from '../node_modules/twgl.js/dist/3.x/twgl'
import {m4} from '../node_modules/twgl.js/dist/3.x/twgl-full'

// Import local modules
import Node from './node'
import render from './_render'

const coverColor = [254 / 255, 116 / 255, 40 / 255, 1]
const whiteColor = [30 / 255, 30 / 255, 30 / 255, 1]
const degToRad = (degree) => degree * Math.PI / 180

const gl = twgl.getContext(document.getElementById('canvas'))

const attributes = ['a_position']
const programInfo = twgl.createProgramInfo(gl, [shaderVertex, shaderFragment], attributes)

const xLinePrimitive = new Float32Array([
  -1, 0, 0,
   1, 0, 0,
])

const yLinePrimitive = new Float32Array([
  0, -1, 0,
  0,  1, 0,
])

const lineOptions = (primitive, color) => ({
  programInfo,
  type: gl.LINES,
  uniforms: { u_color: color },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, { 'a_position': primitive })
})

const xAxis = new Node(lineOptions(xLinePrimitive, coverColor))
const yAxis = new Node(lineOptions(yLinePrimitive, coverColor))

const objects = [
  xAxis,
  yAxis
]

for (let i = 0; i < 10; i++) {
  const offset = -1 + i * 0.2

  const xGridLine = new Node(lineOptions(xLinePrimitive, whiteColor))
  xGridLine.localMatrix = m4.translation([0, offset, 0])
  objects.push(xGridLine)

  const yGridLine = new Node(lineOptions(yLinePrimitive, whiteColor))
  yGridLine.localMatrix = m4.translation([offset, 0, 0])
  objects.push(yGridLine)
}

const objectsToDraw = objects.map(object => {
  object.drawInfo.uniforms.u_matrix = object.localMatrix
  return object.drawInfo
})
const enhancedRender = render.bind(null, gl, objectsToDraw)

window.requestAnimationFrame(enhancedRender)
