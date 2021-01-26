webpack hello.js hello.js.js  --progress --display-modules --display-reasons --watch


 <script>  //资源打包进来
         <%= compilation.assets[htmlWebpackPlugin.files.js[0]].source() %>
  </script> 



page.json //babel 转换
"babel":{
        "presets":["latest"]
}