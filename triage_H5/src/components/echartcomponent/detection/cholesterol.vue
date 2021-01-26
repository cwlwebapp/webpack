<template>
  <div>
    <compie :details="details"></compie>
    <div class="weekly">
      <div class="weekly-head">一周{{ details.typeCN }}趋势(mmol/L)</div>
      <div class="weekly-line" ref="weekly_line"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import compie from "../common/compie.vue";
import { cholesterol_option } from "./option.js";
import dateutil from "../../../libs/dateutil";
export default {
  data() {
    return {};
  },
  props: ["details"],
  components: {
    compie,
  },
  mounted() {
    let data = this.details.data;
    // let xlist = dateutil.xaxis;
    //  let xlist = this.$store.state.xaxis;
    let xlist = dateutil.xaxis(this.details.start);

    let seriesx = "";
    let seriesDate = [[], [], [], []];
    let unit = "";

    data.forEach((element, index) => {
      seriesx = xlist.indexOf(dateutil.time1(element.measureTime));
      seriesDate[element.status].push([seriesx, element.value.cholesterol]);
      if (!unit) {
        unit = element.value.unit;
      }
    });
    cholesterol_option.xAxis.data = xlist;
    cholesterol_option.series = cholesterol_option.series.map((item, index) => {
      Object.assign(item, { data: seriesDate[index] });
      return item;
    });
    cholesterol_option.cwl = unit||'mmol/L';
    // console.log(cholesterol_option.series,'cholesterol_option.series===')
    let myChart_line = echarts.init(this.$refs.weekly_line);

    myChart_line.setOption(cholesterol_option, true);

    window.addEventListener("resize", () => {
      myChart_line.resize();
    });
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.weekly {
  padding: 0 rpx(16);
  .weekly-head {
    padding: rpx(32) 0;
  }
  .weekly-line {
    height: rpx(596);
  }
}
</style>
