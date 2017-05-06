module.exports = function releaseVersionCommit () {
  const git = this.opts.plugins.git

  return this.gulp.src('./package.json')
    .pipe(git.add())
    .pipe(git.commit('chore(release): bump version for release'))
}
