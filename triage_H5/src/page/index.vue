<template>
  <div class="indexContent" ref="imageWrapper">
    <shareIcon @goapp="goapp" />
    <div :style="backgroundDiv" class="head">
      <p class="head-icon">
        <span class="iconfont"></span>
        <!-- <span v-if="isWxmp" class="iconfont icon-fenxiang" @click="$share"></span> -->
      </p>
      <h4 class="head-title">健康周报</h4>
      <div class="head-time">.{{startDate}}-{{endDate}}.</div>
      <p class="head-warn" v-if="bloodPressureData.status != -1 && bloodSugarData.status != -1">
        {{("本周血糖控制" + (bloodSugarData.status > 0 ? "不理想" : "理想") + "~")}}
        <br />
        {{("本周血压控制" + (bloodPressureData.status > 0 ? "不理想" : "理想") + "~")}}
        <span
          class="warn-content"
          :style="backgroundWarn"
        >{{ warning ? '请注意':'恭喜你'}}</span>
      </p>
      <p class="head-warn" v-if="bloodSugarData.status == -1 && bloodPressureData.status != -1">
        {{("本周血压控制" + (bloodPressureData.status > 0 ? "不理想" : "理想") + "~")}}
        <span
          class="warn-content"
          :style="backgroundWarn"
        >{{ warning ? '请注意':'恭喜你'}}</span>
      </p>
      <p class="head-warn" v-if="bloodSugarData.status != -1 && bloodPressureData.status == -1">
        {{("本周血糖控制" + (bloodSugarData.status > 0 ? "不理想" : "理想") + "~")}}
        <span
          class="warn-content"
          :style="backgroundWarn"
        >{{ warning ? '请注意':'恭喜你'}}</span>
      </p>
    </div>
    <!-- 血糖 -->
    <div v-show="ispulse">
      <!-- 血糖饼状图 -->
      <div class="blood">
        <h4 class="blood-title">血糖统筹</h4>
        <div class="blood-content">
          <div id="sector"></div>
        </div>
        <div class="blood-introduce">
          您本周({{startDate}}-{{endDate}})总共测量了{{bloodSugarData.totalMeasure}}次血糖,
          <span
            v-if="bloodSugarData.measureTimesStatus > 0"
          >血糖高于正常水平较多,</span>
          <span v-if="bloodSugarData.measureTimesStatus < 0">血糖低于正常水平较多,</span>
          <span v-if="bloodSugarData.needMoreTest">建议您增加血糖测量次数,以便监测高血糖变化。</span>
          <span v-else>继续保持日常血糖监测习惯，完整全面的血糖值数据，更好的分析与管理你的血糖。</span>
        </div>
      </div>
      <!-- 血糖趋势 -->
      <div class="blood">
        <h4 class="blood-title">血糖趋势</h4>
        <div class="blood-content">
          <div id="seven"></div>
        </div>
        <div class="blood-introduce">
          <p v-if="bloodSugarData.status > 0">血糖波动较大,控制情况不理想,请咨询医生及时了解您的血糖情况,及时调整血糖管理方案。</p>
          <p v-else>血糖波动较小，控制比较理想，平稳的血糖可以有效减少并发症的发生！</p>
        </div>
      </div>
      <!--平均血糖值 -->
      <div class="blood" v-show="bloodSugarData_average">
        <h4 class="blood-title">餐后平均血糖值</h4>
        <div class="blood-content">
          <div id="average"></div>
        </div>
        <div class="blood-introduce">
          本周餐后血糖平均值为{{bloodSugarData.average}}mmol/L，血糖值
          <span
            v-if="bloodSugarData.averageLevel > 0"
          >
            <strong>偏高</strong>
          </span>
          <span v-else-if="bloodSugarData.averageLevel < 0">
            <strong>偏低</strong>
          </span>
          <span v-else>
            <strong>正常</strong>
          </span>。
        </div>
      </div>
    </div>
    <!-- 血压 -->
    <div v-show="isbloodpressure">
      <!-- 血压饼状图 -->
      <div class="blood">
        <h4 class="blood-title">血压统筹</h4>
        <div class="blood-content">
          <div id="blood"></div>
        </div>
        <div class="blood-introduce">
          您本周({{startDate}}-{{endDate}})总共测量了{{bloodPressureData.totalMeasure}}次血压,
          <span
            v-if="bloodPressureData.measureTimesStatus > 0"
          >血压高于正常水平较多,</span>
          <span v-if="bloodPressureData.measureTimesStatus < 0">血压低于正常水平较多,</span>
          建议您增加血压测量次数,以便监测高血压变化。
        </div>
      </div>
      <!-- 血压趋势 -->
      <div class="blood">
        <h4 class="blood-title">血压趋势</h4>
        <div class="blood-content">
          <div id="bloodSeven"></div>
        </div>
        <div class="blood-introduce">
          <p v-if="bloodPressureData.status > 0">血压波动较大,控制情况不理想,请咨询医生及时了解您的血压情况,及时调整血压管理方案。</p>
          <p v-else>血压波动较小，控制比较理想，平稳的血压可以有效减少并发症的发生！</p>
        </div>
      </div>
      <!--平均血压值 -->
      <div class="blood">
        <h4 class="blood-title">平均血压值</h4>
        <div class="blood-content">
          <div id="bloodAverage"></div>
        </div>
        <div class="blood-introduce">
          本周测量的血压平均值为{{bloodPressureData.average.diastolic}}/{{bloodPressureData.average.systolic}}mmHg，属于
          <span
            v-if="bloodPressureData.averageLevel > 0"
          >
            <strong>偏高</strong>
          </span>
          <span v-else-if="bloodPressureData.averageLevel < 0">
            <strong>偏低</strong>
          </span>
          <span v-else>
            <strong>正常</strong>
          </span>范围。
        </div>
      </div>
      <!-- 血压脉差 -->
      <div class="blood" v-show="isbloodAverageSeven">
        <h4 class="blood-title">本周血压平均脉差</h4>
        <div class="blood-content">
          <div id="bloodAverageSeven"></div>
        </div>
        <div class="blood-introduce">
          <p>
            您本周脉压平均值为{{bloodPressureData.pulse.average}}mmHg。脉压值
            <span
              v-if="bloodPressureData.pulse.level > 0"
            >增大。请咨询您的医生及时了解血压情况，以便调整血压管理方案。</span>
            <span v-if="bloodPressureData.pulse.level < 0">减小。请咨询您的医生及时了解血压情况，以便调整血压管理方案。</span>
            <span v-else>正常。保持正常的脉压，可减少心血管疾病的发生。</span>
          </p>
        </div>
      </div>
    </div>
    <ul class="reduce-fat">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in fatlist" :key="index">
          <!-- <img v-lazy="image" /> -->
          <li
            class="oli"
            :style="{backgroundImage:'url('+image.imgurl+')'}"
          >
            <div class="oli-title">{{image.name}}</div>
            <div class="oli-description">{{image.briefIntro}}</div>
            <div class="oli-bnt"  @click="$router.push({ name: 'questionReport', query:{ type:image.type }})">添加计划</div>
          </li>
        </van-swipe-item>
      </van-swipe>
    </ul>

    <!-- <!-- 贴士标题 -->
    <!-- <div class="tips" :style="backgroundTips">
      <div class="tips-contnet">
        <span class="tips-icon" :style="backgroundTipsleft"></span>
        <ul class="tips-title">
          <li
            v-for="(item,index) in
          ((bloodSugarData.status != -1 && bloodPressureData.status != -1) ? tipList.all : bloodSugarData.status != -1 ? tipList.glu : tipList.hp)"
            :key="index"
            :style="backgroundTipstitle"
          >{{item}}</li>
        </ul>
        <span class="tips-icon" :style="backgroundTipsright"></span>
      </div>
    </div>-->
    <!-- 贴士详情 -->
    <!-- <ul class="tips-detail">
      <li class="detail-list">
        <p v-if="bloodSugarData.status != -1">
          您本周的血糖检测次数为
          <strong>{{bloodSugarData.totalMeasure}}</strong>次， 请
          <span v-if="bloodSugarData.needMoreTest">增加您的血糖测量次数</span>
          <span v-else>继续保持您的血糖测量习惯</span>。
        </p>
        <p v-if="bloodPressureData.status != -1">
          您本周的血压检测次数为
          <strong>{{bloodPressureData.totalMeasure}}</strong>次，
          增加日常血压测量次数，建立更完整全面的健康检测数据有利于更好的分析与管理您的个人健康。
        </p>
        <p class="detail-title">
          <span>01</span>规律检测
        </p>
      </li>
    </ul>
    <ul class="tips-detail">
      <li class="detail-list">
        请科学合理均衡饮食，饮食中增加水果，蔬菜，低脂，富含食用纤维的食物。减少钠盐的摄入，
        少吃或不吃哪些容易导致
        <span
          v-if="bloodSugarData.status != -1"
        >血糖</span>
        <span v-if="bloodPressureData.status != -1">血压</span>上升的食物。
        <p v-if="goodFoods.length != 0">
          宜吃食物：
          <span
            v-for="(item, idx) in goodFoods.slice(0, goodFoods.length-1)"
            :key="idx"
          >{{item}}、</span>
          {{goodFoods[goodFoods.length-1]}}等食物。
        </p>
        <div v-if="avoidFoods.length != 0">
          不宜食物：
          <span
            v-for="(item, idx) in avoidFoods.slice(0, avoidFoods.length-1)"
            :key="idx"
          >{{item}}、</span>
          {{avoidFoods[avoidFoods.length-1]}}等食物。
          <p v-if="bloodSugarData.status != -1">糖尿病患者用餐时间20-30分钟为宜，细嚼慢咽更有利于餐后血糖的控制。</p>
        </div>
        <p class="detail-title">
          <span>02</span>饮食营养
        </p>
      </li>
    </ul>
    <ul class="tips-detail">
      <li class="detail-list">
        请科学合理安排适量的运动，每次运动时间保持在40-60分钟左右，每周保持150分钟的中等强度运动。坚持科学合理的运动有利于管理您的健康，减少并发症的发生。
        <p v-if="goodSports.length != 0">
          适宜运动：
          <span
            v-for="(item, idx) in goodSports.slice(0, goodSports.length-1)"
            :key="idx"
          >{{item}}、</span>
          {{goodSports[goodSports.length-1]}}等运动。
        </p>
        <p v-if="avoidSports.length != 0">
          不宜运动：
          <span
            v-for="(item, idx) in avoidSports.slice(0, avoidSports.length-1)"
            :key="idx"
          >{{item}}、</span>
          {{avoidSports[avoidSports.length-1]}}等运动。
        </p>
        <p class="detail-title">
          <span>03</span>增强锻炼
        </p>
      </li>
    </ul>
    <ul class="tips-detail">
      <li class="detail-list">
        遵医嘱规律规范用药，不随意擅自换药或停药。
        <p v-if="bloodSugarData.status != -1">糖尿病胰岛素患者，可以将餐前胰岛素注射时间和进餐之间的间隔适当延长，防止餐后血糖上升过快过高。</p>
        <p v-if="bloodPressureData.status != -1">高血压患者用药从小剂量开始逐渐加至足量。</p>
        <p class="detail-title">
          <span>04</span>合理用药
        </p>
      </li>
    </ul>-->
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import echarts from "echarts";
let arr = [
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/fat/0.png",
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/fat/1.png",
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/fat/2.png",
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/fat/3.png",
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/fat/4.png",
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/fat/5.png",
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/fat/6.png"
];
export default {
  data() {
    return {
      isWxmp: this.$util.isWxmp(),
      backgroundDiv: {
        backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/home-bg.png" + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center -1px"
      },
      backgroundWarn: {
        backgroundImage:
          "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/warn-content.png" + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      backgroundTips: {
        backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/tips.png" + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      backgroundTipsleft: {
        backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/tips-left.png" + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      backgroundTipsright: {
        backgroundImage:
          "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/tips-right.png" + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      // 扇形图(血糖)
      mySector: null,
      // 折线
      myLine: null,
      // 环装图
      myAverage: null,
      // 扇形图(血压)
      myBool: null,
      // 折线
      myBloodLine: null,
      // 环装图
      myBloodAverage: null,
      //平均脉差
      myBloodAverageLine: null,

      //标题
      tipList: {
        glu: ["控", "糖", "小", "贴", "士"],
        hp: ["控", "压", "小", "贴", "士"],
        all: ["生", "活", "小", "贴", "士"]
      },
      backgroundTipstitle: {
        backgroundImage:
          "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/tips-title.png" + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      // 详情 ["规律检测", "饮食营养", "增强锻炼", "合理用药"]
      detaillist: ["规律检测", "饮食营养", "增强锻炼", "合理用药"],
      //reportId 个人id

      startDate: "--",
      endDate: "--",
      warning: false,
      goodFoods: [],
      avoidFoods: [],
      goodSports: [],
      avoidSports: [],
      bloodSugarData: {
        needMoreTest: false, //是否提示要进行更多的测量
        status: -1,
        average: "--",
        averageLevel: 0,
        sectorList: [],
        seven: {
          before: [" ", " ", " ", " ", " ", " ", " "],
          after: [" ", " ", " ", " ", " ", " ", " "]
        }
      },

      bloodPressureData: {
        status: -1,
        average: "--",
        averageLevel: 0,
        sectorList: [],
        seven: {
          diastolic: ["", "", "", "", "", "", ""],
          systolic: ["", "", "", "", "", "", ""]
        },
        pulse: {
          data: ["", "", "", "", "", "", ""],
          average: 0,
          level: 0
        }
      },
      //血压展示
      isbloodpressure: true,
      isbloodAverageSeven: true,
      bloodSugarData_average: true,
      ispulse: true,
      //减脂计划
      fatlist: []
    };
  },
  filters: {
    detailnumber(val) {
      return "0" + (val + 1);
    },
    //时间格式
    timeFormat(time) {
      // console.log(time, "time");
      if (time) {
        let date = new Date(time);
        return `${date.getMonth()}月${date.getDate()}日`;
      } else {
        return `xx月xx日`;
      }
    }
  },
  methods: {
    // 首页数据
    pageData() {
      this.$http
        .request({
          url: `/ajax/web/report/week/${this.$route.query.reportId}`,
          method: "get"
        })
        .then(res => {
          console.log(res, "res");
          if (res && res.respBody) {
            let data = res.respBody;
            let startDate = new Date(data.startDate);
            let endDate = new Date(data.endDate);
            endDate.setTime(endDate.getTime() - 12 * 60 * 60 * 1000);
            this.startDate =
              startDate.getMonth() + 1 + "月" + startDate.getDate() + "日";
            this.endDate =
              endDate.getMonth() + 1 + "月" + endDate.getDate() + "日";
            for (let key in data.reports) {
              this.warning =
                this.warning ||
                data.reports[key]["analysisMap"]["fluctuation"].level > 0;
            }

            let goodFoods = [];
            let avoidFoods = [];
            if (data.dietSuggestion && data.dietSuggestion.beneficial) {
              data.dietSuggestion.beneficial.forEach(food =>
                this.goodFoods.push(food.name)
              );
            }
            if (data.dietSuggestion && data.dietSuggestion.avoid) {
              data.dietSuggestion.avoid.forEach(food =>
                this.avoidFoods.push(food.name)
              );
            }

            let goodSports = [];
            let avoidSports = [];
            if (data.sportSuggestion && data.sportSuggestion.beneficial) {
              data.sportSuggestion.beneficial.forEach(sport =>
                this.goodSports.push(sport)
              );
            }
            if (data.sportSuggestion && data.sportSuggestion.avoid) {
              data.sportSuggestion.avoid.forEach(sport =>
                this.avoidSports.push(sport)
              );
            }

            if (data.reports["bloodpressure"]) {
              this.bloodPressureData.status =
                data.reports["bloodpressure"]["analysisMap"][
                  "fluctuation"
                ].level;
              this.bloodPressureData.totalMeasure =
                data.reports["bloodpressure"].totalMeasure;
            }

            if (data.reports["bloodpressure"]) {
              /**血压数据**/
              let hp = data.reports["bloodpressure"];
              this.bloodPressureData.status =
                hp["analysisMap"]["fluctuation"].level;
              this.bloodPressureData.totalMeasure = hp.totalMeasure;
              let totalNormal = hp["ratingCounts"]
                .map(item =>
                  item.code == 1 || item.code == 2 ? item.count : 0
                )
                .reduce((a, b) => a + b);
              let totalLess = hp["ratingCounts"]
                .map(item => (item.code < 1 ? item.count : 0))
                .reduce((a, b) => a + b);
              let totalMore = hp["ratingCounts"]
                .map(item => (item.code > 2 ? item.count : 0))
                .reduce((a, b) => a + b);
              this.bloodPressureData.measureTimesStatus = 0;
              if (totalLess <= totalNormal && totalMore <= totalNormal) {
                //nothing
              } else if (totalLess > totalNormal && totalLess > totalMore) {
                this.bloodPressureData.measureTimesStatus = -1;
              } else if (totalMore > totalNormal && totalMore > totalLess) {
                this.bloodPressureData.measureTimesStatus = 1;
              }

              //血压饼图 pulsePressure
              hp["ratingCounts"].forEach(item => {
                if (item.count > 0) {
                  this.bloodPressureData.sectorList.push({
                    value: item.count,
                    name: item.rating
                  });
                }
              });
              this.blood();

              //血压折线图数据
              this.bloodPressureData.seven = [];
              for (let k = 0; k < hp.data.length; k++) {
                let date = new Date(hp.data[k].measureDateTime);
                let day = date.getDay() == 0 ? 7 : date.getDay();
                let index = (day - 1) * 24 + date.getHours();

                this.bloodPressureData.seven[index] = {
                  diastolic: hp.data[k].values.diastolic,
                  systolic: hp.data[k].values.systolic,
                  healthStatus: hp.data[k].healthStatus
                };
              }
              this.blood_seven();

              //血压平均值环形图
              this.bloodPressureData.average = hp.analysisMap.average.value;
              this.bloodPressureData.averageLevel =
                hp.analysisMap.average.level;
              this.blood_average();

              //周脉压差数据
              this.bloodPressureData.pulse = {
                data: [],
                average: 0,
                level: 0
              };

              let pulse = hp.analysisMap.pulsePressure || {};
              let pulseData = pulse.value || {};
              let pulse_seven = [[], [], [], [], [], [], []];

              if (
                typeof pulseData !== "undefined" &&
                typeof pulseData.values == "object"
              ) {
                for (let k = 0; k < pulseData.values.length; k++) {
                  let date = new Date(parseInt(pulseData.values[k].left));
                  let day = date.getDay() == 0 ? 7 : date.getDay();
                  let index = day - 1;

                  pulse_seven[index].push(pulseData.values[k].right);
                }

                console.log(pulse_seven);
                for (var i = 0; i < pulse_seven.length; i++) {
                  if (pulse_seven[i].length > 0) {
                    this.bloodPressureData.pulse.data[i] = (
                      pulse_seven[i].reduce(
                        (prev, next, index, array) => prev + next
                      ) / pulse_seven[i].length
                    ).toFixed(2);
                  }
                }

                this.bloodPressureData.pulse.average = pulseData.average;
                this.bloodPressureData.pulse.level = pulse.level;
                this.blood_average_seven();
              } else {
                this.isbloodAverageSeven = false;
              }
            } else {
              this.isbloodpressure = false;
            }

            if (data.reports["glu"]) {
              let glu = data.reports["glu"];
              this.bloodSugarData.status =
                glu["analysisMap"]["fluctuation"].level;
              this.bloodSugarData.totalMeasure = glu.totalMeasure;

              // 判断是否需要提示用户增加血糖检测次数， 提示条件
              // 1 周内总测量次数小于7次
              // 2 周内存在连续3天测量次数小于3，且都检测正常， 且周内检测异常情况小于7次
              this.bloodSugarData.needMoreTest = false;
              if (this.bloodSugarData.totalMeasure >= 7) {
                let wCase = glu["ratingCounts"]
                  .map(item => item.code != 1)
                  .reduce((a, b) => a + b);
                if (wCase < 7) {
                  //检测是否存在连续三天测量次数小于三次
                  //对比当前检测的测量时间和它的下下次测量时间的日差，若超过三天则再检查是否都为正常值
                  for (let idx = 0; idx < glu.data.length; idx++) {
                    //没有数据可以对比
                    if (idx + 2 >= glu.data.length) break;
                    let curCaseTestTime = new Date(
                      glu.data[idx].measureDateTime
                    );
                    let curCaseStart = new Date(
                      curCaseTestTime.getYear(),
                      curCaseTestTime.getMonth(),
                      curCaseTestTime.getDate()
                    ).getTime();

                    let nextCaseTestTime = new Date(
                      glu.data[idx + 2].measureDateTime
                    );
                    let nextCaseStart = new Date(
                      nextCaseTestTime.getYear(),
                      nextCaseTestTime.getMonth(),
                      nextCaseTestTime.getDate()
                    ).getTime();

                    let days =
                      (nextCaseStart - curCaseStart) / (1000 * 3600 * 24);
                    // healthStatus == 1表示数据在正常范围，取值为后端GluStatusEnum等枚举值
                    console.log(
                      idx,
                      idx + 2,
                      days,
                      glu.data[idx].healthStatus,
                      glu.data[idx + 2].healthStatus
                    );
                    if (
                      days >= 3 &&
                      glu.data[idx].healthStatus == 1 &&
                      glu.data[idx + 2].healthStatus == 1
                    ) {
                      this.bloodSugarData.needMoreTest = true;
                      break;
                    }
                  }
                }
                // glu.data
                // measureDateTime
              } else {
                this.bloodSugarData.needMoreTest = true;
              }

              //血糖饼图
              glu["ratingCounts"].forEach(item => {
                if (item.count > 0) {
                  this.bloodSugarData.sectorList.push({
                    value: item.count,
                    name: item.rating
                  });
                }
              });

              this.sector();
              let totalNormal = glu["ratingCounts"]
                .map(item => (item.code == 1 ? item.count : 0))
                .reduce((a, b) => a + b);
              let totalLess = glu["ratingCounts"]
                .map(item => (item.code < 1 ? item.count : 0))
                .reduce((a, b) => a + b);
              let totalMore = glu["ratingCounts"]
                .map(item => (item.code > 1 ? item.count : 0))
                .reduce((a, b) => a + b);
              this.bloodSugarData.measureTimesStatus = 0;
              if (totalLess <= totalNormal && totalMore <= totalNormal) {
                //nothing
              } else if (totalLess > totalNormal && totalLess > totalMore) {
                this.bloodSugarData.measureTimesStatus = -1;
              } else if (totalMore > totalNormal && totalMore > totalLess) {
                this.bloodSugarData.measureTimesStatus = 1;
              }

              //血糖折线图数据
              this.bloodSugarData.seven = {
                before: [],
                after: []
              };
              this.bloodSugarData.seven.before[167] = "";
              this.bloodSugarData.seven.after[167] = "";

              for (let k = 0; k < glu.data.length; k++) {
                let date = new Date(glu.data[k].measureDateTime);
                let day = date.getDay() == 0 ? 7 : date.getDay();
                let index = (day - 1) * 24 + date.getHours();

                if (glu.data[k].values.type > 1) {
                  this.bloodSugarData.seven.after[index] =
                    glu.data[k].values.glu;
                } else {
                  this.bloodSugarData.seven.before[index] =
                    glu.data[k].values.glu;
                }
              }
              this.seven_echarts();

              //血糖平均值环形图
              this.bloodSugarData.average = glu.analysisMap.average.value.postprandial.toFixed(
                2
              );
              this.bloodSugarData.averageLevel = glu.analysisMap.average.level;
              if (this.bloodSugarData.average == "0.00") {
                this.bloodSugarData_average = false;
              }

              console.log(glu.analysisMap.average);
              this.average();
            } else {
              this.ispulse = false;
            }
          } else if (res.respStatus == 6092) {
            // this.$Dialog
            //   .alert({
            //     title: res.respDesc
            //     // message: "您不是管理员 无法操作!"
            //   })
            //   .then(() => {
            //     // on close
            //     // this.$util.goApp();
            //     this.$router.go(-1);
            //   });
          }
        });
    },

    // 血糖
    // 扇形
    sector() {
      console.log("sector bloodSugarData", this.bloodSugarData.sectorList);
      //扇形初始化
      let _this = this;
      this.mySector.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}% ({c}次)"
          },
          series: [
            {
              name: `数据`,
              type: "pie",
              radius: ["10%", "50%"],
              center: ["50%", "50%"],
              //数据展示
              data: _this.bloodSugarData.sectorList,
              roseType: "radius",
              label: {
                fontSize: 14,
                formatter: "{b}\n{c}次",
                padding: 8,
                borderRadius: 4
              },
              itemStyle: {
                //选中效果
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ],
          color: ["#6b89ff", "#34abff", "#ff9745", "#dd5e5e", "#c10000"]
        },
        true
      );
    },
    // 折线图
    seven_echarts() {
      console.log("seven_echarts bloodSugarData", this.bloodSugarData.seven);
      let _this = this;
      this.myLine.setOption(
        {
          color: ["#fff", "#ff0"],
          legend: {
            orient: "horizontal",
            x: "right",
            y: "top",
            itemHeight: 2,
            itemWidth: 24,
            data: [{ name: "餐前" }, { name: "餐后" }],
            textStyle: {
              color: "rgba(0,0,0,.3)",
              fontSize: 12,
              fontWeight: 300,
              padding: [0, 4]
            },
            tooltip: {
              show: true
            }
          },
          //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
          grid: {
            top: "20%", // 等价于 y: '16%'
            left: "4%",
            right: "8%",
            bottom: "4%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            name: "",

            data: [
              "周一",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周二",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周三",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周四",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周五",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周六",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周日",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周一"
            ],
            //  改变x轴颜色
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            //  改变x轴字体颜色和大小
            axisLabel: {
              interval: 23,
              textStyle: {
                color: "#999999",
                fontSize: "12"
              }
            },
            //网格样式
            splitLine: {
              show: true,
              interval: 23,
              lineStyle: {
                color: ["#ccc"],
                width: 1,
                type: "solid"
              }
            }
          },
          yAxis: [
            {
              type: "value",
              name: "mmol/L",
              // min: 0,
              // max: 45,
              // interval: 5, //间隔
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              // y轴颜色
              axisLine: {
                lineStyle: {
                  color: "#ccc"
                }
              },
              //  改变y轴字体颜色和大小
              axisLabel: {
                formatter: "{value}", //  给y轴添加单位
                textStyle: {
                  color: "#999999",
                  fontSize: "12"
                }
              },
              // y轴线
              splitLine: {
                lineStyle: {
                  color: "#ccc"
                }
              }
            },
            // 另一个y轴
            {
              type: "value",
              // name: "人数",
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              axisLine: {
                lineStyle: {
                  color: "#ccc"
                }
              },
              //  改变y轴字体颜色和大小
              axisLabel: {
                formatter: "{value}", //  给y轴添加单位
                textStyle: {
                  color: "#999999",
                  fontSize: "12"
                }
              }
            }
          ],
          series: [
            {
              connectNulls: true,
              data: _this.bloodSugarData.seven.before,
              name: "餐前",
              type: "line",
              symbol: "circle", //设定为实心点
              symbolSize: 10, //设定实心点的大小
              showAllSymbol: true,
              lineStyle: {
                //设置折线色颜色
                color: "#FCAE00"
              },
              itemStyle: {
                show: true,
                //设置折线折点的颜色,
                normal: {
                  color: "#FCAE00"
                  // label: { show: true }
                }
              }
            },
            {
              connectNulls: true,
              showSymbol: true,
              data: _this.bloodSugarData.seven.after,
              name: "餐后",
              type: "line",
              symbol: "circle", //设定为实心点
              symbolSize: 10, //设定实心点的大小
              showAllSymbol: true,
              lineStyle: {
                //设置折线色颜色
                color: "#0299FC"
              },
              itemStyle: {
                //设置折线折点的颜色
                normal: {
                  color: "#0299FC"
                  // label: { show: true }
                }
              }
            }
          ],
          tooltip: {
            //鼠标悬停提示内容
            trigger: "axis", // 触发类型，默认数据触发，可选为：'axis' item
            formatter: function(params, ticket, callback) {
              // console.log(params, ticket, callback)
              return (
                (typeof params[0]["data"] == "undefined"
                  ? ""
                  : params[0]["seriesName"] + ":" + params[0]["data"] + " ") +
                (typeof params[1]["data"] == "undefined"
                  ? ""
                  : params[1]["seriesName"] + ":" + params[1]["data"])
              );
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "none", // 默认为直线，可选为：'line' | 'shadow'
              label: "cross",
              show: true
            }
          }
        },
        true
      );
    },
    //环装图
    average() {
      console.log("average bloodSugarData", this.bloodSugarData.average);
      //扇形初始化
      let _this = this;
      this.myAverage.setOption(
        {
          title: {
            text: _this.bloodSugarData.average, //主标题
            subtext: "mmol/L", //副标题
            x: "center", //x轴方向对齐方式,
            y: "center",
            textStyle: {
              color: "#000",
              fontSize: 20
            }
          },
          // 触摸效果
          tooltip: {
            show: false,
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}% ({c}次)"
          },
          series: [
            {
              name: `数据`,
              type: "pie",
              radius: ["50%", "60%"],
              center: ["50%", "50%"],
              //数据展示
              // data: _this.bloodSugarData.sectorList,
              data: [50, 50],
              label: {
                fontSize: 14,
                color: "rgba(255, 255, 255, 0)",
                // formatter: "{b} : {d}% ({c}人)"
                formatter: "{b}\n{c}次",
                padding: 8,
                // backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: 4
              },
              labelLine: {
                lineStyle: {
                  color: "rgba(0, 0, 0,0)"
                },
                smooth: 0.1,
                length: 4,
                length2: 4
              },
              itemStyle: {
                //选中效果
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ],
          color: ["#F15A24", "#4E4E52", "#ff9745", "#dd5e5e", "#c10000"]
        },
        true
      );
    },

    // 血压
    // 扇形
    blood() {
      console.log(
        "blood bloodPressureData.sectorList",
        this.bloodPressureData.sectorList
      );
      let _this = this;
      //扇形初始化
      this.myBool.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}% ({c}次)"
          },
          series: [
            {
              name: `数据`,
              type: "pie",
              radius: ["10%", "50%"],
              center: ["50%", "50%"],
              //数据展示
              data: _this.bloodPressureData.sectorList,
              roseType: "radius",
              label: {
                fontSize: 12,
                formatter: "{b}\n{c}次",
                padding: 8,
                borderRadius: 4
              },
              itemStyle: {
                //选中效果
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ],
          color: ["#6b89ff", "#34abff", "#ff9745", "#dd5e5e", "#c10000"]
        },
        true
      );
    },
    // 折线图
    blood_seven() {
      console.log(
        "blood_seven bloodPressureData.seven",
        this.bloodPressureData.seven
      );

      let series = [];
      this.bloodPressureData.seven.forEach((item, index) => {
        let oitem = {
          type: "line",
          data: [],
          symbol: "circle", //设定为实心点
          symbolSize: 10, //设定实心点的大小
          showAllSymbol: true,
          name:
            item.healthStatus == 1 || item.healthStatus == 2 ? "正常" : "异常",
          lineStyle: {
            //设置折线色颜色
            color:
              item.healthStatus == 1 || item.healthStatus == 2
                ? "#0299FC"
                : "#FCAE00"
          },
          itemStyle: {
            //设置折线折点的颜色,
            normal: {
              color:
                item.healthStatus == 1 || item.healthStatus == 2
                  ? "#0299FC"
                  : "#FCAE00"
              // label: { show: true }
            }
          }
        };

        oitem.data = [
          [index, item.systolic],
          [index, item.diastolic]
        ];
        series.push(oitem);
      });
      console.log(series);

      let _this = this;
      this.myBloodLine.setOption(
        {
          color: ["#fff", "#ff0"],
          // legend: {
          //   // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          //   orient: "horizontal",
          //   // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          //   x: "right",
          //   // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          //   y: "top",
          //   itemHeight: 2,
          //   itemWidth: 24,
          //   data: ["收缩压", "舒张压"],
          //   textStyle: {
          //     color: "rgba(0,0,0,.3)",
          //     fontSize: 12,
          //     fontWeight: 300,
          //     padding: [0, 4]
          //   },
          //   tooltip: {
          //     show: true
          //   }
          // },
          legend: {
            orient: "horizontal",
            x: "right",
            y: "top",
            itemHeight: 2,
            itemWidth: 24,
            data: [{ name: "正常" }, { name: "异常" }],
            textStyle: {
              color: "rgba(0,0,0,.3)",
              fontSize: 12,
              fontWeight: 300,
              padding: [0, 4]
            },
            tooltip: {
              show: true
            }
          },
          //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
          grid: {
            top: "20%", // 等价于 y: '16%'
            left: "4%",
            right: "5%",
            bottom: "4%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            // name: "时间",

            data: [
              "周一",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周二",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周三",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周四",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周五",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周六",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周日",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              "周一"
            ],
            //  改变x轴颜色
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            //  改变x轴字体颜色和大小
            axisLabel: {
              interval: 23,
              textStyle: {
                color: "#999999",
                fontSize: "12"
              }
            },
            //网格样式
            splitLine: {
              show: true,
              interval: 23,
              lineStyle: {
                color: ["#ccc"],
                width: 1,
                type: "solid"
              }
            }
          },
          yAxis: [
            {
              type: "value",
              name: "mmHg",

              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              // y轴颜色
              axisLine: {
                lineStyle: {
                  color: "#ccc"
                }
              },
              //  改变y轴字体颜色和大小
              axisLabel: {
                formatter: "{value}", //  给y轴添加单位
                textStyle: {
                  color: "#999999",
                  fontSize: "12"
                }
              },
              // y轴线
              splitLine: {
                lineStyle: {
                  color: "#ccc"
                }
              }
            },
            // 另一个y轴
            {
              type: "value",
              // name: "人数",
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              axisLine: {
                lineStyle: {
                  color: "#ccc"
                }
              },
              //  改变y轴字体颜色和大小
              axisLabel: {
                formatter: "{value}", //  给y轴添加单位
                textStyle: {
                  color: "#999999",
                  fontSize: "12"
                }
              }
            }
          ],
          series: series,
          tooltip: {
            //鼠标悬停提示内容
            trigger: "axis", // 触发类型，默认数据触发，可选为：'axis' item
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "none", // 默认为直线，可选为：'line' | 'shadow'
              label: "cross",
              show: true
            },
            formatter: function(params, ticket, callback) {
              // console.log(params, ticket, callback)
              return (
                (typeof params[0]["data"] == "undefined"
                  ? ""
                  : "高压：" + params[0]["data"][1] + "<br>") +
                (typeof params[1]["data"] == "undefined"
                  ? ""
                  : "低压：" + params[1]["data"][1])
              );
            }
          }
        },
        true
      );
    },
    //环装图
    blood_average() {
      console.log(
        "blood_average bloodPressureData.average",
        this.bloodPressureData.average
      );
      //扇形初始化
      let _this = this;
      this.myBloodAverage.setOption(
        {
          title: {
            text:
              _this.bloodPressureData.average.diastolic +
              "/" +
              _this.bloodPressureData.average.systolic, //主标题
            subtext: "mmHg", //副标题
            x: "center", //x轴方向对齐方式,
            y: "center",
            textStyle: {
              color: "#000",
              fontSize: 20
            }
          },
          // 触摸效果
          tooltip: {
            show: false,
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}% ({c}人)"
          },
          series: [
            {
              name: `数据`,
              type: "pie",
              radius: ["50%", "60%"],
              center: ["50%", "50%"],
              //数据展示
              // data: _this.bloodPressureData.sectorList,
              data: [50, 50],
              label: {
                fontSize: 14,
                color: "rgba(255, 255, 255, 0)",
                formatter: "{b}\n{c}次",
                padding: 8,
                // backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: 4
              },
              labelLine: {
                lineStyle: {
                  color: "rgba(0, 0, 0,0)"
                },
                smooth: 0.1,
                length: 4,
                length2: 4
              },
              itemStyle: {
                //选中效果
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ],
          color: ["#F15A24", "#4E4E52", "#ff9745", "#dd5e5e", "#c10000"]
        },
        true
      );
    },
    //周脉差
    // 折线图
    blood_average_seven() {
      console.log(
        "blood_average_seven bloodPressureData.pulse",
        this.bloodPressureData.pulse
      );
      let _this = this;
      this.myBloodAverageLine.setOption(
        {
          color: ["#fff", "#ff0"],
          legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: "horizontal",
            // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: "right",
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: "top",
            data: ["脉压差"],
            itemHeight: 2,
            itemWidth: 24,
            textStyle: {
              color: "rgba(0,0,0,.3)",
              fontSize: 12,
              fontWeight: 300,
              padding: [0, 4]
            },
            tooltip: {
              show: true
            }
          },
          //  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
          grid: {
            top: "20%", // 等价于 y: '16%'
            left: "4%",
            right: "8%",
            bottom: "4%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            name: "",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],

            //  改变x轴颜色
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            //  改变x轴字体颜色和大小
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#999999",
                fontSize: "12"
              }
            },
            //网格样式
            splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: ["#ccc"],
                width: 1,
                type: "solid"
              }
            }
          },
          yAxis: [
            {
              type: "value",
              name: "mmHg",
              // min: 0,
              // max: 45,
              // interval: 5, //间隔
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              // y轴颜色
              axisLine: {
                lineStyle: {
                  color: "#ccc"
                }
              },
              //  改变y轴字体颜色和大小
              axisLabel: {
                formatter: "{value}", //  给y轴添加单位
                textStyle: {
                  color: "#999999",
                  fontSize: "12"
                }
              },
              // y轴线
              splitLine: {
                lineStyle: {
                  color: "#ccc"
                }
              }
            },
            // 另一个y轴
            {
              type: "value",
              // name: "人数",
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              axisLine: {
                lineStyle: {
                  color: "#ccc"
                }
              },
              //  改变y轴字体颜色和大小
              axisLabel: {
                formatter: "{value}", //  给y轴添加单位
                textStyle: {
                  color: "#999999",
                  fontSize: "12"
                }
              }
            }
          ],
          series: [
            {
              connectNulls: true,
              data: _this.bloodPressureData.pulse.data,
              name: "压脉差",
              type: "line",
              symbol: "circle", //设定为实心点
              symbolSize: 10, //设定实心点的大小
              // showAllSymbol: true,
              lineStyle: {
                //设置折线色颜色
                color: "#FCAE00"
              },
              itemStyle: {
                //设置折线折点的颜色,
                normal: {
                  color: "#FCAE00"
                  // label: { show: true }
                }
              }
            }
          ],
          tooltip: {
            //鼠标悬停提示内容
            trigger: "axis", // 触发类型，默认数据触发，可选为：'axis' item
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "none", // 默认为直线，可选为：'line' | 'shadow'
              label: "cross",
              show: true
            },
            formatter: function(params, ticket, callback) {
              // console.log(params, ticket, callback)
              return typeof params[0]["data"] == "undefined"
                ? ""
                : params[0]["seriesName"] + ":" + params[0]["data"] + " ";
            }
          }
        },
        true
      );
    },
    //app 分享
    goapp() {
      let dom = this.$refs.imageWrapper;
      this.$htmlcanvas(dom);
    },
    // 减脂计划
    reduceFat() {
      this.$http
        .request({
          url: "/ajax/web/nutri/project/listNutriProject",
          method: "get"
        })
        .then(res => {
          console.log(res, "res--------------");
          if (res.success && res.respBody) {
            this.fatlist = res.respBody.map((item, index) => {
              item.imgurl = arr[index];
              return item;
            });
          }
        });
    }
  },
  created() {
    this.pageData();
    this.reduceFat();
  },
  mounted() {
    // 血糖
    // 扇形图
    this.mySector = echarts.init(document.getElementById("sector"));
    //折线图
    this.myLine = echarts.init(document.getElementById("seven"));
    // 环装图
    this.myAverage = echarts.init(document.getElementById("average"));
    // 血压
    // 扇形图
    this.myBool = echarts.init(document.getElementById("blood"));
    //折线图
    this.myBloodLine = echarts.init(document.getElementById("bloodSeven"));
    // 环装图
    this.myBloodAverage = echarts.init(document.getElementById("bloodAverage"));
    //平均脉差
    this.myBloodAverageLine = echarts.init(
      document.getElementById("bloodAverageSeven")
    );
    // 监听数据(扇形图,地图)
    window.addEventListener("resize", () => {
      this.mySector.resize();
      this.myLine.resize();
      this.myAverage.resize();
      //血压
      this.myBool.resize();
      this.myBloodLine.resize();
      this.myBloodAverage.resize();
      this.myBloodAverageLine.resize();
    });
  },
  //app 分享
  goapp() {
    let dom = this.$refs.imageWrapper;
    this.$htmlcanvas(dom);
  }
};
</script>
<style scoped lang="scss">
@import "src/style/mixin";
.indexContent {
  padding-bottom: rem(66);
  // 首页
  .head {
    height: rem(836);
    .head-icon {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 rem(24);
      height: rem(122);
      color: #fff;
      span {
        font-size: rem(24);
      }
    }
    .head-title {
      height: rem(150);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: font;
      font-size: rem(80);
      color: #ef4307;
    }
    .head-time {
      height: rem(40);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: font;
      font-size: rem(26);
    }
    .head-warn {
      width: rem(546);
      height: rem(184);
      border-radius: rem(14);
      background-color: #fff;
      margin: rem(96) auto 0;
      font-size: rem(34);
      color: #000;
      text-align: center;
      // line-height: rem(200);
      font-size: rem(36);
      letter-spacing: rem(4);
      box-sizing: border-box;
      padding-top: rem(60);
      position: relative;
      .warn-content {
        position: absolute;
        width: rem(300);
        height: rem(88);
        line-height: rem(86);
        left: 50%;
        top: rem(-40);
        margin-left: rem(-150);
        color: #fff;
        font-family: font;
      }
    }
  }
  // 图形
  .blood {
    .blood-title {
      padding-top: rem(46);
      height: rem(56);
      line-height: rem(56);
      font-size: rem(36);
      letter-spacing: rem(4);
      color: #323232;
      display: flex;
      align-items: center;
      &::before {
        content: " ";
        display: inline-block;
        width: rem(10);
        height: rem(56);
        background-color: #0199fc;
        margin-right: rem(20);
      }
    }
    .blood-content {
      height: rem(472);
      display: flex;
      align-items: center;
      justify-content: center;
      // & > div {
      //   width: 100%;
      //   height: 100%;
      // }
      #sector {
        width: 100%;
        height: 100%;
      }
      #seven {
        width: 100%;
        height: 100%;
      }
      #average {
        width: 100%;
        height: 100%;
      }
      //血压
      #blood {
        width: 100%;
        height: 100%;
      }
      #bloodSeven {
        width: 100%;
        height: 100%;
      }
      #bloodAverage {
        width: 100%;
        height: 100%;
      }
      #bloodAverageSeven {
        width: 100%;
        height: 100%;
      }
    }
    .blood-introduce {
      padding: rem(28) rem(24);
      background-color: #e1f3fb;
      line-height: rem(44);
      letter-spacing: rem(4);
      font-size: rem(26);
      color: #5d7078;
    }
  }
  //贴士
  // .tips {
  //   height: rem(258);
  //   margin-top: rem(84);
  //   position: relative;
  //   .tips-contnet {
  //     position: absolute;
  //     width: 100%;
  //     box-sizing: border-box;
  //     height: rem(114);
  //     padding: 0 rem(10);
  //     top: rem(56);
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     .tips-title {
  //       flex: 1;
  //       height: 100%;
  //       display: flex;
  //       align-items: center;
  //       justify-content: space-around;

  //       li {
  //         width: rem(102);
  //         height: rem(102);
  //         text-align: center;
  //         line-height: rem(102);
  //         font-size: rem(46);
  //         color: #545be7;
  //       }
  //     }
  //     .tips-icon {
  //       width: rem(46);
  //       height: rem(114);
  //     }
  //   }
  // }
  // //贴士详情
  // .tips-detail {
  //   padding: rem(100) rem(36) 0;
  //   .detail-list {
  //     width: rem(656);
  //     height: auto;
  //     box-sizing: border-box;
  //     padding: rem(50) rem(30);
  //     background-color: #e8efff;
  //     border-radius: rem(24);
  //     line-height: rem(40);
  //     letter-spacing: rem(4);
  //     font-size: rem(26);
  //     position: relative;
  //     color: #666666;
  //     .detail-title {
  //       position: absolute;
  //       line-height: rem(54);
  //       left: rem(38);
  //       top: rem(-54);
  //       font-size: rem(44);
  //       color: #535ae9;
  //       font-weight: 700;
  //       padding-left: rem(112);
  //       span {
  //         position: absolute;
  //         left: 0;
  //         top: rem(18);
  //         font-size: rem(80);
  //       }
  //     }
  //   }
  // }
  //减脂计划
  .reduce-fat {
    padding: 0 rem(24);
    // overflow: hidden;
    .oli {
      height: rem(384);
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      padding: rem(30);
      box-sizing: border-box;
      color: #ffffff;
      .oli-title {
        display: inline-flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;
        height: rem(88);
        font-size: rem(32);
        font-weight: bold;
        margin-bottom: rem(16);
      }
      .oli-description {
        padding: 0 rem(38);
        font-size: rem(24);
      }
      .oli-bnt {
        width: rem(208);
        height: rem(50);
        border-radius: rem(24);
        margin: rem(20) auto 0;
        background-color: #fdc558;
        text-align: center;
        line-height: rem(50);
        font-size: rem(24);
      }
    }
  }
}
</style>
