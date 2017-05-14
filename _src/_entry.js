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

const degToRad = function (degree) {
  return degree * Math.PI / 180;
}

const gl = twgl.getContext(document.getElementById('canvas'))

const attributes = [
  'a_position'
]
const programInfo = twgl.createProgramInfo(gl, [shaderVertex, shaderFragment], attributes)

const trianglePrimitive = new Float32Array([
  0, 0, 0,
  1, 0, 0,
  0, 1, 0,
])

const firstTriangle = new Node({
  programInfo,
  uniforms: { u_color: [254 / 255, 116 / 255, 40 / 255, 1] },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, { 'a_position': trianglePrimitive })
})

const secondTriangle = new Node({
  programInfo,
  uniforms: { u_color: [255 / 255, 255 / 255, 255 / 255, 1] },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, { 'a_position': trianglePrimitive })
})
secondTriangle.localMatrix = m4.scaling([1, -1, 1])

const thirdTriangle = new Node({
  programInfo,
  uniforms: { u_color: [255 / 255, 0 /255, 100 /255, 1] },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, { 'a_position': trianglePrimitive })
})
thirdTriangle.localMatrix = m4.scaling([-1, -1, 1])

const fourthTriangle = new Node({
  programInfo,
  uniforms: { u_color: [100 / 255, 255 / 255, 150 / 255, 1] },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, { 'a_position': trianglePrimitive })
})
fourthTriangle.localMatrix = m4.scaling([-1, 1, 1])

const objects = [
  firstTriangle,
  secondTriangle,
  thirdTriangle,
  fourthTriangle
]

const objectsToDraw = objects.map(object => {
  console.log(object.localMatrix)
  object.drawInfo.uniforms.u_matrix = object.localMatrix
  return object.drawInfo
})
const enhancedRender = render.bind(null, gl, objectsToDraw)

window.requestAnimationFrame(enhancedRender)
