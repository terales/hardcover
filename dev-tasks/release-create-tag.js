const requireUncached = require('require-uncached')

module.exports = function releaseCreateTag (onTaskReadyCallback) {
  const git = this.opts.plugins.git
  const version = requireUncached('../package.json').version

  git.tag(version, 'chore(release): create tag for version ' + version, error => {
    if (error) {
      return onTaskReadyCallback(error)
    }

    onTaskReadyCallback()
  })
}
