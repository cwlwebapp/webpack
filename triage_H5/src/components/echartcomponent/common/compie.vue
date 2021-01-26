<template>
  <div class="pressure">
    <div class="pressure_pie" ref="pressure_pie"></div>
    <!-- <div class="pressure-right" @click="calendarlisten('totalheat')" ref="totalheat"> -->

    <div class="pressure-right" ref="totalheat">
      本周检测
      <span>{{ details.total }}</span
      >次,异常 <span>{{ details.error }}</span
      >次
      <p>
        <span
          >{{
            (details.type != "niaodaifu"
              ? details.high * 100
              : details.error * 100) | precent(details.total)
          }}%</span
        >{{ details.type != "niaodaifu" ? "偏高" : "异常" }}
        <span class="span-descri"
          >({{ details.type != "niaodaifu" ? details.high : details.error }}组{{
            details.type != "niaodaifu" ? "偏高" : "异常"
          }}/共{{ details.total }}次)</span
        >
      </p>
      单次最高值{{ details.maxValue && details.maxValue.toFixed(0) }}
      <span
        class="span-reference"
        v-show="details.type != 'niaodaifu'"
        @click="reference"
        >(?参考值)</span
      >
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { pie_option } from "./compie.js";
let aud = null;
import {
  deleteHtmlTag,
  listeninit,
  socketsend,
  audio,
} from "../../../libs/weekconfig";
export default {
  data() {
    return {
      calendaricon: false,
    };
  },
  props: ["details"],
  filters: {
    precent(val, total) {
      if (!!total) {
        return (val / total).toFixed(0);
      }
      return 0;
    },
  },
  components: {},
  methods: {
    // 语音播放
    calendarlisten(val, type = false, isactive) {
      console.log(type, "type===");
      if (type) {
        aud = null;
      }
      if (aud) {
        if (isactive) {
          aud.pause();
        } else {
          aud.play();
          // aud.addEventListener("pause", () => {
          // this.$store.commit("calendaricon", Math.random());
          // });
        }
      } else {
        let str = deleteHtmlTag(this.$refs[val].innerHTML);
        str = str.slice(0, str.lastIndexOf("?"));

        socketsend(str, (au) => {
          aud = audio(au);
          aud.play();
          aud.addEventListener("pause", () => {
            // this.calendaricon = false;
            // console.log("123");
            this.$store.commit("calendaricon", Math.random() * 10);
          });
        });
      }
    },
    // app 跳转
    reference() {
      // 微信
      if (this.$util.isWxmp()) {
        let obj = {
          bloodpressure: "bloodpressure",
          glu: "glu",
          uric_acid: "uric_acid",
          cholesterol: "cholesterol",
          temperature: "temperature",
        };
        wx.miniProgram.navigateTo({
          url:
            "/pages/assess/heath/referDetail/referDetail?type=" +
            obj[this.details.type],
        });
      } else if (this.$util.isApp()) {
        // app跳转
        // RefValType=0 //血压
        // RefValType=2 //血糖
        // RefValType=3 //血尿酸
        // RefValType=4 //总胆固醇
        // RefValType=5 //体温
        let obj = {
          bloodpressure: 0,
          glu: 2,
          uric_acid: 3,
          cholesterol: 4,
          temperature: 5,
        };
        app.goApp(
          "com.ysch.platform.healthy.ui.ReferenceValActivity?type=" +
            obj[this.details.type]
        );
      } else {
        this.$toast("暂不支持,敬请期待!");
        // let obj = {
        //   bloodpressure: 0,
        //   glu: 2,
        //   uric_acid: 3,
        //   cholesterol: 4,
        //   temperature: 5,
        // };
        // console.log(
        //   this.details.type,
        //   obj[this.details.type],
        //   "obj[this.details.type]"
        // );
      }
    },
  },
  created() {
    console.log(this.details, "details====");
    listeninit();
  },
  mounted() {
    let total = this.details.total;
    let high = this.details.high;
    let low = this.details.error - this.details.high;
    let normal = total - this.details.error;
    let arr = [high, low, normal];
    let arrtitle = ["%\n偏高", "%\n偏低", "%\n正常"];

    if (this.details.type == "niaodaifu") {
      pie_option.color = ["#F05A49", "#29AB91"];
      pie_option.series[0].data = [
        {
          name: "%\n异常",
          value: 0,
        },
        {
          name: "%\n正常",
          value: 0,
        },
      ];
      arrtitle = ["%\n异常", "%\n正常"];
      arr = [high + low, normal];
    }
    
    // console.log(arr,'==========arr')
    pie_option.series[0].data = pie_option.series[0].data.map((item, index) => {
      if (arr[index]>0) {
        Object.assign(item, {
          value: arr[index],
          name: ((arr[index] * 100) / total).toFixed(0) + arrtitle[index],
        });
        return item;
      } else {
        Object.assign(item, {
          value: 0,
          name: "",
        });
        return item;
      }
    });

    let lock = 0;
    arr.forEach((itme, index) => {
      if (itme > 0) {
        lock++;
      }
    });
    if (lock == 1) {
      pie_option.series[0].label.padding = [0, 0, 60, 0];
    } else {
      pie_option.series[0].label.padding = [0, 0, 0, 0];
    }

    let myChart_pie = echarts.init(this.$refs.pressure_pie);
    myChart_pie.setOption(pie_option, true);
    window.addEventListener("resize", () => {
      myChart_pie.resize();
    });
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.pressure {
  padding: rpx(30) rpx(16);
  display: flex;
  align-items: center;
  border-bottom: 1px dashed #ccc;
  .pressure_pie {
    width: rpx(228);
    height: rpx(228);
  }
  .pressure-right {
    margin-left: rpx(42);
    font-size: rpx(30);
    line-height: rpx(56);
    span {
      color: #ff5b05;
    }
    .span-descri {
      font-size: rpx(20);
      color: #999;
    }
    .span-reference {
      font-size: rpx(20);
      color: #108ee9;
    }
  }
}
</style>
