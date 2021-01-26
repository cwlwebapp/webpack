module.exports = {
    mode: "production",
    //入口文件
    entry: "./app/index.js",
    //出口文件
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "temp/",
    },
  
    devServer: {
      contentBase: "./",
      host: "localhost",
      compress: true,
      port: 1717,
    },
  
    module: {
      rules: [
        // loader 改变js 状态
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: "babel-loader",
          query: {
            presets: ["es2015", "react"],
          },
        },
      ],
    },
  };