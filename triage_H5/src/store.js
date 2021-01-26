import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 全局变量
const state = {
  // 页面加载时
  pageLoading: false,
  // 数据加载时
  dataLoading: false,
  comshare: {},
  // 骨架屏展示
  skeleton: false,
  // 音频图标
  calendaricon: 0,
  // 音频锁
  lock:false,
  // 时间同步
  timelock:null,
  xaxis:[""]
};
// computed作用
const getters = {
  calendaricon: (state) => {
    return state.calendaricon;
  },
};

// 数据处理
const mutations = {
  // 触发状态
  // 页面加载时
  setPageLoading(state, payload) {
    state.pageLoading = payload;
  },
  // 数据加载时
  setDataLoading(state, payload) {
    state.dataLoading = payload;
  },
  // 当前页面路径
  setPath(state, payload) {
    state.path = payload;
  },
  // 导航标题(使用)
  setNav(state, payload) {
    state.navList = payload;
  },
  changed(state, payload) {
    state.cwlreport = payload;
  },
  // 骨架屏
  skeleton(state, payload) {
    state.skeleton = payload;
  },
  // 音频图标
  calendaricon(state, payload) {
    state.calendaricon = payload;
  },
  // 音频图标内容
  setlock(state, payload) {
    state.lock = payload;
  },
  // 时间同步
  settimelock(state, payload) {
    state.timelock = payload;
  },
  setxaxis(state, payload) {
    state.xaxis = payload;
  }


};
// 异步处理
import Axios from "axios";
const actions = {
  message() {
    return Axios.request({
      url: "/ajax/user/wx/information/detail",
      method: "get",
      params: {
        contentId: 408,
      },
    }).then((res) => {
      return Promise.resolve(res);
    });
  },
  // 音频图标
  // calendaricon({ commit }) {
  //   commit("calendaricon");
  // },
};
export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
});
