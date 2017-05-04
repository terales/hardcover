// Thanks to http://stackoverflow.com/a/22948794/1363799
const BOOK_ASPECT_RATIO = 0.71 // from http://artgorbunov.ru/projects/book-ui/

export default function bookWidthClipspace (canvasWidth, canvasHeight) {
  const bookWidthPixels = canvasHeight * BOOK_ASPECT_RATIO
  const bookWidthRelativeToCanvas = bookWidthPixels / canvasWidth

  // Proportion:
  // bookWidthRelativeToCanvas -- x
  //                         1 -- 2
  return bookWidthClipspace = bookWidthRelativeToCanvas * 2
}
