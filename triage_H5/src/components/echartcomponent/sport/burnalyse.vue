<template>
  <div>
    <div class="weekly">
      <div class="weekly-head">消耗热量分析(cal)</div>
      <div class="weekly-line" ref="weekly_line"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { burnalyse_option } from "./option";
import dateutil from "../../../libs/dateutil";
export default {
  data() {
    return {};
  },
  props: ["details"],
  components: {},
  mounted() {
    console.log(this.details, "=========xxxxxxx");
    let data = this.details.statisticBOS;
    // let xlist = dateutil.xaxis;
    //  let xlist = this.$store.state.xaxis;
     let xlist = dateutil.xaxis(this.details.start);
    let dailyCalorie = [],
      sportCalorie = [],
      all = [];

    let seriesDate = [];

    data.forEach((element, index) => {
      dailyCalorie.push(element.dailyCalorie);
      sportCalorie.push(element.sportCalorie);
      all.push(element.dailyCalorieTotalGoal + element.sportCalorieTotalGoal);
    });

    burnalyse_option.xAxis.data = xlist.slice(1);
    seriesDate.push(dailyCalorie, sportCalorie, all);

    burnalyse_option.series = burnalyse_option.series.map((item, index) => {
      Object.assign(item, { data: seriesDate[index] });
      return item;
    });

    let myChart_line = echarts.init(this.$refs.weekly_line);
    myChart_line.setOption(burnalyse_option, true);
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
