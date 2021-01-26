import Vue from "vue";
import VueRouter from "vue-router";
import Routers from "./routes/router";
import Util from "./libs/util";
import Conf from "./libs/conf";
import Hm from "./libs/hm";
import Logger from "./libs/logger";
import App from "./App.vue";
import store from "./store";
import Axios from "axios";
import VueCookies from "vue-cookies";

import "babel-polyfill";

console.log(Routers,'------------')

//vant
import {
  PullRefresh,
  Toast,
  List,
  Progress,
  Form,
  Field,
  Button,
  Uploader,
  Image as VanImage,
  RadioGroup,
  Radio,
  Dialog,
  NumberKeyboard,
  DatetimePicker,
  Skeleton,
  Swipe,
  SwipeItem,
  Lazyload,
  Picker,
} from "vant";

Vue.use(VanImage);
Vue.use(Progress);
Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(List);
Vue.use(Progress);
Vue.use(Form);
Vue.use(Field);
Vue.use(Uploader);
Vue.use(Button);
Vue.use(VanImage);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);
Vue.use(NumberKeyboard);
Vue.use(DatetimePicker);
Vue.use(Skeleton);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Picker);

// Array.prototype.remove = function (val) {
//   var index = this.indexOf(val);
//   if (index > -1) {
//     this.splice(index, 1);
//   }
// };

Object.defineProperty(Array.prototype, "remove", {
  value: function (item) {
    var idx = this.indexOf(item);
    if (idx >= 0) {
      return this.splice(idx, 1);
    }
    return null;
  },
});

// console.log(Array.prototype)

Vue.prototype.$Dialog = Dialog;

import element from "@/components/specialist/element.js";
Vue.prototype.$cwlalert = element.$cwlalert;

// 自定义全局分享
import share from "@/components/share/share";
Vue.prototype.$share = share.install;

import shareIcon from "@/components/shareIcon/shareIcon";
Vue.component(shareIcon.name, shareIcon);

import specialist from "@/components/specialist/specialist";
Vue.component(specialist.name, specialist);

Vue.prototype.$util = Util;
Vue.prototype.$logger = Logger;

// import html2canvas from "html2canvas";
Vue.prototype.$htmlcanvas = function (dom) {
  app.shareScreenShot("");
  // // store.commit("setDataLoading", true);
  // html2canvas(dom, {
  //   width: dom.offsetWidth,
  //   height: dom.offsetHeight,
  //   scale: 0.1,
  //   useCORS: true,
  // }).then((canvas) => {
  //   let url = canvas.toDataURL("image/png", 0.1);
  //   console.log(url,'url')
  //   let app = url.split(",")[1];
  //   // store.commit("setDataLoading", false);
  //   return
  //   app.shareScreenShot(app);
  // });
};

//路由
Vue.use(VueRouter);
const RouterConfig = {
  mode: "history",
  routes: Routers,
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  Util.title(to.meta.title);
  // if(to.name!='apppage'&&to.name!='movement'){
  if (
    to.name != "apppage" &&
    to.name != "noData" &&
    to.name != "traditional" &&
    to.name != "healthreportlist" &&
    to.name != "history" &&
    to.name != "healthreport" &&
    to.name != "applyfor"
  ) {
    store.commit("skeleton", true);
  }

  if (to.path) {
    Hm.trackPageview(to.fullPath);
  }
  next();
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

// import ECharts from "vue-echarts";
// Vue.component("v-chart", ECharts);

//ajax
// 添加请求拦截器
let num = 0;

const MobileDetect = require("mobile-detect");
Vue.use(VueCookies);
// Axios.defaults.baseURL = "http://192.168.1.128:7007";
Vue.prototype.$http = Axios;
Axios.interceptors.request.use(
  (config) => {
    let md = new MobileDetect(window.navigator.userAgent);
    config.headers["a"] = getA();
    config.headers["b"] = md.mobile() + "_" + md.os();
    config.headers["v"] = Conf.getVersion();
    config.headers["source"] = Conf.getAppName() + "-" + Util.getOS() + "-web";
    // config.headers["Accept-Encoding"] = "*";

    store.commit("setDataLoading", true);
    num++;
    return config;
  },
  (error) => {
    num--;
    store.commit("setDataLoading", false);
    store.commit("skeleton", false);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    num--;
    if (num == 0) {
      store.commit("setDataLoading", false);
      store.commit("skeleton", false);
    }
    // alert(JSON.stringify(response));
    if (response.status === 200) {
      let data = response.data;
      // Logger.info(window.navigator.userAgent);
      // Logger.info(data);
      if (data.respStatus === 3001) {
        // need login
        if (Util.isWxmp()) {
          let url = encodeURIComponent(window.location.href);
          wx.miniProgram.redirectTo({
            url: "/pages/webview/redirect?webview=" + url,
          });
          return;
        } else if (Util.isApp()) {
          let url = encodeURIComponent(window.location.href);
          app.navigateTo(url);
          location.reload();
          return;
        } else {
          Toast("未登录，请登录。");
        }
      } else if (data.respStatus == 0) {
        // router.replace({name:'noData'})
        Toast("出错了，请稍候再试。");
        return Promise.reject(response);
      } else if (data.respStatus == 2004) {
        Toast(data.respDesc);
        return Promise.reject(response);
      } else if (data.respStatus >= 1000) {
        if (data.respDesc != null && data.respDesc != "") {
          Toast(data.respDesc);
        } else {
          Toast("出错了，请稍候再试。code:" + data.respStatus);
        }
        return Promise.reject(response);
      }
      return Promise.resolve(data);
    } else {
      Toast("出错了，请稍候再试:" + response.status);
      return Promise.reject(response);
    }
  },
  (error) => {
    num--;
    store.commit("setDataLoading", false);
    store.commit("skeleton", false);
    if (error.response && error.response.status) {
      switch (error.response.status) {
        default:
          break;
      }
      Toast("http错误:" + error.response.status);
    }
    return Promise.reject(error.response);
  }
);

function getA() {
  let uuid = VueCookies.get("__uuid__");
  if (uuid == null) {
    uuid = Util.uuid();
    VueCookies.set("__uuid__", uuid);
  }
  return uuid;
}

//图标
import "./style/icon/icon.css";
// import "./style/font/font.css";

import "iview/dist/styles/iview.css";
import { Timeline, TimelineItem, Icon } from "iview";
Vue.component("Timeline", Timeline);
Vue.component("TimelineItem", TimelineItem);
Vue.component("Icon", Icon);



new Vue({
  el: "#app",
  store: store,
  router: router,
  render: (h) => h(App),
});
