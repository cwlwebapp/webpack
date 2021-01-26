<template>
  <div class="weeklylist">
    <!-- <p class="head-icon">
      <span class="iconfont icon-back" @click="back"></span>
      <span class="iconfont icon-fenxiang" ></span>
    </p> -->
    <div class="head">
      <ul class="head-title">
        <li :class="{active:titleindex==0}" @click="headtab(0)">周报</li>
        <li :class="{active:titleindex==1}" @click="headtab(1)">月报</li>
      </ul>
    </div>
    <Timeline v-if="titleindex == 0">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished[0]" :finished-text="finished_text[0]" @load="onLoad">
          <TimelineItem color="#28C3F9" v-for="(item,index) in timeList[0]" :key="index">
            <Icon type="ios-radio-button-on" size="24" slot="dot"></Icon>
            <p class="time">{{item.month}}</p>
            <ul class="oul" :style="item.mark">
              <li v-for="(otiem,oindex) in item.subList" :key="oindex" @click="$router.push({name: otiem.reportId ? 'index': 'noData', query: { reportId: otiem.reportId }})">
                {{otiem.week}}
                <p class="li-right">
                  <span v-show="otiem.animal" class="right-icon" :style="otiem.animal"></span>
                  <span v-show="otiem.blood" class="right-icon" :style="otiem.blood"></span>
                  <span class="iconfont icon-youkuohao"></span>
                </p>
              </li>
            </ul>
          </TimelineItem>
        </van-list>
        <Timeline v-if="timeList[0].length==0">
          <div class="no-data">
            <div class="title">
              <p>你还未生成任何报告</p>
              <p>快去记录数据吧~~</p>
            </div>
            <div class="ball">
              <img class="ball-icon" :src="doctor" alt />
            </div>
            <div class="bnt" @click="check">记录健康数据</div>
          </div>
        </Timeline>
      </van-pull-refresh>
      <TimelineItem color="transparent">
        <!-- <a href="#">查看更多</a> -->
        <Icon type="ios-disc-outline" size="24" slot="dot"></Icon>
      </TimelineItem>
    </Timeline>
    <Timeline v-if="titleindex == 1">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished[1]" :finished-text="finished_text[1]" @load="onLoad">
          <TimelineItem color="#28C3F9" v-for="(item,index) in timeList[1]" :key="index">
            <Icon type="ios-radio-button-on" size="24" slot="dot"></Icon>
            <p class="time">{{item.year}}</p>
            <ul class="oul" :style="item.mark">
              <li v-for="(otiem,oindex) in item.subList" :key="oindex" @click="$router.push({name: otiem.reportId ? 'month': 'noData', query: { reportId: otiem.reportId }})">
                {{toChinesNum(otiem.month) + "月"}}
                <p class="li-right">
                  <span v-show="otiem.animal" class="right-icon" :style="otiem.animal"></span>
                  <span v-show="otiem.blood" class="right-icon" :style="otiem.blood"></span>
                  <span class="iconfont icon-youkuohao"></span>
                </p>
              </li>
            </ul>
          </TimelineItem>
        </van-list>
        <Timeline v-if="timeList[1].length==0">
          <div class="no-data">
            <div class="title">
              <p>你还未生成任何报告</p>
              <p>快去记录数据吧~~</p>
            </div>
            <div class="ball">
              <img class="ball-icon" :src="doctor" alt />
            </div>
            <div class="bnt" @click="check">记录健康数据</div>
          </div>
        </Timeline>
      </van-pull-refresh>
      <TimelineItem color="transparent">
        <!-- <a href="#">查看更多</a> -->
        <Icon type="ios-disc-outline" size="24" slot="dot"></Icon>
      </TimelineItem>
    </Timeline>
  </div>
</template>
<script>
import Util from "../libs/util";

var mark = {
  backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/week/mark.png" + ")"
};
var animal = {
  backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/week/animal.png" + ")"
};
var blood = {
  backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/week/blood.png" + ")"
};

