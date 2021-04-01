const path = require("path")
const config = []

function generateConfig (name) {
  let prod = name.indexOf("min") > -1
  return {
    mode: prod ? "production" : "development",
    entry: path.resolve(__dirname, "src/index.ts"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: name + ".js",
      sourceMapFilename: name + ".map",
      library: "axiosGmxhrAdapter",
      libraryTarget: "umd",
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader",
        },
      ],
    },
    optimization: {
      minimize: prod,
    },
    devtool: "source-map",
  }
}

["axiosGmxhrAdapter", "axiosGmxhrAdapter.min"].forEach(function (key) {
  config.push(generateConfig(key))
})

module.exports = config
