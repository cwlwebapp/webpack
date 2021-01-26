<template>
  <div class="report">
    <div class="report_head">
      <img class="doctor" :src="doc" alt />
      <ul
        class="doc_text"
        :style="{ backgroundImage: 'url(' + doc_text + ')' }"
      >
        <li class="doc_text_head">Hi! {{ name }}:</li>
        <li class="doc_text_content">
          我根据中科院深圳先进技术研究院的健康管理模型，为您制定了科学合理的饮食计划，一起来看看吧~
        </li>
      </ul>
    </div>
    <div class="report_content">
      <ul
        class="report_title"
        :style="{
          justifyContent: ringList.labels&&ringList.labels.length > 2 ? 'space-between' : '',
        }"
      >
        <li
          class="report_title_li"
          v-for="(item, index) in ringList.labels"
          :key="index"
          :style="{
            backgroundImage: 'url(' + title + ')',
            marginRight: ringList.labels&&ringList.labels.length <= 2 ? '20px' : '',
          }"
        >
          <p v-html="line(item)"></p>
        </li>
      </ul>
      <ul class="report_des">
        <li class="report_des_head">
          <img class="report_des_icon" :src="fat" alt />
          {{ params.type | title }}
        </li>
        <li class="report_des_text">{{ ringList.detailIntro }}</li>
      </ul>
      <ul class="report_des diet">
        <li class="report_des_head diet_head">
          <div>
            <img class="report_des_icon" :src="diet_plan" alt /> 饮食方案
          </div>
          <div class="diet_head_right">每日推荐摄入:{{ total }}千卡</div>
        </li>
        <li class="diet_echarts">
          <div id="diet_echarts_loop"></div>
          <div class="diet_echarts_right">
            <div
              class="diet_echarts_right_content"
              v-for="(item, index) in ringList.nutriMap"
              :key="index"
            >
              <div class="diet_echarts_right_content_left">{{ index }}</div>
              <div class="diet_echarts_right_content_middle">{{ item }}g</div>
              <div
                class="diet_echarts_right_content_right"
                :style="{ backgroundColor: color(index) }"
              >
                {{ precnt(item, index) }}
              </div>
              <div
                class="diet_echarts_right_content_radius"
                :style="{ backgroundColor: color(index) }"
              ></div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="report_des diet food">
        <li class="report_des_head diet_head diet_head_food">
          <div><img class="report_des_icon" :src="recent" alt /> 每日食单</div>
        </li>
        <!-- v-for="(item,index) in recentlsit" :key="index" -->
        <li class="report_des_food">
          <div class="report_des_food_head">
            <p
              class="report_des_food_head_ol"
              :class="{ active: i == index }"
              v-for="(item, i) in [0, 1, 2, 3, 4, 5, 6]"
              @click="changed(i)"
            >
              <!-- <span>DAY0{{item+1}}</span> -->
              <span>周{{ item | week }}</span>
            </p>
          </div>
          <turn
            style="will-change: transform"
            :width="turnwidth"
            :height="turnheight"
            ref="turn"
            @change="changeCurrent"
            :data="recentlsit"
          ></turn>
        </li>
      </ul>
    </div>
    <div class="report_food">
      <p @click="again">
        <!-- 换个计划,重新测评 -->
        开始计划
        <!-- <span class="iconfont icon-refresh"></span> -->
      </p>
    </div>
    <div id="edituser" :style="userH"></div>
    <specialist
      @click.native="
        $router.push({
          name: 'applyfor',
          query: {
            srcType: 1,
            istype: 'week',
          },
        })
      "
    ></specialist>
  </div>
</template>

