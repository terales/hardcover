const gitHubPages = require('gh-pages')

module.exports = function releasePublishToGitHubPages (onTaskReadyCallback) {
  gitHubPages.publish(this.opts.dest, error => {
    return error ? onTaskReadyCallback(error) : onTaskReadyCallback()
  })
}
