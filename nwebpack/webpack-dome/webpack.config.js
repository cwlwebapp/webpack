// 地址
const path = require("path");
// html 注入
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 清除打包
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 导入webpack
const webpack = require("webpack");
// 替换用于提取manifest
var WebpackMd5Hash = require("webpack-md5-hash");
// css 分离
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 开启多线程
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); (有冲突)
// 开启 多线程 babel
var HappyPack = require("happypack");
var os = require("os");
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// var dirVars = require("../common/dir.js");

// var AssetsPlugin = require("assets-webpack-plugin"); //输出映射表

// const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 打包 单个压缩.gz
// const FileManagerPlugin = require("filemanager-webpack-plugin"); //打包zip 压缩

module.exports = {
  // 类型
  // mode: "development",
  // 工具方法
  // devtool: "inline-source-map",
  devtool: "eval-source-map",
  // 进入
  entry: {
    app: "./src/index.js",
    app1: "./src/index1.js",
    common: ["jquery", "lodash"],
    // print: "./src/print.js",
    // app: "./src/index.js",
    // //  公共的技术 例如 jquery  echarts 等
    // vendors: "./src/vendors",
  },

  //   externals: {   //关键 cdn  参看:https://www.jianshu.com/p/f4a4f2bfb1e3
  //     'vue': 'Vue',
  //     'vue-router': 'VueRouter',
  //     // 'vuex': 'Vuex',
  //     'axios': 'axios',
  //     'element-ui': 'ELEMENT'
  // },
  // 解析模板 例如 vue .tpl 等 自定义文件夹
  module: {
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   loader: "babel",
      //   include: "./src/index.js",
      //   query: {
      //     presets: ["es2015"],
      //   },
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          // use: "css-loader",
          use: ["happypack/loader?id=postcss"],
        }),
      },
    ],
  },
  // 输出
  output: {
    // filename: "[name].[chunkhash:8].js",
    filename: "[name].[hash:6].bundle.js",
    path: path.resolve(__dirname, "dist"),
    // //publicPath: "/", //绝对路径
    publicPath: "./", //相对路径
    // 拆分包(有冲突)
    // filename: "_dll_[name].js",
    // library: "_dll_[name]",
  },
  // 服务内容
  devServer: {
    // 引入的文件
    contentBase: "./dist",
    // 热更新
    hot: true,
  },
  // 插件
  plugins: [
    // 开启多线程 (有冲突)
    // new UglifyJSPlugin({
    //   parallel: true,
    // }),
    // 拆分包(有冲突)
    //   new webpack.DllPlugin({
    //     name: '_dll_[name]', // name === output.library
    //     path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    // }),
    // 开启 多线程 babel
    new HappyPack({
      id: "happybabel",
      loaders: ["babel-loader?cacheDirectory=true"],
      threadPool: happyThreadPool,
      // cache: true,
      verbose: true,
    }),

    // 清除插件
    new CleanWebpackPlugin(),

    // 注入插件
    new HtmlWebpackPlugin({
      title: "Output Management",
    }),

    // 公共代码
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "common",

    // }),
    // 公共代码进阶版
    new webpack.optimize.CommonsChunkPlugin({
      //name: "common",
      name: ["react", "lodash"], // 用于提取manifest
      minChunks: Infinity,
    }),

    new WebpackMd5Hash(), //替换用于提取manifest
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "manifest", // 用于提取manifest
    // }),
    //热更新
    new webpack.HotModuleReplacementPlugin(),
    // 固定id
    new webpack.HashedModuleIdsPlugin(),
    // 有冲突
    // new AssetsPlugin({
    //   filename: "static/dll/libs-rev-manifest.json",
    // }),

    // new FileManagerPlugin({
    //   onEnd: {
    //     // mkdir: ['./dist'], // 新加的一句代码
    //     delete: ["./dist.zip"],
    //     archive: [{ source: "./dist", destination: "./dist.zip" }],
    //   },
    // }),
    // new CompressionWebpackPlugin({
    //   // asset: "[path].gz[query]",
    //   filename: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: ["js", "css"],
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
  ],

  performance: {
    hints: false,
  },
};

// webpack's Watch Mode——解决自刷脚本的问题
// webpack‐dev‐server ——解决了自刷脚本+自刷样式+自刷内容的问题
// webpack‐dev‐middleware ——解决了自刷脚本+自刷样式+自刷内容的问题

// 作者：一点金光
// 链接：https://www.jianshu.com/p/0fa0f2cb64c6
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
