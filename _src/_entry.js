// @flow

// $FlowFixMe
import shaderVertex from './shaderVertex.glsl'
// $FlowFixMe
import shaderFragment from './shaderFragment.glsl'

// Import third-party modules
import twgl from '../node_modules/twgl.js/dist/3.x/twgl'
import {m4} from '../node_modules/twgl.js/dist/3.x/twgl-full'
import webglUI from '../node_modules/webgl-fundamentals/webgl/resources/webgl-lessons-ui'

// Import local modules
import Node from './node'
import CoordinatesGrid from './coordinatesGrid'
import hardcoverNode from './hardcoverNode'
import render from './_render'

const coverColor = [254 / 255, 116 / 255, 40 / 255, 1]

const gl: WebGLRenderingContext = twgl.getContext(document.getElementById('canvas'))

const attributes = ['a_position']
const programInfo = twgl.createProgramInfo(gl, [shaderVertex, shaderFragment], attributes)

// BookShelf -- world object
const bookShelf = new Node()
const grid = new CoordinatesGrid(gl, programInfo)

const objects = [].concat(
  grid.prepareLines(bookShelf),
  hardcoverNode(gl, programInfo, bookShelf)
)

webglUI.setupSlider('#FrontCoverOpenDegree', {
  value: 60, // from hardcoverNode: frontCover.localMatrix = rotationAroundRightSide(-60)
  max: 180,
  slide: (event, {value}) => {
    // TODO Refactor this dirty hack of integrating slider
    bookShelf.children[1].children[0].setRotation(-value)
    bookShelf.updateWorldMatrix()
  }
})

bookShelf.updateWorldMatrix()
const enhancedRender = render.bind(null, gl, objects)

window.requestAnimationFrame(enhancedRender)
