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

const gl = twgl.getContext(document.getElementById('canvas'))
const programInfo = twgl.createProgramInfo(gl, [shaderVertex, shaderFragment])
const pixelRatio = window.devicePixelRatio

const firstTriangle = new Node({
  programInfo,
  uniforms: { u_color: [254 / 255, 116 / 255, 40 / 255, 1] },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, {
    a_position: [
      0, 0, 0,    
      1, 0, 0,
      0, 1, 0,
    ],
  })
})

const secondTriangle = new Node({
  programInfo,
  uniforms: { u_color: [255, 255, 255, 1] },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, {
    a_position: [
      1,  0, 0,          
      0,  0, 0,
      0, -1, 0,
    ],
  })
})

const thirdTriangle = new Node({
  programInfo,
  uniforms: { u_color: [255, 0, 100, 1] },
  bufferInfo: twgl.createBufferInfoFromArrays(gl, {
    a_position: [
      -1,  0, 0,          
       0, -1, 0,
       0,  0, 0,
    ],
  })
})

const objects = [
  firstTriangle,
  secondTriangle,
  thirdTriangle
]

const objectsToDraw = [
  firstTriangle.drawInfo,
  secondTriangle.drawInfo,
  thirdTriangle.drawInfo
]

function render(time): void {
  twgl.resizeCanvasToDisplaySize(gl.canvas, pixelRatio)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  objectsToDraw.forEach(drawInfo => {
    gl.useProgram(drawInfo.programInfo.program)
    twgl.setBuffersAndAttributes(gl, drawInfo.programInfo, drawInfo.bufferInfo)
    twgl.setUniforms(drawInfo.programInfo, drawInfo.uniforms)
    twgl.drawBufferInfo(gl, drawInfo.bufferInfo)
  })

  requestAnimationFrame(render)
}

requestAnimationFrame(render)
