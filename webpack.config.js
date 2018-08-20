const path = require('path')
const config = []

function generateConfig (name) {
  let uglify = name.indexOf('min') > -1
  let config = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'axiosGmxhrAdapter',
      libraryTarget: 'umd'
    },
    node: {
      process: false
    },
    optimization: {
      minimize: false
    },
    devtool: 'source-map'
  }

  if (uglify) {
    config.optimization.minimize = true
  }

  return config
}

[
  'axiosGmxhrAdapter',
  'axiosGmxhrAdapter.min',
].forEach(function (key) {
  config.push(generateConfig(key))
})

module.exports = config