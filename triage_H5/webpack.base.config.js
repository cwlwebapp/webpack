const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//分包路由
const routes = require("./src/config/routes.config");
function copyIt(from, to) {
  fs.writeFileSync(to, fs.readFileSync(from));
  //fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
}
const pathToFile = path.join(__dirname, "/src/templatement/template.js");
//文件处理
const fs = require("fs");
// 02入口处理文件指定文件夹 看new webpack.optimize.CommonsChunkPlugin
let entry = {},
  output = {};
//文件复制
if (process.env.env_config == "routers") {
  fs.readdir(path.join(__dirname, "/src/templatement"), function (error, data) {
    if (error) {
      console.log(error);
      return false;
    }
    data.forEach((item, index) => {
      if (item != "template.js") {
        fs.unlink(path.join(__dirname, "/src/templatement/" + item), function (error) {
          if (error) {
            console.log(error);
            return false;
          }
          console.log("删除文件成功");
        });
      }
    });

    console.log(data); //data是数组类型，包含文件夹以及文件的名字(只有第一级目录内容)。拿到一个文件夹下面的所有目录
  });

  routes.forEach((item) => {
    var newPathToFile = path.join(__dirname, `/src/templatement/${item.filename}.js`);
    // 只能删除空文件
    // fs.rmdir(path.join(__dirname, '/src/templatement'),function(error){
    //   console.log(error)
    // })

    copyIt(pathToFile, newPathToFile);
    fs.readFile(newPathToFile, "utf8", function (err, data) {
      fs.writeFileSync(newPathToFile, `import Routers from "../routes/${item.filename}";\n` + data);
    });
    entry[item.filename] = `./src/templatement/${item.filename}`;
    entry["vendors"] = "./src/vendors";
    output.path = path.join(__dirname, `./${item.filename}`);
  });
} else {
  entry.vendors = "./src/vendors";
  entry.main = "./src/main";
  output.path = path.join(__dirname, "./dist");
}

module.exports = {
  // entry: {
  //   main: "./src/main",
  //   vendors: "./src/vendors",
  // },
  entry,
  // output: {
  //   path: path.join(__dirname, "./dist"),
  // },
  output,
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              loaders: {
                less: ExtractTextPlugin.extract({
                  use: ["css-loader?minimize", "autoprefixer-loader", "less-loader"],
                  fallback: "vue-style-loader",
                }),
                css: ExtractTextPlugin.extract({
                  use: ["css-loader", "autoprefixer-loader", "less-loader"],
                  fallback: "vue-style-loader",
                }),
              },
            },
          },
          {
            loader: "iview-loader",
            options: {
              prefix: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          path.resolve("src"),
          path.resolve("test"),
          path.resolve("node_modules/vue-echarts"),
          path.resolve("node_modules/resize-detector"),
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "autoprefixer-loader"],
          fallback: "style-loader",
        }),
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "autoprefixer-loader", "less-loader"],
          fallback: "style-loader",
        }),
      },
      // {
      //     //从这一段上面是默认的！不用改！下面是没有的需要你手动添加，相当于是编译识别sass!
      //     test: /\.scss$/,
      //     loaders: ["style", "css", "sass"]
      //   },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "autoprefixer-loader", "sass-loader"],
          fallback: "style-loader",
        }),
      },
      // 指定文件包
      // {
      //   test: /\.(gif|jpg|png|woff|svg|eot|ttf|otf)\??.*$/,
      //   loader: "url-loader?limit=1024&name=apppage/[name].[ext]",
      //   loader: "url-loader?limit=1024&name=[pat][name].[ext]",
      // },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf|otf)\??.*$/,
        // loader: "url-loader?limit=1024&name=common/[name].[ext]",
        loader: "url-loader?limit=1024",
      },
      {
        test: /\.(html|tpl)$/,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    // 省略 文件后缀
    extensions: [".js", ".vue"],
    // 别名 文件
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": path.resolve("src"),
    },
  },
};
