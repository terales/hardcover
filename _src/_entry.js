import shaderVertex from './shaderVertex.glsl'
import shaderFragment from './shaderFragment.glsl'

import twgl from '../node_modules/twgl.js/dist/3.x/twgl'
import {m4} from '../node_modules/twgl.js/dist/3.x/twgl-full'

const gl = twgl.getContext(document.getElementById('canvas'))
const programInfo = twgl.createProgramInfo(gl, [shaderVertex, shaderFragment])

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
}
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

function render(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  var uniforms = {
    time: time * 0.001,
    resolution: [gl.canvas.width, gl.canvas.height],
  }

  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo)

  requestAnimationFrame(render)
}

requestAnimationFrame(render)
