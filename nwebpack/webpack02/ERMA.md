mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev


webpack 或者 npx webpack  调用webpack(内置 字体 文件 Asset Modules)

css less sass
npm install --save-dev style-loader css-loader

npm install --save-dev csv-loader xml-loader


管理输出
npm install --save-dev html-webpack-plugin
清理插件
npm install --save-dev clean-webpack-plugin
node服务
npm install --save-dev webpack-dev-server

"start": "webpack serve --open Chrome.exe",
node 服务中间件
npm install --save-dev express webpack-dev-middleware



main bundle 会随着自身的新增内容的修改，而发生变化。
vendor bundle 会随着自身的 module.id 的变化，而发生变化。
manifest runtime 会因为现在包含一个新模块的引用，而发生变化。