const routers = [
  //===================app
  {
    path: "/filesUpload",
    name: "filesUpload",
    meta: {
      title: "上传文件",
    },
    component: (resolve) => require(["@/page/filesUpload"], resolve),
  },
];
export default routers;
