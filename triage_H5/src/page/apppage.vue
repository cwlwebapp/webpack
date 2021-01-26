<template>
  <div class="app-page" :style="bg">
    <div class="app-title">好尔美健康</div>
    <div class="app-v">Version 3.6.0</div>
    <div class="app-bnt">
      <div :class=" {'bnt':true,'active':active==1}" @click="downapp(1)">下载应用</div>
      <div :class="['bnt',active==2?'active':'']" @click="downapp(2)">唤起应用</div>
    </div>
    <div class="swiper-content">
      <swiper class="swiper" :options="enterpriseOption">
        <swiper-slide v-for="(item,index) in swiperList" :key="index">
          <img class="swiper-img" :src="item" alt="图片" />
        </swiper-slide>
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>
      <div class="swiper-bottom">
        <p>深圳市雅士长华智能科技有限公司版权所有</p>
        <p>Copyright 2020 yschsz.com,All Rights Reserved</p>
        <p>粤ICP备18067700号</p>
      </div>
    </div>
    <div ref="oid" id="oid"></div>
  </div>
</template>

<script>
let lock = null;
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
var bg = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/apppage/app-bg.png";
var head = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/apppage/app-head.png";
var icon = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/apppage/app-icon.png";
import config from "@/libs/conf.js";
import util from "@/libs/util.js";

export default {
  data() {
    return {
      bg: {
        backgroundImage: "url(" + icon + "),url(" + head + "),url(" + bg + ")"
      },
      active: 1,
      enterpriseOption: {
        // loop : true,
        slidesPerView: 2
        // spaceBetween: 16,
        // slidesOffsetBefore: 14,
        // slidesOffsetAfter: 14
        // scrollbar: {
        //   el: ".swiper-scrollbar",
        //   hide: false
        // }
      },
      swiperList: [
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/apppage/swiper.png",
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/apppage/swiper1.png",
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/apppage/swiper2.png",
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/apppage/swiper3.png"
      ]
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    downapp(type) {
      if (util.checkPhone()) {
        if (type == 1) {
          if (lock) {
            return;
          }
          lock = true;
          setTimeout(() => {
            lock = false;
          }, 3000);
          this.active = type;
          window.location.href = config.androidDownloadUrl;
        } else if (type == 2) {
          if (lock) {
            return;
          }
          lock = true;
          setTimeout(() => {
            lock = false;
          }, 3000);
          this.active = type;
          window.location.href = config.androidUpUrl;
          setTimeout(() => {
            this.$toast("请先下载,再进行操作~");
          }, 5000);
        }
      } else {
        this.$toast("暂不支持，敬请期待~");
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/style/mixin";
.app-page {
  height: 100vh;
  background-position: center rem(28), top center, center;
  background-size: rem(146), 100% auto, 100%;
  background-repeat: no-repeat;
  .app-title {
    font-family: SourceHanSansCN-Regular;
    font-size: rem(36);
    font-weight: bold;
    line-height: rem(40);
    letter-spacing: rem(2);
    color: #333333;
    text-align: center;
    padding-top: rem(194);
    padding-bottom: rem(14);
  }
  .app-v {
    text-align: center;
    font-family: ArialMT;
    font-size: rem(28);
    // font-weight: bold;
    line-height: rem(40);
    color: #666666;
    padding-bottom: rem(4);
  }
  .app-bnt {
    .bnt {
      width: rem(436);
      height: rem(64);
      font-size: rem(28);
      text-align: center;
      line-height: rem(64);
      margin: 0 auto;
      &.active {
        color: #ffffff;
        background-color: #00a3ef;
      }
    }
  }
  .swiper-content {
    width: rem(680);
    height: rem(750);
    margin: rem(18) auto 0;
    background-color: #edf2f4;
    .swiper {
      padding: rem(40) 0 rem(40) 0;
      text-align: center;

      .swiper-slide {
        width: rem(284);
        height: rem(506);
        // background-color: #ff0;
        // margin: rem(48) 0;
        .swiper-img {
          width: 94%;
          // height: 90%;
        }
      }

      .swiper-scrollbar {
        height: 10px;
        background-color: #edf2f4;
      }
    }
    .swiper-bottom {
      padding-left: 15px;
      padding-top: rem(10);
      p {
        text-align: left;
        font-size: rem(24);
        // font-weight: bold;
        line-height: rem(40);
        color: #999999;
        // transform: scale(0.8);
        // position: relative;
        // left: rem(-50);
      }
    }
  }
}
</style>
