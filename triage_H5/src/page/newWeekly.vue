<template>
  <div>
    <!-- 日历 -->
    <div class="calendar">
      <div class="calendar-box">
        <span class="iconfont icon-duobianxing-copy" @click="lastweek"></span>
        <div class="calendar-time">
          {{ calendartime.start | timetype }}-{{ calendartime.end | timetype }}
        </div>
        <span
          :style="{ color: iscal ? '#BCBCBC' : '' }"
          class="iconfont icon-duobianxing"
          @click="nextweek"
        ></span>
      </div>
    </div>
    <div class="iscalendar1" v-show="iscalendar">
      <!-- 健康指数表盘 -->
      <div class="plate">
        <div class="headset">
          <img
            @click="calendarlisten('platedescri')"
            :src="calendaricon ? headset_active : headset"
            alt
          />
        </div>
        <div id="plate-box" ref="plate"></div>
      </div>
      <!-- 健康数据的标记 -->
      <div class="plate-title">
        <div>
          <div>
            <span>{{ calendardata.clockCount }}</span>
            次
          </div>
          <p>打卡次数</p>
        </div>
        <div>
          <div>
            <span>{{ calendardata.healthError }}</span>
            项
          </div>
          <p>身体异常</p>
        </div>
        <div>
          <div>
            <span>{{ calendardata.redundantCalorie }}</span>
            千卡
          </div>
          <p>多余热量</p>
        </div>
      </div>
      <!-- 健康描叙 -->
      <div class="plate-descri">
        <div
          ref="platedescri"
          class="plate-descri-content"
          v-html="calendardescribe(calendardata)"
        ></div>
        <!-- <div ref="platedescri" class="plate-descri-content" v-if="!istotalheat">
          本周健康指数<span>{{ calendardata.score | score }}</span
          >，打败了
          <span>{{ calendardata.rate }}%</span
          >的男性同龄人！您的饮食摄入量与运动消耗热量完全符合您健康所需。请继续保持！
        </div> -->
      </div>

      <!-- 健康状况分析 -->
      <div class="analyse">
        <!-- 标题 -->
        <div class="analyse-head">
          <div class="analyse-head-title">
            <div
              :style="{ 'border-left': index == 0 ? 'none' : '' }"
              :class="{ active: title_active == index }"
              v-for="(item, index) of title"
              :key="index"
              @click="choosetitle(index)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <!-- 健康内容 -->
        <div
          class="analyse-content-bloodpress"
          v-for="(item, index) of pageDate"
          :key="index"
          v-show="!isdate"
        >
          <div
            class="analyse-content-blood-title"
            v-show="item.typeCN || item.name"
          >
            <div class="analyse-content-blood-title-left">
              {{ item.typeCN || item.date | ndate(item.name) }}
              <img
                @click="calendarlisten1(index)"
                v-show="item.typeCN"
                :src="item.calendaricon ? headset_active : headset"
                alt
              />
            </div>
            <div
              class="analyse-content-blood-title-right"
              @click="measure(item)"
              v-show="title_active == 0 || $util.isApp()"
            >
              <span v-show="item.warn" class="iconfont icon-jinggao"></span
              >&emsp;{{
                (item.data && item.data.length != 0) ||
                (item.finishedCount && item.finishedCount != 0)
                  ? "更多数据"
                  : title_active == 1
                  ? "暂无数据 去打卡"
                  : "暂无数据 请先检查"
              }}
              <span class="iconfont icon-youkuohao"></span>
            </div>
          </div>
          <div
            v-if="item.pull_acrive"
            class="analyse-content-blood-box"
            @click="echartspull(index)"
          >
            <img
              :src="pull"
              alt
              v-show="
                item.pull_acrive &&
                ((item.data && item.data.length != 0) ||
                  (item.finishedCount && item.finishedCount != 0))
              "
            />
          </div>
          <div v-if="!item.pull_acrive">
            <component
              :ref="item.type"
              :details="item"
              :is="item.type || item.component"
            ></component>
          </div>
        </div>
        <div class="analyse-content-bloodpress1" v-show="isdate">
          <img :src="iscal ? noreport : nodata" alt="" />
          <p>
            <!-- {{
              title_active == 0
                ? "暂无检测数据"
                : title_active == 1
                ? "暂无饮食打卡数据"
                : title_active == 2
                ? "暂无运动打卡数据"
                : "暂未数据"
            }} -->
            {{ describetext }}
          </p>
        </div>
        <p class="heath-bottom">已经到底了~~</p>
      </div>
    </div>
    <div class="iscalendar" v-show="!iscalendar">
      <img :src="iscal ? noreport : nodata" alt="" />
      <p>{{ iscal ? "请在周一09:00之后查看" : "本周未生成计划" }}</p>
    </div>
    <!-- <specialist
      @click.native="
        $router.push({
          name: 'applyfor',
          query: {
            srcType: 3,
          },
        })
      "
    ></specialist> -->
    <specialist
      v-show="
        iscalendar &&
        calendardata.nutriClockCount + calendardata.sportClockCount > 0
      "
      @click.native="cwlalert"
    ></specialist>
  </div>
