// Thanks to http://stackoverflow.com/a/22948794/1363799
const BOOK_ASPECT_RATIO = 0.71 // from http://artgorbunov.ru/projects/book-ui/

export default function hardcoverWidthClipspace (canvasWidth, canvasHeight) {
  const hardcoverWidthPixels = canvasHeight * BOOK_ASPECT_RATIO
  const hardcoverWidthRelativeToCanvas = hardcoverWidthPixels / canvasWidth

  // Proportion:
  // hardcoverWidthRelativeToCanvas -- x
  //                              1 -- 2
  return hardcoverWidthRelativeToCanvas * 2
}
