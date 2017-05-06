const fs = require('fs')
const epithet = require('epithet')
const publishRelease = require('publish-release')
const requireUncached = require('require-uncached')

module.exports = function releaseUploadToGitHub (onTaskReadyCallback) {
  const version = requireUncached('../package.json').version
  const changelog = fs.readFileSync('./CHANGELOG.md', 'utf8').trim()

  publishRelease({
    token: process.env.AUTORELEASE_TO_GITHUB,
    tag: version,
    name: version + ' ' + epithet.choose(' '),
    notes: changelog,
    draft: false,
    prerelease: false,
    reuseRelease: true,
    reuseDraftOnly: true
  }, err => {
    return err ? onTaskReadyCallback(err) : onTaskReadyCallback()
  })
}
