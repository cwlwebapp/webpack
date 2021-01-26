const routers = [
  //===================app
  {
    path: "/traditional",
    name: "traditional",
    meta: {
      title: "中医体质测评",
    },
    component: (resolve) => require(["@/page/traditional/traditional"], resolve),
  },
  {
    path: "/traditional/healthreport",
    name: "healthreport",
    meta: {
      title: "我的体质报告",
    },
    component: (resolve) => require(["@/page/traditional/healthreport"], resolve),
  },
  {
    path: "/traditional/healthreportlist",
    name: "healthreportlist",
    meta: {
      title: "中医疗养方案",
    },
    component: (resolve) => require(["@/page/traditional/healthreportlist"], resolve),
  },
];
export default routers;
