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
          <span v-else-if="!headdata.beforemeal">{{
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
            <span>{{ headdata.value || 0 }}</span>
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
    <div class="chart">
      <div class="chart-title">
        结果解读
        <img class="trumpet" @click="trumpet()" :src="showtrumpet" alt />
      </div>
      <p
        v-if="headdata.healthStatus == 1"
        class="chart-status"
        ref="chartStatusResult"
      >
        根据您本次检查数据结果分析，提示存在{{ fooddata.cname }}等健康风险。
      </p>
      <p
        v-else-if="headdata.healthStatus == 0"
        ref="chartStatusResult"
        class="chart-status"
      >
        生活习惯很好,继续坚持哦!
      </p>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <div class="chart">
      <div class="chart-title">健康报告</div>
      <table>
        <tr class="table-head">
          <th>项目名称</th>
          <th>结果</th>
          <th>参考范围</th>
        </tr>
        <tr
          class="table-head table-td"
          v-for="(item, index) in fooddata.tableList"
          :key="index"
        >
          <td>{{ item.cname }}{{ item.unit == "—" ? " " : item.unit }}</td>
          <td :style="{ color: item.record_detail_status == 0 ? '' : '#f00' }">
            {{ item.record_detail_value }}
          </td>
          <td>{{ item.standard_value == "—" ? "" : item.standard_value }}</td>
        </tr>
      </table>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <div class="chart">
      <div class="chart-title">健康风险</div>
      <p v-if="headdata.healthStatus == 1" class="chart-status">
        如长期存在{{ fooddata.cname }}等健康问题,病情持续发展最终可能出现{{
          fooddata.complications
        }}等更加严重的健康问题.
      </p>
      <p v-else-if="headdata.healthStatus == 0" class="chart-status">
        生活习惯很好,继续坚持哦!
      </p>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <div class="chart">
      <div class="chart-title">健康建议</div>
      <div class="chart-status">
        <p>
          1.普通人群健康检查且不出现身体不适,请检查{{
            fooddata.checkItems
          }}等并咨询医生;
        </p>
        <p>
          2.如出现相关症状时,请及时咨询{{
            fooddata.departments
          }}或前往附近正规医疗机构及时就诊
        </p>
      </div>
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
let Base64 = require("js-base64").Base64;

import { circular, health, unit, color } from "@/libs/report";

export default {
  data() {
    return {
      bg:
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/bg.png",
      offtrumpet:
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/trumpet-off.png",
      ontrumpet:
        "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/reportDetails/trumpet-on.gif",
      istrumpet: false,
      //语音
      myAuto: null,
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

      headdata: {
        scoreLeft: "",
        sections: [],
      },
      fooddata: {
        tableList: [],
      },

      params: {
        recordId: "563755",
        relationUserId: "",
      },
    };
  },
  filters: {
    // 图片
    imageUrl(type, status) {
      var obj = {};
      if (type) {
        if (type == "2") {
          obj = {
            0: c,
            1: e,
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
  },
  computed: {
    showtrumpet() {
      return this.istrumpet ? this.ontrumpet : this.offtrumpet;
    },
  },
  components: {},

  methods: {
    pagedetail() {
      this.$http
        .request({
          url: "/ajax/user/wx/uroscopy/detail",
          method: "get",
          params: this.params,
        })
        .then((res) => {
          console.log(res, "res");
          if (res && res.respBody) {
            let data = res.respBody.detail;
            let thirdDetail = res.respBody.thirdDetail.detail_data;
            let obj = this.refactoring(data, thirdDetail);
            let scoreLeft = 0,
              arr = [],
              start,
              sections = [];
            arr = [null, null, "正常", null, "异常", null];

            start = (506 / arr.notempty().length) * data.healthStatus - 25;
            // scoreLeft =((506 / arr.notempty().length) * obj.value) / 100 + start;
            scoreLeft = (506 / arr.notempty().length) * 0.5 + start;
            scoreLeft = (scoreLeft / 750) * 100 + "vw";
            sections = arr.map((item) => {
              return { name: item };
            });

            console.log(data, "data");
            var cname = "",
              complications = "",
              checkItems = "",
              departments = "";
            data.diseases.forEach((element) => {
              cname +=","+ element.cname ;
              if (element.complications.length != 0) {
                complications += element.complications.join(", ");
              }
              if (element.checkItems.length != 0) {
                checkItems += element.checkItems.join(", ");
              }
              if (element.departments.length != 0) {
                departments += element.departments.join(", ");
              }
            });

            this.headdata = {
              datatime:
                res.respBody.thirdDetail.detail_data[0].record_detail_created *
                1000,
              sections: sections,
              value: obj.value,
              scoreLeft: scoreLeft,
              healthStatus: data.healthStatus,
              type: "2",
            };
            this.fooddata = {
              cname,
              complications,
              checkItems,
              departments,
              tableList: res.respBody.thirdDetail.detail_data,
            };

            // 画圆弧
            circular("diagram", obj);
          } else {
            this.$toast("网路繁忙,稍候再试!");
          }
        });
    },
    // 数据重组
    refactoring(item, arr) {
      console.log(item, arr, "item,");
      item.healthStatus = item.score == 0 ? 0 : 1;
      if (item.score == null || item.score == undefined) {
        var num = 0;
        arr.forEach((item, index) => {
          if (item.record_detail_status == 1) {
            num++;
          }
        });
        var scord = (num / 14) * 100;
        item.score = scord == 0 ? "0" : Math.floor(scord);
      }

      //  血尿酸type统一
      let obj = {
        value: item.score,
        unit: unit(
          "2",
          item.healthStatus == 0 ? String(item.healthStatus) : item.healthStatus
        ),
        title: health(
          "2",
          item.healthStatus == 0 ? String(item.healthStatus) : item.healthStatus
        ),
        color: color(
          "2",
          item.healthStatus == 0 ? String(item.healthStatus) : item.healthStatus
        ),
      };
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
            let str = this.$refs.chartStatusResult.innerHTML;
            this.wxsData.common.app_id = res.respBody.appId;
            this.wxsData.data.text = Base64.encode(str);
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
      padding-top: rem(26);
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
        transform: scale(0.6);
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
        font-size: rem(18);
        // transform: scale(0.8);
        white-space: nowrap;
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
    left: rem(168);
    top: rem(100);
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(420);
    height: rem(420);
    background-color: #f1f4f9;
    border-radius: 50%;
    #diagram {
      width: rem(370);
      height: rem(370);
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
      font-size: rem(32);
    }
    .chart-food-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .chart-food-icon {
      position: absolute;
      right: rem(92);
      top: rem(36);
      width: 30%;
      border-radius: 50%;
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
    padding: 0 rem(40) 0 rem(8);
    li {
      display: flex;
      height: rem(56);
      align-items: center;
      justify-content: space-between;
      .progress-left {
        width: rem(120);
        color: #666666;
        font-size: rem(24);
      }
      & > .progress {
        width: rem(320);
      }
      .progress-right {
        width: rem(100);
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
  // 图表
  table {
    width: 100%;
    .table-head {
      height: rem(64);
      width: 100%;
      text-align: center;
      line-height: rem(64);
      background-color: #1b66ff;
      color: #fff;
      border: 1px solid #797979;
      &.table-td {
        font-size: rem(24);
        background-color: #fff;
        color: #333333;
        td {
          border: 1px solid #797979;
          // width: 33.3%;
        }
      }
    }
  }
}
</style>
