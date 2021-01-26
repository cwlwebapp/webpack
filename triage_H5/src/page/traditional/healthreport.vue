<template>
  <div>
    <div
      class="healthreport"
      :style="{
        backgroundImage: 'url(' + healthreport_bg + ')',
      }"
    >
      <!-- 标题头部 -->
      <div class="traditional-head">
        <div>
          <img
            v-show="!$util.isWxmp()"
            class="back"
            @click="clickback"
            :src="back"
            alt=""
          />
        </div>
        <span class="title"> {{ $route.meta.title }}</span>
        <div>
          <img
            v-show="page != 2"
            class="giveup"
            @click="clickgive"
            :src="giveup"
            alt=""
          />
        </div>
      </div>
      <!-- 卡片内容 -->
      <div class="traditional-card">
        <div class="traditional-card-title">
          {{ disease.leader }}
          <span v-show="disease.follower">倾向{{ disease.follower }}</span
          ><img
            :src="calendaricon ? headset_active : headset"
            @click="calendarlisten('desp')"
            alt=""
          />
        </div>
        <div class="traditional-card-description" ref="desp">
          <div v-for="(itme1, index1) in disease.desp" :key="'desp' + index1">
            <p v-html="itme1"></p>
          </div>
        </div>
        <p class="traditional-card-narrate">
          ①《中医体质分类与判定》是中华中医药学会于2009年4月9日颁布的国家标准。②多种体质并存是多数人的状态，不必过于担心，调整生活方式是有改变的可能的。
        </p>
      </div>
      <!-- 体质描述 -->
      <div class="traditional-report-title">
        <img :src="icon" alt="" />
        {{ disease.leader }}，是什么意思
        <img :src="icon" alt="" />
      </div>
      <!-- 描叙 -->
      <div
        class="traditional-report-describe"
        :style="{
          backgroundImage:
            'url(' +
            describe_icon +
            '),url(' +
            describe_top +
            '),url(' +
            describe_bottom +
            '),url(' +
            describe_middle +
            ')',
        }"
        v-for="(item2, index2) in disease['说明']"
        :key="'describe' + index2"
      >
        {{ item2 }}
      </div>

      <!-- 简介 -->
      <div class="traditional-report-title traditional-report-introduction">
        <img :src="icon" alt="" />
        {{ disease.leader }}的主要症状
        <img :src="icon" alt="" />
      </div>
      <!-- 简介内容 -->
      <div
        class="traditional-introduction"
        :style="{
          backgroundImage: 'url(' + introduction + ')',
        }"
        v-for="(item3, index3) in disease['症状']"
        :key="'introduction' + index3"
      >
        <span
          :style="{
            backgroundImage: 'url(' + introduction_icon + ')',
          }"
          class="traditional-introduction-icon"
          >{{ index3 + 1 }}</span
        >
        <div class="traditional-introduction-head">
          {{ Object.keys(item3) && Object.keys(item3)[0] }}
        </div>
        {{
          item3[Object.keys(item3)[0]] && item3[Object.keys(item3)[0]].join()
        }}
      </div>
      <!-- 导致的疾病 -->
      <div class="traditional-report-title traditional-report-introduction">
        <img :src="icon" alt="" />
        {{ disease.leader }}容易导致的疾病
        <img :src="icon" alt="" />
      </div>
      <!-- 疾病标签 -->
      <ul class="diseaselabel">
        <li
          v-for="(itme4, index4) in disease['容易导致的疾病']"
          :key="'diseaselabel' + index4"
          :class="{
            'diseaselabel-li': true,
            active:
              itme4[Object.keys(itme4)[0]] &&
              itme4[Object.keys(itme4)[0]].length != 0,
          }"
        >
          {{ Object.keys(itme4)[0] }}
        </li>
      </ul>
    </div>
    <!-- 提交按钮 -->
    <div class="traditional_submit" >
      <div class="traditional_submit_left" @click="clickretest">
        <img :src="retext" alt="" />&nbsp;&nbsp;重新测评
      </div>
      <div
        class="traditional_submit_right"
        @click="
          $router.replace({
            name: 'healthreportlist',
            query: {
              leade: disease.leade,
              followe: disease.followe,
              iswx: true,
              page :page
            },
          })
        "
      >
        <img :src="report" alt="" />&nbsp;&nbsp;症状神似，获取疗养建议
      </div>
    </div>
  </div>
</template>

<script>
let back =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/back.png";
let giveup =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/giveup.png";
let healthreport_bg =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/healthreport_bg.png";

