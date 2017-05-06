export default function hardcoverSetTranslation ({gl, translationUniformLocation, desiredTranslation, hardcoverWidth}) {
  const translation = desiredTranslation || getInitialTranslation(hardcoverWidth)
  gl.uniform2fv(translationUniformLocation, translation)
  return translation
}

function getInitialTranslation (hardcoverWidth) {
  return [
    -hardcoverWidth / 2, // move left from center by half of hardcover width
    0.8 // from http://artgorbunov.ru/projects/book-ui/
  ]
}