export default {
  data() {
    return {
      titleindex: 0,
      pageNum: [0, 0],
      timeList: [[], []],
      finished: [false, false],
      finished_text:['没有更多了','没有更多了'],

      isLoading: false, //上拉刷新
      loading: false, //触底刷新

      doctor: "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/nodata/doctor.png",
    };
  },
  components: {},

  methods: {
    // 返回应用
    back() {
      console.log('back', 'weeklylist');
      Util.goApp({ url: 'weeklylist' });
    },
    //时间
    getWeekOfYear(date) {
      let firstDay = new Date(date.getFullYear(), 0, 1);
      let dayOfWeek = firstDay.getDay();
      let spendDay = 1;
      if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
      }
      firstDay = new Date(date.getFullYear(), 0, 1 + spendDay);
      let d = Math.ceil(date.valueOf() - firstDay.valueOf()) / 86400000;
      return Math.ceil(d / 7) + 1;
    },
    toChinesNum(num) {
      let changeNum = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ];
      let unit = ["", "十", "百", "千", "万"];
      num = parseInt(num);
      let getWan = temp => {
        let strArr = temp
          .toString()
          .split("")
          .reverse();
        let newNum = "";
        for (var i = 0; i < strArr.length; i++) {
          if (i === 1 && strArr[1] === "1") {
            newNum = "十" + newNum;
          } else {
            newNum =
              (i == 0 && strArr[i] == 0
                ? ""
                : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
                ? ""
                : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))
              + newNum;
          }
        }
        return newNum;
      };
      let overWan = Math.floor(num / 10000);
      let noWan = num % 10000;
      if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
      }
      return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
    },
    // 主函数
    reqData() {
      if (this.finished[this.titleindex]) {
        this.isLoading = false;
        this.loading = false;
        return
      }

      this.$http
        .request({
          url: "/ajax/web/report/" + (this.titleindex == 0 ? "weeks" : "months"),
          method: "get",
          params: {
            pageNum: this.pageNum[this.titleindex],
            pageSize: 5,
            userId: '170667963358154752'
          }
        })
        .then(data => {
          this.isLoading = false;
          this.loading = false;

          if (!data.success) {
            this.$toast("网路繁忙,稍候再试!");
            return;
          }

          let reportList = [];
          for (let idx = 0; idx < data.respBody.length; idx++) {
            let item = data.respBody[idx];
            if (item.status == -1) {
              //数据不足，无法生成周报
              continue;
            }
            reportList.push({
              reportId: item.id,
              year: new Date(item.startDate).getFullYear(),
              month: new Date(item.startDate).getMonth() + 1,
              mark: idx == 0 && item.status == 1 ? mark : "",
              week: "第" + this.toChinesNum(this.getWeekOfYear(new Date(item.startDate))) + "周",
              animal: item.reports
                && item.reports["glu"]
                && item.reports["glu"]["analysisMap"]["fluctuation"].level != 0 ? animal : "",
              blood: item.reports
                && item.reports["bloodpressure"]
                && item.reports["bloodpressure"]["analysisMap"]["fluctuation"].level != 0 ? blood : ""
            });
          }

          console.log("reqData", this.titleindex, this.pageNum[this.titleindex], this.pageNum, reportList, reportList.length);
          if (reportList.length <= 0) {
            this.finished[this.titleindex] = true;

            if(this.pageNum[this.titleindex]==1){
              this.finished_text[this.titleindex] = ''
            }
            return;
          }

          let timeList = [];
          let tempList = [];
          reportList.forEach(report => {
            if (tempList.length == 0 || (this.titleindex == 0 ? (tempList[0].month == report.month) : (tempList[0].year == report.year))) {
              tempList.push(report);
            } else {
              timeList.push({
                year: tempList[0].year + "年",
                month: tempList[0].month + "月",
                mark: tempList[0].mark,
                subList: tempList.slice(0)
              });
              tempList = [report];
            }
          });
          timeList.push({
            year: tempList[0].year + "年",
            month: tempList[0].month + "月",
            mark: tempList[0].mark,
            subList: tempList.slice(0)
          });

          console.log("init", this.pageNum[this.titleindex], this.pageNum[this.titleindex] == 1);
          if (this.pageNum[this.titleindex] == 1) {
            this.timeList[this.titleindex] = [];
          }
          console.log("timeList old", this.timeList[this.titleindex], this.timeList[this.titleindex].length);
          console.log("timeList add", timeList, timeList.length);

          // 把新获取得数据append到this.timeList[this.titleindex]中
          if (this.titleindex == 0 && this.timeList[this.titleindex].length > 0 && this.timeList[0][this.timeList[0].length - 1].month === timeList[0].month) {
            timeList[0].subList.forEach(data => {
              this.timeList[0][this.timeList[0].length - 1].subList.push(data);
            });
            timeList = timeList.slice(1);
          }
          timeList.forEach(data => {
            this.timeList[this.titleindex].push(data);
          });
          console.log("timeList now", this.timeList[this.titleindex], this.timeList[this.titleindex].length)
          // this.$toast("刷新成功");
        });
    },
    // 记录健康数据
    check() {
      Util.goApp({ url: "check" });
    },
    // 头部切换
    headtab(titleindex) {
      this.titleindex = titleindex;

      this.pageNum[this.titleindex] = 0;
      this.finished[this.titleindex] = false;
      this.timeList[this.titleindex] = [];
      // this.reqData();
    },
    // 上拉刷新
    onRefresh() {
      this.pageNum[this.titleindex] = 1;
      this.finished[this.titleindex] = false;
      this.timeList[this.titleindex] = [];
      this.reqData();
    },
    // 触底刷新
    onLoad() {
      this.pageNum[this.titleindex]++;
      this.reqData();
    }
  },
  mounted() {},
  created() {
    // this.onLoad();
  }
};

