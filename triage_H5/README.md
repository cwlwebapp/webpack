# h5 template project

h5 template project

## 安装依赖
```
npm install
```
## 运行
### 开发环境
```
// 初次使用run init来创建index.html
npm run init
npm run dev

// 检测代码规范
npm run eslint
npm run eslint-fix
```
### 打包编译
```
// 测试环境打包 打包前先删除dist文件夹
npm run build:test
// 正式环境打包 打包前先删除dist文件夹
npm run build
```

### 配置代理
`webpack.dev.config.js`修改`devServer.proxy`
```
proxy:{
    '/ajax': {
        target:'http://127.0.0.1:8100',//接口服务器域名
        changeOrigin:true,
        pathReWrite:{'^/ajax': '/ajax'}
    }        
} 
```

## 目录结构
```
src
    config                /* 打包环境配置 */
    assets                /* 静态资源 */
    libs                  /* 基础库，conf.js应用配置, hm.js百度统计, util.js工具类 */
    styles                /* 样式 */
    template              /* 模板 */
    page                  /* vue页面 */
.gitignore
package.json              /* 包管理 */
README.md
webpack.base.config.js    /* webpack基础打包 */
webpack.dev.config.js     /* webpack开发环境打包 */
webpack.prod.config.js    /* webpack生产环境打包 */
```
## 分包配置
```
npm run build:routers

配置文件 src\config\routes.config.js

```

## pwa webapp manifest.json 文件配置

解决方案:https://segmentfault.com/a/1190000007754136

uni-app:https://ask.dcloud.net.cn/article/94
个人博客:https://blog.csdn.net/hellodake/article/details/84024148 
个人博客:https://zhuanlan.zhihu.com/p/90829472?from_voters_page=true


// 分包处理内容(静态文件- 动态生成)
// import Routers from "./router";
// import Routesconfig from "./config/routes.config";
// if (process.env.env_config != "routers") {
//   Routesconfig.forEach((item, index) => {
//     item.routename.forEach((ele) => {
//       console.log(  `@/page${ele.name == item.filename&&!ele.ispath ? "" : "/" + item.filename}/${ele.name}`,'===========')
//       Routers.push({
//         path: `${ele.name == item.filename ? "" : "/" + item.filename}/${ele.name}`,
//         name: ele.name,
//         meta: {
//           title: ele.title,
//         },
//         component: (resolve) =>
//           require([
//             `@/page${ele.name == item.filename&&!ele.ispath ? "" : "/" + item.filename}/${ele.name}`,
//           ], resolve),
//       });
//     });
//   });
// }


// 多页面处理:https://blog.csdn.net/talen123/article/details/80775674
