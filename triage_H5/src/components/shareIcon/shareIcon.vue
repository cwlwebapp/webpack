<template>
  <div>
    <!-- class="iconfont icon-fenxiang1" v-if='isWxmp' -->
    <button v-show="isshowIcon" class="app-share" @click="click" :style="comshare"></button>
  </div>
</template>

<script>
export default {
  name: "shareIcon",
  data() {
    return {
      isWxmp: this.$util.isWxmp(),
      comshare: {
        backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/share.png" + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      },
      isshowIcon: true
    };
  },
  components: {},
  methods: {
    click() {
      if (this.$util.isWxmp()) {
        this.$share();
      } else if (this.$util.isApp()) {
        this.isshowIcon = false;
        if (!this.isshowIcon) {
          setTimeout(() => {
            this.$emit("goapp");
            this.isshowIcon = true;
          }, 300);
        }
      } else {
        this.$toast("暂不支持,敬请期待!");
            this.$share();
             
      }
    }
  },
  created(){
   
  }
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.app-share {
  width: rem(76);
  height: rem(76);

  position: fixed;
  right: rem(42);
  bottom: rem(42);
  font-size: rem(40);
  color: #525252;
  background-color: transparent;
  border: 0;
  z-index: 99;
}
</style>
