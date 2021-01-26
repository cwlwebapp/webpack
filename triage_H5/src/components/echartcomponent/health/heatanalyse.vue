<template>
  <div>
    <div class="weekly">
      <div class="weekly-head">营养素分析(cal)</div>
      <div class="weekly-line" ref="weekly_line"></div>
      <div class="analyse-table">
        <div class="analyse-table-head headfont">
          <div></div>
          <div>建议</div>
          <div>实际</div>
        </div>
        <div
          class="analyse-table-head"
          v-for="(item, index) of heatanalyse"
          :key="index"
        >
          <div :class="['carbohydrate', item.style]">{{ item.name }}</div>
          <div>
            {{ item.targetvalue }}g
            <span>({{ item.targetprecent }}%)</span>
          </div>
          <div>
            {{ item.value }}g
            <span>({{ item.precent }}%)</span>
          </div>
        </div>
        <!-- <div class="analyse-table-head">
          <div class="carbohydrate fat">脂肪</div>
          <div>
            455g
            <span>(43%)</span>
          </div>
          <div>
            263g
            <span>(21%)</span>
          </div>
        </div>
        <div class="analyse-table-head">
          <div class="carbohydrate protein">蛋白质</div>
          <div>
            455g
            <span>(43%)</span>
          </div>
          <div>
            263g
            <span>(21%)</span>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { heatanalyse_option } from "./option";
import dateutil from "../../../libs/dateutil";
export default {
  data() {
    return {
      heatanalyse: [
        {
          name: "碳水",
          style: "",
          value: 22,
          precent: 12,
          targetvalue: 46,
          targetprecent: 15,
        },
        {
          name: "脂肪",
          style: "fat",
          value: 22,
          precent: 12,
          targetvalue: 46,
          targetprecent: 15,
        },
        {
          name: "蛋白质",
          style: "protein",
          value: 22,
          precent: 12,
          targetvalue: 46,
          targetprecent: 15,
        },
      ],
    };
  },
  props: ["details"],
  components: {},
  created() {
    // console.log(this.details, "===========xxx");
  },
  mounted() {
    let data = this.details;
    // 营养参数表
    let targetseriesDate1 = [
      data.targetCho.toFixed(0),
      data.targetFat.toFixed(0),
      data.targetProtein.toFixed(0) * 1,
      data.targetCho.toFixed(0) * 1 +
        data.targetFat.toFixed(0) * 1 +
        data.targetProtein.toFixed(0) * 1,
    ];
    let seriesDate1 = [
      data.cho.toFixed(0),
      data.fat.toFixed(0),
      data.protein.toFixed(0),
      data.cho.toFixed(0) * 1 +
        data.fat.toFixed(0) * 1 +
        data.protein.toFixed(0) * 1,
    ];

    // console.log(seriesDate1,seriesDate1[0]*100 / seriesDate1[3])
    this.heatanalyse = this.heatanalyse.map((item, index) => {
      Object.assign(item, {
        value: seriesDate1[index],
        precent: ((seriesDate1[index] * 100) / seriesDate1[3]
          ? (seriesDate1[index] * 100) / seriesDate1[3]
          : 0
        ).toFixed(1),
        targetvalue: targetseriesDate1[index],
        targetprecent: (
          (targetseriesDate1[index] * 100) /
          targetseriesDate1[3]
        ).toFixed(1),
      });
      return item;
    });
    // 营养参数图
    let targetseriesDate = [
      (data.targetCho * 0.75).toFixed(1),
      (data.targetFat * 0.75).toFixed(1),
      (data.targetProtein * 0.75).toFixed(1),
      (
        data.targetCho * 0.25 +
        data.targetFat * 0.25 +
        data.targetProtein * 0.25
      ).toFixed(1),
    ];
    let seriesDate = [
      (data.cho * 0.75).toFixed(1),
      (data.fat * 0.75).toFixed(1),
      (data.protein * 0.75).toFixed(1),
      (data.cho * 0.25 + data.fat * 0.25 + data.protein * 0.25).toFixed(1),
    ];

    heatanalyse_option.series[0].data = heatanalyse_option.series[0].data.map(
      (item, index) => {
        Object.assign(item, { value: targetseriesDate[index] });
        return item;
      }
    );
    heatanalyse_option.series[1].data = heatanalyse_option.series[1].data.map(
      (item, index) => {
        Object.assign(item, { value: seriesDate[index] });
        return item;
      }
    );

    let myChart_line = echarts.init(this.$refs.weekly_line);
    myChart_line.setOption(heatanalyse_option, true);
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
    height: rpx(366);
  }
  .analyse-table {
    padding: 0 rpx(30) 0 rpx(30);
    .analyse-table-head {
      &.headfont {
        font-size: rpx(28);
        // font-weight: bold;
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      height: rpx(60);
      & > div {
        &:nth-child(1) {
          flex: 1.2;
        }
        color: #666666;
        flex: 2;
        span {
          font-size: rpx(20);
          color: #adadad;
        }
      }
      .carbohydrate {
        &.fat {
          color: #2b91e2;
          &::before {
            background-color: #2b91e2;
          }
        }
        &.protein {
          color: #29ab91;
          &::before {
            background-color: #29ab91;
          }
        }
        color: #f05a49;
        display: flex;
        align-items: center;

        &::before {
          content: "";
          // display: inline-block;
          width: rpx(16);
          height: rpx(16);
          background-color: #f05a49;
          border-radius: 50%;
          margin-right: rpx(10);
        }
      }
    }
  }
}
</style>
