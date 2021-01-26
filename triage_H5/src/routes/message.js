const message = require("@/page/message");
const routers = [
  //===================app
  {
    path: "/message",
    name: "message",
    meta: {
      title: "健康资讯",
    },
    // component: (resolve) => require(["@/page/message"], resolve),
    component: message,
  },
];
export default routers;