</template>

<script>
// 配置文件
import {
  config,
  option,
  deleteHtmlTag,
  listeninit,
  socketsend,
  audio,
} from "../libs/weekconfig";
import dateutil from "../libs/dateutil";
// 图片
var uploadedDataURL =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/pointer.png";
var headset =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset.png";
var headset_active =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_active.png";
var pull = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/pull.png";
var noreport =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/noreport.png";
var nodata =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/nodata.png";
// 地图插件
import echarts from "echarts";
// 健康状况
import bloodpressure from "../components/echartcomponent/detection/bloodpressure.vue";
import glu from "../components/echartcomponent/detection/glu.vue";
import temperature from "../components/echartcomponent/detection/temperature.vue";
import niaodaifu from "../components/echartcomponent/detection/niaodaifu.vue";
import uric_acid from "../components/echartcomponent/detection/uric_acid.vue";
import cholesterol from "../components/echartcomponent/detection/cholesterol.vue";
// 运动分析
import totalheat from "../components/echartcomponent/health/totalheat.vue";
import hotanalyse from "../components/echartcomponent/health/hotanalyse.vue";
import heatanalyse from "../components/echartcomponent/health/heatanalyse.vue";
import healthtable from "../components/echartcomponent/health/healthtable.vue";
// 饮食分析
import totalburn from "../components/echartcomponent/sport/totalburn.vue";
import burnalyse from "../components/echartcomponent/sport/burnalyse.vue";
import burnheart from "../components/echartcomponent/sport/burnheart.vue"; //暂不实现
import sportdistance from "../components/echartcomponent/sport/sportdistance.vue";
import sporttime from "../components/echartcomponent/sport/sporttime.vue";
// 弹框
// import element from "../components/specialist/element.js";

// console.log(dateutil, "starttweek");
let Base64 = require("js-base64").Base64;
let oldindex = null,
  nindex = false;
