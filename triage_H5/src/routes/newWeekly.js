

const routers = [
  //===================app
  {
    path: "/newWeekly",
    name: "newWeekly",
    meta: {
      title: "健康周报",
    },
    component: (resolve) => require(["@/page/newWeekly"], resolve),
  },
  {
    path: "/applyfor",
    name: "applyfor",
    meta: {
      title: "我要申请",
    },
    component: (resolve) => require(["@/page/applyfor"], resolve),
  },
];
export default routers;
