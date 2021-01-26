<template>
  <div class="totalheat">
    <div
      class="totalheat-head"
      :style="{ backgroundImage: 'url(' + foodbg + ')' }"
    >
      <div class="totalheat-head-title">
        总摄入热量
        <img
          @click="calendarlisten('totalheat')"
          :src="calendaricon ? headset_active : headset_off"
          alt
        />
      </div>
      <div class="totalheat-head-num">
        <img :src="hot" alt />
        {{ details.calorie }}
        <span>千卡</span>
      </div>
      <div class="totalheat-head-description" ref="totalheat">
        比推荐摄入热量{{
          details.calorie | calorieshow(details.targetCalorie)
        }}千卡,一周{{
          details.calorie > details.targetCalorie ? "多" : "少"
        }}摄入卡路里≈{{
          details.calorie | calorieshow1(details.targetCalorie, 116)
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
            :style="{ color: '#999', fontSize: '10px' }"
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
var foodbg =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/foodbg.png";
var headset_off =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_off.png";
var headset_active =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/headset_active.png";
var hot = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/hot.png";
var meal = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/meal.png";

var completion =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/completion.png";
var punch =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/punch.png";
var intake =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/intake.png";
var ingredient =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/ingredient.png";
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
          name: "完成度",
          status: up,
          style: false,
          style1: false,
          value: "60",
          statusvalue: "12%",
          unit: "%",
        },
        {
          img: punch,
          name: "打卡",
          status: up,
          style: false,
          style1: false,
          value: "22",
          statusvalue: "12%",
          unit: "次",
        },
        {
          img: intake,
          name: "摄入量超标",
          status: down,
          style: true,
          style1: true,
          value: "1323",
          statusvalue: "225千卡",
          unit: "千卡",
        },
        {
          img: ingredient,
          name: "食材种类",
          status: down,
          style: true,
          style1: true,
          value: "1种",
          statusvalue: "1次",
          unit: "种",
        },
      ],
    };
  },
  props: ["details"],
  filters: {
    calorieshow(val, trigger) {
      console.log(val, trigger, "=========trigger");
      return val > trigger
        ? "多" + (val - trigger)
        : "少" + Math.abs(val - trigger);
    },
    calorieshow1(val, trigger, rate) {
      return (((Math.abs(val - trigger) / rate) * 100) / 150).toFixed(1);
    },
  },
  components: {},
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
  methods: {
    calendarlisten(val) {
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
    console.log(this.details, "===========details");
    this.tablelist = this.tablelist.map((item, index) => {
      if (index == 0) {
        let value = (
          (this.details.finishedCount * 100) /
          (this.details.taskCount)
        ).toFixed(1);
        let statusvalue = (this.details.lastFinishedCount*100 / (this.details.lastTaskCount || 1)) .toFixed(1);
        Object.assign(item, {
          value: value,
          statusvalue: Math.abs(value - statusvalue) + "%",
          status: value >= statusvalue ? up : down,
          style: value >= statusvalue ? false : true,
          unit: "%",
        });
        return item;
      } else if (index == 1) {
        let value = this.details.reportCount;
        let statusvalue =
          this.details.reportCount - this.details.lastReportCount;
        Object.assign(item, {
          value: value,
          statusvalue: Math.abs(statusvalue) + "次",
          status: statusvalue >= 0 ? up : down,
          style: statusvalue >= 0 ? false : true,
          unit: "次",
        });
        return item;
      } else if (index == 2) {
        let value =
          this.details.calorie > this.details.targetCalorie
            ? this.details.calorie - this.details.targetCalorie
            : 0;
        let statusvalue = value - this.details.lastCalorieExcess;
        Object.assign(item, {
          value: value,
          statusvalue: Math.abs(statusvalue) + "千卡",
          status: statusvalue >= 0 ? up : down,
          style: statusvalue >= 0 ? false : true,
          unit: "千卡",
        });
        return item;
      } else if (index == 3) {
        let value = this.details.ingredientCount;
        let statusvalue =
          this.details.ingredientCount - this.details.lastIngredientCount;
        Object.assign(item, {
          value: value,
          statusvalue: Math.abs(statusvalue) + "种",
          status: statusvalue >= 0 ? up : down,
          style: statusvalue >= 0 ? false : true,
          unit: "种",
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
      // &.distance {
      //   padding-top: rpx(10);
      //   margin-bottom: rpx(20);
      // }
      .totalheat-table-tr-head {
        padding-top: rpx(16);
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
