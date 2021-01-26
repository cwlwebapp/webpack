// 地址
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //通过 npm 安装
var path=require('path')
module.exports = {
  // 单个文件
  // entry:'./hello.js',
  // 多给平行文件
  // entry:['./hello.js','./hello1.js'],
  entry: {
    main: "./main.js"
  },
  output: {
    // index 所在的文件
    path: path.resolve(__dirname, "dist"),
    // 固定名字(打包文件夹)
    filename:'bundle.js',
    // 动态名字 name对应 main 和a
    // filename:'[name]-[hash].js'
    //chunkhash 保证改变的文件
    // filename: "js/[name]-[chunkhash].js",
    //指定链接内容(预加载)
    publicPath: "http://con.com//",
  },
  module: {
    loaders: [
      {
        //匹配文件
        test: /\.js$/,
        loader: "babel-loader",
        //除了包含
        // exclude:'./node_modules/', //相对路径
        exclude:path.resolve(__dirname,'node_modules'),//绝对路径
        // inculde:'',  包含某文件下
        //inculde:'./',
        inculde:path.resolve(__dirname,'/'),//绝对路径
        // loaders :[] 包含文件处理
        query:{
          presets:['es2015']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 如果没有 template title映射到
      title: "a.html",
      // 引入模板覆盖
      // template: "index.html",
      //inject:body是 js 引入位置
      inject: false,
      // 别名
      filename: "index.html",
      //允许添加的 entry 对应的key
      chunks: ["main", "a"],
      //排除
      // excludeChunks: ["b", "c"],
    }),


  ],
};
