const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
// const ManifestPlugin = require("manifest-webpack-plugin");
// const offlinePlugin = require("offline-plugin");
const GeneraterAssetPlugin = require('generate-asset-webpack-plugin')
// https://www.cnblogs.com/chidaozhi/p/10270545.html  配置json 文件
const webpackBaseConfig = require("./webpack.base.config.js");
const fs = require("fs");
//分包路由
const routes = require("./src/config/routes.config");

fs.open("./src/config/env.js", "w", function (err, fd) {
  const buf = 'export default "production";';
  fs.write(fd, buf, 0, buf.length, function (err, written, buffer) {});
});

const envConfig = process.env.env_config;

const env_js = require("./src/config/" + envConfig + ".env.js");

// const FileManagerPlugin = require("filemanager-webpack-plugin"); //打包zip 压缩
// const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 打包 单个压缩.gz

// 分包路由(指定路由)
let arr = [];
// routes.forEach((item) => {
//   // let url = `/src/${item}.js`;
//   arr.push(
//     new HtmlWebpackPlugin({
//       filename: `${item.filename}/index.html`,
//       template: "./src/template/index1.ejs",
//       inject: true,
//       chunks: [item.filename + "/" + item.filename,item.filename + "/vendors"]
//     })
//   );
// });
routes.forEach((item) => {
  // let url = `/src/${item}.js`;
  arr.push(
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/template/index1.ejs",
      inject: true,
    })
  );
});
var option = require("./manifest.json");

const createJson = function(compilation) {
  return JSON.stringify(option)
}

module.exports = merge(webpackBaseConfig, {
  output: {
    // publicPath: env_js.staticUrl + "/",
    publicPath: "./",
    filename: "js/[name].[hash].js",
    // 分包的根源
    // chunkFilename: "[name]/js/[name].[hash].chunk.js",
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/[name].[hash].css",
      allChunks: true,
    }),

    // 01文件过大 进行拆分(插件) 看webpack.base.config 配置
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendors",
    //   filename: "js/vendors.[hash].js",
    // }),

    //   new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendors",
    //   filename: "apppage/vendors.[hash].js",
    // }),

    // 该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    // 注释 和警告
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    ...arr,
     // 缓存文件
    //  new ManifestPlugin(path.join('questionnaire', 'manifest.json'))
     // 缓存
    //new offlinePlugin(),
    //
    new GeneraterAssetPlugin({
      filename: 'manifest.json',//输出到dist根目录下的serverConfig.json文件,名字可以按需改
      fn: (compilation, cb) => {
        console.log(createJson(compilation),'====')
        cb(null, createJson(compilation));
      }
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
