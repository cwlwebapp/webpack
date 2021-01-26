<template>
  <div @click="pageclick">
    <div class="head-content">
      <!-- 标题头部 -->
      <div class="traditional-head" v-show="$util.isApp()">
        <div>
          <img class="back" :src="back" @click="clickback" alt="" />
        </div>
        <span class="title"> {{ $route.meta.title }}</span>
        <div class="traditional-head-right">
          <img
            v-show="this.$route.query.page != 2"
            @click.stop="isshare = !isshare"
            class="giveup"
            :src="share"
            alt=""
          />
          <div
            v-show="isshare"
            class="giveup_icon"
            :style="{
              backgroundImage: 'url(' + share_icon + ')',
            }"
          >
            <div @click="evaluating"><img :src="anew" alt="" />重新测评</div>
            <div @click="clickgiveup">
              <img :src="abandon" alt="" />放弃方案
            </div>
          </div>
        </div>
      </div>
      <div class="head-content-title">
        【{{ disease.leade }}】
        <div class="traditional-head-right" v-show="$util.isWxmp()">
          <img
            v-show="this.$route.query.page != 2"
            @click.stop="isshare1 = !isshare1"
            class="giveup"
            :src="share"
            alt=""
          />
          <div
            v-show="isshare1"
            class="giveup_icon1"
            :style="{
              backgroundImage: 'url(' + share_icon + ')',
            }"
          >
            <div @click="evaluating"><img :src="anew" alt="" />重新测评</div>
            <div @click="clickgiveup">
              <img :src="abandon" alt="" />放弃方案
            </div>
          </div>
        </div>
      </div>
      <p
        class="head-content-description"
        v-html="disease['说明'] && disease['说明'].join(' ')"
      ></p>
      <ul class="switchtitle">
        <li
          :class="{ 'switchtitle-li': true, actve: item.active }"
          v-for="(item, index) in switchtitle"
          :key="index"
          v-show="!item.seasons"
          @click="select(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="content">
      <component
        :content="switchtitle[oldindex].content"
        :leade="$route.query.leade || 1"
        :is="switchtitle[oldindex].component"
        ref="comp"
      ></component>
    </div>
    <div
      class="headset"
      v-show="oldindex == 0 || oldindex == 3 || oldindex == 4"
    >
      <img
        :src="calendaricon ? headset_active : headset"
        @click="calendarlisten('comp')"
        alt=""
      />
    </div>
  </div>
</template>

<script>
let back =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/back.png";
let share =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/share.png";
let share_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/share_icon.png";
let anew =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/anew.png";
let abandon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/abandon.png";

var headset =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset.png";
var headset_active =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_active.png";

let reason = require("../../components/traditional/reason");
let acupoint = require("../../components/traditional/acupoint");
let diet = require("../../components/traditional/diet");
let seasons = require("../../components/traditional/seasons");
let spirit = require("../../components/traditional/spirit");

import { diseaselsit, diseasetype } from "./index.js";
import {
  deleteHtmlTag,
  listeninit,
  socketsend,
  audio,
} from "../../libs/weekconfig";
// // app 返回
// function goback() {
//     return true;
// }

// window.addEventListener("popstate", (event) => {
//   alert("123");
//   // app.goApp("finish");
// });

