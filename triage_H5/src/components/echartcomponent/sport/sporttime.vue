<template>
  <div>
    <div class="weekly">
      <div class="weekly-head">运动时长分析(minute)</div>
      <div class="weekly-line" ref="weekly_line"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { sporttime_option } from "./option";
import dateutil from "../../../libs/dateutil";
export default {
  data() {
    return {};
  },
    props: ["details"],
  components: {},

  mounted() {
    let data = this.details.statisticBOS;
    // let ylist = dateutil.xaxis;
    //  let xlist = this.$store.state.xaxis;
     let ylist = dateutil.xaxis(this.details.start);
    let seriesDate = [],
      dailyDistance = [],
      dailyDistanceTotalGoal = [];

    data.forEach((element, index) => {
      dailyDistance.push(element.dailyDuration+element.sportDuration);
      dailyDistanceTotalGoal.push(element.dailyDurationTotalGoal+element.sportDurationTotalGoal);
    });
    seriesDate.push(dailyDistance, dailyDistanceTotalGoal);

    sporttime_option.yAxis.data = ylist.slice(1);

    sporttime_option.series = sporttime_option.series.map((item, index) => {
      Object.assign(item, { data: seriesDate[index] });
      return item;
    });

 

    let myChart_line = echarts.init(this.$refs.weekly_line);
    myChart_line.setOption(sporttime_option, true);
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
    height: rpx(560);
  }
}
</style>
