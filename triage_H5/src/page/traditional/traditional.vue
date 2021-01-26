<template>
  <div
    class="traditional"
    :style="{
      backgroundImage: 'url(' + traditional + ')',
    }"
  >
    <div class="traditional-head">
      <div>
        <img class="back" @click="clickback" :src="back" alt="" />
      </div>
      <span class="title"> {{ $route.meta.title }}</span>
      <div>
        <img
          v-show="fn(traditionalTopic[addnum]) && lock1"
          @click="clicknext"
          class="giveup"
          :src="next"
          alt=""
        />
      </div>
    </div>
    <!-- 描述 -->
    <p class="traditional-head-description">
      根据最近一年的体验和感觉回答以下问题
    </p>
    <!-- 进度 -->
    <ul class="traditional-progress">
      <li class="traditional-progress-content">
        <div
          class="progress-box"
          :style="{ width: (addnum / 32) * 100 + '%' }"
        ></div>
      </li>
      <span>{{ addnum + 1 }}</span
      >/33
    </ul>
    <!-- 做题目 -->
    <div class="topic">
      <ul class="topic-ul">
        {{
          addnum + 1
        }}、
        {{
          traditionalTopic[addnum] && traditionalTopic[addnum].title
        }}
        <li
          :class="{ 'topic-li': true, active: itme.active }"
          v-for="(itme, index) in traditionalTopic[addnum] &&
          traditionalTopic[addnum].answer"
          :key="index"
          @click="select(itme)"
        >
          {{ itme.answertitle }}
          <div>{{ itme.answersub }}</div>
        </li>
      </ul>
      <p class="topic-description">
        本测评来自《中医体质分类与判定》国家标准，孕妇不建议使用本测评。
      </p>
      <div v-show="addnum != 33" class="abandon" @click="clickgiveup1">
        放弃测评
      </div>
    </div>
    <!-- 右边的图片 -->
    <div
      class="traditional_food"
      :style="{
        backgroundImage: 'url(' + traditional_food + ')',
      }"
    ></div>
    <!-- 提交按钮 -->
    <div class="traditional_submit" v-show="addnum == 32">
      <div class="traditional_submit_left" @click="clickretest">
        <img :src="retext" alt="" />&nbsp;&nbsp;重新测评
      </div>
      <div class="traditional_submit_right" @click="clickrecompile">
        <img :src="recompile" alt="" />&nbsp;&nbsp;完成测评
      </div>
    </div>
  </div>
</template>

<script>
let traditional =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/traditional.png";
let traditional_food =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/traditional_food.png";
let back =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/back.png";
let next =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/next.png";

let retext =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/retext.png";
let recompile =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/recompile.png";
let res = require("../../assets/json/traditional.json");
let timer = null,
  timer1 = null;
