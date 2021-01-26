const routers = [
  //===================ap
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
