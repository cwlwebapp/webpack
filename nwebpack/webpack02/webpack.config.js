const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    // print: './src/print.js',
    another: './src/another-module.js',
  },
  // 防止重复引入依赖
  // entry: {
  //   index: {
  //     import: './src/index.js',
  //     dependOn: 'shared',
  //   },
  //   another: {
  //     import: './src/another-module.js',
  //     dependOn: 'shared',
  //   },
  //   shared: 'lodash',
  // },
  output: {
    // filename: '[name].bundle.js',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  // 防止重复引入依赖
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
   splitChunks: {
     cacheGroups: {
       vendor: {
         test: /[\/]node_modules[\/]/,
         name: 'vendors',
         chunks: 'all',
       },
     },
   },
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // 热更新
    hot: true,
    open: 'Chrome.exe'
  },
  plugins: [
    // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
    // new CleanWebpackPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Caching',
    }),
  ],


};