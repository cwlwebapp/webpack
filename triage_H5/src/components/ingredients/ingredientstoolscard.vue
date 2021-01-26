<template>
  <div class="ingredientstools-attention-card">
    <div class="ingredientstools-attention-card-head">
      <div class="ingredientstools-attention-card-head-left">
        <img
          :src="
            itme.icon ||
            'https://ysch-haoermei.oss-cn-shenzhen.aliyuncs.com/nutrition/type/' +
              itme.imgid +
              '.png'
          "
          alt=""
        />
        <div class="ingredientstools-attention-card-head-left-title">
          <div class="ingredientstools-attention-card-head-left-title-head">
            {{ itme.name
            }}<span v-show="itme.subhead">({{ itme.subhead }})</span>
          </div>
          {{ itme.des }}
        </div>
      </div>
      <slot></slot>
      <!-- <div class="ingredientstools-attention-card-head-right">
        {{ itme.num }} <span>(千克/100g)</span>
      </div> -->
    </div>
    <div class="ingredientstools-attention-card-bottom">
      <div v-for="(zitme, zindex) in itme.taglist" :key="zindex">
        <img :src="zitme.tagicon | tagicon" alt="" /> {{ zitme.tagname }}
      </div>
    </div>
  </div>
</template>

<script>
let ke = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/yi.png";
let yi = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/ke.png";
let sh = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/sh.png";
export default {
  data() {
    return {};
  },
  props: ["itme"],
  filters: {
    tagicon(val) {
      if (val == -1) {
        return sh;
      } else if (val == 0) {
        return ke;
      } else if (val == 1) {
        return yi;
      }
    },
  },
  components: {},

  created() {},
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.ingredientstools-attention-card {
  background-color: #fff;
  // min-height: rpx(240);
  border: 1px solid #dddddd;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  // border-radius: rpx(16);
  padding: rpx(30);
  // margin-bottom: rpx(14);
  // 卡片头部
  .ingredientstools-attention-card-head {
    display: flex;
    justify-content: space-between;
    .ingredientstools-attention-card-head-left {
      display: inline-flex;
      & > img {
        width: rpx(128);
        height: rpx(128);
        background: #f5f5f5;
        border: 1px solid #f5f5f5;
        border-radius: rpx(16);
        margin-right: rpx(30);
      }
      .ingredientstools-attention-card-head-left-title {
        font-size: rpx(28);
        color: #666666;
        .ingredientstools-attention-card-head-left-title-head {
          font-size: rpx(36);
          font-weight: 550;
          color: #000000;
          margin-bottom: rpx(18);
          & > span {
            font-size: rpx(24);
            color: #666666;
            display: inline-block;
            transform: scale(0.8);
          }
        }
      }
    }
    // .ingredientstools-attention-card-head-right {
    //   font-size: rpx(32);
    //   font-family: DIN;
    //   font-weight: bold;
    //   color: #000000;
    //   span {
    //     display: inline-block;
    //     transform: scale(0.8);
    //     font-size: rpx(20);
    //     color: #999999;
    //   }
    // }
  }
  // 卡片底部
  .ingredientstools-attention-card-bottom {
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 33%;
      line-height: rpx(60);
      // margin-right: rpx(60);
      & > img {
        width: rpx(24);
        height: rpx(24);
      }
      // &:nth-of-type(3n) {
      //   margin-right: 0;
      // }
    }
  }
}
</style>
