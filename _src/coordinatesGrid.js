// @flow

// Import third-party modules
import twgl from '../node_modules/twgl.js/dist/3.x/twgl'
import {m4} from '../node_modules/twgl.js/dist/3.x/twgl-full'

// Import local modules
import Node from './node'

// Set local constants
const coverColor = [254 / 255, 116 / 255, 40 / 255, 1]
const grayColor = [30 / 255, 30 / 255, 30 / 255, 1]

const xLinePrimitive = new Float32Array([
  -100, 100, -500,
   100, 100, -500,
])

const yLinePrimitive = new Float32Array([
  -100, 100, -500,
  -100, -100, -240, // 240 — is position 'at screen'
])

export default class CoordinatesGrid {
  gl: WebGLRenderingContext
  programInfo: Object

  constructor (gl: WebGLRenderingContext, programInfo: Object) {
    this.gl = gl
    this.programInfo = programInfo
  }

  prepareLines(gridSceneParent: Node): Array<Node> {
    const grid = new Node()
    const lines = []

    this.addLine(xLinePrimitive, coverColor, lines, grid, m4.identity())
    this.addLine(yLinePrimitive, coverColor, lines, grid, m4.identity())

    for (let i = 1; i < 11; i++) {
      this.addLine(xLinePrimitive, grayColor, lines, grid, m4.translation([0, -i * 20, i * 26])) // xGridLine
      this.addLine(yLinePrimitive, grayColor, lines, grid, m4.translation([i * 20, 0, 0])) // yGridLine
    }

    grid.setParent(gridSceneParent)
    return lines
  }

  addLine (primitive: Float32Array, color: Array<Number>, lines: Array<Node>, grid: Node, localMatrix: Float32Array) {
    const line = new Node(this.prepareOptions(primitive, color))
    line.localMatrix = localMatrix
    line.setParent(grid)
    lines.push(line)
  }

  prepareOptions (primitive: Float32Array, color: Array<Number>) {
    return {
      programInfo: this.programInfo,
      type: this.gl.LINES,
      uniforms: { /* u_image: color */ },
      bufferInfo: twgl.createBufferInfoFromArrays(this.gl, {
        'a_position': primitive,
        'a_texCoord': [
          0.0, 0.0,
          1.0, 0.0,
          0.0, 1.0,
          0.0, 1.0,
          1.0, 0.0,
          1.0, 1.0,
        ]
      })
    }
  }
}