</script>
<style lang='scss' scoped>
@import "src/style/mixin";
.weeklylist {
  background-color: #F7F7F7;
  .head-icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 rem(28);
    height: rem(88);
    color: #ccc;
    span {
      font-size: rem(24);
      color: #ccc;
    }
  }
  .head {
    height: rem(138);
    display: flex;
    align-items: center;
    justify-content: center;
    .head-title {
      width: rem(380);
      height: rem(84);
      line-height: rem(84);
      text-align: center;
      border: 1px solid #90d1ed;
      border-radius: rem(12);
      display: flex;
      li {
        width: 50%;
        height: 100%;
        font-size: rem(26);
        letter-spacing: rem(2);
        &.active {
          background-color: #0099fe;
          color: #fff;
        }
      }
    }
  }
  .time {
    font-size: 14px;
    font-weight: bold;
  }
  .oul {
    margin-top: rem(20);
    width: rem(640);
    border-radius: rem(12);
    background-color: #fff;
    padding: 0 rem(30);
    background-position: left top;
    background-size: rem(59);
    background-repeat: no-repeat;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: rem(88);
      border-bottom: 1px solid #f5f5f5;
      .li-right {
        .right-icon {
          display: inline-block;
          width: rem(40);
          height: rem(40);
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }
    li:last-child {
      border-bottom: 0;
    }
  }
}

.no-data {
  display: flex;
  height: 80vh;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  position: relative;
  .head-icon {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 rem(28);
    width: 100%;
    height: rem(88);
    color: #ccc;
    span {
      font-size: rem(24);
    }
  }

  .title {
    p {
      font-size: rem(32);
      color: #969696;
    }
  }
  .ball {
    width: rem(300);
    height: rem(300);
    border-radius: 50%;
    background-color: #4dbbf7;
    position: relative;
    .ball-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: rem(-113);
      margin-top: rem(-198);
      width: rem(226);
      height: rem(396);
    }
  }
  .bnt {
    width: rem(500);
    height: rem(100);
    text-align: center;
    line-height: rem(100);
    background-color: #0199fc;
    font-size: rem(32);
    color: #fff;
    border-radius: rem(12);
  }
}

</style>
