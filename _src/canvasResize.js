// https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
export default function canvasResize (canvas) {
  // Lookup the size the browser is displaying the canvas.
  const display = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }

  // Check if the canvas is not the same size.
  if (unlikeWidthAndHeight(canvas, display)) {
    // Make the canvas the same size
    canvas.width = display.width
    canvas.height = display.height
  }

  return display
}

function unlikeWidthAndHeight (src, tgt) {
  return src.width !== tgt.width || src.height !== tgt.height
}
