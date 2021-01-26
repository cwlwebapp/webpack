// 地址
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //通过 npm 安装
module.exports = {
  // 单个文件
  // entry:'./hello.js',
  // 多给平行文件
  // entry:['./hello.js','./hello1.js'],
  entry: {
    main: "./hello.js",
    a: "./hello1.js",
  },
  output: {
    // index 所在的文件
    path: path.resolve(__dirname, "dist"),
    // 固定名字(打包文件夹)
    // filename:'bundle.js'
    // 动态名字 name对应 main 和a
    // filename:'[name]-[hash].js'
    //chunkhash 保证改变的文件
    filename: "js/[name]-[chunkhash].js",
    publicPath:  "xxx/",
  },
  plugins: [
      new HtmlWebpackPlugin({ 
      // 如果没有 template title映射到
      title:'xxx',
      // 引入模板覆盖
      template: "index.html" ,
      //inject:body是 js 引入位置
      inject:false,
      //代码压缩
      // minify:{
      //     //删除注释
      //   removeComments:true,
      //   //删除空格
      //   collapseWhitespace:true,
        
      // }

    })],
};
