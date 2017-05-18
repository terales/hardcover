// @flow

// Import third-party modules
import twgl from '../node_modules/twgl.js/dist/3.x/twgl'
import {m4} from '../node_modules/twgl.js/dist/3.x/twgl-full'

// Import local modules
import Node from './node'

// Set local constants
const coverColor = [254 / 255, 116 / 255, 40 / 255, 1]
const flyleafColor = [63/255, 54/255, 58/255, 1]
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

const frontCoverFacePosition = [
 -halfWidth, bottomY, fromCamera,
  halfWidth, bottomY, fromCamera,
 -halfWidth, fromTop, fromCamera,

  halfWidth, bottomY, fromCamera,
  halfWidth, fromTop, fromCamera,
 -halfWidth, fromTop, fromCamera,
]

// Quick and dirty
export default function hardcoverNode(gl: WebGLRenderingContext, programInfo: Object, hardcoverSceneParent: Node) {
  const hardcover = new Node({}, hardcoverSceneParent)
  const frontCover = new Node({}, hardcover)
  frontCover.localMatrix = rotationAroundRightSide(-20)
  const enchancedGetPlaneNode = getPlaneNode.bind(null, gl, programInfo)
  return [
    frontCoverFace(enchancedGetPlaneNode, frontCover),
    frontCoverThicknessSide(enchancedGetPlaneNode, frontCover),
    frontCoverInnerSide(enchancedGetPlaneNode, frontCover),
    frontCoverFlyleaf(enchancedGetPlaneNode, hardcover)
  ]
}

function frontCoverFace (getNode: Function, sceneParent: Node) {
  return getNode(coverColor, frontCoverFacePosition, sceneParent)
}

function frontCoverThicknessSide (getNode: Function, sceneParent: Node) {
  const color = [1, 1, 1, 1]
  const position = [
    halfWidth, bottomY, fromCamera,
    halfWidth, fromTop, fromCamera,
    halfWidth, bottomY, frontCoverBackZ,

    halfWidth, fromTop, fromCamera,
    halfWidth, fromTop, frontCoverBackZ,
    halfWidth, bottomY, frontCoverBackZ,
  ]
  return getNode(color, position, sceneParent)
}

function frontCoverInnerSide (getNode: Function, sceneParent: Node) {
  // TODO For frontCoverInnerSide() we should copy frontCover() and translate it by Z by (-coverThickness) and rotate it by Y axis and change color
  return getNode(flyleafColor, frontCoverFacePosition, sceneParent)
}

function frontCoverFlyleaf (getNode: Function, sceneParent: Node) {
  // TODO For frontCoverFlyleaf() we should copy frontCover() and translate it by Z by (-coverThickness - 1) and change color
  return getNode(flyleafColor, frontCoverFacePosition, sceneParent)
}

function getPlaneNode (gl: WebGLRenderingContext, programInfo: Object, color: Array<number>, position: Array<number>, parent: ?Node) {
  return new Node({
    programInfo,
    type: gl.TRIANGLES,
    uniforms: { u_color: color },
    bufferInfo: twgl.createBufferInfoFromArrays(gl, { 'a_position': position })
  }, parent)
}

// Thanks http://stackoverflow.com/a/13284798/1363799
function rotationAroundRightSide (angleInDegrees) {
  const rotatePointX = halfWidth
  const rotatePointY = 100 - fromTop
  const rotatePointZ = fromCamera

  let matrix = m4.identity()
  matrix = m4.translate(matrix, [-rotatePointX, rotatePointY, rotatePointZ])
  matrix = m4.rotateY(matrix, angleInDegrees * Math.PI / 180)
  matrix = m4.translate(matrix, [rotatePointX, -rotatePointY, -rotatePointZ])
  return matrix
}