<script>
import Vue from "vue";
import echarts from "echarts";
import turn from "vue-flip-page";
import html2canvas from "html2canvas";
import question from "@/components/question/index.js";
let doc =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/doctor.png";
let doc_text =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/doctor-text.png";
let title =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/title.png";
let fat = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/fat.png";
let diet_plan =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/diet_plan.png";
let recent =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/recent.png";
let a = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/01.png";
let b = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/02.png";
let c = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/03.png";
let d = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/04.png";
let e = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/05.png";
let f = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/06.png";
let g = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/question/07.png";
let dir = document.documentElement.clientWidth / 375;
export default {
  data() {
    return {
      doc: doc,
      doc_text: doc_text,
      title: title,
      fat: fat,
      diet_plan: diet_plan,
      recent: recent,
      // 环装图
      mySector: null,
      ringList: {},
      recentlsit: [
        { picture_image: "" },
        { picture_image: "" },
        { picture_image: "" },
        { picture_image: "" },
        { picture_image: "" },
        { picture_image: "" },
        { picture_image: "" },
      ],
      turnwidth: 316 * dir,
      turnheight: 186 * dir,
      userH: 200 * dir,
      index: 0,
      params: {
        type: 0,
      },
    };
  },
  computed: {
    // 姓名
    name() {
      return (
        this.ringList &&
        this.ringList.personalInfo &&
        this.ringList.personalInfo.realName
      );
    },
    total() {
      let obj = {
        碳水化合物: 4,
        脂肪: 9,
        蛋白质: 4,
        color: function (val) {
          return this[val];
        },
      };
      let objlist = this.ringList.nutriMap;
      let value = 0;
      for (let key in objlist) {
        value += objlist[key] * obj.color(key);
      }
      return value;
    },
  },
  filters: {
    // 标题好
    // oindex(val) {
    //   return val > 9 ? val : "0" + (val + 1);
    // }
    title(value) {
      let obj = {
        0: "健康饮食计划",
        1: "减脂饮食计划",
        2: "高血压饮食计划",
        3: "糖尿病饮食计划",
        4: "高脂血症饮食计划",
        5: "高尿酸血症饮食计划",
        6: "慢性肾病饮食计划",
        title: function (value) {
          return this[value + ""];
        },
      };
      return obj.title(value);
    },
    week(value) {
      let arr = ["一", "二", "三", "四", "五", "六", "日"];
      return arr[value];
    },
  },
  components: {
    turn,
  },
  methods: {
    // 标题换行
    line(val) {
      if (!!val) {
        // return val.trim();
        if (val.length < 6) {
          return val;
        } else {
          return val.substring(0, 3) + "<br>" + val.substring(3);
        }
      }
    },
    // 环装图
    ringlist(data) {
      this.mySector.setOption(
        {
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              labelLine: {
                show: false,
              },
              data: data,
            },
          ],
        },
        true
      );
    },
    // 数据
    ringpage() {
      this.$http
        .request({
          method: "get",
          url: "/ajax/web/nutri/project/detail",
          params: this.params,
        })
        .then((res) => {
          if (res && res.respBody) {
            this.$store.commit("setDataLoading", true);
            // 数据赋值
            this.ringList = res.respBody;
            // 饼状图
            let data = [];
            var placeHolderStyle = {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            };
            for (let key in res.respBody.nutriMap) {
              data.push(
                {
                  value: res.respBody.nutriMap[key],
                  name: [key],
                  itemStyle: { color: this.color(key) },
                },
                {
                  value: 2,
                  name: "",
                  itemStyle: placeHolderStyle,
                }
              );
            }
            console.log(
              res.respBody.dietPlanVO.diets,
              "res.respBody.dietPlanVO.diets"
            );
            let arr = [],
              breakfast = "breakfast",
              lunch = "lunch",
              supper = "supper";
            res.respBody.dietPlanVO.diets.forEach((element) => {
              arr.push({
                [breakfast]: element[breakfast].food,
                [lunch]: element[lunch].food,
                [supper]: element[supper].food,
              });
            });
            this.ringlist(data);
            let oarr = [],
              i = 0;
            let cyclic = (arr, i) => {
              let img = question.trans(arr[i], i);
              img.domimg((url) => {
                oarr.push(url);
                ++i;
                if (i > arr.length - 1) {
                  let axx = this.recentlsit.map((item, index) => {
                    item.picture_image = oarr[index];
                    return item;
                  });
                  this.recentlsit = axx;
                  document.getElementById("edituser").style.display = "none";
                  this.$store.commit("setDataLoading", false);
                  return;
                } else {
                  cyclic(arr, i);
                }
              });
            };
            cyclic(arr, i);
          }
        });
    },
    color(key) {
      let obj = {
        碳水化合物: "#F591A5",
        脂肪: "#FFD197",
        蛋白质: "#95D1FF",
        color: function (val) {
          return this[val];
        },
      };
      return obj.color(key);
    },
    // 百分比
    precnt(val, key1) {
      let obj = {
        碳水化合物: 4,
        脂肪: 9,
        蛋白质: 4,
        color: function (val) {
          return this[val];
        },
      };
      // let total = Object.values(this.ringList.nutriMap).reduce(
      //   (curent, item, index) => {
      //     return (curent += item);
      //   }
      // );
      let total = 0;
      console.log(this.ringList.nutriMap, "=======");
      for (let key in this.ringList.nutriMap) {
        total += obj[key] * this.ringList.nutriMap[key];
      }

      return ((val * 100 * obj[key1]) / total).toFixed(1) + "%";
    },
    // 重新提交
    again() {
      this.$http
        .request({
          method: "post",
          url:
            "/ajax/web/nutri/project/createHealthProject?type=" +
            this.params.type,
        })
        .then((res) => {
          console.log(res, "res");
          if (!res.success && res.respStatus == 0) {
            if (this.$util.isApp()) {
              app.goApp("com.ysch.platform.healthy.ui.MainActivityEx");
            }
          } else {
            if (this.$util.isApp()) {
              // app.goApp("com.ysch.platform.healthy.ui.DietaryManagerActivity");
              app.goApp(
                "com.ysch.platform.healthy.ui.MainActivityEx?showGuideDialog=1"
              );
            }
          }
        });
    },
    // 变化
    changed(i) {
      if (i == this.index) {
        return;
      }
      this.index = i;
      this.$refs["turn"].toPage(i);
    },
    changeCurrent(index) {
      if (index == this.index) {
        return;
      }
      this.index = index;
    },
  },
  created() {
    Object.assign(this.params, this.$route.query);
  },
  mounted() {
    // 扇形图
    this.mySector = echarts.init(document.getElementById("diet_echarts_loop"));

    // 监听数据(扇形图,地图)
    window.addEventListener("resize", () => {
      this.mySector.resize();
    });

    this.ringpage();
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.report {
  .report_head {
    position: relative;
    height: rem(330);
    .doctor {
      position: absolute;
      left: rem(74);
      top: rem(32);
      width: rem(164);
      height: rem(274);
    }
    .doc_text {
      position: absolute;
      left: rem(222);
      top: rem(130);
      width: rem(462);
      height: rem(166);
      background-size: cover;
      background-repeat: no-repeat;
      padding: 0 rem(4) 0 rem(58);
      box-sizing: border-box;
      color: #383637;
      .doc_text_head {
        height: rem(50);
        line-height: rem(50);
        font-size: rem(18);
      }
      .doc_text_content {
        line-height: rem(28);
        font-size: rem(18);
        letter-spacing: rem(2);
        // color: #383637;
      }
    }
  }
  .report_content {
    padding: 0 rem(36);
    .report_title {
      display: flex;
      // justify-content: space-around;
      height: rem(128);
      color: #4b4a4a;
      .report_title_li {
        width: rem(108);
        height: rem(108);
        background-size: cover;
        background-repeat: no-repeat;
        // line-height: rem(94);
        text-align: center;
        display: inline-flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: rem(16);

        & > p {
          width: 100%;
          font-size: rem(16);
          transform: scale(1);
        }
      }
    }
    .report_des {
      // height: rem(254);
      padding: 0 rem(20) rem(20) rem(20);
      background-color: #edfbfd;
      border-radius: rem(12);
      margin-bottom: rem(34);
      &.diet {
        background-color: #f3f3f3;
        .report_des_food {
          height: rem(480);
          .report_des_food_head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: rem(140);
            .report_des_food_head_ol {
              &.active {
                background-color: #95d1ff;
                color: #fff;
              }
              width: rem(70);
              height: rem(70);
              font-size: rem(30);
              background-color: #f3f3f3;
              color: #010101;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              & > span {
                transform: scale(0.7);
              }
            }
          }
        }
      }
      &.food {
        background-color: #fff;
      }
      .report_des_head {
        font-size: rem(28);
        height: rem(80);
        // text-align: center;
        // line-height: rem(80);
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: rem(2);
        &.diet_head {
          height: rem(124);
          justify-content: space-between;
          &.diet_head_food {
            height: rem(90);
          }
          .diet_head_right {
            font-size: rem(26);
            color: #666;
            letter-spacing: rem(2);
          }
        }
        .report_des_icon {
          width: rem(34);
          height: rem(34);
          margin-right: rem(4);
          // vertical-align: middle;
        }
      }
      .report_des_text {
        font-size: rem(24);
        color: #898b8d;
        line-height: rem(34);
      }
      .diet_echarts {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: rem(218);
        #diet_echarts_loop {
          width: rem(210);
          height: rem(210);
          // border-radius: 50%;
          // border: rem(10) solid #f00;
        }
        .diet_echarts_right {
          height: rem(166);
          // width: rem(350);
          .diet_echarts_right_content {
            height: rem(40);
            line-height: rem(40);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: rem(20);
            margin-bottom: rem(20);
            color: #fff7f9;
            .diet_echarts_right_content_left {
              width: rem(134);
              height: 100%;
              background-color: #60bbdb;
            }
            .diet_echarts_right_content_middle {
              width: rem(124);
              height: 100%;
              background-color: #ffffff;
              color: #29abe4;
            }
            .diet_echarts_right_content_right {
              width: rem(92);
              height: 100%;
              background-color: #f591a5;
              border: rem(6) solid #ffffff;
              border-right: 0;
              display: flex;
              justify-content: flex-end;
              align-items: center;
            }
            .diet_echarts_right_content_radius {
              width: rem(24);
              height: 100%;
              background-color: #f591a5;
              border-radius: 0 50% 50% 0;
              border: rem(6) solid #ffffff;
              border-left: 0;
            }
          }
        }
      }
    }
  }
  .report_food {
    height: rem(186);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3aa4f6;
    & > p {
      //  text-decoration: underline;
      display: inline-block;
      border-bottom: rem(2) solid #a8e7ff;
      .icon-refresh {
        font-size: rem(18);
        margin-left: rem(12);
      }
    }
  }
}
</style>
