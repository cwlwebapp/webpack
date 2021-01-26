const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const fs = require("fs");

fs.open("./src/config/env.js", "w", function (err, fd) {
  const buf = 'export default "production";';
  fs.write(fd, buf, 0, buf.length, function (err, written, buffer) {});
});

const envConfig = process.env.env_config;

const env_js = require("./src/config/" + envConfig + ".env.js");

// const FileManagerPlugin = require("filemanager-webpack-plugin"); //打包zip 压缩
// const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 打包 单个压缩.gz

module.exports = merge(webpackBaseConfig, {
  output: {
    // publicPath: env_js.staticUrl + "/",
    publicPath:  "./",
    filename: "js/[name].[hash].js",
    // 分包 动态加载 ()
    chunkFilename: "js/[name].[hash].chunk.js",
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/[name].[hash].css",
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      filename: "js/vendors.[hash].js",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/template/index.ejs",
      inject: false,
    }),
    // new FileManagerPlugin({
    //   onEnd: {
    //     //mkdir: ['./dist'], // 新加的一句代码
    //     delete: ["./dist.zip"],
    //     archive: [{ source: "./dist", destination: "./dist.zip" }],
    //   },
    // }),
    // new CompressionWebpackPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: ["js", "css"],
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
  ],
});
