import Vue from "vue";
import index from "./index.vue";

const MyComponent = Vue.extend(index);
index.trans = function (itemlist, i) {
  let data = {
    itemlist,
    i,
  };
  var component = new MyComponent({ data }).$mount();
  let dom=document.getElementById("edituser")
  if(i!=0){
    dom.replaceChild(component.$el,dom.children[0]);
  }else{
    dom.appendChild(component.$el);
  }

  // return component.aa
  return component;
};

export default index;
