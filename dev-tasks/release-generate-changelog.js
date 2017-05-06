const fs = require('fs')
const conventionalChangelog = require('conventional-changelog')

module.exports = function releaseGenerateChangelog () {
  // See documentation: https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/gulp-conventional-changelog
  const options = { preset: 'angular', releaseCount: 1 }
  const context = {}
  const gitRawCommitsOpts = {}
  const parserOpts = {}
  const writerOpts = { headerPartial: '' }

  return conventionalChangelog(
    options,
    context,
    gitRawCommitsOpts,
    parserOpts,
    writerOpts
  ).pipe(fs.createWriteStream('CHANGELOG.md'))
}
