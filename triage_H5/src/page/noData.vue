<template>
  <div class="no-data">
    <!-- <p class="head-icon">
      <span class="iconfont icon-back" @click="$router.go(-1)"></span>
    </p> -->
    <div class="title">
      <p>你还未生成任何报告</p>
      <p>快去记录数据吧~~</p>
    </div>
    <div class="ball">
      <img class="ball-icon" :src="doctor" alt />
    </div>
    <div class="bnt" @click="check">记录健康数据</div>
  </div>
</template>
<script>
import Util from "../libs/util";
export default {
  data() {
    return {
      doctor:
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/nodata/doctor.png",
    };
  },
  methods: {
    check() {
      Util.goApp({ url: "check" });
    },
  },
  components: {},
  created() {},
};
</script>
<style lang='scss' scoped>
@import "src/style/mixin";

.no-data {
  display: flex;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  position: relative;
  .head-icon {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 rem(28);
    width: 100%;
    height: rem(88);
    color: #ccc;
    span {
      font-size: rem(24);
    }
  }

  .title {
    p {
      font-size: rem(32);
      color: #969696;
    }
  }
  .ball {
    width: rem(300);
    height: rem(300);
    border-radius: 50%;
    background-color: #4dbbf7;
    position: relative;
    .ball-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: rem(-113);
      margin-top: rem(-198);
      width: rem(226);
      height: rem(396);
    }
  }
  .bnt {
    width: rem(500);
    height: rem(100);
    text-align: center;
    line-height: rem(100);
    background-color: #0199fc;
    font-size: rem(32);
    color: #fff;
    border-radius: rem(12);
  }
}
</style>
