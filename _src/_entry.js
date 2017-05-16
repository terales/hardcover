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

const gl: WebGLRenderingContext = twgl.getContext(document.getElementById('canvas'))

const attributes = ['a_position']
const programInfo = twgl.createProgramInfo(gl, [shaderVertex, shaderFragment], attributes)

const xLinePrimitive = new Float32Array([
  -100, 100, -500,
   100, 100, -500,
])

const yLinePrimitive = new Float32Array([
  -100, 100, -500,
  -100, -100, -240, // 240 — is position 'at screen'
])

const lineOptions = (primitive, color) => ({
  programInfo,
  type: gl.LINES,
  uniforms: { u_color: color },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, { 'a_position': primitive })
})

const bookShelf = new Node()
const xAxis = new Node(lineOptions(xLinePrimitive, coverColor))
xAxis.setParent(bookShelf)
const yAxis = new Node(lineOptions(yLinePrimitive, coverColor))
xAxis.setParent(bookShelf)

const objects = [
  xAxis,
  yAxis
]

for (let i = 0; i < 11; i++) {
  const xGridLine = new Node(lineOptions(xLinePrimitive, whiteColor))
  xGridLine.localMatrix = m4.translation([0, -i * 20, i * 26])
  xGridLine.setParent(bookShelf)
  objects.push(xGridLine)

  const yGridLine = new Node(lineOptions(yLinePrimitive, whiteColor))
  yGridLine.localMatrix = m4.translation([i * 20, 0, 0])
  yGridLine.setParent(bookShelf)
  objects.push(yGridLine)
}

const hardcoverHeight = 200
const hardcoverWidth = hardcoverHeight * 0.71 // from http://artgorbunov.ru/books/ui/demo/
const fromTop = 100 - hardcoverHeight * 0.1

//  240 — is position 'at screen',
// -249 — size from _almost_ pixel perfect comparison with http://artgorbunov.ru/books/ui/demo/
// Maybe we need that 9 points shift away from camera to gain a space
// for moving hardcover towards user
const fromCamera = -249
const dummyCover = new Node({
  programInfo,
  type: gl.TRIANGLES,
  uniforms: { u_color: [1, 1, 1, 1] },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, {
    'a_position': [
      -hardcoverWidth / 2, fromTop - hardcoverHeight, fromCamera, // 240 — is position 'at screen'
       hardcoverWidth / 2, fromTop - hardcoverHeight, fromCamera,
      -hardcoverWidth / 2, fromTop,                   fromCamera,

       hardcoverWidth / 2, fromTop - hardcoverHeight, fromCamera,
       hardcoverWidth / 2, fromTop,                   fromCamera,
      -hardcoverWidth / 2, fromTop,                   fromCamera,
    ]
  })
})
dummyCover.setParent(bookShelf)
objects.push(dummyCover)

const enhancedRender = render.bind(null, gl, objects)

window.requestAnimationFrame(enhancedRender)
