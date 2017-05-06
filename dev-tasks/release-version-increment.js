const conventionalRecommendedBump = require('conventional-recommended-bump')

module.exports = function releaseIncrementVersion (onTaskReadyCallback) {
  conventionalRecommendedBump(
    { preset: 'angular' },
    writeVersion.bind(this, onTaskReadyCallback)
  )
}

function writeVersion (onTaskReadyCallback, err, { releaseType }) {
  if (err) this.opts.plugins.util.log(err)

  return this.gulp.src(this.opts.src)
    .pipe(this.opts.plugins.bump({ type: releaseType }))
    .pipe(this.gulp.dest(this.opts.dest))
    .on('end', onTaskReadyCallback)
}
