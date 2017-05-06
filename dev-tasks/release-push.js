module.exports = function releasePush (onTaskReadyCallback) {
  this.opts.plugins.git.push(
    'origin',
    'master',
    { args: '--tags' },
    onTaskReadyCallback
  )
}
