const path = require('path')
const srcPath = path.join(__dirname, '_src')
const distPath = path.join(__dirname, 'dist')

module.exports = {
  context: srcPath,
  entry: path.join(srcPath, '_entry.js'),
  devtool: 'inline-source-map',
  output: {
    path: distPath,
    filename: 'hardcover-bundle.js'
  },
  module: {
    rules: [
      { test: /\.glsl/, loader: 'shader-loader' },
      { test: /\.js/, loader: 'remove-flow-types-loader'}
    ]
  },
  devServer: {
    contentBase: distPath
  }
}
