const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const glob = require("glob");

module.exports = {
  context: path.resolve(__dirname, "assets"),
  entry: "./src/index.js",
  plugins: [
    new ImageminPlugin({
      externalImages: {
        context: ".",
        sources: glob.sync("assets/src/images/**/*.{png,jpg,jpeg,gif,svg}"),
        destination: "assets/dist/images",
        fileName: "[name].[ext]",
      },
    }),
    new MiniCssExtractPlugin({ filename: "main.css" }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader" /*convert css into js */,
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
