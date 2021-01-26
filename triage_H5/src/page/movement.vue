<template>
  <div>
    <div class="movement">
      <!-- 个人信息 -->
      <div
        class="movement-info"
        :style="{ backgroundImage: 'url(' + info + ')' }"
      >
        <div class="info-head">
          <img class="info-icon" :src="info_icon" alt />
          Hi! {{ objlist.personalInfo.realName }}：
        </div>
        <p class="info-describe">{{ objlist.dietitian.intro }}</p>

        <div
          class="info_avtor"
          :style="{
            justifyContent: objlist.labels&&objlist.labels.length > 2 ? 'space-between' : '',
          }"
        >
          <div
            class="info_avtor_li"
            v-for="(item, index) of objlist.labels"
            :key="index"
            :style="{
              backgroundImage: 'url(' + title + ')',
              marginRight: objlist.labels&&objlist.labels.length <= 2 ? '20px' : '',
            }"
          >
            <p v-html="line(item)"></p>
          </div>
        </div>
      </div>
      <!-- 健康描叙 -->
      <div
        class="movement-describe"
        :style="{ backgroundImage: 'url(' + plan_describe + ')' }"
      >
        <div class="movement-describe-head">
          <img class="sport_icon" :src="sport_icon" alt /> 方案描述
          <img
            class="calendaricon"
            @click="calendarlisten('detailIntro', 0)"
            :src="calendaricon[0] ? headset_active : headset"
            alt
          />
        </div>
        <div class="movement-describe-box">
          <img
            class="movement-describe-box-left"
            :src="plan_describe_left"
            alt
          />
          <p ref="detailIntro">{{ objlist.detailIntro }}</p>
        </div>
      </div>
      <!-- 健康运动 -->
      <div
        class="movement-sport"
        :style="{ backgroundImage: 'url(' + sport + ')' }"
      >
        <div class="movement-describe-head">
          <img class="sport_icon" :src="sport_ico" alt /> 运动计划
          <img
            class="calendaricon"
            @click="calendarlisten(null, 1)"
            :src="calendaricon[1] ? headset_active : headset"
            alt
          />
        </div>
        <ul class="sport-oul">
          <li class="sport-oli-title">
            <div>
              项目任选：
              <span class="ospan">{{ sportname }}</span>
            </div>
            <div>
              建议频次：
              <span class="ospan"
                >{{
                  objlist.sportPlan.frequencyMin ==
                  objlist.sportPlan.frequencyMax
                    ? objlist.sportPlan.frequencyMax
                    : objlist.sportPlan.frequencyMin +
                      "-" +
                      objlist.sportPlan.frequencyMax
                }}天/周</span
              >
            </div>
          </li>
          <li class="sport-oli-title">
            <div>
              运动强度：
              <span class="ospan">{{ sportstrong }}</span>
              <span class="ospan1">(见下图运动心率)</span>
            </div>
          </li>
          <li class="sport-oli-box">
            <div class="sport-oli-otitle">目标</div>
            <div class="sport-oli-echarts">
              <div class="sport-oli-echarts-box">
                <div
                  class="sport-oli-echarts-box-histogram"
                  ref="left_histogram"
                ></div>
                <span
                  >{{
                    objlist.sportPlan.sportHeartRateMin || "未知"
                  }}次/分</span
                >
                心率
              </div>
              <div class="sport-oli-echarts-box">
                <div
                  class="sport-oli-echarts-box-histogram bg"
                  ref="middle_histogram"
                ></div>
                <span>{{ objlist.sportPlan.duration }}分/天</span>
                时长
              </div>
              <div class="sport-oli-echarts-box">
                <div
                  class="sport-oli-echarts-box-histogram bg1"
                  ref="right_histogram"
                ></div>
                <span>{{ objlist.sportPlan.calories }}千卡/天</span>
                热量
              </div>
            </div>
          </li>
          <li class="sport-oli-bottom">
            *运动计划以周为单位,将依据您身体素质并结合历史的实际运动情况智能调整。
          </li>
        </ul>
      </div>
      <!-- 运动描述 -->
      <div class="movement-food">
        <div class="movement-food-title">
          *温馨提示*
          <img
            class="calendaricon"
            @click="calendarlisten('foodTitle', 2)"
            :src="calendaricon[2] ? headset_active : headset"
            alt
          />
        </div>
        <div ref="foodTitle">
          <p v-for="(item, index) of objlist.noticeMaplist" :key="index">
            {{ index + 1 }}.{{ item }}
          </p>
          <p class="sum" v-if="issum">
            因您的特殊体质，如未尽事宜，请务必咨询专属健康管 理师或专科医生
          </p>
        </div>
      </div>
    </div>
    <van-button type="info" size="large" @click="createbut"
      >开启运动计划</van-button
    >
    <specialist
      @click.native="
        $router.push({
          name: 'applyfor',
          query: {
            srcType: 2,
            istype: 'week',
          },
        })
      "
    ></specialist>
  </div>
