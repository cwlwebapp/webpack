<template>
  <div ref="imageWrapper">
    <div class="healthlist">
      <shareIcon @goapp="goapp" />
      <img class="healthlist-bg" :src="bg" />
      <!-- 日历 -->
      <div class="calendar">
        <div class="calendar-head">
          {{ headdata.datatime | hour }}
          <div v-show="headdata.beforemeal" class="calendar-head-time">
            {{ headdata.datatime | day }}
          </div>
        </div>
        <div class="calendar-bottom">
          <span v-if="headdata.beforemeal">{{ headdata.beforemeal }}</span>
          <span class="time" v-else-if="!headdata.beforemeal">{{
            headdata.datatime | day
          }}</span>
        </div>
      </div>
      <!-- 圆环 -->
      <div class="circular">
        <canvas id="diagram"></canvas>
      </div>
      <!-- 进度条 -->
      <div class="blockprogress">
        <div class="progress">
          <div
            v-for="(item, index) in headdata.sections"
            :key="index"
            v-show="item.name"
            :class="[
              index == 0
                ? 'bg0'
                : index == 1
                ? 'bg1'
                : index == 2
                ? 'bg2'
                : index == 3
                ? 'bg3'
                : index == 4
                ? 'bg4'
                : index == 5
                ? 'bg5'
                : 'bg6',
              'progress-content',
            ]"
          ></div>

          <div class="borderRadius" :style="{ left: headdata.scoreLeft }">
            <img :src="headdata.type | imageUrl(headdata.healthStatus)" />
            <span v-if="headdata.value && headdata.value.diastolic"></span>
            <span v-else-if="headdata.value && !headdata.value.diastolic">{{
              headdata.value | tofie(headdata.type)
            }}</span>
          </div>
          <div class="progress-title">
            <div
              v-for="(oitem, oindex) in headdata.sections"
              :key="oindex"
              v-show="oitem.name"
            >
              {{ oitem.name && oitem.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- <img class="bottom-bg" src="/img/healthdata/bottom-bg.png" /> -->
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <div
      class="chart"
      v-for="(item, index) in message"
      :key="index"
      v-show="item && Array.isArray(item) && item.length != 0"
    >
      <div class="chart-title">
        <span>{{ item.length > 1 ? item[0] : "结果解读" }}</span>
        <img
          class="trumpet"
          v-show="item.length > 1 ? false : true"
          @click="trumpet()"
          :src="item.length > 1 ? '' : showtrumpet"
          alt
        />
      </div>
      <p class="chart-status">{{ item.length > 1 ? item[1] : item[0] }}</p>
    </div>
    <div class="line"></div>
    <div class="chart" v-if="beneficial.id && (beneficial.name || foodType)">
      <div class="chart-title">推荐饮食</div>
      <div class="chart-content">
        <span class="chart-food-title">
          {{ beneficial.name }}
          <br />
          <span>{{ beneficial.pinyin }}</span>
        </span>
        <img class="chart-food-bg" :src="foodbg" alt />
        <!-- <img v-show="beneficial.image" class="chart-food-icon" :src="beneficial.image" alt /> -->
        <van-image
          v-show="beneficial.image"
          class="chart-food-icon"
          round
          width="6rem"
          height="6rem"
          fit="cover"
          :src="beneficial.image"
        />
      </div>
      <div class="chart-content-food">
        <img :src="a" alt />
        营养成分表
        <span class="chart-subhead-food">(每100克所含)</span>
      </div>
      <ul>
        <li v-for="(item, key) in foodType" :key="key">
          <span class="progress-left">{{ key | foodName }}</span>
          <div class="progress">
            <van-progress
              :percentage="foodpercent(item.value, key, item.unit)"
              :color="foodcolor(key)"
              :show-pivot="false"
            />
          </div>
          <span class="progress-right" :style="{ color: foodcolor(key) }"
            >{{ item.value }}{{ item.unit | foodUnti }}</span
          >
        </li>
      </ul>
      <p class="food-introduce">{{ beneficial.desc }}</p>
    </div>
  </div>
</template>

<script>
var a = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/0.png";
var b = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/1.png";
var c = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/2.png";
var d = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/3.png";
var e = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/4.png";
var f = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/5.png";
var g = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/6.png";
var foodbg =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/food-bg.png";
import { circular, health, unit, color } from "@/libs/report";
let Base64 = require("js-base64").Base64;
import Util from "../libs/util";
export default {
  data() {
    return {
      a: a,
      foodbg: foodbg,
      bg:
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/bg.png",
      point: "cholesterol",
      offtrumpet:
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/trumpet-off.png",
      ontrumpet:
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/trumpet-on.gif",
      istrumpet: false,
      headdata: {
        scoreLeft: "",
        sections: [],
      },
      message: [],
      beneficial: {
        name: "",
        image: "",
        pinyin: "",
      },
      aa: 0,
      params: {
        id: "5ce23cb297749e87bf1d343f",
        relationUserId: "",
      },
      //语音
      myAuto: "",
      myAutolock: false,
      wxsData: {
        common: {
          app_id: "",
        },
        business: {
          vcn: "xiaoyan",
          aue: "lame",
          speed: 50,
          sfl: 1,
          tte: "UTF8",
        },
        data: {
          status: 2,
          text: "5L2g5aW9",
        },
      },
    };
  },
  filters: {
    // 图片
    imageUrl(type, status) {
      var obj = {};
      if (type) {
        if (type == "cholesterol") {
          obj = {
            // 0: b,
            0: c,
            1: d,
            2: f,
          };
        } else if (type == "2") {
          obj = {
            0: c,
            1: e,
          };
        } else if (type == "uricAcid") {
          obj = {
            0: a,
            1: b,
            2: c,
            3: d,
            4: f,
          };
        } else if (type == "temperature") {
          obj = {
            0: b,
            1: c,
            2: d,
            3: f,
          };
        } else if (type == "glu") {
          obj = {
            0: a,
            1: b,
            2: c,
            3: d,
            4: e,
            5: f,
          };
        } else if (type == "bloodpressure") {
          obj = {
            0: a,
            1: b,
            2: c,
            3: d,
            4: e,
            5: f,
            6: g,
          };
        } else if (type == "waistline") {
          obj = {
            0: c,
            1: e,
          };
        } else if (type == "weight") {
          obj = {
            0: b,
            1: c,
            2: d,
            3: f,
          };
        }
        return obj["" + status];
      } else {
        return a;
      }
    },
    // 小时+分
    hour: function (value) {
      if (!!value) {
        var date = new Date(value * 1);
        var hour = date.getHours();
        var minute = date.getMinutes();
        return [hour, minute].map(fn).join(":");
        function fn(n) {
          n = n.toString();
          return n[1] ? n : "0" + n;
        }
      } else {
        return "--:--";
      }
    },
    // 日期
    day: function (value) {
      if (!!value) {
        var date = new Date(value * 1);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return [year, month, day].map(fn).join("-");
        function fn(n) {
          n = n.toString();
          return n[1] ? n : "0" + n;
        }
      } else {
        return " ";
      }
    },
    foodName(key) {
      var obj = {
        calory: "卡路里",
        carbohydrate: "碳水",
        fat: "脂肪",
        protein: "蛋白质",
      };
      return obj[key];
    },

    foodUnti(unti) {
      var obj = {
        milliGrams: "毫克",
        KCAL: "千卡",
        grams: "克",
      };
      return obj[unti];
    },
    tofie: function (value, type) {
      if (!!value) {
        var str = value.toString();
        var index = str && str.indexOf(".");
        if (type == "glu") {
          return Number(value).toFixed(1);
        }
        if (type == "weight") {
          return "";
        }
        if (index != -1) {
          var leng = str.slice(index);
          if (leng.length > 2) {
            if (type == "uricAcid") {
              return Number(value).toFixed(0);
            } else if (type == "cholesterol") {
              return Number(value).toFixed(2);
            } else {
              return Number(value).toFixed(2);
            }
          } else {
            return Number(value);
          }
        } else {
          return value;
        }
      } else {
        return "";
      }
    },
  },
  computed: {
    foodType() {
      let arr = ["carbohydrate", "fat", "protein", "calory"];
      let obj = {};
      let num = 0;
      for (var i = 0; i < arr.length; i++) {
        if (
          this.beneficial &&
          this.beneficial.nutrients &&
          this.beneficial.nutrients[arr[i]]
        ) {
          // console.log(
          //   [arr[i]],
          //   this.beneficial.nutrients[arr[i]],
          //   "this.beneficial.nutrients[arr[i]]"
          // );
          if (arr[i] == "calory") {
            this.aa = num.toFixed(1);
            Object.assign(obj, { [arr[i]]: this.beneficial.nutrients[arr[i]] });
          } else {
            num += this.beneficial.nutrients[arr[i]].value * 1;
            Object.assign(obj, { [arr[i]]: this.beneficial.nutrients[arr[i]] });
          }
        }
      }

      return obj;
    },
    showtrumpet() {
      return this.istrumpet ? this.ontrumpet : this.offtrumpet;
    },
  },
  components: {},
  created() {
    Object.assign(
      this.params,
      this.$route.query || {
        id: "5ce23cb297749e87bf1d343f",
        relationUserId: "",
      }
    );
  },
  methods: {
    foodpercent(value, key, unti) {
      /*if (unti === "grams") {
        return value;
      } else if (unti === "milliGrams") {
        return value;
      } else if (unti == "KCAL") {
       return this.aa
      }*/

      /*百分比算法改变
      卡路里 基准：120kcal
      碳水 基准：15g
      脂肪 基准：3.3g
      蛋白质 基准：7.5g
      超过100%只显示100%
      */
      let pre = 0;
      switch (key) {
        case "carbohydrate":
          pre = (parseFloat(value) * 100) / 15;
          break;
        case "fat":
          pre = (parseFloat(value) * 100) / 3.3;
          break;
        case "protein":
          pre = (parseFloat(value) * 100) / 7.5;
          break;
        case "calory":
          pre = (parseFloat(value) * 100) / 120;
          break;
      }

      return pre >= 100 ? 100 : pre.toFixed(2);
    },
    foodcolor(key) {
      var obj = {
        calory: "#343896",
        carbohydrate: "#f7cd26",
        fat: "#f62e52",
        protein: "#c059fa",
      };
      return obj[key];
    },
    pagedetail() {
      this.$http
        .request({
          url: "/ajax/user/wx/healthindicator/detail",
          method: "get",
          params: this.params,
        })
        .then((res) => {
          console.log(res, "res");
          if (res && res.respBody) {
            let data = res.respBody.healthIndicator;
            let obj = this.refactoring(data);
            let hearthtype = data.healthStatus;
            let scoreLeft = 0,
              arr = [],
              start,
              sections = [];
            if (data.type == "cholesterol") {
              arr = [null, null, "正常", "偏高", null, "严重偏高"];
               data.healthStatus = data.healthStatus - 1;
            } else if (data.type == "2") {
              arr = [null, null, "正常", null, "异常", null];
            } else if (data.type == "uricAcid") {
              arr = ["严重过低", "偏低", "正常", "偏高", null, "严重偏高"];
              data.healthStatus = data.healthStatus + 1;
            } else if (data.type == "temperature") {
              arr = [null, "体温偏低", "体温正常", "低烧", null, "高烧"];
            } else if (data.type == "glu") {
              arr = [
                "严重过低",
                "偏低",
                "正常",
                "轻度偏高",
                "偏高",
                "严重超高",
              ];
              data.healthStatus = data.healthStatus + 1;
            } else if (data.type == "bloodpressure") {
              arr = [
                "严重过低",
                "低血压",
                "正常血压",
                "正常高值",
                "1级高血压",
                "2级高血压",
                "3级高血压",
              ];
              data.healthStatus = data.healthStatus + 1;
            } else if (data.type == "waistline") {
              arr = [null, null, "正常", null, " 腹型肥胖", null];
              data.healthStatus = data.healthStatus - 1;
            } else if (data.type == "weight") {
              arr = [null, "偏轻", "正常", "偏重", null, "超重"];
            }

            start = (506 / arr.notempty().length) * data.healthStatus - 25;
            scoreLeft = (506 / arr.notempty().length) * 0.5 + start;
            scoreLeft = (scoreLeft / 750) * 100 + "vw";
            sections = arr.map((item) => {
              return { name: item };
            });
            if (data.type != "temperature") {
              let type = data.type;
              if (data.type == "uricAcid") {
                type = "uric_acid";
              }
              this.$http({
                url: "/ajax/user/wx/knowledge/ingredient",
                method: "get",
                params: {
                  dataType: type,
                  status: hearthtype,
                },
              }).then((res) => {
                console.log(res, "饮食");
                console.log();
                if (res && res.respBody && res.respBody.beneficial) {
                  res.respBody.beneficial[0].pinyin = Util.py(
                    res.respBody.beneficial[0].name
                  );
                  this.beneficial = res.respBody.beneficial[0];
                }
              });
            }
            // 餐前
            function beforemeal(item) {
              if (item.scord) {
                return "";
              } else if (item.values && item.values.dineType) {
                let obj = {
                  1: "早餐前",
                  2: "早餐后",
                  3: "午餐前",
                  4: "午餐后",
                  5: "晚餐前",
                  6: "晚餐后",
                  7: "睡前",
                };
                return obj[item.values.dineType + ""] || "";
              } else if (item.values && item.values.type) {
                return item.values.type == 1
                  ? "空腹"
                  : item.values.type == 2
                  ? "空腹"
                  : item.values.type == 3
                  ? "餐后"
                  : "";
              } else {
                return "";
              }
            }

            this.headdata = {
              datatime: data.addtime || data.measureDateTime,
              sections: sections,
              value: obj.value,
              scoreLeft: scoreLeft,
              healthStatus: data.healthStatus,
              type: data.type,
              beforemeal: data.scord ? "" : beforemeal(data),
            };
            // 画圆弧
            circular("diagram", obj);

            let str = "";

            this.message =
              res.respBody.message &&
              res.respBody.message.suggest.map((item, index) => {
                if (Array.isArray(item) && item.length > 1) {
                  str = item.slice(1).join(" ");
                  item[1] = str;
                }
                return item;
              });
            console.log(this.message, "======mesage");
          } else {
            this.$store.commit("setDataLoading", true);
          }

          // Util.share({
          //   type: "message", // 类型
          //   title: document.title, // 标题
          //   imageUrl: this.detail.coverPicUrl // 图片
          // });
        });
    },
    // 数据重组
    refactoring(item) {
      if (item.record_status || item.record_status == 0) {
        item.healthStatus = item.record_status;
      }
      //  血尿酸type统一
      if (item.type == "uric_acid") {
        item.type = "uricAcid";
        item.values[item.type] = (item.values[item.type] * 1).toFixed(0);
      }
      if (item.type == "cholesterol") {
        item.values[item.type] = (item.values[item.type] * 1).toFixed(2);
      }
      if (item.type == "glu") {
        item.values[item.type] = (item.values[item.type] * 1).toFixed(1);
      }

      if (item.type == "waistline") {
        item.values[item.type] = (item.values[item.type] * 1).toFixed(1);
      }
      document.title = health(item.type, null) + document.title;
      let obj = {
        value: item.scord || item.values[item.type],
        unit:
          (item.values && item.values.unit) ||
          unit(
            item.type,
            item.healthStatus == 0
              ? String(item.healthStatus)
              : item.healthStatus
          ),
        title:
          item.type == "weight"
            ? health(item.type, item.values[item.type], item.values["height"])
            : health(
                item.type,
                item.healthStatus == 0
                  ? String(item.healthStatus)
                  : item.healthStatus
              ),
        color: color(
          item.type,
          item.healthStatus == 0 ? String(item.healthStatus) : item.healthStatus
        ),
        beforemeal: item.scord
          ? ""
          : (item.values.type && item.values.type == 1
              ? "空腹"
              : item.values.type == 2
              ? "空腹"
              : item.values.type == 3
              ? "餐后"
              : "") || "",
        id: item.record_id || item.id,
        measureTime: (item.addtime && String(item.addtime)) || item.measureTime,
        measureDateTime: item.addtime || item.measureDateTime,
        dineType: item.scord ? "" : item.values.dineType || "",
      };
      //血压
      if (item.type == "bloodpressure") {
        obj = {
          value: item.values,
          unit: unit(
            item.type,
            item.healthStatus == 0
              ? String(item.healthStatus)
              : item.healthStatus
          ),
          title: health(
            item.type,
            item.healthStatus == 0
              ? String(item.healthStatus)
              : item.healthStatus
          ),
          color: color(
            item.type,
            item.healthStatus == 0
              ? String(item.healthStatus)
              : item.healthStatus
          ),
          measureTime: item.measureTime,
          measureDateTime: item.measureDateTime,
          color: color(
            item.type,
            item.healthStatus == 0
              ? String(item.healthStatus)
              : item.healthStatus
          ),
          id: item.id,
        };
      }
      return obj;
    },
    // 语音桥接
    trumpet() {
      if (this.myAuto) {
        if (this.istrumpet) {
          this.myAuto.pause();
          this.istrumpet = false;
        } else {
          this.myAuto.play();
          this.istrumpet = true;
          this.myAuto.addEventListener("pause", () => {
            this.istrumpet = false;
          });
        }
        return;
      } else {
        this.$store.commit("setDataLoading", true);
      }
      this.$http
        .request({
          url: "/ajax/user/wx/xf/authorization",
          method: "get",
        })
        .then((res) => {
          if (res && res.respBody) {
            this.$store.commit("setDataLoading", true);
            this.wxsData.common.app_id = res.respBody.appId;
            this.wxsData.data.text = Base64.encode(this.message[0][0]);
            this.socket(res.respBody.path);
          }
        });
    },
    // 建立WebSocket
    socket(url) {
      let socket = new WebSocket(url),
        au = "";
      socket.onopen = () => {
        socket.send(JSON.stringify(this.wxsData));
      };

      socket.onmessage = (res) => {
        if (res && res.data) {
          let data = JSON.parse(res.data);
          if (data.code == 0) {
            au += window.atob(data.data.audio);
            if (data.data.status == 2) {
              this.$store.commit("setDataLoading", false);
              this.istrumpet = true;
              this.audio(au);
            }
          }
        }
      };
      socket.onerror = (err) => {
        console.log(err, "-----------err");
      };
      socket.onclose = (end) => {
        console.log(end, "--------------end");
      };
    },
    // 音频标签
    audio(au) {
      this.$store.commit("setDataLoading", false);
      this.myAuto = document.createElement("audio");
      this.myAuto.src = src(au);
      this.myAuto.play();
      this.myAuto.addEventListener("pause", () => {
        this.istrumpet = false;
      });
      //数据处理
      function src(au) {
        let rawLength = au.length;
        let uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = au.charCodeAt(i);
        }
        return URL.createObjectURL(
          new Blob([uInt8Array], { type: "audio/wav" })
        );
      }
    },
    //app 分享
    goapp() {
      let dom = this.$refs.imageWrapper;
      this.$htmlcanvas(dom);
    },
  },
  created() {
    Object.assign(this.params, this.$route.query);
  },
  mounted() {
    this.pagedetail();
    // this.trumpet()
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.healthlist {
  width: 100%;
  height: rem(744);
  /* background-color: #f00; */
  position: relative;
  .healthlist-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .calendar {
    position: absolute;
    left: rem(38);
    top: rem(38);
    width: rem(120);
    height: rem(130);
    background-color: #ffffff;
    border-radius: rem(5);
    border: solid 1px #1b66ff;
    overflow: hidden;
    .calendar-head {
      height: rem(78);
      font-family: SourceHanSansCN-Medium;
      font-size: rem(28);
      color: #1b66ff;
      text-align: center;
      /* line-height: rem(100); */
      box-sizing: border-box;
      padding-top: rem(10);
      &::before {
        content: " ";
        position: absolute;
        left: rem(10);
        top: rem(8);
        width: rem(6);
        height: rem(6);
        background-color: #ffffff;
        border: solid 1px #1b66ff;
        border-radius: 50%;
      }

      &::after {
        content: " ";
        position: absolute;
        right: rem(10);
        top: rem(8);
        width: rem(6);
        height: rem(6);
        background-color: #ffffff;
        border: solid 1px #1b66ff;
        border-radius: 50%;
      }
      .calendar-head-time {
        font-size: rem(16);
        color: #1b66ff;
        transform: scale(0.7);
        white-space: nowrap;
      }
    }
    .calendar-bottom {
      height: rem(52);
      width: 100%;
      text-align: center;
      background-color: #1b66ff;
      color: #fbfcfd;
      & > span {
        width: 100%;
        display: inline-block;
        font-size: rem(32);
        // transform: scale(0.8);
        white-space: nowrap;
      }
      .time {
        font-size: rem(16);
        transform: scale(0.8);
      }
    }
  }
  /* 进度条 */
  .blockprogress {
    position: absolute;
    left: rem(122);
    top: rem(550);
    width: rem(506);
    height: rem(120);
    .progress {
      position: absolute;
      left: 0;
      top: rem(54);
      width: 100%;
      height: rem(12);
      display: flex;
      border-radius: rem(12);
    }
    .progress-content {
      flex: 1;
    }

    .progress-content:first-child {
      border-radius: rem(12) 0 0rem (12);
    }

    .progress-content:nth-last-child(3) {
      border-radius: 0rem (12) rem(12) 0;
    }

    .bg0 {
      background-color: #5ccbfa;
    }

    .bg1 {
      background-color: #00bfbf;
    }

    .bg2 {
      background-color: #87cd41;
    }

    .bg3 {
      background-color: #fdd600;
    }

    .bg4 {
      background-color: #fe9011;
    }

    .bg5 {
      background-color: #eb6100;
    }

    .bg6 {
      background-color: #e22323;
    }

    .borderRadius {
      position: absolute;
      left: 0;
      top: rem(-56);
      width: rem(50);
      height: rem(56);
      transition: all 500ms linear;
      & img {
        width: rem(50);
        height: rem(56);
      }

      & > span {
        position: absolute;
        left: 0;
        top: 0;
        width: rem(50);
        height: rem(56);
        line-height: rem(54);
        text-align: center;
        font-family: ArialMT;
        font-size: rem(18);
        color: #fcfdfb;
      }
    }

    .progress-title {
      position: absolute;
      left: 0;
      top: rem(32);
      height: auto;
      width: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      font-family: SourceHanSansCN-Regular;
      font-size: rem(22);
      color: #666666;
    }

    .progress-title > div {
      flex: 1;
    }
  }

  .circular {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: rem(-240);
    margin-top: rem(-300);
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(460);
    height: rem(460);
    background-color: #f1f4f9;
    border-radius: 50%;
    #diagram {
      width: rem(440);
      height: rem(440);
      /* background-image: linear-gradient(90deg, #fe9011 0%,#ffb643 100%); */
    }
  }
}

/* 底部背景 */
// .bottom-bg {
//   position: absolute;
//   left: 0;
//   bottom: 0;
//   width: 100%;
//   height: rem(180);
// }

// 分界线
.line {
  height: rem(14);
  background-color: #f2f2f2;
}

/* 图表内容 */
.chart {
  padding: 0 rem(28) rem(40);
  .chart-title {
    margin-top: rem(16);
    display: flex;
    align-items: center;
    height: rem(80);
    font-family: SourceHanSansCN-Regular;
    font-size: rem(32);
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: rem(2);
    color: #666666;
    &::before {
      content: "";
      width: rem(10);
      height: rem(50);
      background-color: #1b66ff;
      margin-right: rem(22);
    }
    .trumpet {
      width: rem(54);
      height: rem(54);
      margin-left: rem(12);
      border: none;
    }
  }
  .chart-status {
    min-height: rem(140);
    // text-align: center;
    font-family: SourceHanSansCN-Normal;
    font-size: rem(28);
    color: #666666;
    padding-bottom: rem(20);
    padding-left: rem(10);
  }
  .chart-content {
    height: rem(322);
    background-color: #9fe487;
    border-radius: rem(20);
    position: relative;
    .chart-food-title {
      position: absolute;
      left: rem(34);
      top: rem(56);
      letter-spacing: rem(4);
      color: #ffffff;
      text-align: center;
      font-size: rem(48);
      & > span {
        font-size: rem(28);
      }
    }
    .chart-food-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .chart-food-icon {
      /*background-color: #fff;*/
      position: absolute;
      right: rem(92);
      top: rem(36);
      // width: rem(160);
      // height: rem(160);
      // border-radius: 50%;
    }
  }
  .chart-content-food {
    display: flex;
    align-items: center;
    height: rem(124);
    color: #333333;
    font-size: rem(32);
    img {
      width: rem(42);
      height: rem(42);
      background-color: #93dafe;
      border-radius: rem(10);
      margin-right: rem(18);
    }
    .chart-subhead-food {
      font-size: rem(16);
    }
  }
  ul {
    padding: 0 rem(20) 0 rem(8);
    li {
      display: flex;
      height: rem(56);
      align-items: center;
      justify-content: space-between;
      .progress-left {
        width: rem(100);
        color: #666666;
        font-size: rem(24);
      }
      & > .progress {
        width: rem(320);
      }
      .progress-right {
        width: rem(140);
        font-size: rem(24);
        letter-spacing: rem(4);
      }
    }
  }
  .food-introduce {
    padding: rem(40) rem(40) rem(108) rem(8);
    font-size: rem(28);
    line-height: rem(40);
    letter-spacing: rem(4);
    color: #666666;
  }
}
</style>
