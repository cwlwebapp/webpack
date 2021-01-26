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
import { uric_acid_option } from "./option";
import dateutil from "../../../libs/dateutil";
export default {
  data() {
    return {
      // 折线图
    };
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
    let seriesDate = [[], [], [], [], []];
    let unit = "";

    data.forEach((element, index) => {
      seriesx = xlist.indexOf(dateutil.time1(element.measureTime));
      seriesDate[element.status + 1].push([seriesx, element.value.uricAcid]);
      if (!unit) {
        unit = element.value.unit;
      }
    });
    uric_acid_option.xAxis.data = xlist;

    uric_acid_option.cwl = unit || "mmol/L";

    uric_acid_option.series = uric_acid_option.series.map((item, index) => {
      Object.assign(item, { data: seriesDate[index] });
      return item;
    });
    let myChart_line = echarts.init(this.$refs.weekly_line);

    myChart_line.setOption(uric_acid_option, true);

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
