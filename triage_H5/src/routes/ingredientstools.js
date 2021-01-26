const routers = [
  //===================app
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
];
export default routers;
