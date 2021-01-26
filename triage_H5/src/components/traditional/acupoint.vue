<template>
  <div class="acupoint">
    <div class="acupoint-img">
      <img class="acupoint-icon" :src="acupoint" alt="" />
      <div
        class="acupoint-des"
        :style="{
          backgroundImage: 'url(' + acup_des + ')',
        }"
        ref="xuewei"
      >
        【穴位适用的按摩方法】使用手指或者点穴器，在穴位上采用按揉的方法。每天2~3次，每次2~3分钟，自我感觉酸胀为度。<span
          v-if="leade != 7"
          >配合艾灸，效果更佳！</span
        >
        <img
          alt=""
          :src="calendaricon1 ? headset_active : headset"
          @click="calendarlisten1('xuewei')"
        />
      </div>
    </div>
    <div class="acupoint_detail" v-for="(item, index) in content" :key="index">
      <div class="acupoint_detail_title">
        <span
          :style="{
            backgroundImage: 'url(' + acupoint_title + ')',
          }"
          class=""
          >{{ item["穴位"] }}
          <img
            :src="
              oldindex == index && calendaricon ? headset_active : headset_off
            "
            @click="calendarlisten(item['定位'] + '取穴' + item['取穴'], index)"
            alt=""
          />
        </span>
      </div>
      <p class="acupoint_detail_des_title">【定位】</p>
      <p class="acupoint_detail_des">
        {{ item["定位"] && item["定位"].join("") }}
      </p>
      <p class="acupoint_detail_des_title">【取穴】</p>
      <div class="acupoint_detail_des bottom">
        <div v-for="(zitem, zindex) in item['取穴']" :key="zitem">
          {{ zitem }}
        </div>
      </div>

      <div class="acupoint_detail_des_img">
        <img :src="item['图片']" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
let acupoint =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/acupoint.png";
let acup_des =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/acup_des.png";

let acupoint_title =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/acupoint_title.png";
var headset =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset.png";
var headset_off =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_off.png";
var headset_active =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_active.png";
import {
  deleteHtmlTag,
  listeninit,
  socketsend,
  audio,
} from "../../libs/weekconfig";
let aud = null;
let aud1 = null;
// this.oldindex = null;
export default {
  data() {
    return {
      acupoint,
      acup_des,
      acupoint_title,
      headset,
      headset_off,
      headset_active,
      // 语音
      calendaricon: false,
      calendaricon1: false,
      oldindex: null,
    };
  },
  props: ["content", "leade"],
  components: {},
  methods: {
    // 语音
    calendarlisten(val, index) {
      if (aud1) {
        aud1.pause();
        this.calendaricon1 = false;
        aud1 = null;
      }

      if (this.oldindex == index && aud) {
        if (this.calendaricon) {
          aud.pause();
          this.calendaricon = false;
        } else {
          aud.play();
          this.calendaricon = true;
          aud.addEventListener("pause", () => {
            this.calendaricon = false;
          });
        }
      } else {
        if (aud) {
          aud.pause();
          aud = null;
        }
        this.calendaricon = true;
        let str = "";
        // console.log(val, "===val");
        str = "穴位" + val;
        this.oldindex = index;

        socketsend(str, (au) => {
          aud = audio(au);
          aud.play();
          console.log(this.calendaricon, this.oldindex, "=========");
          this.calendaricon = true;
          aud.addEventListener("pause", () => {
            this.calendaricon = false;
          });
        });
      }
    },
    // 语音
    calendarlisten1(val) {
      if (aud) {
        aud.pause();
        this.calendaricon = false;
        aud = null;
        this.calendaricon1 = false;
      }
      if (aud1) {
        if (this.calendarlisten1) {
          aud1.pause();
          this.calendaricon1 = false;
        } else {
          aud1.play();
          this.calendaricon1 = true;
          aud1.addEventListener("pause", () => {
            this.calendaricon1 = false;
          });
        }
      } else {
        this.calendaricon1 = true;
        let str = "";
        str = deleteHtmlTag(this.$refs[val].innerHTML);
        socketsend(str, (au) => {
          aud1 = audio(au);
          aud1.play();
          aud1.addEventListener("pause", () => {
            this.calendaricon = false;
          });
        });
      }
    },
  },
  created() {
    listeninit();
    console.log(this.content, "===");
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.acupoint {
  padding: rpx(30) rpx(30) 0 rpx(30);
  .acupoint-img {
    position: relative;
    margin-bottom: rpx(60);
    .acupoint-icon {
      width: rpx(365);
      height: rpx(710);
    }
    .acupoint-des {
      position: absolute;
      left: rpx(306);
      top: rpx(180);
      width: rpx(390);
      // height: rpx(242);
      padding: rpx(36) rpx(8) rpx(36) rpx(54);
      color: #ffffff;
      font-size: rpx(24);
      line-height: rpx(36);
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      & > img {
        width: rpx(28);
        height: rpx(26);
      }
    }
  }
  .acupoint_detail {
    .acupoint_detail_title {
      // height: rpx(160);
      // display: flex;
      // align-items: center;
      // justify-content: center;
      margin-bottom: rpx(32);
      text-align: center;
      // display: inline-flex;

      & > span {
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: rpx(210);
        height: rpx(60);
        line-height: rpx(60);
        text-align: center;
        font-weight: 500;
        color: #ffffff;
        font-size: rpx(32);
        padding: rpx(12) rpx(24);
        letter-spacing: rpx(4);
        & > img {
          width: rpx(28);
          height: rpx(26);
        }
      }
    }
    .acupoint_detail_des_title {
      color: #7c4b00;
      font-weight: 500;
      font-size: rpx(28);
      margin-left: rpx(-14);
    }
    .acupoint_detail_des {
      color: #666;
      font-size: rpx(28);
      line-height: rpx(42);
      padding: rpx(32) 0 rpx(40);
      &.bottom {
        padding-bottom: rpx(32);
      }
      & > div {
        line-height: rpx(42);
      }
    }
    .acupoint_detail_des_img {
      text-align: center;
      margin-bottom: rpx(80);
      & > img {
        // width: rpx(236);
        // height: rpx(200);
        width: rpx(686);
        height: rpx(488);
      }
    }
  }
}
</style>
