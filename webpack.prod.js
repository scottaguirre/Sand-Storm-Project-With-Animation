const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin"); // minify js
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // minify css

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets/dist"),
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
});
