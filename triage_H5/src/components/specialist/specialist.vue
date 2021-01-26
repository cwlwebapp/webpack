<template>
  <div class="specialist">
    <img :src="specialist" alt="" />
  </div>
</template>

<script>
let specialist = require("../../assets/image/specialist.png");
export default {
  name: "specialist",
  data() {
    return {
      specialist,
    };
  },
  components: {},
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.specialist {
  position: fixed;
  right: 0;
  top: rpx(502);
  width: rpx(164);
  height: rpx(78);
  & > img {
    width: rpx(164);
    height: rpx(78);
  }
}
</style>
