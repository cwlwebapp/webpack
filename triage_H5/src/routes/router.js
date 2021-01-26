const routers = [

    // ========================================================图表
  // {
  //   path: "/echarts",
  //   name: "echarts",
  //   meta: {
  //     title: "echarts",
  //   },
  //   component: (resolve) => require(["@/page/echarts"], resolve),
  // },

  // ------------------------不要得周报
  // {
  //   path: "/index",
  //   name: "index",
  //   meta: {
  //     title: "周报详情",
  //   },
  //   component: (resolve) => require(["@/page/index"], resolve),
  // },
  // {
  //   path: "/month",
  //   name: "month",
  //   meta: {
  //     title: "月报详情",
  //   },
  //   component: (resolve) => require(["@/page/month"], resolve),
  // },
  // {
  //   path: "/weeklylist", // 以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
  //   name: "weeklylist",
  //   meta: {
  //     title: "周报",
  //   },
  //   component: (resolve) => require(["@/page/weeklyList"], resolve),
  // },
  // {
  //   path: "/noData",
  //   name: "noData",
  //   meta: {
  //     title: "周报",
  //   },
  //   component: (resolve) => require(["@/page/noData"], resolve),
  // },

  // ============================资讯001
  //===================app
  // {
  //   path: "/apppage",
  //   name: "apppage",
  //   meta: {
  //     title: "好尔美评估",
  //   },
  //   component: (resolve) => require(["@/page/apppage"], resolve),
  // },
  // {
  //   path: "/message",
  //   name: "message",
  //   meta: {
  //     title: "健康资讯",
  //   },
  //   component: (resolve) => require(["@/page/message"], resolve),
  // },

  // ===========================报告详情
  // {
  //   path: "/reportDetails",
  //   name: "reportDetails",
  //   meta: {
  //     title: "报告详情",
  //   },
  //   component: (resolve) => require(["@/page/reportDetails"], resolve),
  // },
  // 尿检报告=============================
  // {
  //   path: "/uroscopy",
  //   name: "uroscopy",
  //   meta: {
  //     title: "尿检报告详情",
  //   },
  //   component: (resolve) => require(["@/page/uroscopy"], resolve),
  // },
  // =============================上传文件
  // {
  //   path: "/filesUpload",
  //   name: "filesUpload",
  //   meta: {
  //     title: "上传文件",
  //   },
  //   component: (resolve) => require(["@/page/filesUpload"], resolve),
  // },

  // ===========================评卷调查

  // {
  //   path: "/questionnaire",
  //   name: "questionnaire",
  //   meta: {
  //     title: "测评问卷",
  //   },
  //   component: (resolve) => require(["@/page/questionnaire/questionnaire"], resolve),
  // },
  // {
  //   path: "/questionnaire/questionReport",
  //   name: "questionReport",
  //   meta: {
  //     title: "我的饮食方案",
  //   },
  //   component: (resolve) => require(["@/page/questionnaire/questionReport"], resolve),
  // },
  // {
  //   path: "/applyfor",
  //   name: "applyfor",
  //   meta: {
  //     title: "我要申请",
  //   },
  //   component: (resolve) => require(["@/page/applyfor"], resolve),
  // },

  // ================运动
  // {
  //   path: "/movement",
  //   name: "movement",
  //   meta: {
  //     title: "运动方案",
  //   },
  //   component: (resolve) => require(["@/page/movement"], resolve),
  // },
  // {
  //   path: "/movement/applyfor",
  //   name: "applyfor",
  //   meta: {
  //     title: "我要申请",
  //   },
  //   component: (resolve) => require(["@/page/applyfor"], resolve),
  // },
  // ===========================================================周报
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

  // ---------------------------食材工具
  {
    path: "/ingredientstools",
    name: "ingredientstools",
    meta: {
      title: "食材工具",
    },
    component: (resolve) => require(["@/page/ingredientstools/ingredientstools"], resolve),
  },
  {
    path: "/ingredientstools/ingredientstlist",
    name: "ingredientstlist",
    meta: {
      title: "食物黑白榜",
      keepAlive: true
    },
    component: (resolve) => require(["@/page/ingredientstools/ingredientstlist"], resolve),
  },
  {
    path: "/ingredientstools/ingredientsdetail",
    name: "ingredientsdetail",
    meta: {
      title: "食物详情",
    },
    component: (resolve) => require(["@/page/ingredientstools/ingredientsdetail"], resolve),
  },
  {
    path: "/ingredientstools/foodelements",
    name: "foodelements",
    meta: {
      title: "食物元素",
    },
    component: (resolve) => require(["@/page/ingredientstools/foodelements"], resolve),
  },

  // ---------------------------中医评测
  // {
  //   path: "/traditional",
  //   name: "traditional",
  //   meta: {
  //     title: "中医体质测评",
  //   },
  //   component: (resolve) => require(["@/page/traditional/traditional"], resolve),
  // },
  // {
  //   path: "/traditional/healthreport",
  //   name: "healthreport",
  //   meta: {
  //     title: "我的体质报告",
  //   },
  //   component: (resolve) => require(["@/page/traditional/healthreport"], resolve),
  // },
  // {
  //   path: "/traditional/healthreportlist",
  //   name: "healthreportlist",
  //   meta: {
  //     title: "中医疗养方案",
  //   },
  //   component: (resolve) => require(["@/page/traditional/healthreportlist"], resolve),
  // },
];
export default routers;
