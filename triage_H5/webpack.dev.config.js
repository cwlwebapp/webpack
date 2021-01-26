const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const fs = require("fs");

fs.open("./src/config/env.js", "w", function(err, fd) {
  const buf = 'export default "development";';
  fs.write(fd, buf, 0, buf.length, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
  devtool: "#source-map",
  output: {
    path: path.join(__dirname, "./dist-dev"),
    publicPath: "/",
    filename: "js/[name].js",
    chunkFilename: "js/[name].chunk.js"
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/[name].css",
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      filename: "js/vendors.js"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/template/index.ejs",
      inject: false
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: { color: true },
    proxy: {
      "/ajax": {
        target: "http://192.168.1.128:8870", //接口服务器域名
        //target: "https://ystest.yschsz.com:7007", //接口服务器域名
        changeOrigin: true,
        pathReWrite: { "^/ajax": "/ajax" }
      },
      "/action": {
        target: "http://192.168.1.128:8870", //接口服务器域名
        changeOrigin: true,
        pathReWrite: { "^/action": "/action" }
      }
    }
  }
});
