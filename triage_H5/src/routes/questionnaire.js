const routers = [
  //===================app
  {
    path: "/questionnaire",
    name: "questionnaire",
    meta: {
      title: "测评问卷",
    },
    component: (resolve) => require(["@/page/questionnaire/questionnaire"], resolve),
  },
  {
    path: "/questionnaire/questionReport",
    name: "questionReport",
    meta: {
      title: "我的饮食方案",
    },
    component: (resolve) => require(["@/page/questionnaire/questionReport"], resolve),
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
