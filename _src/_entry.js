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
import CoordinatesGrid from './coordinatesGrid'
import render from './_render'

const coverColor = [254 / 255, 116 / 255, 40 / 255, 1]

const gl: WebGLRenderingContext = twgl.getContext(document.getElementById('canvas'))

const attributes = ['a_position']
const programInfo = twgl.createProgramInfo(gl, [shaderVertex, shaderFragment], attributes)

const grid = new CoordinatesGrid(gl, programInfo)

const bookShelf = new Node()

const gridLines = grid.prepareLines()
gridLines.grid.setParent(bookShelf)

const objects = [].concat(gridLines.lines)

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
  uniforms: { u_color: coverColor },
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