export default {
  data() {
    return {
      // 图片
      traditional,
      traditional_food,
      back,
      next,
      retext,
      recompile,
      // 题目内容
      traditionalTopic: [],
      // 题目状态
      addnum: 0,
      // 下一题的状态
      isback: false,
      lock: 0,
      lock1: false,
      islock: false,
    };
  },
  components: {},
  methods: {
    fn(arr) {
      console.log(arr, "===arr");
      return arr.answer.some((item, index) => {
        return item.active;
      });
    },
    // 题目
    pagetopic() {
      // this.$http
      //   .request({
      //     method: "get",
      //     url: "../../../src/assets/json/traditional.json",
      //   })
      //   .then((res) => {
      //     if (res.length != 0) {
      //       let answertitlelist = ["没有", "很少", "有时", "经常", "总是"];
      //       let answersubobj = {
      //         "*": [
      //           "（根本不/从来没有）",
      //           "（有一点/偶尔）",
      //           "（有些/少数时间）",
      //           "（相当/多数时间）",
      //           "（非常/每天）",
      //         ],
      //         9: [
      //           "（BMI＜24）",
      //           "（24≤BMI＜25）",
      //           "（25≤BMI＜26）",
      //           "（26≤BMI＜28）",
      //           "（BMI≥28）",
      //         ],
      //         14: [
      //           "一年＜2次",
      //           "一年感冒2-4次",
      //           "一年感冒5-6次",
      //           "一年8次以上",
      //           "几乎每月都感冒",
      //         ],
      //         17: [
      //           "从来没有",
      //           "一年1、2次",
      //           "一年3、4次",
      //           "一年5、6次",
      //           "每次遇到上述原因都过敏",
      //         ],
      //         28: [
      //           "（腹围＜80cm，相当于2.4尺）",
      //           "（腹围80-85cm，2.4-2.55尺）",
      //           "（腹围86-90cm，2.56-2.7尺）",
      //           "（腹围91-105cm，2.71-3.15尺）",
      //           "（腹围＞105cm或3.15尺）",
      //         ],
      //       };

      //       let scorelist = [1, 2, 3, 4, 5];
      //       let special = [9, 14, 17, 28];
      //       let traditionalTopic = res.map((item, index) => {
      //         if (special.includes(item.number)) {
      //           item.answer = scorelist.map((oitem, oindex) => {
      //             return {
      //               answertitle: answertitlelist[oindex],
      //               answersub: answersubobj[item.number][oindex],
      //               score: oitem,
      //             };
      //           });
      //         } else {
      //           item.answer = scorelist.map((oitem, oindex) => {
      //             return {
      //               answertitle: answertitlelist[oindex],
      //               answersub: answersubobj["*"][oindex],
      //               score: oitem,
      //             };
      //           });
      //         }

      //         return item;
      //       });
      //       this.traditionalTopic = traditionalTopic;
      //     }
      //   });

      if (res.length != 0) {
        let answertitlelist = ["没有", "很少", "有时", "经常", "总是"];
        let answersubobj = {
          "*": [
            "（根本不/从来没有）",
            "（有一点/偶尔）",
            "（有些/少数时间）",
            "（相当/多数时间）",
            "（非常/每天）",
          ],
          9: [
            "（BMI＜24）",
            "（24≤BMI＜25）",
            "（25≤BMI＜26）",
            "（26≤BMI＜28）",
            "（BMI≥28）",
          ],
          14: [
            "一年＜2次",
            "一年感冒2-4次",
            "一年感冒5-6次",
            "一年8次以上",
            "几乎每月都感冒",
          ],
          17: [
            "从来没有",
            "一年1、2次",
            "一年3、4次",
            "一年5、6次",
            "每次遇到上述原因都过敏",
          ],
          28: [
            "（腹围＜80cm，相当于2.4尺）",
            "（腹围80-85cm，2.4-2.55尺）",
            "（腹围86-90cm，2.56-2.7尺）",
            "（腹围91-105cm，2.71-3.15尺）",
            "（腹围＞105cm或3.15尺）",
          ],
        };

        let scorelist = [1, 2, 3, 4, 5];
        let special = [9, 14, 17, 28];
        let traditionalTopic = res.map((item, index) => {
          if (special.includes(item.number)) {
            item.answer = scorelist.map((oitem, oindex) => {
              return {
                answertitle: answertitlelist[oindex],
                answersub: answersubobj[item.number][oindex],
                score: oitem,
              };
            });
          } else {
            item.answer = scorelist.map((oitem, oindex) => {
              return {
                answertitle: answertitlelist[oindex],
                answersub: answersubobj["*"][oindex],
                score: oitem,
              };
            });
          }

          return item;
        });
        this.traditionalTopic = traditionalTopic;
      }
    },
    // 选择
    select(obj) {
      if (timer && timer != null) {
        clearTimeout(timer);
        timer = null;
        return;
      }
      // console.log(obj, "===");
      this.traditionalTopic[this.addnum].answer.forEach((element) => {
        if (element.active) {
          // --this.lock;
          // if (this.lock == 0) {
          //   this.isback = false;
          // }
          element.active = false;
        }
      });
      this.lock1 = false;
      this.$set(obj, "active", true);
      if (this.addnum < 32) {
        timer = setTimeout(() => {
          this.addnum++;
          timer = null;
        }, 200);
      }
    },
    // 返回
    clickback() {
      // 调回app
      if (this.addnum == 0) {
        if (this.$util.isApp()) {
          app.goApp("finish");
          return;
        } else if (this.$util.isWxmp()) {
          wx.miniProgram.switchTab({
            url: "/pages/home/index/index",
          });
        } else {
          this.$toast("返回h5");
        }
        return;
      }
      if (!this.lock1) {
        this.lock1 = true;
      }
      --this.addnum;
      // 返回显示
      // if (this.addnum > 0 && !this.isback) {
      //   this.isback = true;
      // }
      // ++this.lock;
      // this.addnum > 0 ? --this.addnum : (this.addnum = 0);
    },
    // 下一题
    clicknext() {
      if (this.addnum <= 32) {
        this.lock1 = this.traditionalTopic[this.addnum].answer.some(
          (item, index) => {
            return item.active;
          }
        );

        ++this.addnum;
      }

      // clearTimeout(timer1); 单数数据判断 不用借助其他数据
      // timer1 = setTimeout(() => {
      //   --lock;
      //   this.addnum++;
      //   if (lock <= 0) {
      //     this.isback = false;
      //   }
      // }, 100);

      // --this.lock;
      // if (this.addnum < 32) {
      //   ++this.addnum;
      //   if (this.lock <= 0) {
      //     this.isback = false;
      //   }
      // } else {
      //   this.addnum = 32;
      //   this.isback = false;
      // }
    },

    // 放弃测试
    clickgiveup1() {
      this.$Dialog
        .confirm({
          title: " ",
          message: "你正在放弃对体质的测评",
          confirmButtonText: "确定放弃",
        })
        .then((res) => {
          console.log(res, "===res");
          if (this.$util.isApp()) {
            app.goApp("finish");
            return;
          } else if (this.$util.isWxmp()) {
            wx.miniProgram.switchTab({
              url: "/pages/home/index/index",
            });
          } else {
            this.$toast("返回h5");
          }
          return;
          // on confirm
        })
        .catch((err) => {
          console.log(err, "===err");
          // on cancel
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
            window.location.reload();
          });

          // on confirm
        })
        .catch((err) => {
          console.log(err, "===err");
          // on cancel
        });
    },
    // 完成评测
    clickrecompile() {
      if (this.islock) {
        return;
      }
      this.islock = true;
      let answer = {};
      this.traditionalTopic.some((item, index) => {
        answer[item.number] =
          item.answer.find((otiem, oindex) => otiem.active) &&
          item.answer.find((otiem, oindex) => otiem.active).score;
      });
      if (!answer[33]) {
        this.$toast("完善您舌下静脉瘀紫或增粗吗？");
        return;
      }
      this.$http
        .request({
          url: "/ajax/web/tcm/questionnaire/submit",
          method: "post",
          data: { answer: answer },
        })
        .then((res) => {
          this.islock = false;
          this.$router.replace({ name: "healthreport" });
        })
        .catch((err) => {
          this.$router.replace({ name: "healthreport" });
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
  },
  created() {
    this.pagetopic();
    console.log(this.$route, "=====123");
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.traditional {
  height: 100vh;
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  padding: 0 rpx(30);
  .traditional-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: rpx(32);
    font-weight: 400;
    color: #7c4b00;
    letter-spacing: rpx(4);
    height: rpx(120);
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
  // 描叙
  .traditional-head-description {
    font-size: rpx(24);
    color: #7c4b00;
    letter-spacing: rpx(2);
  }
  // 进度条
  .traditional-progress {
    height: rpx(72);
    display: flex;
    align-items: center;
    font-size: rpx(22);
    font-family: DIN;
    font-weight: bold;
    color: #999999;
    .traditional-progress-content {
      flex: 1;
      height: rpx(8);
      background: #eef2f6;
      border-radius: rpx(50);
      overflow: hidden;
      position: relative;
      .progress-box {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 10%;
        background-color: #1b66ff;
        border-radius: rpx(50);
      }
    }
    & > span {
      color: #1b66ff;
      margin-left: rpx(14);
    }
  }
  // 题目
  .topic {
    // min-height: rpx(1050);
    background: #ffffff;
    border-radius: rpx(12);
    padding: rpx(30);
    .topic-ul {
      font-size: rpx(32);
      font-weight: 500;
      color: #333333;
      line-height: rpx(54);
      letter-spacing: rpx(4);
      .topic-li {
        text-align: center;
        // line-height: rpx(50);
        padding-top: rpx(10);
        box-sizing: border-box;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // flex-direction: column;
        // height: rpx(120);
        // text-align: center;
        background: #eef2f6;
        border-radius: rpx(24);
        color: #000;
        font-weight: bold;
        margin-top: rpx(32);
        & > div {
          font-size: rpx(24);
          color: #666666;
          letter-spacing: rpx(2);
          font-weight: normal;
          position: relative;
          top: -8px;
        }
        &.active {
          background: #1b66ff;
          box-shadow: 0 3px 6px rgba(110, 203, 242, 0.5);
          color: #fff;
          & > div {
            color: #fff;
          }
        }
      }
    }
    .topic-description {
      // height: rpx(142);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      font-size: rpx(22);
      color: #b35c44;
      margin-top: rpx(44);
      margin-bottom: rpx(18);
    }
    .abandon {
      font-size: rpx(24);
      color: #7c4b00;
      text-decoration: underline;
      text-align: center;
    }
  }
  // 数据提交
  .traditional_submit {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: rpx(88);
    box-shadow: 0px -5px 6px rgba(0, 0, 0, 0.1);
    background: #7c4b00;
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
        width: rpx(30);
        height: rpx(28);
      }
    }
  }
  // 标志
  .traditional_food {
    width: rpx(254);
    height: rpx(148);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
