<template>
  <div>
    <div class="weekly">
      <div class="weekly-head">摄入热量分析(cal)</div>
      <div class="weekly-line" ref="weekly_line"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { hotanalyse_option } from "./option";
import dateutil from "../../../libs/dateutil";
// let xlist = [""];
export default {
  data() {
    return {};
  },
  props: ["details"],
  computed: {
    // xlist() {
    //   return this.$store.state.xaxis;
    // },
  },
  watch: {
    // xlist(nval, oval) {
    //   console.log(nval, oval, "111111111111111");
    //   xlist = nval;
    // },
  },
  components: {},
  created() {},
  mounted() {
    let data = this.details.dailyReports;
    console.log(this.details.start, "=========xlist");
    let xlist = dateutil.xaxis(this.details.start);
    console.log(this.details.start, "=========xlist");
    // let xlist = this.$store.state.xaxis
    let breakfast = [],
      lunch = [],
      supper = [],
      addition = [],
      targetCalorie = [];
    let seriesDate = [];

    data.forEach((element, index) => {
      breakfast.push(element.breakfast.calorie);
      lunch.push(element.lunch.calorie);
      supper.push(element.supper.calorie);
      addition.push(element.addition.calorie);
      targetCalorie.push(element.targetCalorie);
    });

    hotanalyse_option.xAxis.data = xlist.slice(1);
    seriesDate.push(breakfast, lunch, supper, addition, targetCalorie);

    hotanalyse_option.series = hotanalyse_option.series.map((item, index) => {
      Object.assign(item, { data: seriesDate[index] });
      return item;
    });

    let myChart_line = echarts.init(this.$refs.weekly_line);
    myChart_line.setOption(hotanalyse_option, true);
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
    padding: rpx(42) 0;
  }
  .weekly-line {
    height: rpx(596);
  }
}
</style>
