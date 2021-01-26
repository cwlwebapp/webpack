<template>
  <div class="spirit">
    <div class="spirit-img">
      <img :src="health" alt="" />
    </div>
    <div
      class="spirit-description"
      v-for="(itme, index) in content"
      :key="index"
    >
      <div class="spirit-description-title">
        {{ index | type }}、{{ Object.keys(itme)[0] }}
      </div>
      <p class="spirit-description-des">
        {{ Object.values(itme).join(" ") }}
      </p>
    </div>
  </div>
</template>

<script>
let health =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/health.png";
export default {
  data() {
    return {
      health,
    };
  },
  props: ["content"],
  filters: {
    type(val) {
      let obj = {
        0: "一",
        1: "二",
        2: "三",
        3: "四",
        4: "五",
        5: "六",
        6: "七",
        7: "八",
        8: "九",
      };
      return obj[val];
    },
  },
  components: {},
  created() {
    console.log;
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.spirit {
  padding: rpx(30) rpx(30) rpx(50);
  .spirit-img {
    height: rpx(342);
    text-align: center;
    line-height: rpx(342);
    overflow: hidden;
    border: 1px solid #cccccc;
  }
  .spirit-description {
    .spirit-description-title {
      height: rpx(86);
      line-height: rpx(86);
      color: #7c4b00;
      font-weight: bold;
      font-size: rpx(32);
    }
    .spirit-description-des {
      color: #666;
      line-height: rpx(42);
      font-size: rpx(28);
      margin-bottom: rpx(20);
    }
  }
}
</style>
