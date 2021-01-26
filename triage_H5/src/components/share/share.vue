<template>
  <transition name="fade">
    <div class="mask" v-if="show" @click="show=!show">
      <img :src="imgUrl" alt="">
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      imgUrl: ""
    };
  },
  components: {}
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
// 渐变过渡
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #000000, $alpha: .3);
  z-index: 1000;
  img {
    width: 100%;
  }
}
</style>
