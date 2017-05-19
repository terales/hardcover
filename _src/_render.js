// @flow

// Import third-party modules
import twgl from '../node_modules/twgl.js/dist/3.x/twgl'
import {m4} from '../node_modules/twgl.js/dist/3.x/twgl-full'

// Loacel constants
const pixelRatio = window.devicePixelRatio

export default function render (
  gl: WebGLRenderingContext,
  objects: Array<Object>,
  currentTime: number
): void {
  twgl.resizeCanvasToDisplaySize(gl.canvas, pixelRatio)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  gl.enable(gl.CULL_FACE)
  gl.enable(gl.DEPTH_TEST)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // TODO set zNear to `hardcover Z position - hardcover width`,
  // so the front cover while opening will be inside frustrum
  const projectionMatrix = m4.perspective(45 * Math.PI / 180, gl.canvas.width / gl.canvas.height, 100, 501)

  const objectsDrawInfo = objects.map(object => {
    object.drawInfo.uniforms.u_matrix = m4.multiply(projectionMatrix, object.worldMatrix)
    return object.drawInfo
  })

  twgl.drawObjectList(gl, objectsDrawInfo)

  window.requestAnimationFrame(render.bind(null, gl, objects))
}
