// External modules
const path = require('path')
const gulp = require('gulp')
const autoLoadPlugins = require('gulp-load-plugins')
const runSequence = require('run-sequence')
const gulpTaskLoader = require('gulp-task-loader')

// Automatically load tasks from `options.dir`
gulpTaskLoader({
  src: path.join(__dirname, '_src'),
  dest: path.join(__dirname, 'dist'),
  plugins: autoLoadPlugins(),
  dir: 'dev-tasks' // load gulp tasks from this dir
})

gulp.task('release', onTaskReadyCallback => {
  runSequence(
    'release-version-increment',
    'release-version-commit',
    'release-create-tag',
    ['build-with-webpack', 'release-generate-changelog', 'release-push'],
    'release-publish-to-github-pages',
    'release-create-on-github',
    onTaskReadyCallback
  )
})
