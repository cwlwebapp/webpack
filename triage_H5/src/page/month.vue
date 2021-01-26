<template>
  <div class="indexContent" ref="imageWrapper">
      <shareIcon @goapp="goapp" />
    <div :style="backgroundDiv" class="head">
      <p class="head-icon">
        <span class="iconfont"></span>
        <!-- <span v-if="isWxmp" class="iconfont icon-fenxiang" @click="$share"></span> -->
      </p>
      <h4 class="head-title">健康月报</h4>
      <div class="head-time">.{{startDate}}-{{endDate}}.</div>
      <p class="head-warn" v-if="bloodPressureData.status != -1 && bloodSugarData.status != -1">
        {{("本月血糖控制" + (bloodSugarData.status > 0 ? "不理想" : "理想") + "~")}}<br />
        {{("本月血压控制" + (bloodPressureData.status > 0 ? "不理想" : "理想") + "~")}}
        <span class="warn-content" :style="backgroundWarn">{{ warning ? '请注意':'恭喜你'}}</span>
      </p>
      <p class="head-warn" v-if="bloodSugarData.status == -1 && bloodPressureData.status != -1">
        {{("本月血压控制" + (bloodPressureData.status > 0 ? "不理想" : "理想") + "~")}}
        <span class="warn-content" :style="backgroundWarn">{{ warning ? '请注意':'恭喜你'}}</span>
      </p>
      <p class="head-warn" v-if="bloodSugarData.status != -1 && bloodPressureData.status == -1">
        {{("本月血糖控制" + (bloodSugarData.status > 0 ? "不理想" : "理想") + "~")}}
        <span class="warn-content" :style="backgroundWarn">{{ warning ? '请注意':'恭喜你'}}</span>
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
        <div class="blood-introduce">您本周({{startDate}}-{{endDate}})总共测量了{{bloodSugarData.totalMeasure}}次血糖,
          <span v-if="bloodSugarData.measureTimesStatus > 0">血糖高于正常水平较多,</span>
          <span v-if="bloodSugarData.measureTimesStatus < 0">血糖低于正常水平较多,</span>
          <span v-if="bloodSugarData.needMoreTest">
            建议您增加血糖测量次数,以便监测高血糖变化。
          </span>
          <span v-else>
            继续保持日常血糖监测习惯，完整全面的血糖值数据，更好的分析与管理你的血糖。
          </span>
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
      <div class="blood" v-show="bloodSugarData_postprandial">
        <h4 class="blood-title">餐后平均血糖值</h4>
        <div class="blood-content">
          <div id="average_last" />
          <div class="average_to"><img :src="average_to_img"></div>
          <div id="average" />
          <div class="content-title">
            <span>上月</span>
            <span>本月</span>
          </div>
        </div>
        <div class="blood-introduce">
          本月餐后血糖平均值为{{tofie(bloodSugarData.average.postprandial)}}mmol/L，
          上月餐后血糖平均值为{{tofie(bloodSugarData.average_last.postprandial)}}mmol/L，
          餐后血糖平均值
          <span v-if="bloodSugarData.average.postprandial - bloodSugarData.average_last.postprandial > 0">
            上升了{{tofie(bloodSugarData.average.postprandial - bloodSugarData.average_last.fasting)}}mmol/L，血糖持续偏高，高血糖是并发症发生的重要原因，建议及时就医。
          </span>
          <span v-if="bloodSugarData.average.postprandial - bloodSugarData.average_last.postprandial < 0">
            下降了{{tofie(bloodSugarData.average_last.postprandial - bloodSugarData.average.fasting)}}mmol/L，请继续坚持日常血糖监测情况。
          </span>
          <span v-else>趋于平稳，请继续保持。</span>
        </div>
      </div>
      <div class="blood" v-show="bloodSugarData_fasting">
        <h4 class="blood-title">空腹平均血糖值</h4>
        <div class="blood-content">
          <div id="average_last_fasting" />
          <div class="average_to"><img :src="average_to_img"></div>
          <div id="average_fasting" />
          <div class="content-title">
            <span>上月</span>
            <span>本月</span>
          </div>
        </div>
        <div class="blood-introduce">
          本月空腹血糖平均值为{{tofie(bloodSugarData.average.fasting)}}mmol/L，
          上月空腹血糖平均值为{{tofie(bloodSugarData.average_last.fasting)}}mmol/L，
          空腹血糖平均值
          <span v-if="bloodSugarData.average.fasting - bloodSugarData.average_last.fasting > 0">
            上升了{{tofie(bloodSugarData.average.fasting - bloodSugarData.average_last.fasting) }}mmol/L，血糖持续偏高，建议咨询医生以便及时了解你的血糖变化情况。
          </span>
          <span v-if="bloodSugarData.average.fasting - bloodSugarData.average_last.fasting < 0">
            下降了{{tofie(bloodSugarData.average_last.fasting - bloodSugarData.average.fasting)}}mmol/L，请继续坚持日常血糖监测情况。
          </span>
          <span v-else>趋于平稳，请继续保持。</span>
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
        <div class="blood-introduce">您本月({{startDate}}-{{endDate}})总共测量了{{bloodPressureData.totalMeasure}}次血压,
          <span v-if="bloodPressureData.measureTimesStatus > 0">血压高于正常水平较多,</span>
          <span v-if="bloodPressureData.measureTimesStatus < 0">血压低于正常水平较多,</span>
          建议您增加血压测量次数,以便监测高血压变化。</div>
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
      <div class="blood" v-show="bloodPressureData.average_last != null">
        <h4 class="blood-title">平均血压值</h4>
        <div class="blood-content">
          <div id="bloodAverage"></div>
        </div>
        <div class="blood-introduce">
          本月测量的血压平均值为{{tofie(bloodPressureData.average.diastolic)}}/{{tofie(bloodPressureData.average.systolic)}}mmHg，属于
          <span v-if="bloodPressureData.averageLevel > 0"><strong>偏高</strong></span>
          <span v-else-if="bloodPressureData.averageLevel < 0"><strong>偏低</strong></span>
          <span v-else><strong>正常</strong></span>范围。
        </div>
      </div>
      <!-- 血压脉差 -->
      <div class="blood" v-show="bloodPressureData_average">
        <h4 class="blood-title">本月血压脉差</h4>
        <div class="blood-content">
          <div id="bloodAverageSeven_last"></div>
          <div class="average_to"><img :src="average_to_img"></div>
          <div id="bloodAverageSeven"></div>
          <div class="content-title">
            <span>上月</span>
            <span>本月</span>
          </div>
        </div>
        <div class="blood-introduce">
          <p>
            您本月脉压平均值为{{bloodPressureData.pulse.average}}mmHg。脉压值<span v-if="bloodPressureData.pulse.level > 0">过大。
            </span><span v-if="bloodPressureData.pulse.level < 0">过小。
            </span><span v-else>正常。</span>
            上月脉压平均值为{{tofie(bloodPressureData.pulse_last.average)}}mmHg；
            脉压平均值<span v-if="bloodPressureData.pulse.average - bloodPressureData.pulse_last.average > 0">
              上升了{{bloodPressureData.pulse.average - bloodPressureData.pulse_last.average}}mmHg，脉压差持续过大，脉压差过大会提高心血管疾病发生的风险，请咨询医生及时了解你的血压情况。
            </span><span v-if="bloodPressureData.pulse.average - bloodPressureData.pulse_last.average < 0">
              下降了{{bloodPressureData.pulse_last.average - bloodPressureData.pulse.average}}mmHg，脉压趋势向好，但仍需警惕脉压的变化情况。
            </span><span v-else>平稳，保持平稳的脉压，可减降低心血管疾病发生的风险。</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 贴士标题 -->
    <div class="tips" :style="backgroundTips">
      <div class="tips-contnet">
        <span class="tips-icon" :style="backgroundTipsleft"></span>
        <ul class="tips-title">
          <li v-for="(item,index) in
          ((bloodSugarData.status != -1 && bloodPressureData.status != -1) ? tipList.all : bloodSugarData.status != -1 ? tipList.glu : tipList.hp)" :key="index" :style="backgroundTipstitle">{{item}}</li>
        </ul>
        <span class="tips-icon" :style="backgroundTipsright"></span>
      </div>
    </div>
    <!-- 贴士详情 -->
    <ul class="tips-detail">
      <li class="detail-list">
        <p v-if="bloodSugarData.status != -1">
          您本月的血糖检测次数为<strong>{{bloodSugarData.totalMeasure}}</strong>次， 请<span v-if="bloodSugarData.needMoreTest">增加您的血糖测量次数</span><span v-else>继续保持您的血糖测量习惯</span>。
        </p>
        <p v-if="bloodPressureData.status != -1">
          您本月的血压检测次数为<strong>{{bloodPressureData.totalMeasure}}</strong>次，
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
        少吃或不吃哪些容易导致<span v-if="bloodSugarData.status != -1">血糖</span><span v-if="bloodPressureData.status != -1">血压</span>上升的食物。
        <p v-if="goodFoods.length != 0">
          宜吃食物：<span v-for="(item, idx) in goodFoods.slice(0, goodFoods.length-1)" :key="idx">{{item}}、</span>{{goodFoods[goodFoods.length-1]}}等食物。
        </p>
        <p v-if="avoidFoods.length != 0">
          不宜食物：<span v-for="(item, idx) in avoidFoods.slice(0, avoidFoods.length-1)" :key="idx">{{item}}、</span>{{avoidFoods[avoidFoods.length-1]}}等食物。
          <p v-if="bloodSugarData.status != -1">
            糖尿病患者用餐时间20-30分钟为宜，细嚼慢咽更有利于餐后血糖的控制。
          </p>
        </p>
        <p class="detail-title">
          <span>02</span>饮食营养
        </p>
      </li>
    </ul>
    <ul class="tips-detail">
      <li class="detail-list">
        请科学合理安排适量的运动，每次运动时间保持在40-60分钟左右，每周保持150分钟的中等强度运动。坚持科学合理的运动有利于管理您的健康，减少并发症的发生。
        <p v-if="goodSports.length != 0">
          适宜运动：<span v-for="(item, idx) in goodSports.slice(0, goodSports.length-1)" :key="idx">{{item}}、</span>{{goodSports[goodSports.length-1]}}等运动。
        </p>
        <p v-if="avoidSports.length != 0">
          不宜运动：<span v-for="(item, idx) in avoidSports.slice(0, avoidSports.length-1)" :key="idx">{{item}}、</span>{{avoidSports[avoidSports.length-1]}}等运动。
        </p>
        <p class="detail-title">
          <span>03</span>增强锻炼
        </p>
      </li>
    </ul>
    <ul class="tips-detail">
      <li class="detail-list">
        遵医嘱规律规范用药，不随意擅自换药或停药。
        <p v-if="bloodSugarData.status != -1">
          糖尿病胰岛素患者，可以将餐前胰岛素注射时间和进餐之间的间隔适当延长，防止餐后血糖上升过快过高。
        </p>
        <p v-if="bloodPressureData.status != -1">
          高血压患者用药从小剂量开始逐渐加至足量。
        </p>
        <p class="detail-title">
          <span>04</span>合理用药
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import echarts from "echarts";
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
        backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/warn-content.png" + ")",
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
        backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/tips-right.png" + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      average_to_img: "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/month/average_to.png",

      // 扇形图(血糖)
      mySector: null,
      // 折线
      myLine: null,
      // 环装图
      myAverage: null,
      myAverage_last: null,
      myAverage_fasting: null,
      myAverage_last_fasting: null,
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
        backgroundImage: "url(" + "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/tips-title.png" + ")",
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
        average: {},
        averageLevel: 0,
        sectorList: [],
        seven: {
          before: [" ", " ", " ", " ", " ", " ", " "],
          after: [" ", " ", " ", " ", " ", " ", " "]
        },
        average_last: {}
      },

      bloodPressureData: {
        status: -1,
        average: '--',
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
        },
        pulse_last: {}
      },
      //血压展示
      isbloodpressure: true,
      isbloodAverageSeven: false,
      ispulse: true,

      bloodSugarData_postprandial: true,
      bloodSugarData_fasting: true,
      bloodPressureData_average: true,

      monthXaxis: ["1", "5", "10", "15", "20", "25", "30"],
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
    // 小数位保留
    tofie(value) {
      if (!!value) {
        let str = value.toString()
        let index = str && str.indexOf('.')
        if (index != -1) {
          let leng = str.slice(index)
          if (leng.length > 2) {
            return Number(value).toFixed(2)
          } else {
            return Number(value)
          }
        } else {
          return value
        }
      }

    },
    // 首页数据
    pageData() {
      this.$http
        .request({
          url: `/ajax/web/report/month/${this.$route.query.reportId}`,
          method: "get"
        })
        .then(res => {
          console.log(res, "res");
          if (res && res.respBody) {
            let data = res.respBody;
            let startDate = new Date(data.startDate);
            let endDate = new Date(data.endDate);
            endDate.setTime(endDate.getTime() - 12 * 60 * 60 * 1000);
            this.startDate = startDate.getMonth() + 1 + "月" + startDate.getDate() + "日";
            this.endDate = endDate.getMonth() + 1 + "月" + endDate.getDate() + "日";
            for (let key in data.reports) {
              this.warning = this.warning || data.reports[key]['analysisMap']['fluctuation'].level > 0
            }

            let goodFoods = [];
            let avoidFoods = [];
            if (data.dietSuggestion && data.dietSuggestion.beneficial) {
              data.dietSuggestion.beneficial.forEach(food => this.goodFoods.push(food.name));
            }
            if (data.dietSuggestion && data.dietSuggestion.avoid) {
              data.dietSuggestion.avoid.forEach(food => this.avoidFoods.push(food.name));
            }

            let goodSports = [];
            let avoidSports = [];
            if (data.sportSuggestion && data.sportSuggestion.beneficial) {
              data.sportSuggestion.beneficial.forEach(sport => this.goodSports.push(sport));
            }
            if (data.sportSuggestion && data.sportSuggestion.avoid) {
              data.sportSuggestion.avoid.forEach(sport => this.avoidSports.push(sport));
            }

            if (data.reports['bloodpressure']) {
              this.bloodPressureData.status = data.reports['bloodpressure']['analysisMap']['fluctuation'].level;
              this.bloodPressureData.totalMeasure = data.reports['bloodpressure'].totalMeasure;
            }

            // 设置折线图的横坐标
            // startDate.getMonth() + 1
            let from = new Date();
            from.setDate(1);
            from.setHours(1);
            from.setMinutes(1);
            from.setSeconds(1);
            from.setMilliseconds(1);
            from.setMonth(startDate.getMonth());
            from.setFullYear(startDate.getFullYear());
            let startTime = from.getTime();
            from.setMonth(startDate.getMonth() + 1);
            let endTime = from.getTime();
            let totalDays = (endTime - startTime) / 1000 / 3600 / 24;
            let reportMonth = startDate.getMonth() + 1;
            this.monthXaxis = [];
            this.monthXaxis.push("");
            for (let i = 1; i <= totalDays; i++) {
              if (i == 1 || i == totalDays || ((i % 5 == 0) && (totalDays - i > 3))) {
                this.monthXaxis.push(reportMonth + "-" + i);
              } else {
                this.monthXaxis.push("");
              }
            }

            if (data.reports['bloodpressure']) {
              /**血压数据**/
              let hp = data.reports['bloodpressure'];
              this.bloodPressureData.status = hp['analysisMap']['fluctuation'].level;
              this.bloodPressureData.totalMeasure = hp.totalMeasure;
              let totalNormal = hp['ratingCounts'].map(item => (item.code == 1 || item.code == 2) ? item.count : 0).reduce((a, b) => a + b);
              let totalLess = hp['ratingCounts'].map(item => (item.code < 1) ? item.count : 0).reduce((a, b) => a + b);
              let totalMore = hp['ratingCounts'].map(item => (item.code > 2) ? item.count : 0).reduce((a, b) => a + b);
              this.bloodPressureData.measureTimesStatus = 0;
              if (totalLess <= totalNormal && totalMore <= totalNormal) {
                //nothing
              } else if (totalLess > totalNormal && totalLess > totalMore) {
                this.bloodPressureData.measureTimesStatus = -1;
              } else if (totalMore > totalNormal && totalMore > totalLess) {
                this.bloodPressureData.measureTimesStatus = 1;
              }

              //血压饼图 pulsePressure
              hp['ratingCounts'].forEach(item => {
                if (item.count > 0) {
                  this.bloodPressureData.sectorList.push({
                    value: item.count,
                    name: item.rating
                  })
                }
              });
              this.blood();

              //血压折线图数据
              this.bloodPressureData.seven = []
              for (let k = 0; k < hp.data.length; k++) {
                let date = new Date(hp.data[k].measureDateTime);
                let index = date.getDate();

                this.bloodPressureData.seven[index] = { diastolic: hp.data[k].values.diastolic, systolic: hp.data[k].values.systolic, healthStatus: hp.data[k].healthStatus };
              }
              this.blood_seven();

              //血压平均值环形图
              this.bloodPressureData.average = hp.analysisMap.average.value;
              this.bloodPressureData.averageLevel = hp.analysisMap.average.level;
              this.blood_average();

              //周脉压差数据
              this.bloodPressureData.pulse = {
                average: 0,
                level: 0
              };

              let pulse = hp.analysisMap.pulsePressure || {};
              let pulseData = pulse.value || {};
              let pulse_seven = [[], [], [], [], [], [], [], ];

              if (typeof (pulseData) !== 'undefined' && typeof (pulseData.values) == 'object') {
                this.isbloodAverageSeven = true;
                this.bloodPressureData.pulse.average = pulseData.average;
                this.bloodPressureData.pulse.level = pulse.level;
                this.average_half(this.myBloodAverageLine, this.bloodPressureData.pulse.average, 'mmHg');
              }

              if (data.last && data.last.reports['bloodpressure']) {
                let lastHp = data.last.reports['bloodpressure'];
                let pulse_last = lastHp.analysisMap.pulsePressure || {};
                let pulseData_last = pulse_last.value || {};
                this.bloodPressureData.pulse_last = {
                  average: pulseData_last.average,
                  level: pulse_last.level
                };

                this.average_half(this.myBloodAverageLine_last, this.bloodPressureData.pulse_last.average, 'mmHg');
              } else {
                this.bloodPressureData_average = false
              }
            } else {
              this.isbloodpressure = false
            }

            if (data.reports['glu']) {
              let glu = data.reports['glu'];
              this.bloodSugarData.status = glu['analysisMap']['fluctuation'].level;
              this.bloodSugarData.totalMeasure = glu.totalMeasure;

              // 判断是否需要提示用户增加血糖检测次数， 提示条件
              // 1 月内总测量次数小于20次
              this.bloodSugarData.needMoreTest = this.bloodSugarData.totalMeasure < 20;

              //血糖饼图
              glu['ratingCounts'].forEach(item => {
                if (item.count > 0) {
                  this.bloodSugarData.sectorList.push({
                    value: item.count,
                    name: item.rating
                  })
                }
              });

              this.sector();
              let totalNormal = glu['ratingCounts'].map(item => (item.code == 1) ? item.count : 0).reduce((a, b) => a + b);
              let totalLess = glu['ratingCounts'].map(item => (item.code < 1) ? item.count : 0).reduce((a, b) => a + b);
              let totalMore = glu['ratingCounts'].map(item => (item.code > 1) ? item.count : 0).reduce((a, b) => a + b);
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
              }

              for (let k = 0; k < glu.data.length; k++) {
                let date = new Date(glu.data[k].measureDateTime);
                let index = date.getDate();

                if (glu.data[k].values.type > 1) {
                  this.bloodSugarData.seven.after[index] = glu.data[k].values.glu;
                } else {
                  this.bloodSugarData.seven.before[index] = glu.data[k].values.glu;
                }
              }
              this.seven_echarts();

              //血糖平均值环形图-本月
              this.bloodSugarData.average = {
                postprandial: glu.analysisMap.average.value.postprandial.toFixed(2),
                fasting: glu.analysisMap.average.value.fasting.toFixed(2)
              }
              this.bloodSugarData.averageLevel = glu.analysisMap.average.level;

              if (this.bloodSugarData.average.postprandial != '0.00') {
                this.average_half(this.myAverage, this.bloodSugarData.average.postprandial, 'mmol/L');
              } else {
                this.bloodSugarData_postprandial = false;
              }
              if (this.bloodSugarData.average.fasting != '0.00') {
                this.average_half(this.myAverage_fasting, this.bloodSugarData.average.fasting, 'mmol/L');
              } else {
                this.bloodSugarData_fasting = false;
              }

              //血糖平均值环形图-上月
              if (data.last && data.last.reports['glu']) {
                let lastGlu = data.last.reports['glu']
                this.bloodSugarData.average_last = {
                  postprandial: lastGlu.analysisMap.average.value.postprandial.toFixed(2),
                  fasting: lastGlu.analysisMap.average.value.fasting.toFixed(2)
                }
                this.bloodSugarData.averageLevel_last = lastGlu.analysisMap.average.level;

                this.average_half(this.myAverage_last, this.bloodSugarData.average_last.postprandial, 'mmol/L');
                this.average_half(this.myAverage_last_fasting, this.bloodSugarData.average_last.fasting, 'mmol/L');
              } else {
                //negative, do not show picture
                this.bloodSugarData_postprandial = false;
                this.bloodSugarData_fasting = false;
                this.bloodSugarData.average_last = {};
              }
            } else {
              this.ispulse = false
            }
          }
        });
    },

    //环装图
    average_half(dom, data, unit) {
      console.log('average_half', dom, data, unit, '-扇形');
      //扇形初始化
      dom.setOption({
          title: {
            text: data, //主标题
            subtext: unit, //副标题
            x: "center", //x轴方向对齐方式,
            y: "center",
            textStyle: {
              color: "#000",
              fontSize: 20,
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

    // 血糖
    // 扇形
    sector() {
      console.log('sector bloodSugarData', this.bloodSugarData.sectorList);
      //扇形初始化
      let _this = this;
      this.mySector.setOption({
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
      console.log('seven_echarts bloodSugarData', this.bloodSugarData.seven, this.monthXaxis);
      let _this = this;
      this.myLine.setOption({
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

            data: this.monthXaxis,
            //  改变x轴颜色
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            //  改变x轴字体颜色和大小
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#999999",
                fontSize: "12"
              }
            },
            //网格样式
            splitLine: {
              show: true,
              interval: 4,
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
              symbol: 'circle', //设定为实心点
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
                  color: "#FCAE00",
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
              symbol: 'circle', //设定为实心点
              symbolSize: 10, //设定实心点的大小
              showAllSymbol: true,
              lineStyle: {
                //设置折线色颜色
                color: "#0299FC"
              },
              itemStyle: {
                //设置折线折点的颜色
                normal: {
                  color: "#0299FC",
                  // label: { show: true }
                }
              }
            }
          ],
          tooltip: {
            //鼠标悬停提示内容
            trigger: "axis", // 触发类型，默认数据触发，可选为：'axis' item
            formatter: function (params, ticket, callback) {
              // console.log(params, ticket)
              return (typeof (params[0]['data']) == 'undefined' ? '' : params[0]['seriesName'] + ':' + params[0]['data'] + ' ') + (typeof (params[1]['data']) == 'undefined' ? '' : params[1]['seriesName'] + ':' + params[1]['data']);
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

    // 血压
    // 扇形
    blood() {
      console.log('blood bloodPressureData.sectorList', this.bloodPressureData.sectorList);
      let _this = this;
      //扇形初始化
      this.myBool.setOption({
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
      console.log('blood_seven bloodPressureData.seven', this.bloodPressureData.seven);

      let series = [];
      this.bloodPressureData.seven.forEach((item, index) => {
        series.push({
          type: 'line',
          data: [[index, item.systolic], [index, item.diastolic]],
          symbol: 'circle', //设定为实心点
          symbolSize: 10, //设定实心点的大小
          showAllSymbol: true,
          name: (item.healthStatus == 1 || item.healthStatus == 2) ? "正常" : "异常",
          lineStyle: {
            //设置折线色颜色
            color: (item.healthStatus == 1 || item.healthStatus == 2) ? "#0299FC" : "#FCAE00",
          },
          itemStyle: {
            //设置折线折点的颜色,
            normal: {
              color: (item.healthStatus == 1 || item.healthStatus == 2) ? "#0299FC" : "#FCAE00",
              // label: { show: true }
            }
          }
        });
      })
      console.log('bloodPressureData_seven', series)

      let _this = this;
      this.myBloodLine.setOption({
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

            data: this.monthXaxis,
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
              interval: 4,
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
            formatter: function (params, ticket, callback) {
              // console.log(params, ticket, callback)
              return (typeof (params[0]['data']) == 'undefined' ? '' : '高压：' + params[0]['data'][1] + '<br>') + (typeof (params[1]['data']) == 'undefined' ? '' : '低压：' + params[1]['data'][1]);
            },
          }
        },
        true
      );
    },
    //环装图
    blood_average() {
      console.log('blood_average bloodPressureData.average', this.bloodPressureData.average);
      //扇形初始化
      let _this = this;
      this.myBloodAverage.setOption({
          title: {
            text: _this.bloodPressureData.average.diastolic + "/" + _this.bloodPressureData.average.systolic, //主标题
            subtext: "mmHg", //副标题
            x: "center", //x轴方向对齐方式,
            y: "center",
            textStyle: {
              color: "#000",
              fontSize: 20,
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
    blood_average_seven() {
      //扇形初始化
      let _this = this;
      this.myBloodAverageLine.setOption({
        title: {
          text: _this.bloodPressureData.pulse.average, //主标题
          subtext: "mmHg", //副标题
          x: "center", //x轴方向对齐方式,
          y: "center",
          textStyle: {
            color: "#000",
            fontSize: 20,
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
      }, true);
    },
     //app 分享
    goapp(){
      let dom=this.$refs.imageWrapper
      this.$htmlcanvas(dom)
    }
  },
  created() {
    this.pageData();
  },
  mounted() {
    // 血糖
    // 扇形图   
    this.mySector = echarts.init(document.getElementById("sector"));
    //折线图
    this.myLine = echarts.init(document.getElementById("seven"));
    // 环装图
    this.myAverage = echarts.init(document.getElementById("average"));
    this.myAverage_last = echarts.init(document.getElementById("average_last"));
    this.myAverage_fasting = echarts.init(document.getElementById("average_fasting"));
    this.myAverage_last_fasting = echarts.init(document.getElementById("average_last_fasting"));

    // 血压
    // 扇形图
    this.myBool = echarts.init(document.getElementById("blood"));
    //折线图
    this.myBloodLine = echarts.init(document.getElementById("bloodSeven"));
    // 环装图
    this.myBloodAverage = echarts.init(document.getElementById("bloodAverage"));
    //平均脉差
    this.myBloodAverageLine = echarts.init(document.getElementById("bloodAverageSeven"));
    this.myBloodAverageLine_last = echarts.init(document.getElementById("bloodAverageSeven_last"));

    // 监听数据(扇形图,地图)
    window.addEventListener("resize", () => {
      this.mySector.resize();
      this.myLine.resize();
      this.myAverage.resize();
      this.myAverage_last.resize();
      this.myAverage_fasting.resize();
      this.myAverage_last_fasting.resize();

      //血压
      this.myBool.resize();
      this.myBloodLine.resize();
      this.myBloodAverage.resize();
      this.myBloodAverage_last.resize();
      this.myBloodAverageLine.resize();
    });
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
      position: relative;
      // & > div {
      //   width: 100%;
      //   height: 100%;
      // }
      .content-title {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: rem(140);
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>span {
          width: 45%;
          text-align: center;
        }

      }
      #sector {
        width: 100%;
        height: 100%;
      }
      #seven {
        width: 100%;
        height: 100%;
      }
      #average, #average_last, #average_fasting, #average_last_fasting, #bloodAverageSeven, #bloodAverageSeven_last {
        width: 45%;
        height: 100%;
      }
      .average_to {
        width: 10%;
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
    }
    .blood-introduce {
      padding: rem(28) rem(24);
      background-color: #e1f3fb;
      line-height: rem(44);
      letter-spacing: rem(4);
      font-size: rem(26);
      color: #5D7078;
    }
  }
  //贴士
  .tips {
    height: rem(258);
    margin-top: rem(84);
    position: relative;
    .tips-contnet {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      height: rem(114);
      padding: 0 rem(10);
      top: rem(56);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tips-title {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;

        li {
          width: rem(102);
          height: rem(102);
          text-align: center;
          line-height: rem(102);
          font-size: rem(46);
          color: #545be7;
        }
      }
      .tips-icon {
        width: rem(46);
        height: rem(114);
      }
    }
  }
  //贴士详情
  .tips-detail {
    padding: rem(100) rem(36) 0;
    .detail-list {
      width: rem(656);
      height: auto;
      box-sizing: border-box;
      padding: rem(50) rem(30);
      background-color: #e8efff;
      border-radius: rem(24);
      line-height: rem(40);
      letter-spacing: rem(4);
      font-size: rem(26);
      position: relative;
      color: #666666;
      .detail-title {
        position: absolute;
        line-height: rem(54);
        left: rem(38);
        top: rem(-54);
        font-size: rem(44);
        color: #535ae9;
        font-weight: 700;
        padding-left: rem(112);
        span {
          position: absolute;
          left: 0;
          top: rem(18);
          font-size: rem(80);
        }
      }
    }
  }
}

</style>
