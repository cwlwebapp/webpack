<template>
  <div>
    <div class="weekly">
      <div class="weekly-head">运动心率分析(次/分钟)</div>
      <div class="weekly-line" ref="weekly_line"></div>
      <div class="heart-icon">
        <div class="heart-icon-box">
          <div>
            <img :src="hreat" alt />建议心率
          </div>
          <div class="heart-icon-box-bottom">
            118-169
            <span>次/分钟</span>
          </div>
        </div>

        <div class="heart-icon-box">
          <div>
            <img :src="realityhreat" alt />建议心率
          </div>
          <div class="heart-icon-box-bottom">
            118-169
            <span>次/分钟</span>
          </div>
        </div>
      </div>
      <div class="totalheat-head-description">
        <span style="color:#1B66FF">自我感觉</span>：
        <span>3</span> 次非常吃力,
        <span>2</span>次轻松,
        <span>1</span>次非常轻松根据您的身体基本能情况,最大心率为
        <span>171</span>次/分钟,本周超过此心率
        <span>10</span>分钟,建议降低运动强度,即调整步行或跑步速度
        <!-- <img
          :src="meal"
          alt
        />-->
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
var hreat = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/hreat.png";
var realityhreat = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/realityhreat.png";
import { burnheart_option } from "./option";
export default {
  data() {
    return {
      hreat: hreat,
      realityhreat: realityhreat,
    };
  },
  props: ["details"],
  components: {},
  mounted() {
    console.log(this.details,'details======= 暂不实现')
    let myChart_line = echarts.init(this.$refs.weekly_line);
    myChart_line.setOption(burnheart_option, true);
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
    height: rpx(420);
  }
  .heart-icon {
    // width: rpx(658);
    height: rpx(142);
    background-color: #e9f7ff;
    border-radius: rpx(12);
    box-shadow: 0 2px 4px #dbdbdb;
    display: flex;
    align-items: center;
    text-align: center;
    .heart-icon-box {
      flex: 1;
      &:nth-child(1) {
        border-right: 1px solid #cccccc;
      }
      & > div {
        font-size: rxp(24);
        color: #666666;
        & > img {
          width: rpx(30);
          height: rpx(27);
          margin-right: rpx(8);
        }
      }
      .heart-icon-box-bottom {
        font-size: rpx(28);
        color: #333333;
        font-weight: bold;
        & > span {
          font-weight: normal;
          font-size: rpx(20);
          transform: scale(0.8);
        }
      }
    }
  }
  .totalheat-head-description {
    color: #666666;
    // font-size: rpx(24);
    padding: rpx(24) 0;
    letter-spacing: 1px;
    line-height: rpx(46);
    span {
      color: #ff5b05;
    }
    // & > img {
    //   width: rpx(28);
    //   height: rpx(26);
    //   margin-right: rpx(12);
    // }
  }
}
</style>