// lock = false;
// import bus from "../libs/bus";
export default {
  data() {
    return {
      config: config,
      // 日历面板数据
      calendartime: {
        start: dateutil.starttweek(new Date()).start,
        end: dateutil.starttweek(new Date()).end,
        // userId: "678678978600423424",
        // start: "2020-09-07",
        // end: "2020-09-13",
        // userId: "668693734744973312",
        // start: "2020-09-07",
        // end: "2020-09-13",
      },
      // 描叙
      // istotalheat: true,
      // 展示数据
      iscalendar: true,
      // 语音图表判断
      calendaricon: false,
      // 语音判断参数
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
      // websocket初始化
      socket: null,
      // 标签
      myAuto: null,
      // 数据
      calendardata: {},
      // 图表问题
      myChart: null,
      //  健康分析标题=========
      title: ["健康状况", "饮食分析", "运动分析"],
      // 切换索引
      title_active: 0,
      // 分析显示
      // pageDate: config[0],
      pageDate: [],
      // 图片
      headset: headset,
      headset_active: headset_active,
      pull: pull,
      nodata: nodata,
      noreport: noreport,
      // 展示
      isdate: false,

      describetext: "暂未开启计划",
      // 异常数据
      errorlist: [],
    };
  },
  components: {
    // 健康
    bloodpressure: bloodpressure,
    glu: glu,
    temperature: temperature,
    niaodaifu: niaodaifu,
    uric_acid: uric_acid,
    cholesterol: cholesterol,
    // 热量
    totalheat: totalheat,
    hotanalyse: hotanalyse,
    heatanalyse: heatanalyse,
    healthtable: healthtable,
    // 运动分析
    totalburn: totalburn,
    burnalyse: burnalyse,
    burnheart: burnheart,
    sportdistance: sportdistance,
    sporttime: sporttime,
  },
  // 过滤器
  filters: {
    // 时间格式
    timetype(val) {
      //  console.log(val,'===========')
      return val.split("-").slice(1).join("/");
    },
    // 数据合并
    // healthProblems(val) {
    //   if (val && val.length != 0) {
    //     return val.join(",");
    //   }
    //   return "无";
    // },
    // score(val) {
    //   return val <= 30
    //     ? "非常差"
    //     : val > 31 && val < 60
    //     ? "较差"
    //     : val > 61 && val < 80
    //     ? "良好"
    //     : val > 81 && val < 90
    //     ? "优秀"
    //     : "非常优秀";
    // },
    ndate(n, o) {
      // console.log(n,o,'====')
      if (!o) {
        return n;
      } else {
        var n1 = (n + "").slice(4, 6) + "/" + n.slice(6);
        return n1 + o;
      }
    },
  },
  computed: {
    calendaricon11() {
      return this.$store.state.calendaricon;
    },
    lock() {
      return this.$store.state.lock;
    },
    // istotalheat() {
    //   return this.calendardata.redundantCalorie == 0 &&
    //     this.calendardata.healthError == 0 &&
    //     this.calendardata.clockCount > 0
    //     ? false
    //     : true;
    // },
    iscal() {
      if (this.calendartime.end) {
        return (
          new Date(this.calendartime.end.replace("-", "/")).getTime() >
          new Date().getTime()
        );
      }
    },
  },
  watch: {
    calendaricon11(val) {
      // console.log(val, "====");
      if (!nindex) {
        this.pageDate[oldindex].calendaricon = false;
      }
      nindex = false;
    },
    lock(val) {
      console.log(val, "========123");
      if (this.myAuto) {
        if (!val) {
          this.myAuto.pause();
          this.calendaricon = false;
        }
      }
    },
  },
  methods: {
    // 弹框
    cwlalert() {
      // element.$cwlalert(
      //   this.calendardata.userId,
      //   this.calendartime.start,
      //   this.calendartime.end,
      //   this.errorlist
      // );
      this.$cwlalert(
        this.calendardata.userId,
        this.calendartime.start,
        this.calendartime.end,
        this.errorlist,
        this.$router
      );
    },
    // 富文本显示
    calendardescribe(calendardata) {
      let describe = "",
        tag = "";
      if (
        calendardata.redundantCalorie > 0 &&
        calendardata.nutriClockCount > 0 &&
        calendardata.sportClockCount > 0
      ) {
        describe = `您的饮食摄入量超高，运动消耗偏低，导致多余热量<span>${calendardata.redundantCalorie}</span>千卡`;
      } else if (
        calendardata.redundantCalorie > 0 &&
        calendardata.nutriClockCount > 0 &&
        calendardata.sportClockCount == 0
      ) {
        describe = `您的饮食摄入量超高，在运动上偷懒喽，没有相关的打卡数据，导致多余热量<span>${calendardata.redundantCalorie}</span>千卡。`;
      } else if (
        calendardata.redundantCalorie == 0 &&
        calendardata.nutriClockCount > 0 &&
        calendardata.sportClockCount > 0
      ) {
        describe = "您的饮食摄入量与运动消耗热量完全符合您健康所需。";
      } else if (
        calendardata.redundantCalorie == 0 &&
        calendardata.nutriClockCount == 0 &&
        calendardata.sportClockCount > 0
      ) {
        describe = "您在饮食上偷懒喽，没有相关的打卡数据，";
      } else if (
        calendardata.redundantCalorie == 0 &&
        calendardata.nutriClockCount == 0 &&
        calendardata.sportClockCount > 0
      ) {
        describe = "您在饮食上偷懒喽，没有相关的打卡数据，";
      }

      if (calendardata.healthError > 0) {
        tag = `健康方面务必重要关注:
          <span>${
            (calendardata.healthProblems &&
              calendardata.healthProblems.join(",")) ||
            "无"
          }</span>`;
      }
      if (
        calendardata.healthError == 0 &&
        calendardata.clockCount -
          calendardata.nutriClockCount -
          calendardata.sportClockCount ==
          0
      ) {
        tag = "健康方面无身体检测数据，建议定期检测";
      } else {
        tag = " ";
      }
      let str = `本周健康指数为
          <span>${calendardata.tag}</span
          >,打败了 <span>${calendardata.rate}%</span>同性同龄人!
           ${describe}七分吃三分动.少吃多动身体棒棒棒! ${tag}
          <p>以您当前的身体状况建议继续按方案进行.</p>`;
      return str;
    },
    // 上一周
    lastweek() {
      if (this.isdate) {
        this.isdate = false;
      }
      // this.title_active = 0;
      let obj = dateutil.nextweek(-7);
      this.calendartime.start = obj.start;
      this.calendartime.end = obj.end;
      this.$store.commit("settimelock", obj.start);
      // bus.$emit("fromFirst", obj.start);
      this.calendarpage();
      if (this.title_active == 0) {
        this.healthpage();
      } else if (this.title_active == 1) {
        this.pageDate1();
      } else if (this.title_active == 2) {
        this.pageDate2();
      }
      this.$forceUpdate();
    },
    // 下一周
    nextweek() {
      if (this.isdate) {
        this.isdate = false;
      }
      if (this.iscal) {
        return;
      }
      // this.title_active = 0;
      let obj = dateutil.nextweek(7);
      this.calendartime.start = obj.start;
      this.calendartime.end = obj.end;
      this.$store.commit("settimelock", obj.start);
      //  bus.$emit("fromFirst", obj.start);
      this.calendarpage();
      if (this.title_active == 0) {
        this.healthpage();
      } else if (this.title_active == 1) {
        this.pageDate1();
      } else if (this.title_active == 2) {
        this.pageDate2();
      }
      this.$forceUpdate();
    },
    //语音方法
    listen() {
      this.$store.commit("setDataLoading", true);
      this.$http
        .request({
          url: "/ajax/user/wx/xf/authorization",
          method: "get",
        })
        .then((res) => {
          if (res && res.respBody) {
            // loading
            // this.$store.commit("setDataLoading", true);
            // 传输内容
            this.wxsData.common.app_id = res.respBody.appId;
            // websoket初始化
            this.socket = new WebSocket(res.respBody.path);
            // 开启
            this.socket.onopen = () => {};
          }
        });
    },
    // 语音播放(文字)
    calendarlisten(val) {
      if (
        oldindex != null &&
        !this.lock &&
        this.$refs[this.pageDate[oldindex].type]
      ) {
        this.pageDate[oldindex].calendaricon = false;
        this.$refs[this.pageDate[oldindex].type][0].$children[0].calendarlisten(
          "totalheat",
          false,
          true
        );
      }
      // lock = true;
      this.$store.commit("setlock", true);
      let str = deleteHtmlTag(this.$refs[val].innerHTML);
      if (this.myAuto) {
        if (this.calendaricon) {
          this.myAuto.pause();
          this.calendaricon = false;
        } else {
          this.myAuto.play();
          this.calendaricon = true;
          this.myAuto.addEventListener("pause", () => {
            this.calendaricon = false;
          });
        }
        return;
      }
      this.calendaricon = true;
      this.wxsData.data.text = Base64.encode(str);
      if (this.socket) {
        this.$store.commit("setDataLoading", true);
        this.socketsend();
      }
    },
    // 建立WebSocket
    socketsend() {
      let au1 = "";
      // console.log(this.socket.readyState)  1表示可以通信
      // if (this.socket.readyState != 1) {
      //   // 开启
      //   this.socket.onopen = () => {};
      // }

      this.socket.send(JSON.stringify(this.wxsData));
      if (this.socket.readyState != 1) {
        // 开启

        this.socket = new WebSocket(this.socket.url);
        this.socket.onopen = () => {
          this.socket.send(JSON.stringify(this.wxsData));
        };
      } else {
        this.socket.send(JSON.stringify(this.wxsData));
      }

      this.socket.onmessage = (res) => {
        if (res && res.data) {
          let data = JSON.parse(res.data);
          if (data.code == 0) {
            au1 += window.atob(data.data.audio);
            if (data.data.status == 2) {
              this.$store.commit("setDataLoading", false);
              this.audio(au1);
            }
          }
        }
      };
      this.socket.onclose = (end) => {
        console.log(end, "--------------end");
      };
      this.socket.onerror = (err) => {
        console.log(err, "-----------err");
      };
    },
    // 音频标签
    audio(au) {
      this.myAuto = document.createElement("audio");
      this.myAuto.src = src(au);
      this.myAuto.play();
      this.myAuto.addEventListener("pause", () => {
        this.calendaricon = false;
        // console.log("xxxxssssssssss");
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
    // 日历面板数据
    calendarpage() {
      this.$http
        .request({
          url: "/ajax/web/report/week/main",
          method: "get",
          params: this.calendartime,
        })
        .then((res) => {
          console.log(res, "res");
          if (res && res.respBody) {
            if (res.respBody.clockCount == 0) {
              this.iscalendar = false;
              return;
            }
            var getMonthWeek = function (a, b, c) {
              /**
               * a = d = 当前日期
               * b = 6 - w = 当前周的还有几天过完(不算今天)
               * a + b 的和在除以7 就是当天是当前月份的第几周
               */
              var date = new Date(a, parseInt(b) - 1, c),
                w = date.getDay(),
                d = date.getDate();
              if (w == 0) {
                w = 7;
              }
              var config = {
                getMonth: date.getMonth() + 1,
                getYear: date.getFullYear(),
                getWeek: Math.floor((d + 6 - w) / 7),
              };
              return config;
            };
            let currenttime = new Date(res.respBody.start);
            var getDate = getMonthWeek(
              currenttime.getFullYear(),
              currenttime.getMonth() + 1,
              currenttime.getDate()
            );
            this.calendardata = res.respBody;
            option.series[0].data[0].value = res.respBody.score;
            option.series[0].data[0].name = `${getDate.getYear}年${getDate.getMonth}月 第${getDate.getWeek}周 -健康指数`;
            // console.log(option.series[1].data, "============");
            option.series[1].data = option.series[1].data.map((item, index) => {
              if (!!item.value) {
                if (index == 0) {
                  item.value = Math.round((res.respBody.score / 100) * 61);
                  item.name = res.respBody.tag;
                  option.series[1].itemStyle.normal.label.color =
                    res.respBody.score > 60 ? "#7CC609" : "#FF5B05";
                } else if (index == 2) {
                  item.value = 61 - Math.round((res.respBody.score / 100) * 61);
                }
                return item;
              }
              return item;
            });
            this.iscalendar = true;
            this.myChart.setOption(option, true);
          } else {
            // this.$toast(res.respDesc);
            // this.$toast("暂无数据");
            this.iscalendar = false;
            return;
          }
        })
        .catch((err) => {
          if (err.data.respStatus == 5002) {
            this.iscalendar = false;
          }
        });
    },
    // 标题显示
    choosetitle(index) {
      this.title_active = index;
      if (this.isdate) {
        this.isdate = false;
      }
      if (index == 0) {
        this.healthpage();
      } else if (index == 1) {
        this.pageDate1();
      } else if (index == 2) {
        this.pageDate2();
      }
      this.$forceUpdate();
    },
    // 测量跳转
    measure(val) {
      // console.log(val,'val=========')
      // 微信
      if (this.$util.isWxmp()) {
        let obj = {
          bloodpressure: "bloodpressure",
          glu: "glu",
          niaodaifu: "uroscopy",
          uric_acid: "uric_acid",
          cholesterol: "cholesterol",
          temperature: "temperature",
        };
        wx.miniProgram.navigateTo({
          url: `/pages/assess/heath/healthlist/healthlist?datatype=${
            obj[val.type]
          }&name=${val.typeCN}`,
        });
        // this.$router.push({ name: "apppage" });
        // this.$toast("暂无不支持!");
      } else if (this.$util.isApp()) {
        // app跳转
        // RefValType=0 //血压
        // RefValType=2 //血糖
        // RefValType=3 //血尿酸
        // RefValType=4 //总胆固醇
        // RefValType=5 //体温

        if (this.title_active) {
          console.log(val.date, "==============");
          app.goApp(
            "com.ysch.platform.healthy.ui.DietaryManagerActivity?startDay=" +
              val.date
          );
        } else {
          let obj = {
            bloodpressure: 0,
            niaodaifu: 1,
            glu: 2,
            uric_acid: 3,
            cholesterol: 4,
            temperature: 5,
          };
          app.goApp(
            "com.ysch.platform.healthy.checkup.CheckupDataActivity?extra_type=" +
              obj[val.type] +
              "&extra_user=-1"
          );
        }
      } else {
        this.$toast("暂不支持,敬请期待!");
      }
    },
    // 检测数据
    healthpage() {
      this.pageDate = [];
      this.$http
        .request({
          url: "/ajax/web/report/week/indicator",
          method: "get",
          params: this.calendartime,
        })
        .then((res) => {
          if (res && res.respBody) {
            res.respBody = res.respBody.filter((item, index) => {
              if (["waistline", "weight"].indexOf(item.type) == -1) return item;
            });

            let total = 0,
              errorlist = [];
            res.respBody.forEach((element, index) => {
              if (element.error && element.error != 0) {
                element.pull_acrive = true;
                element.warn = true;
                errorlist.push(element.typeCN);
              }
              total += element.total * 1;
              Object.assign(this.config[0][index], element, {
                start: this.calendartime.start,
              });
            });

            this.errorlist = errorlist;
            if (total > 0) {
              this.pageDate = this.config[0];
            } else {
              this.isdate = true;

              this.describetext = "偷懒喽，暂无打卡数据";
            }
          } else {
            // this.$toast("暂无数据");
            this.isdate = true;

            this.describetext = "暂未开启计划";
          }
          // console.log(res.respBody, "===xxx");
        });
    },
    // 饮食分析
    pageDate1() {
      this.pageDate = [];
      this.$http
        .request({
          url: "/ajax/web/report/week/nutri",
          method: "get",
          params: this.calendartime,
        })
        .then((res) => {
          if (
            res &&
            res.respBody &&
            res.respBody.finishedCount &&
            res.respBody.finishedCount > 0
          ) {
            // 数据合并前三个
            this.config[1] = this.config[1].map((item, index) => {
              if (!item.name) {
                if (index == 0 || index == 2) {
                  Object.assign(
                    item,
                    res.respBody,
                    { dailyReports: "" },
                    { start: this.calendartime.start }
                  );
                  return item;
                } else {
                  function compare(pro) {
                    return function (obj1, obj2) {
                      var val1 = obj1[pro];
                      var val2 = obj2[pro];
                      if (val1 > val2) {
                        //正序
                        return 1;
                      } else if (val1 < val2) {
                        return -1;
                      } else {
                        return 0;
                      }
                    };
                  }
                  res.respBody.dailyReports.sort(compare("date"));

                  Object.assign(
                    item,
                    {
                      dailyReports: res.respBody.dailyReports,
                    },
                    { start: this.calendartime.start }
                  );
                  return item;
                }
              }
              return item;
            });
            // 周期合并
            res.respBody.dailyReports.forEach((element, index) => {
              Object.assign(this.config[1][index + 3], element, {
                start: this.calendartime.start,
              });
            });

            this.pageDate = this.config[1];
            // console.log(this.pageDate, "============config[1]");
          } else if (res && res.respBody && res.respBody.finishedCount == 0) {
            this.isdate = true;
            this.describetext = "偷懒喽，暂无打卡数据";
            // this.$toast("暂无数据");
          } else {
            this.isdate = true;
            // this.$toast("暂无数据");
            this.describetext = "暂未开启计划";
          }
          // console.log(res, "============");
        });
    },
    // 运动分析
    pageDate2() {
      this.pageDate = [];
      this.$http
        .request({
          url: "/ajax/web/report/week/sport",
          method: "get",
          params: this.calendartime,
        })
        .then((res) => {
          // console.log(res, "===========11111111");
          if (
            res &&
            res.respBody &&
            res.respBody.completeRate &&
            res.respBody.completeRate > 0
          ) {
            // 数据合并前三个
            this.config[2] = this.config[2].map((item, index) => {
              if (index == 0) {
                Object.assign(
                  item,
                  res.respBody,
                  { statisticBOS: "" },
                  { start: this.calendartime.start }
                );
                return item;
              } else {
                Object.assign(
                  item,
                  {
                    statisticBOS: res.respBody.statisticBOS,
                  },
                  { start: this.calendartime.start }
                );
                return item;
              }
            });

            this.pageDate = this.config[2];
            // console.log(config[1], "============");
          } else if (res && res.respBody && res.respBody.completeRate == 0) {
            this.isdate = true;
            this.describetext = "偷懒喽，暂无打卡数据";
            // this.$toast("暂无数据");
          } else {
            this.isdate = true;
            this.describetext = "暂未开启计划";
            // this.$toast("暂无数据");
          }
        });
    },
    // 语音播报
    calendarlisten1(index) {
      if (this.lock) {
        this.$store.commit("setlock", false);
        // this.$toast('请关闭其他语音!')
        // return
      }
      let type = false;
      if (
        (this.pageDate[index].data && this.pageDate[index].data.length != 0) ||
        (this.pageDate[index].dailyReports &&
          this.pageDate[index].dailyReports.length != 0) ||
        (this.pageDate[index].statisticBOS &&
          this.pageDate[index].statisticBOS.length != 0)
      ) {
        if (oldindex != null && oldindex != index) {
          this.pageDate[oldindex].calendaricon = false;
          nindex = true;
          this.$refs[
            this.pageDate[oldindex].type
          ][0].$children[0].calendarlisten("totalheat", false, true);
        }

        if (oldindex == index) {
          this.pageDate[index].calendaricon = !this.pageDate[index]
            .calendaricon;
        } else {
          this.pageDate[index].calendaricon = true;
          oldindex = index;
          type = true;
        }

        if (this.pageDate[index].pull_acrive) {
          this.pageDate[index].pull_acrive = false;
        }

        this.$nextTick(() => {
          this.$refs[this.pageDate[index].type][0].$children[0].calendarlisten(
            "totalheat",
            type,
            !this.pageDate[index].calendaricon
          );
        });
      } else {
        this.$toast("没有检测数据,请前往首页检测身体各项目标指标!");
      }
    },
    // 下拉显示
    echartspull(index) {
      console.log(this.pageDate[index], this.pageDate, "===========123");
      if (
        (this.pageDate[index].data && this.pageDate[index].data.length != 0) ||
        (this.pageDate[index].finishedCount &&
          this.pageDate[index].finishedCount != 0) ||
        (this.pageDate[index].statisticBOS &&
          this.pageDate[index].statisticBOS.length != 0)
      ) {
        this.pageDate[index].pull_acrive = false;
      } else {
        if (
          this.title_active == 1 &&
          this.pageDate[index].finishedCount &&
          this.pageDate[index].finishedCount != 0
        ) {
          this.$toast("暂无记录 去打卡!");
        } else if (
          this.title_active == 0 &&
          this.pageDate[index].data &&
          this.pageDate[index].data.length != 0
        ) {
          this.$toast("没有检测数据,请前往首页检测身体各项目指标!");
        }
      }
    },
  },
  created() {
    console.log(
      this.$route.query && this.$route.query.code,
      "===========this.$router.query&&this.$router.query.code"
    );
    if (this.$route.query && this.$route.query.code && this.$route.query.code) {
      this.title_active = this.$route.query.code;
      let obj = dateutil.nextweek(-7);
      this.calendartime.start = obj.start;
      this.calendartime.end = obj.end;
    }
  },
  mounted() {
    //  this.$store.commit("settimelock", this.calendartime.start);
    // bus.$emit("fromFirst", this.calendartime.start);

    // 日历数据
    this.calendarpage();
    // 健康检测
    if (this.title_active == 0) {
      this.healthpage();
    } else if (this.title_active == 1) {
      this.pageDate1();
    } else if (this.title_active == 2) {
      // this.pageDate = config[2];
      this.pageDate2();
    }
    // 语音初始化
    this.listen();
    listeninit();
    // 图表初始化
    this.myChart = echarts.init(this.$refs.plate);
    // 监听大小变化
    // 监听数据(扇形图,地图)
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";

.calendar {
  height: rpx(80);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dddddd;
  .calendar-box {
    height: 100%;
    width: rpx(312);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: rpx(28);
    .calendar-time {
      width: rpx(172);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.iscalendar1 {
  // 仪表盘健康数据
  .plate {
    .headset {
      height: rpx(90);
      display: flex;
      align-items: center;
      padding-left: rpx(30);
      padding-top: rpx(44);
      & > img {
        width: rpx(36);
        height: rpx(32);
      }
    }
    padding: 0 0 rpx(40);
    #plate-box {
      height: rpx(450);
      width: 100%;
    }
  }
  // 仪表盘健康数据
  .plate-title {
    display: flex;
    height: rpx(78);
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0 rpx(60);

    div {
      font-size: rpx(22);
      color: #ccc;
      span {
        font-size: rpx(36);
        font-weight: bold;
        color: #000;
      }
      p {
        font-size: rpx(24);
        color: #666666;
      }
    }
  }
  // 健康描述
  .plate-descri {
    padding: rpx(40) rpx(30);
    .plate-descri-content {
      background-color: #f9f9f9;
      border-radius: rpx(20);
      padding: rpx(30) rpx(16);
      color: #666666;
      line-height: rpx(46);
      letter-spacing: rpx(2);
      >>> span {
        color: #ff5b05;
      }
    }
  }
  // 健康分析
  .analyse {
    background-color: #f3f3f5;
    padding: 0 rpx(30);
    // 标题
    .analyse-head {
      display: flex;
      height: rpx(130);
      align-items: center;
      justify-content: center;
      .analyse-head-title {
        width: rpx(564);
        height: rpx(60);
        display: flex;
        align-items: center;
        background-color: #ffffff;
        border-radius: rpx(12);
        overflow: hidden;

        & > div {
          flex: 1;
          text-align: center;
          border-left: 1px solid #ccc;
          height: rpx(60);
          line-height: rpx(60);
          &.active {
            background-color: #1b66ff;
            color: #fff;
          }
        }
      }
    }
    // 内容
    .analyse-content-bloodpress {
      background-color: #fff;
      border-radius: rpx(12);
      margin-bottom: rpx(18);
      overflow: hidden;
      .analyse-content-blood-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: rpx(96);
        padding: 0 rpx(16);

        & > div {
          display: inline-flex;
          align-items: center;
          img {
            width: rpx(36);
            height: rpx(32);
            margin-left: rpx(16);
          }
          span {
            margin-left: rpx(16);
          }
        }
        .analyse-content-blood-title-left {
          font-size: rpx(30);
        }
        .analyse-content-blood-title-right {
          font-size: rpx(26);
          color: #999999;
          .icon-jinggao {
            color: #ff574d;
          }
        }
      }
      .analyse-content-blood-box {
        display: flex;
        height: rpx(50);
        justify-content: center;

        img {
          width: rpx(38);
          height: rpx(19);
        }
      }
    }
    // 无数据页面
    .analyse-content-bloodpress1 {
      height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: rpx(414);
        height: rpx(398);
      }
    }
    .heath-bottom {
      text-align: center;
      padding: 0 rpx(64);
    }
  }
}

.iscalendar {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: rpx(414);
    height: rpx(398);
  }
}
</style>
