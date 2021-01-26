<template>
  <div>
    <div class="weekly">
      <div class="weekly-head">运动里程分析(m)</div>
      <div class="weekly-line" ref="weekly_line"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { sportdistance_option } from "./option";
import dateutil from "../../../libs/dateutil";
export default {
  data() {
    return {};
  },
  props: ["details"],
  components: {},
  mounted() {
    console.log(this.details);
    let data = this.details.statisticBOS;
    // let ylist = dateutil.xaxis;
    //  let xlist = this.$store.state.xaxis;
     let ylist = dateutil.xaxis(this.details.start);
    let seriesDate = [],
      dailyDistance = [],
      dailyDistanceTotalGoal = [];

    data.forEach((element, index) => {
      dailyDistance.push(element.dailyDistance+element.sportDistance);
      dailyDistanceTotalGoal.push(element.dailyDistanceTotalGoal+(element.sportDurationTotalGoal?element.sportDistanceTotalGoal:0));
    });
    seriesDate.push(dailyDistance, dailyDistanceTotalGoal);

  
    
    sportdistance_option.yAxis.data = ylist.slice(1);

    sportdistance_option.series = sportdistance_option.series.map(
      (item, index) => {
        item.data=seriesDate[index]
        // Object.assign(item, { data: seriesDate[index] });
        return item;
      }
    );

    let myChart_line = echarts.init(this.$refs.weekly_line);
    myChart_line.setOption(sportdistance_option, true);
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
