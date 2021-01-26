import Vue from "vue";
import element from "./element.vue";
// 初始化组件
const myelement = Vue.extend(element);
element.$cwlalert = function (userid, start, end, errorlist, router) {
  // data 数据传递(显示 隐藏)
  let data = {
    iselement: true,
    userid,
    start,
    end,
    errorlist,
  };

  var component = new myelement({ data, router }).$mount();
  document.body.appendChild(component.$el);
  // 显示 隐藏
  // Vue.nextTick(() => {
  //   myelement.iselement = true
  //   // iselement 和弹窗组件里的show对应，用于控制显隐
  // })
};

export default element;
