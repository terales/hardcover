// @flow

// Import third-party modules
import twgl from '../node_modules/twgl.js/dist/3.x/twgl'

// Loacel constants
const pixelRatio = window.devicePixelRatio

export default function render (
  gl: WebGLRenderingContext,
  objectsToDraw: Array<Object>,
  currentTime: number
): void {

  twgl.resizeCanvasToDisplaySize(gl.canvas, pixelRatio)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  // gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  twgl.drawObjectList(gl, objectsToDraw)

  window.requestAnimationFrame(render.bind(null, gl, objectsToDraw))
}
