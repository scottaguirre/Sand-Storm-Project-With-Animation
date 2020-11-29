const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    // This plugin will generate the html file for the index.pug file in the dist folder
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/views/index.pug',
      minify: false
  })
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
          MiniCssExtractPlugin.loader, // extract css and output it in a separate file but not minified
          "css-loader" /*convert css into js */,
          "postcss-loader",
          "sass-loader",
        ],
      },
       // Pug loader
       {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
    }
    ],
  },
};
