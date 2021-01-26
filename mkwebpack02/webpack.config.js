// 地址
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //通过 npm 安装
module.exports = {
  // 单个文件
  // entry:'./hello.js',
  // 多给平行文件
  // entry:['./hello.js','./hello1.js'],
  entry: {
    main: "./main.js",
    a: "./a.js",
    b: "./b.js",
    c: "./c.js",
  },
  output: {
    // index 所在的文件
    
    path: path.resolve(__dirname, "dist"),
    // 固定名字(打包文件夹)
    // filename:'bundle.js'
    // 动态名字 name对应 main 和a
    // filename:'[name]-[hash].js'
    //chunkhash 保证改变的文件
    filename: "[name]/[name]-[chunkhash].js",
    //指定链接内容(预加载)
    publicPath: "http://con.com//",
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 如果没有 template title映射到
      title: "a.html",
      // 引入模板覆盖
      template: "index.html",
      //inject:body是 js 引入位置
      inject: false,
      // 别名
      filename: "a/a.html",
      //允许添加的 entry 对应的key
      chunks: ["main", "a"],
      //排除
      // excludeChunks: ["b", "c"],
    }),
    new HtmlWebpackPlugin({
      // 如果没有 template title映射到
      title: "b.html",
      // 引入模板覆盖
      template: "index.html",
      //inject:body是 js 引入位置
      inject: false,
      // 别名
      filename: "b/b.html",
      //允许添加的 entry 对应的key
      chunks: ["main", "b"],
      // //排除
      // excludeChunks: ["a", "c"],
    }),
    new HtmlWebpackPlugin({
      // 如果没有 template title映射到
      title: "c.html",
      // 引入模板覆盖
      template: "index.html",
      //inject:body是 js 引入位置
      inject: false,
      // 别名
      filename: "c/c.html",
      //允许添加的 entry 对应的key
      chunks: ["main", "c"],
      // //排除
      // excludeChunks: ["a", "c"],
      minify: {
        //删除注释
        removeComments: true,
      },
    }),
  ],
};
