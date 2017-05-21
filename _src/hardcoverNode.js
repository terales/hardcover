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

const coverThickness = 0.5 // dummy number

// -240 — is position 'at screen',
// -249 — size from _almost_ pixel perfect comparison with http://artgorbunov.ru/books/ui/demo/
// Maybe we need that 9 points shift away from camera to gain a space
// for moving hardcover towards user
const atScreen = -240
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

const hardcoverMinMoveDegree = 10
const hardcoverMaxMoveDegree = 170
const movingDegrees = hardcoverMaxMoveDegree - hardcoverMinMoveDegree - 2 // Because of unstrict comparison in hardcover.moveFromDegree()

const hardcoverMoveXStep = halfWidth / movingDegrees
const hardcoverMoveYStep = fromTop / 4 / movingDegrees // Why we should divide by 4?!
const hardcoverMoveZStep = -(fromCamera - atScreen) / movingDegrees

// Quick and dirty
export default function hardcoverNode(gl: WebGLRenderingContext, programInfo: Object, hardcoverSceneParent: Node) {
  const hardcover = new Node({}, hardcoverSceneParent)
  hardcover.moveFromDegree = (degree) => {
    const heightToWidth = gl.canvas.height / gl.canvas.width

    let moveX = 0
    let moveY = 0
    let moveZ = 0
    let scale = 1

    if (degree <= hardcoverMinMoveDegree) {
      moveX = 0
      moveY = 0
      moveZ = 0
      scale = 1
    } else if (degree >= hardcoverMaxMoveDegree) {
      moveX = halfWidth
      moveY = fromTop / 4 // Why we should divide by 4?!
      moveZ = (fromCamera - atScreen) * -1
      scale = 1 + heightToWidth
    } else {
      const degreeToStep = degree - 10
      moveX = degreeToStep * hardcoverMoveXStep
      moveY = degreeToStep * hardcoverMoveYStep
      moveZ = degreeToStep * hardcoverMoveZStep
      scale = 1 + degreeToStep * heightToWidth / movingDegrees
    }

    console.log(degree, moveX, moveY, moveZ, scale)
    hardcover.localMatrix = m4.translate(m4.scaling([scale, scale, 1]), [moveX, moveY, moveZ])
  }
  const frontCover = new Node({}, hardcover)
  frontCover.localMatrix = rotationAroundRightSide(-60)
  frontCover.setRotation = (degree) => { frontCover.localMatrix = rotationAroundRightSide(degree) }
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
  const color = [218 / 255, 102 / 255, 35 / 255, 1] // 85% of brightness in cover color
  const position = [
    halfWidth, bottomY, fromCamera,
    halfWidth, bottomY, frontCoverBackZ,
    halfWidth, fromTop, fromCamera,

    halfWidth, fromTop, fromCamera,
    halfWidth, bottomY, frontCoverBackZ,
    halfWidth, fromTop, frontCoverBackZ,
  ]
  return getNode(color, position, sceneParent)
}

function frontCoverInnerSide (getNode: Function, sceneParent: Node) {
  const node = getNode(flyleafColor, frontCoverFacePosition, sceneParent)
  // After rotation by 180° it will be opened as frontCover, so we need to position it back inside initial hardcover position
  // and push it back by coverThickness to form some new face of cube
  node.localMatrix = m4.translate(rotationAroundRightSide(180), [-hardcoverWidth, 0, -coverThickness])
  return node
}

function frontCoverFlyleaf (getNode: Function, sceneParent: Node) {
  const node = getNode(flyleafColor, frontCoverFacePosition, sceneParent)
  // For frontCoverFlyleaf() we should copy frontCover() and translate it by Z by (-coverThickness) and change color
  node.localMatrix = m4.translation([0, 0, -coverThickness])
  return node
}

function getPlaneNode (gl: WebGLRenderingContext, programInfo: Object, color: Array<number>, position: Array<number>, parent: ?Node) {
  return new Node({
    programInfo,
    type: gl.TRIANGLES,
    uniforms: { /* u_color: color */ },
    bufferInfo: twgl.createBufferInfoFromArrays(gl, {
      'a_position': position,
      'a_texCoord': [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
      ]
    })
  }, parent)
}

// Thanks http://stackoverflow.com/a/13284798/1363799
function rotationAroundRightSide (angleInDegrees) {
  const rotatePointX = halfWidth
  const rotatePointY = 100 - fromTop
  const rotatePointZ = fromCamera

  let matrix = m4.identity()
  matrix = m4.translate(matrix, [-rotatePointX, rotatePointY, rotatePointZ - coverThickness])
  matrix = m4.rotateY(matrix, angleInDegrees * Math.PI / 180)
  matrix = m4.translate(matrix, [rotatePointX, -rotatePointY, -rotatePointZ + coverThickness])
  return matrix
}
