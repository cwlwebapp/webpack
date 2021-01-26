<template>
  <div class="totalheat">
    <div
      class="totalheat-head"
      :style="{ backgroundImage: 'url(' + foodbg + ')' }"
    >
      <div class="totalheat-head-title">
        总消耗热量
        <img
          @click="calendarlisten('totalheat')"
          :src="calendaricon ? headset_active : headset_off"
          alt
        />
      </div>
      <div class="totalheat-head-num">
        <img :src="hot" alt />
        {{ details.dailyCalories + details.sportCalories }}
        <span>千卡</span>
      </div>
      <div class="totalheat-head-description" ref="totalheat">
        比推荐消耗热量{{
          (details.dailyCalories + details.sportCalories)
            | calorieshow(
              details.goalDailyCalories + details.goalSportCalories
            )
        }}千卡,一周{{
          details.sportCalories > details.dailyCalories ? "多" : "少"
        }}消灭卡路里≈{{
          (details.dailyCalories + details.sportCalories)
            | calorieshow1(
              details.goalDailyCalories + details.goalSportCalories,
              116
            )
        }}小碗米饭
        <img :src="meal" alt />
      </div>
    </div>
    <div class="totalheat-table">
      <div
        :class="{ 'totalheat-table-tr': true, distance: item.style1 }"
        v-for="(item, index) of tablelist"
        :key="index"
      >
        <div class="totalheat-table-tr-head">
          <img :src="item.img" alt />
          {{ item.name }}
        </div>
        <div class="totalheat-table-tr-bottom">
          {{ item.value }}&nbsp;<span
            :style="{
              color: '#999',
              fontSize: '10px',
            }"
            >{{ item.unit }}</span
          >&nbsp;
          <p>
            <img :src="item.status" alt />
            <span :style="{ color: item.style ? '#E23B50' : '#23C2AA' }">{{
              item.statusvalue
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var foodbg = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/sportbg.png";
var headset_off = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_off.png";
var headset_active = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_active.png";
var hot = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/soprt_hot.png";
var meal = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/meal.png";

var completion = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/completion.png";
var punch = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/standard.png";
var intake = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/hebdomad.png";
var ingredient = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/mileage.png";
var up = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/up.png";
var down = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/down.png";
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
      foodbg,
      headset_off,
      headset_active,
      hot,
      meal,
      completion,
      up,
      down,
      // 图标
      calendaricon: false,
      tablelist: [
        {
          img: completion,
          name: "本周完成度",
          status: up,
          style: false,
          style1: false,
          value: "60%",
          statusvalue: 12,
        },
        {
          img: punch,
          name: "达标",
          status: up,
          style: false,
          style1: false,
          value: "60%",
          statusvalue: 12,
        },
        {
          img: intake,
          name: "一周里程",
          status: down,
          style: true,
          style1: true,
          value: "60%",
          statusvalue: 12,
        },
        {
          img: ingredient,
          name: "一周跑量",
          status: down,
          style: true,
          style1: true,
          value: "60%",
          statusvalue: 12,
        },
      ],
    };
  },
  props: ["details"],
  filters: {
    calorieshow(val, trigger) {
      return val > trigger
        ? "多" + val - trigger
        : "少" + Math.abs(val - trigger);
    },
    calorieshow1(val, trigger, rate) {
      return (((Math.abs(val - trigger) / rate) * 100) / 150).toFixed(1);
    },
  },
  computed: {
    lock() {
      return this.$store.state.lock;
    },
  },
  watch: {
    lock(val) {
      if (val) {
        aud.pause();
        this.calendaricon = false;
      }
    },
  },
  components: {},
  methods: {
    calendarlisten(val) {
      console.log("========");
      if (this.lock) {
        this.$store.commit("setlock", false);
      }
      if (aud) {
        if (this.calendaricon) {
          aud.pause();
          this.calendaricon = false;
        } else {
          aud.play();
          this.calendaricon = true;
          aud.addEventListener("pause", () => {
            this.calendaricon = false;
          });
        }
      } else {
        this.calendaricon = true;
        let str = deleteHtmlTag(this.$refs[val].innerHTML);
        socketsend(str, (au) => {
          aud = audio(au);
          aud.play();
          aud.addEventListener("pause", () => {
            this.calendaricon = false;
          });
        });
      }
    },
  },
  created() {
    // 语音初始化
    listeninit();
    // 数据展示
    let data = this.details;
    this.tablelist = this.tablelist.map((item, index) => {
      if (index == 0) {
        Object.assign(item, {
          value: data.completeRate,
          statusvalue:
            Math.abs(data.completeRate - data.prevCompleteRate || 0) + "%",
          status: data.completeRate > (data.prevCompleteRate || 0) ? up : down,
          style:
            data.completeRate > (data.prevCompleteRate || 0) ? false : true,
          unit: "%",
        });
        return item;
      } else if (index == 1) {
        Object.assign(item, {
          value: data.measureUpDay,
          statusvalue: !!data.prevMeasureUpDay
            ? (
                (Math.abs(data.measureUpDay - data.prevMeasureUpDay) * 100) /
                data.prevMeasureUpDay
              ).toFixed(1) + "%"
            : 0 + "%",
          status: data.measureUpDay >= (data.prevMeasureUpDay || 0) ? up : down,
          style:
            data.measureUpDay >= (data.prevMeasureUpDay || 0) ? false : true,
          unit: "天",
        });
        return item;
      } else if (index == 2) {
        Object.assign(item, {
          value: (data.dailyDistance / 1000).toFixed(1),
          statusvalue:
            (
              Math.abs(data.dailyDistance - data.prevDailyDistance || 0) / 1000
            ).toFixed(1) + "千米",
          status:
            data.dailyDistance >= (data.prevDailyDistance || 0) ? up : down,
          style:
            data.dailyDistance >= (data.prevDailyDistance || 0) ? false : true,
          unit: "千米",
        });
        return item;
      } else if (index == 3) {
        Object.assign(item, {
          value: (data.sportDistance / 1000).toFixed(1),
          statusvalue:
            (
              Math.abs(data.sportDistance - data.prevSportDistance || 0) / 1000
            ).toFixed(1) + "千米",
          status:
            data.sportDistance >= (data.prevSportDistance || 0) ? up : down,
          style:
            data.sportDistance >= (data.prevSportDistance || 0) ? false : true,
          unit: "千米",
        });
        return item;
      }
      return item;
    });
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.totalheat {
  .totalheat-head {
    // min-height: rpx(246);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 0 rpx(20);
    border-radius: rpx(12);
    .totalheat-head-title {
      display: flex;
      align-items: center;
      height: rpx(108);
      font-size: rpx(32);
      color: #d2ecff;
      & > img {
        width: rpx(36);
        height: rpx(32);
        margin-left: rpx(12);
      }
    }
    .totalheat-head-num {
      font-size: rpx(48);
      display: flex;
      align-items: center;
      color: #fff;
      & > img {
        width: rpx(43);
        height: rpx(48);
        margin-right: rpx(12);
      }
      & > span {
        font-size: rpx(24);
        color: #d2ecff;
        margin-left: rpx(12);
      }
    }
    .totalheat-head-description {
      color: #fff;
      font-size: rpx(24);
      padding: rpx(24) 0;
      line-height: rpx(32);

      & > img {
        width: rpx(28);
        height: rpx(26);
        margin-right: rpx(12);
      }
    }
  }
  .totalheat-table {
    height: rpx(300);
    border: 1px solid #ccc;
    border-top: none;
    border-bottom: none;
    // padding-top: rpx(32);
    display: flex;
    flex-wrap: wrap;
    .totalheat-table-tr {
      width: 50%;
      height: 50%;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      &:nth-child(2n) {
        border-right: 0 solid #ccc;
      }
      &.distance {
        padding: rpx(10) 0;
      }
      .totalheat-table-tr-head {
        padding-top: rpx(14);
        padding-left: rpx(16);
        font-size: rpx(26);
        color: #333;
        display: flex;
        align-items: center;
        margin-bottom: rpx(16);
        & > img {
          width: rpx(25);
          height: rpx(25);
          margin-right: rpx(8);
        }
      }
      .totalheat-table-tr-bottom {
        text-align: center;
        font-size: rpx(40);

        p {
          display: inline-flex;
          align-items: center;

          & > img {
            display: inline-flex;
            width: rpx(16);
            height: rpx(24);
            // margin: 0 0 0 rpx(12);
          }
          & > span {
            padding-top: rpx(6);
            display: inline-flex;
            font-size: rpx(20);
            color: #23c2aa;
          }
        }
      }
    }
  }
}
</style>
