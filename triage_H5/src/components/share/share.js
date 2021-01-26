import Vue from 'vue'
import Popup from './share.vue'

const PopupBox = Vue.extend(Popup)

Popup.install = function () {
  let data = {
   imgUrl: "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/message/share.png", // 顶部图片
  };

  let instance = new PopupBox({
    data
  }).$mount();

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.show = true
    // show 和弹窗组件里的show对应，用于控制显隐
  })
}

export default Popup