var headset =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset.png";
var headset_active =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_active.png";

let icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/icon.png";
let describe_top = require("../../assets/image/traditional/describe_top.png");
let describe_middle = require("../../assets/image/traditional/describe_middle.png");
let describe_bottom = require("../../assets/image/traditional/describe_bottom.png");
let describe =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/describe.png";

let describe_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/describe_icon.png";

let introduction =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/introduction.png";
let introduction_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/introduction_icon.png";

let retext =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/retext.png";
let report =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/report.png";

describe;

import { diseaselsit, diseasetype } from "./index.js";
import {
  deleteHtmlTag,
  listeninit,
  socketsend,
  audio,
} from "../../libs/weekconfig";
let aud = null;
export default {
  data() {
    return {
      back,
      giveup,
      healthreport_bg,
      headset,
      headset_active,
      icon,
      describe_icon,
      describe_top,
      describe_middle,
      describe_top,
      describe_bottom,
      introduction,
      introduction_icon,
      retext,
      report,
      disease: {},
      status: true,
      // 语音
      calendaricon: false,
      page: 3,
    };
  },
  components: {},
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
        let str = deleteHtmlTag(this.$refs[val].innerHTML);
        socketsend(str, (au) => {
          aud = audio(au);
          aud.play();
          aud.addEventListener("pause", () => {
            this.calendaricon = false;
          });
        });
      }
    },
    // app 回调
    callJsFunction() {
      return true;
    },
    // 返回
    clickback() {
      if (this.page != undefined) {
        app.goApp("finish");
        return;
      }
      // 调回app
      this.$Dialog
        .confirm({
          title: " ",
          message: "您确定放弃已填写的资料而重新开始测评？",
          confirmButtonText: "确定重新测评",
        })
        .then((res) => {
          this.clickgiveup(() => {
            // this.$router.go(-1);
            this.$router.replace({ name: "traditional" });
          });

          return;
          // on confirm
        })
        .catch((err) => {
          console.log(err, "===err");
          // on cancel
        });
    },
    clickgive() {
      this.$Dialog
        .confirm({
          title: " ",
          message: "你正在放弃对体质的测评？",
          confirmButtonText: "确定放弃",
        })
        .then((res) => {
          this.clickgiveup(() => {
            if (this.$util.isApp()) {
              this.clickgiveup(() => {
                app.goApp("finish");
              });

              return;
            } else if (this.$util.isWxmp()) {
              // this.$toast("微信");
              this.clickgiveup(() => {
                wx.miniProgram.switchTab({
                  url: "/pages/home/index/index",
                });
              });
            } else {
              this.$toast("返回h5");
            }
            return;
          });

          return;
          // on confirm
        })
        .catch((err) => {
          console.log(err, "===err");
          // on cancel
        });
    },
    // 放弃接口
    clickgiveup(callback) {
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
    // 放弃评测
    clickretest() {
      // 数据处理
      // console.log(this.traditionalTopic,'=========traditionalTopic')
      // 重新请求
      // 系统重进
      this.$Dialog
        .confirm({
          title: " ",
          message: "您确定放弃已填写的资料而重新开始测评？",
          confirmButtonText: "确定重新测评",
        })
        .then((res) => {
          this.clickgiveup(() => {
        this.$router.replace({ name: "traditional" });
          });
          // on confirm
        })
        .catch((err) => {
          console.log(err, "===err");
          // on cancel
        });
    },
    // 请求数据
    pagereport() {
      this.$http
        .request({
          url: "/ajax/web/tcm/findLast",
          methods: "get",
        })
        .then((res) => {
          console.log(res, "===re");
          if (res && res.respBody) {
            diseaselsit[res.respBody.leader].leade = res.respBody.leader;
            diseaselsit[res.respBody.leader].followe = res.respBody.follower;

            diseaselsit[res.respBody.leader].leader =
              diseasetype[res.respBody.leader];

            diseaselsit[res.respBody.leader].follower =
              diseasetype[res.respBody.follower];
            this.disease = diseaselsit[res.respBody.leader];
            console.log(this.disease, "this.disease====");
          }
        });
    },
  },
  created() {
    if (this.$route.query.status == 9) {
      this.status = false;
    }
    if (this.$route.query.page && this.$route.query.page != undefined) {
      this.page = this.$route.query.page;
      diseaselsit[this.$route.query.leade].leade = this.$route.query.leade;
      diseaselsit[this.$route.query.leade].leader =
        diseasetype[this.$route.query.leade];
      diseaselsit[this.$route.query.leade].follower =
        diseasetype[this.$route.query.followe];
      this.disease = diseaselsit[this.$route.query.leade];
    } else {
      this.pagereport();
      listeninit();
    }
  },
  mounted() {
    window.callJsFunction = this.callJsFunction;
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.healthreport {
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  padding: rpx(108) rpx(30);
  // height: 200px;
  .traditional-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: rpx(32);
    font-weight: 400;
    color: #ffffff;
    background-color: #1b66ff;
    letter-spacing: rpx(4);
    height: rpx(108);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    padding: 0 rpx(30);
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
      .giveup {
        width: rpx(142);
        height: rpx(48);
      }
    }
    & > div:nth-of-type(2) {
      text-align: right;
    }
  }
  // 卡片展示
  .traditional-card {
    // min-height: rpx(396);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.9) 0%,
      #ffffff 100%
    );
    box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.1);
    border-radius: rpx(32);
    padding: 0 rpx(20) rpx(20);
    .traditional-card-title {
      // height: rpx(108);
      display: flex;
      align-items: flex-end;
      padding: rpx(50) 0 rpx(22) 0;
      color: #000000;
      font-size: rpx(36);
      font-weight: bold;
      & > span {
        color: #c3272b;
        font-size: rpx(22);
        margin: 0 rpx(12);
        font-weight: normal;
      }
      & > img {
        width: rpx(28);
        height: rpx(26);
        margin-bottom: rpx(6);
      }
    }
    .traditional-card-description {
      margin-bottom: rpx(12);
      p {
        line-height: rpx(36);
        font-size: rpx(24);
        color: #333333;
      }
    }
    .traditional-card-narrate {
      font-size: rpx(22);
      line-height: rpx(34);
      color: #999999;
    }
  }
  // 描叙标题
  .traditional-report-title {
    padding: rpx(60) 0 rpx(32);
    color: #7c4b00;
    font-weight: bold;
    font-size: rpx(32);
    display: flex;
    align-items: center;
    justify-content: center;
    // 简介标题
    &.traditional-report-introduction {
      padding: rpx(20) 0 rpx(32);
    }
    & > img {
      width: rpx(56);
      height: rpx(40);
      margin: 0 rpx(10);
    }
  }
  // 描叙
  .traditional-report-describe {
    background-position: rpx(25) rpx(16), center top, center bottom, center;
    background-size: rpx(32), 100% auto, 100% auto, 100% 90%;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    min-height: rpx(60);
    // line-height: rpx(38);
    padding-left: rpx(70);
    padding-top: rpx(16);
    padding-bottom: rpx(16);
    color: #666666;
    font-size: rpx(24);
    margin-bottom: rpx(20);
  }
  // 简介描叙
  .traditional-introduction {
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    min-height: rpx(150);
    padding-left: rpx(100);
    padding-bottom: rpx(16);
    color: #666666;
    font-size: rpx(24);
    margin-bottom: rpx(20);
    position: relative;
    .traditional-introduction-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: rpx(94);
      height: rpx(94);
      line-height: rpx(72);
      text-align: center;
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      font-size: rpx(40);
      font-family: DIN;
      font-weight: bold;
      color: #ffffff;
    }
    .traditional-introduction-head {
      height: rpx(70);
      line-height: rpx(70);
      color: #333333;
      font-weight: bold;
    }
  }
  // 疾病标签
  .diseaselabel {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .diseaselabel-li {
      padding: rpx(10) rpx(25);
      border: 1px solid #707070;
      border-radius: 22px;
      color: #666;
      font-size: rpx(24);
      margin-bottom: rpx(24);
      // &.active {
      //   color: #1b66ff;
      //   border-color: #1b66ff;
      // }
      font-size: rpx(24);
    }
  }
}
// 提交答案
.traditional_submit {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: rpx(88);
  box-shadow: 0px -5px 6px rgba(0, 0, 0, 0.1);
  background: #a88462;
  display: flex;
  .traditional_submit_left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: rpx(342);
    height: 100%;
    background: #ffffff;
    border: 1px solid #7c4b00;
    color: #7c4b00;
    font-size: rpx(24);
    img {
      width: rpx(30);
      height: rpx(28);
    }
  }
  .traditional_submit_right {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: #ffffff;
    font-size: rpx(24);
    img {
      width: rpx(40);
      height: rpx(28);
    }
  }
}
</style>