// alert("123");
let aud = null;
export default {
  data() {
    return {
      back,
      share,
      share_icon,
      anew,
      abandon,
      // 分享按钮
      isshare: false,
      isshare1: false,
      headset,
      headset_active,
      // 语音
      calendaricon: false,
      switchtitle: [
        {
          name: "原因",
          active: true,
          component: "reason",
          content: {},
        },
        {
          name: "穴位调养",
          active: false,
          component: "acupoint",
          content: {},
        },
        {
          name: "饮食调整",
          active: false,
          component: "diet",
          content: {},
        },
        {
          name: "四季养生",
          active: false,
          component: "seasons",
          content: {},
        },
        {
          name: "精神养生",
          active: false,
          component: "spirit",
          content: {},
        },
      ],
      oldindex: 0,
      disease: {
        leade: 1,
        desp: [],
      },
      page: null,
    };
  },
  components: {
    reason,
    acupoint,
    diet,
    seasons,
    spirit,
  },
  methods: {
    // 语音
    calendarlisten(val) {
      if (aud) {
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
        this.calendaricon = true;
        // console.log(val, , "==");
        let str = "";

        this.$refs[val].content.forEach((item, index) => {
          for (let key in item) {
            str += index + 1 + key + item[key].join();
          }
        });
        console.log(str, "==============keykeykey");
        // let str = deleteHtmlTag(this.$refs[val].innerHTML);
        socketsend(str, (au) => {
          aud = audio(au);
          aud.play();
          aud.addEventListener("pause", () => {
            this.calendaricon = false;
          });
        });
      }
    },
    // 返回监听
    callJsFunction() {
      return true;
    },
    // goback() {
    //   console.log(3);
    //   app.goApp("finish");
    // },
    // 全局
    pageclick() {
      if (this.isshare) {
        this.isshare = false;
      }
    },
    // 返回
    clickback() {
      if (this.$route.query.index && this.$route.query.index != undefined) {
        if (this.$util.isApp()) {
          app.goApp("finish");
        } else if (this.$util.isWxmp()) {
          wx.miniProgram.switchTab({
            url: "/pages/home/index/index",
          });
        } else {
          this.$toast("返回h5");
        }
        return;
      }

      if (this.page != undefined) {
        app.goApp("finish");
        return;
      }

      if (this.$util.isApp()) {
        app.goApp("finish");
      } else if (this.$util.isWxmp()) {
        this.$router.go(-1);
      } else {
        this.$router.go(-1);
      }
    },
    // 放弃测试
    clickgiveup() {
      this.$Dialog
        .confirm({
          title: " ",
          message:
            "您正在放弃" +
            this.disease.leade +
            "体质的疗养方案，所有体质资料将全部清空",
          confirmButtonText: "确定放弃",
        })
        .then((res) => {
          this.isshare = false;
          console.log(res, "===res");
          if (this.$util.isApp()) {
            this.giveuppage(() => {
              app.goApp("finish");
            });
          } else if (this.$util.isWxmp()) {
            // this.$toast("微信");
            this.giveuppage(() => {
              wx.miniProgram.switchTab({
                url: "/pages/home/index/index",
              });
            });

            return;
          } else {
            this.$toast("返回h5");
          }
          return;
          // on confirm
        })
        .catch((err) => {
          console.log(err, "===err");
          this.isshare = false;
          // on cancel
        });
    },
    // 放弃接口
    giveuppage(callback) {
      this.$http
        .request({
          url: "/ajax/web/tcm/cancel",
          method: "post",
        })
        .then((res) => {
          if (res && res.success) {
            if (callback) {
              callback();
            }
          }
          console.log(res, "===res");
        });
    },
    // 重新评测
    evaluating() {
      this.$Dialog
        .confirm({
          title: " ",
          message:
            "确定重新测评且放弃" + this.disease.leade + "体质的疗养方案嘛？",
          confirmButtonText: "确定放弃",
        })
        .then((res) => {
          console.log(res, "===res");
          this.isshare = false;
          if (this.$util.isApp()) {
            this.giveuppage(() => {
              this.$router.replace({ name: "traditional" });
            });
          } else if (this.$util.isWxmp()) {
            this.giveuppage(() => {
              if (this.$route.query.iswx) {
                this.$router.go(-2);
              } else {
                this.$router.replace({ name: "traditional" });
              }
            });
          } else {
            this.$toast("返回h5");
            this.giveuppage(() => {
              this.$router.replace({ name: "traditional" });
            });
          }
          return;
          // on confirm
        })
        .catch((err) => {
          console.log(err, "===err");
          this.isshare = false;
          // on cancel
        });
    },
    // 选择
    select(index) {
      if (aud) {
        aud.pause();
        aud = null;
      }
      this.switchtitle[this.oldindex].active = false;
      this.switchtitle[index].active = true;
      this.oldindex = index;
    },
    // 获取文章
    healthreportlist() {
      this.$http
        .request({
          url: "/ajax/user/web/getHealthArticle",
          method: "get",
        })
        .then((res) => {
          console.log(res, "===res");
          if (res && res.respBody) {
            let chinese_medicine = res.respBody.chinese_medicine;
            this.information(
              chinese_medicine[this.$route.query.leade || 9]
                .nutrition_article_id
            );
          } else {
            if (this.$util.isApp()) {
              app.goApp("finish");
            } else if (this.$util.isWxmp()) {
              wx.miniProgram.switchTab({
                url: "/pages/home/index/index",
              });
            }
          }
        });
    },
    // 健康资讯
    information(contentId) {
      this.$http
        .request({
          url: "/ajax/user/wx/information/detail",
          method: "get",
          params: {
            contentId,
          },
        })
        .then((res) => {
          if (res && res.respBody) {
            this.switchtitle[2].content = res.respBody;
          }
          console.log(res, "===res");
        });
    },
  },
  created() {
    this.$route.query.leade = 7;

    if (
      this.$route.query.leade == 9 &&
      this.$route.query.followe &&
      this.$route.query.followe != "null"
    ) {
      this.$route.query.leade = this.$route.query.followe;
    }

    if (this.$route.query.index && this.$route.query.index != undefined) {
      this.switchtitle[this.oldindex].active = false;
      this.switchtitle[this.$route.query.index].active = true;
      this.oldindex = this.$route.query.index;
    }

    if (this.$route.query.page && this.$route.query.page != undefined) {
      this.page = this.$route.query.page;
    }

    this.disease.leade = diseasetype[this.$route.query.leade];
    this.disease["说明"] = diseaselsit[this.$route.query.leade]["说明"];

    this.switchtitle[0].content = diseaselsit[this.$route.query.leade]["原因"];
    this.switchtitle[1].content = diseaselsit[this.$route.query.leade]["穴位"];

    this.switchtitle[3].content =
      diseaselsit[this.$route.query.leade]["四季养生"];
    if (diseaselsit[this.$route.query.leade]["四季养生"].length == 0) {
      // this.switchtitle.splice(3,1)
      this.switchtitle[3].seasons = true;
    }

    this.switchtitle[4].content =
      diseaselsit[this.$route.query.leade]["精神养生"];

    console.log(this.switchtitle, "======= this.switchtitle");
    this.healthreportlist();
    listeninit();
  },
  mounted() {
    window.callJsFunction = this.callJsFunction;
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.head-content {
  // height: rpx(390);
  background: #1b66ff;
  padding: 0 rpx(30);
  .traditional-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: rpx(32);
    font-weight: 400;
    color: #ffffff;
    letter-spacing: rpx(4);
    height: rpx(130);
    .title {
      flex: 2;
      text-align: center;
    }
    & > div {
      flex: 1;

      .back {
        width: rpx(48);
        height: rpx(48);
      }
      &.traditional-head-right {
        position: relative;
        .giveup {
          width: rpx(48);
          height: rpx(48);
        }
        .giveup_icon {
          position: absolute;
          right: rpx(-30);
          top: 100%;
          width: rpx(314);
          height: rpx(232);
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: left;
          padding-left: rpx(50);
          padding-top: rpx(56);
          padding-bottom: rpx(40);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          & > div {
            color: #ffffff;
            font-size: rpx(28);
            display: inline-flex;
            align-items: center;
            img {
              width: rpx(28);
              height: rpx(28);
              margin-right: rpx(26);
            }
          }
        }
      }
    }
    & > div:nth-of-type(2) {
      text-align: right;
    }
  }
  .head-content-title {
    height: repx(48);
    color: #ffffff;
    font-size: rpx(32);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .traditional-head-right {
      position: relative;
      .giveup {
        width: rpx(48);
        height: rpx(48);
      }
      .giveup_icon1 {
        position: absolute;
        right: rpx(-30);
        top: 80%;
        width: rpx(314);
        height: rpx(232);
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: left;
        padding-left: rpx(50);
        padding-top: rpx(56);
        padding-bottom: rpx(40);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 999;
        & > div {
          color: #ffffff;
          font-size: rpx(28);
          display: inline-flex;
          align-items: center;
          & > img {
            width: rpx(28);
            height: rpx(28);
            margin-right: rpx(26);
          }
        }
      }
    }
  }
  .head-content-description {
    color: #ffffff;
    font-size: rpx(24);
    line-height: rpx(36);
    padding: rpx(28) 0;
  }
  .switchtitle {
    height: rpx(102);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .switchtitle-li {
      color: #ffffff;
      opacity: 0.6;
      font-size: rpx(28);
      position: relative;
      &.actve {
        opacity: 1;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: rpx(-16);
          width: 100%;
          height: 2px;
          background-color: #ffffff;
        }
      }
    }
  }
}
.content {
  // padding: 0 rpx(30);
}
.headset {
  position: fixed;
  right: rpx(28);
  top: rpx(756);
  width: rpx(76);
  height: rpx(76);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1b66ff;
  border-radius: 50%;
  background-color: #ffffff;
  img {
    width: rpx(46);
    height: rpx(44);
  }
}
</style>
