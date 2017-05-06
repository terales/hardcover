// https://webglfundamentals.org/webgl/lessons/webgl-2d-rotation.html
const radiansPerDegree = Math.PI / 180

export default function hardcoverSetRotation ({gl, rotationLocation, rotation = 0}) {
  const angleInRadians = rotation * radiansPerDegree
  gl.uniform2fv(rotationLocation, [
    Math.sin(angleInRadians),
    Math.cos(angleInRadians) ])
  return rotation
}
