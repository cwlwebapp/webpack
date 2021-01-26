const movement = require("@/page/movement");
const applyfor = require("@/page/applyfor");
const routers = [
  //===================app
  {
    path: "/movement",
    name: "movement",
    meta: {
      title: "运动方案",
    },
    component:movement
    // component: (resolve) => require(["@/page/movement"], resolve),
  },
  {
    path: "/movement/applyfor",
    name: "applyfor",
    meta: {
      title: "我要申请",
    },
    component:applyfor
    // component: (resolve) => require(["@/page/applyfor"], resolve),
  },
];
export default routers;
