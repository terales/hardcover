const webpack2 = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('../webpack.config.js')

module.exports = function buildWithWebpack (onTaskReadyCallback) {
  const isBuildReady = false
  const carriedOnWebpackDone = onWebpackDone.bind(
    null,
    isBuildReady,
    onTaskReadyCallback)

  // Update devtool so we will serve separate source maps
  webpackConfig.devtool = 'source-map'

  return this.gulp.src(this.opts.src + '_entry.js')
    .pipe(webpackStream(webpackConfig, webpack2, carriedOnWebpackDone))
    .pipe(this.gulp.dest(this.opts.dest))
    .on('end', () => {
      if (isBuildReady) {
        onTaskReadyCallback()
      }
    })
}

function onWebpackDone ({isBuildReady, callback}, nodeError, stats) {
  console.log(stats.toString({
    hash: false,
    version: false,
    chunks: false,
    timings: false,
    colors: true
  }))

  if (hasErrors(nodeError, stats)) {
    return callback(nodeError) // finish task with error
  }

  isBuildReady = true
}

function hasErrors (hardError, stats) {
  // for hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
  return [
    hardError,
    stats.hasErrors(),
    stats.hasWarnings()
  ].some(entry => entry)
}
