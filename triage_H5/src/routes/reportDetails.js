const routers = [
  //===================app
  {
    path: "/reportDetails",
    name: "reportDetails",
    meta: {
      title: "报告详情",
    },
    component: (resolve) => require(["@/page/reportDetails"], resolve),
  },
  {
    path: "/uroscopy",
    name: "uroscopy",
    meta: {
      title: "尿检报告详情",
    },
    component: (resolve) => require(["@/page/uroscopy"], resolve),
  },
];
export default routers;
