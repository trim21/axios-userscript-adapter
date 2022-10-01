module.exports = {
  entry: "./src/index.ts",
  output: {
    library: {
      name: "axiosGmxhrAdapter",
      type: "var",
      export: "default",
    },
    filename: "axiosGmxhrAdapter.min.js",
  },
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        // this will allow importing without extension in js files.
        // Use babel to transform TypeScript files, but babel has no
        // type checking, so we need ForkTsCheckerWebpackPlugin.
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "esbuild-loader",
          options: {
            loader: "ts",
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};
