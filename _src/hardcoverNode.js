// @flow

// Import third-party modules
import twgl from '../node_modules/twgl.js/dist/3.x/twgl'

// Import local modules
import Node from './node'

// Set local constants
const coverColor = [254 / 255, 116 / 255, 40 / 255, 1]
const hardcoverHeight = 200
const hardcoverWidth = hardcoverHeight * 0.71 // from http://artgorbunov.ru/books/ui/demo/
const fromTop = 100 - hardcoverHeight * 0.1

//  240 — is position 'at screen',
// -249 — size from _almost_ pixel perfect comparison with http://artgorbunov.ru/books/ui/demo/
// Maybe we need that 9 points shift away from camera to gain a space
// for moving hardcover towards user
const fromCamera = -249

// Quick and dirty
export default function hardcoverNode(gl: WebGLRenderingContext, programInfo: Object) {
  return new Node({
    programInfo,
    type: gl.TRIANGLES,
    uniforms: { u_color: coverColor },
    bufferInfo: twgl.createBufferInfoFromArrays(gl, {
      'a_position': [
       -hardcoverWidth / 2, fromTop - hardcoverHeight, fromCamera,
        hardcoverWidth / 2, fromTop - hardcoverHeight, fromCamera,
       -hardcoverWidth / 2, fromTop,                   fromCamera,

        hardcoverWidth / 2, fromTop - hardcoverHeight, fromCamera,
        hardcoverWidth / 2, fromTop,                   fromCamera,
       -hardcoverWidth / 2, fromTop,                   fromCamera,
      ]
    })
  })
}