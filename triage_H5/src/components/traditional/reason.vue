<template>
  <div class="reason">
    <div class="reason-card" v-for="(itme, index) in content" :key="index">
      <div class="reason-title">
        {{ index | type }}、{{ Object.keys(itme)[0] }}
      </div>
      <p class="reason-description">
        {{ Object.values(itme)[0] && Object.values(itme)[0].join("") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
    console.log(this.content, "===content");
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.reason {
  background: #f9f9fb;
  .reason-card {
    padding: rpx(30);
    background-color: #fff;
    margin-bottom: rpx(16);
    .reason-title {
      height: rpx(88);
      line-height: rpx(88);
      color: #7c4b00;
      font-size: rpx(28);
      font-weight: bold;
    }
    .reason-description {
      font-size: rpx(28);
      color: #666;
    }
  }
}
</style>