</template>

<script>
let info =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/movement/info.png";
let info_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/movement/info_icon.png";
let title =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/title.png";
let plan_describe =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/movement/plan_describe.png";
let plan_describe_left =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/movement/plan_describe_left.png";
let sport_icon =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/movement/sport_icon.png";
let sport =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/movement/sport.png";
let sport_ico =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/movement/sport_ico.png";

var headset =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset.png";
var headset_active =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_active.png";

let aud = null,
  oindex = null;
import {
  deleteHtmlTag,
  listeninit,
  socketsend,
  audio,
} from "../libs/weekconfig";

export default {
  data() {
    return {
      info: info,
      info_icon: info_icon,
      title: title,
      plan_describe: plan_describe,
      plan_describe_left: plan_describe_left,
      sport_icon: sport_icon,
      sport_ico: sport_ico,
      sport: sport,
      calendaricon: [false, false, false],
      headset_active,
      headset,

      // 请求参数
      params: { type: 105 },
      // 数据填充
      objlist: {
        // 个人信息
        personalInfo: {},
        // 营养师简介
        dietitian: {},
        // 疾病
        labels: [],
        // 运动计划
        sportPlan: {},
      },
    };
  },
  computed: {
    sportname() {
      let str = this.objlist.sportPlan.sportItem || "";
      return str.replace("1", "步行").replace("2", "跑步");
    },
    sportstrong() {
      let obj = {
        L: "低等强度",
        M: " 中等强度",
        H: "高等强度",
        type: function (val) {
          if (val) {
            return this[val];
          } else {
            return "未知";
          }
        },
      };

      return obj[this.objlist.sportPlan.sportRelativeStrengthKey];
    },
    //
    issum() {
      let arr = this.objlist.sportPlan.diseases || [];
      return arr.length > 0 && !arr.includes("");
    },
  },
  components: {},
  methods: {
    // 运动方案详情
    sportdetail() {
      this.$http
        .request({
          url: "/ajax/web/sport/project/detail",
          method: "get",
          params: this.params,
        })
        .then((res) => {
          console.log(res, "============");
          if (res && res.respBody) {
            let noticeMaplist = Object.values(res.respBody.sportPlan.noticeMap);
            console.log(noticeMaplist[0], "============");
            Object.assign(res.respBody, { noticeMaplist: noticeMaplist[0] });
            this.objlist = res.respBody;
            this.$nextTick(() => {
              this.ledgement("left_histogram", 3);
              this.ledgement(
                "middle_histogram",
                res.respBody.sportPlan.frequencyMin
              );
              this.ledgement(
                "right_histogram",
                res.respBody.sportPlan.frequencyMin
              );
            });
          }
        });
    },
    // 创建运动方案
    createbut() {
      this.$http
        .request({
          url:
            "/ajax/web/sport/project/createHealthProject?type=" +
            this.params.type,
          method: "post",
        })
        .then((res) => {
          console.log(res, "============");
          if (res) {
            if (this.$util.isApp()) {
              app.goApp(
                "com.ysch.platform.sport.ui.activity.SportsManagerActivity"
              );
            }
          }
        });
    },
    // 标题换行
    line(val) {
      if (!!val) {
        // return val.trim();
        val = val + "";
        val = val.replace(" ", "");
        if (val.length == 4) {
          return val.substring(0, 2) + "<br>" + val.substring(2);
        } else if (val.length == 5) {
          return val.substring(0, 3) + "<br>" + val.substring(3);
        } else if (val.length < 6) {
          return val;
        } else {
          return val.substring(0, 3) + "<br>" + val.substring(3);
        }
      }
    },
    // 自动生成
    ledgement(val, length) {
      let str = "";
      for (let i = 0; i < length; i++) {
        str += `<div  style=width:100%;height:2px;background:#fff;position:absolute;left:0;bottom:${
          (i * 100) / length
        }%;></div>`;
      }
      this.$refs[val].innerHTML = str;
    },
    // 音频
    calendarlisten(val, index) {
      if (oindex === index && aud) {
        if (this.calendaricon[index]) {
          aud.pause();
          this.calendaricon[index] = false;
        } else {
          aud.play();
          this.calendaricon[index] = true;
          aud.addEventListener("pause", () => {
            this.calendaricon[index] = false;
          });
        }
        this.$forceUpdate();
      } else {
        if (oindex != null) {
          aud.pause();
          this.calendaricon[oindex] = false;
        }
        this.calendaricon[index] = true;
        oindex = index;
        let str = "";
        if (val) {
          str = deleteHtmlTag(this.$refs[val].innerHTML);
        } else {
          str = `运动计划，项目可任选${this.sportname}，每周运动${this.objlist.sportPlan.frequencyMin}到${this.objlist.sportPlan.frequencyMax}天，每次运动${this.objlist.sportPlan.duration}分钟，运动心率保持在${this.objlist.sportPlan.sportHeartRateMin}次/分钟。再加上每天通过做一些家务、步行等日常活动，就可以达到每天消耗总热量  ${this.objlist.sportPlan.calories}千卡。`;
        }

        socketsend(str, (au) => {
          aud = audio(au);
          aud.play();
          aud.addEventListener("pause", () => {
            this.calendaricon[index] = false;
            this.$forceUpdate();
          });
        });
        this.$forceUpdate();
      }
    },
  },
  created() {
    // 语音初始化
    listeninit();
    Object.assign(this.params, this.$route.query || {});
    this.sportdetail();
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.movement {
  padding: mv(50) mv(30);
  .movement-info {
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    padding: mv(50) mv(30) mv(30);
    color: #666;
    margin-bottom: mv(50);
    box-shadow: 4px 6px 8px #c2d6ff;
    letter-spacing: mv(3);
    overflow: hidden;
    .info-head {
      padding-left: rem(10);
      height: rem(72);
      line-height: rem(72);
      font-size: mv(44);
      .info-icon {
        width: rem(72);
        height: rem(72);
        border-radius: 50%;
      }
    }
    .info-describe {
      line-height: mv(62);
      margin: mv(36) 0;

      font-size: mv(40);
    }
    .info_avtor {
      list-style: none;
      display: flex;
      // justify-content: space-between
      .info_avtor_li {
        width: rem(108);
        height: rem(108);
        background-size: cover;
        background-repeat: no-repeat;
        // line-height: rem(94);
        text-align: center;
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        font-size: rem(16);
        & > p {
          width: 90%;
          font-size: rem(16);
          transform: scale(1);
        }
      }
    }
  }
  .movement-describe {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // padding: 0 rem(30);
    color: #666;
    margin-bottom: rem(30);
    // min-height: rem(230);
    border: 1px solid #cccccc;
    border-radius: rem(12);
    box-shadow: 4px 6px 8px #c2d6ff;
    .movement-describe-head {
      color: #fff;
      display: inline-flex;
      align-items: center;
      height: rem(58);
      // line-height: rem(60);
      font-size: mv(44);
      .sport_icon {
        margin-left: mv(20);
        margin-right: mv(20);
        width: mv(40);
        height: mv(50);
      }
      .calendaricon {
        width: rpx(36);
        height: rpx(32);
        margin-left: rpx(12);
      }
    }
    .movement-describe-box {
      display: flex;
      // justify-content: space-between;
      // align-items: center;
      // height: rem(200);
      margin: mv(50) 0;
      .movement-describe-box-left {
        width: mv(235);
        height: mv(142);
        margin-right: mv(10);
      }
      & > p {
        width: mv(738);
        font-size: mv(38);
        color: #666;
        letter-spacing: mv(6);
      }
    }
  }
  .movement-sport {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    // padding: 0 rem(30);
    color: #666;
    margin-bottom: rem(30);
    // min-height: rem(560);
    border: 1px solid #cccccc;
    border-radius: rem(12);
    box-shadow: 4px 6px 8px #c2d6ff;
    .movement-describe-head {
      color: #fff;
      display: inline-flex;
      align-items: center;
      height: rem(70);
      font-size: mv(44);
      // line-height: rem(60);
      .sport_icon {
        margin-left: mv(20);
        margin-right: mv(20);
        width: mv(40);
        height: mv(50);
      }
      .calendaricon {
        width: rpx(36);
        height: rpx(32);
        margin-left: rpx(12);
      }
    }
    .sport-oul {
      padding: mv(50) mv(30) 0 mv(30);
      .sport-oli-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // height: rem(50);
        margin-bottom: mv(40);
        font-size: mv(38);
        .ospan {
          color: #f98303;
        }
        .ospan1 {
          color: #999999;
          font-size: mv(30);
        }
      }
      .sport-oli-box {
        .sport-oli-otitle {
          color: #000;
          text-align: center;
          margin: mv(10) 0 mv(40);
        }
        .sport-oli-echarts {
          height: rem(280);
          border-bottom: 1px solid #f5f5f9;
          display: flex;
          // align-items: center;
          justify-content: space-evenly;
          .sport-oli-echarts-box {
            height: 90%;
            width: rem(140);
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
            color: #999999;
            font-size: mv(34);
            .sport-oli-echarts-box-histogram {
              width: 60%;
              height: 70%;
              background-color: #4ac2c3;
              position: relative;
              .sport-oli-echarts-box-histogram-line {
                width: 100%;
                height: 2px;
                background-color: #fff;
                position: absolute;
                left: 0;
              }
            }
            .bg {
              background-color: #b7d43a;
            }
            .bg1 {
              background-color: #fd1348;
            }
            & > span {
              margin-top: rem(10);
              color: #f98303;
              font-size: mv(38);
            }
          }
        }
      }
      .sport-oli-bottom {
        margin: rem(20) 0;
        line-height: mv(60);
        letter-spacing: mv(3);
        color: #999;
        font-size: mv(30);
      }
    }
  }
  .movement-food {
    color: #666;
    min-height: rem(560);
    border: 1px solid #cccccc;
    border-radius: rem(12);
    padding: 0 rem(30);
    box-shadow: 4px 6px 8px #c2d6ff;
    .movement-food-title {
      height: mv(148);
      line-height: mv(148);
      text-align: center;
      color: #1b66ff;
      font-size: mv(46);
      font-weight: 600;
      letter-spacing: mv(3);
      .calendaricon {
        width: rpx(36);
        height: rpx(32);
        margin-left: rpx(12);
      }
    }
    p {
      word-break: break-all;
      line-height: mv(62);
      margin-bottom: mv(30);
      letter-spacing: mv(2);
    }
    .sum {
      color: #ed1c24;
    }
  }
}
</style>
