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

const coverThickness = 50 // dummy number

//  240 — is position 'at screen',
// -249 — size from _almost_ pixel perfect comparison with http://artgorbunov.ru/books/ui/demo/
// Maybe we need that 9 points shift away from camera to gain a space
// for moving hardcover towards user
const fromCamera = -249

const halfWidth = hardcoverWidth / 2
const bottomY = fromTop - hardcoverHeight
const frontCoverBackZ = fromCamera - coverThickness

// Quick and dirty
export default function hardcoverNode(gl: WebGLRenderingContext, programInfo: Object) {
  // TODO For frontCoverInnerSide() we should copy frontCover() and translate it by Z by (-coverThickness) and rotate it by Y axis and change color
  // TODO For frontCoverFlyleaf() we should copy frontCover() and translate it by Z by (-coverThickness - 1) and change color
  return [
    frontCover(gl, programInfo),
    frontCoverThicknessSide(gl, programInfo),
    frontCoverInnerSide(gl, programInfo),
    frontCoverFlyleaf(gl, programInfo)
  ]
}

function frontCover (gl: WebGLRenderingContext, programInfo: Object) {
  return new Node({
    programInfo,
    type: gl.TRIANGLES,
    uniforms: { u_color: coverColor },
    bufferInfo: twgl.createBufferInfoFromArrays(gl, {
      'a_position': [
       -halfWidth, bottomY, fromCamera,
        halfWidth, bottomY, fromCamera,
       -halfWidth, fromTop, fromCamera,

        halfWidth, bottomY, fromCamera,
        halfWidth, fromTop, fromCamera,
       -halfWidth, fromTop, fromCamera,
      ]
    })
  })
}

function frontCoverThicknessSide (gl: WebGLRenderingContext, programInfo: Object) {
  return new Node({
    programInfo,
    type: gl.TRIANGLES,
    uniforms: { u_color: [1, 1, 1, 1] },
    bufferInfo: twgl.createBufferInfoFromArrays(gl, {
      'a_position': [
       halfWidth, bottomY, fromCamera,
       halfWidth, fromTop, fromCamera,
       halfWidth, bottomY, frontCoverBackZ,

       halfWidth, fromTop, fromCamera,
       halfWidth, fromTop, frontCoverBackZ,
       halfWidth, bottomY, frontCoverBackZ,
      ]
    })
  })
}

function frontCoverFlyleaf (gl: WebGLRenderingContext, programInfo: Object) {
  return new Node({
    programInfo,
    type: gl.TRIANGLES,
    uniforms: { u_color: [63 / 255, 54 /255, 58 /255, 1] },
    bufferInfo: twgl.createBufferInfoFromArrays(gl, {
      'a_position': [
       -halfWidth, bottomY, frontCoverBackZ,
       -halfWidth, fromTop, frontCoverBackZ,
        halfWidth, bottomY, frontCoverBackZ,

        halfWidth, bottomY, frontCoverBackZ,
       -halfWidth, fromTop, frontCoverBackZ,
        halfWidth, fromTop, frontCoverBackZ,
      ]
    })
  })
}

function frontCoverInnerSide (gl: WebGLRenderingContext, programInfo: Object) {
  return new Node({
    programInfo,
    type: gl.TRIANGLES,
    uniforms: { u_color: [63 / 255, 54 /255, 58 /255, 1] },
    bufferInfo: twgl.createBufferInfoFromArrays(gl, {
      'a_position': [ // X and Y are the same as for frontCover, but triangles are backfaced
       -halfWidth, bottomY, frontCoverBackZ,
       -halfWidth, fromTop, frontCoverBackZ,
        halfWidth, bottomY, frontCoverBackZ,

        halfWidth, bottomY, frontCoverBackZ,
       -halfWidth, fromTop, frontCoverBackZ,
        halfWidth, fromTop, frontCoverBackZ,
      ]
    })
  })
}

function frontCoverFlyleaf (gl: WebGLRenderingContext, programInfo: Object) {
  return new Node({
    programInfo,
    type: gl.TRIANGLES,
    uniforms: { u_color: [63 / 255, 54 /255, 58 /255, 1] },
    bufferInfo: twgl.createBufferInfoFromArrays(gl, {
      'a_position': [ // X and Y are the same as for frontCover
       -halfWidth, bottomY, frontCoverBackZ - 1,
        halfWidth, bottomY, frontCoverBackZ - 1,
       -halfWidth, fromTop, frontCoverBackZ - 1,

        halfWidth, bottomY, frontCoverBackZ - 1,
        halfWidth, fromTop, frontCoverBackZ - 1,
       -halfWidth, fromTop, frontCoverBackZ - 1,
      ]
    })
  })
}
