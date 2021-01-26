import Vue from "vue";
import priaudio from "./priaudio.vue";

const MyComponent = Vue.extend(priaudio);
priaudio.replace = function (audio, i) {
  let data = {
    audio: audio, //音频标签
    i: i, //索引,
  };
  var component = new MyComponent({ data }).$mount();
  audio[i].parentNode.replaceChild(component.$el, audio[i]);
};

export default priaudio;
