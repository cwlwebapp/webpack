const apppage = require("@/page/apppage");
const routers = [
  //===================app
  {
    path: "/apppage",
    name: "apppage",
    meta: {
      title: "好尔美评估",
    },
    // component: (resolve) => require(["@/page/apppage"], resolve),
    component: apppage,
  },
];
export default routers;
