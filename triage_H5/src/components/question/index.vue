<template>
  <div ref="dom" class="food_content" :style="{backgroundImage:'url('+imglsit[i]+')'}">
    <div class="food_line" v-for="(item,index) in itemlist" :key="index">
      <img class="food_icon" :src="foodIconlist(index)" />
      {{index|type}}:{{item|con}}
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
let a = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/01.png";
let b = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/02.png";
let c = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/03.png";
let d = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/04.png";
let e = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/05.png";
let f = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/06.png";
let g = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/07.png";
let food_icon1 = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/food_icon1.png";
let food_icon2 = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/food_icon2.png";
let food_icon3 = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/food_icon3.png";
let dir = document.documentElement.clientWidth / 375;
export default {
  data() {
    return {
      imglsit: [a, b, c, d, e, f, g],
      food_iconlist: [food_icon1, food_icon2, food_icon3],
    };
  },
  filters: {
    type(value) {
      let obj = {
        breakfast: "早餐",
        lunch: "午餐",
        supper: "晚餐",
        type: function (value) {
          return this[value];
        },
      };
      return obj.type(value);
    },

    con(value) {
      let arr = [],
        str = "";
      value.forEach((item, index) => {
        arr.push(item.name);
      });
      str = arr.join("+");
      return str.length > 16 ? str.slice(0, str.lastIndexOf("+")) : str;
    },
  },
  computed: {},
  methods: {
    foodIconlist(value) {
      let obj = {
        breakfast: 0,
        lunch: 1,
        supper: 2,
      };
      return this.food_iconlist[obj[value]];
    },
    domimg(callback) {
      this.$nextTick(() => {
        let dom = this.$refs.dom;
        html2canvas(dom, {
          width: dom.offsetWidth,
          height: dom.offsetHeight,
          scale: 1,
          useCORS: true,
          async: true,
          allowTaint: true,
          taintTest: false,
          windowWidth: 375 * dir,
          windowHeight: 1500 * dir,
        }).then((canvas) => {
          let url = canvas.toDataURL("image/png", 0.8);
          callback(url);
        });
      });
    },
  },
  updated() {},
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.food_content {
  width: 100%;
  height: 100%;
  padding: rem(136) rem(32) 0;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  .food_line {
    font-size: rem(28);
    font-weight: 550;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: rem(40);

    .food_icon {
      width: rem(42);
      height: rem(42);
      margin-right: rem(18);
    }
  }
}
</style>
