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
import hardcoverNode from './hardcoverNode'
import render from './_render'

const coverColor = [254 / 255, 116 / 255, 40 / 255, 1]

const gl: WebGLRenderingContext = twgl.getContext(document.getElementById('canvas'))

const attributes = ['a_position']
const programInfo = twgl.createProgramInfo(gl, [shaderVertex, shaderFragment], attributes)

const grid = new CoordinatesGrid(gl, programInfo)

const bookShelf = new Node()

const gridLines = grid.prepareLines()
gridLines.grid.setParent(bookShelf)

const hardcover = hardcoverNode(gl, programInfo)

const objects = [].concat(gridLines.lines, hardcover)

const enhancedRender = render.bind(null, gl, objects)

window.requestAnimationFrame(enhancedRender)
