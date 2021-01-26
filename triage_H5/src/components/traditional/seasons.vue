<template>
  <div>
    <div
      class="seasons"
      v-for="(itme, index) in content"
      :key="index"
      v-show="Object.values(itme).length != 0"
    >
      <div class="seasons-head">
        <img :src="index | type" alt="" />
      </div>
      <div class="seasons-img">
        <img :src="index | otype" alt="" />
      </div>
      <p
        class="seasons-description"
        v-for="(oitem, oindex) in Object.values(itme) && Object.values(itme)[0]"
        :key="oindex"
      >
        {{ oitem }}
      </p>
    </div>
  </div>
</template>

<script>
let vitality =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/vitality.png";
let summer =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/summer.png";
let autumn =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/autumn.png";
let winter =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/winter.png";

let vitality_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/vitality_icon.png";
let summer_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/summer_icon.png";
let autumn_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/autumn_icon.png";
let winter_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/winter_icon.png";
export default {
  data() {
    return {
      vitality,
      summer,
      autumn,
      winter,
    };
  },
  props: ["content"],
  filters: {
    type(val) {
      let obj = {
        0: vitality,
        1: summer,
        2: autumn,
        3: winter,
      };
      return obj[val];
    },
    otype(val) {
      let obj = {
        0: vitality_icon,
        1: summer_icon,
        2: autumn_icon,
        3: winter_icon,
      };
      return obj[val];
    },
  },
  components: {},
  created() {
    // console.log(Object.values(this.content[1]),'=========content')
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.seasons {
  padding: 0 rpx(30) rpx(40);
  .seasons-head {
    height: rpx(170);
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
      width: rpx(98);
      height: rpx(112);
    }
  }
  .seasons-img {
    height: rpx(386);
    text-align: center;
    line-height: rpx(386);
    overflow: hidden;
    // border: 1px solid #ccc;
    margin-bottom: rpx(26);
  }
  .seasons-description {
    font-size: rpx(28);
    line-height: rpx(42);
    color: #7c4b00;
  }
}
</style>
