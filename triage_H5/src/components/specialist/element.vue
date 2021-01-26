<template>
  <!-- <div class="element" v-if="iselement" @click="iselement = !iselement"> -->
  <div class="element" v-if="iselement">
    <div class="element-box">
      <div class="element-box-head">
        <div class="element-box-head-icon">
          <img :src="icon" alt="" />
        </div>
        <div class="element-box-head-box" @click.stop="selcet1()">
          <div class="element-box-head-des">
            <div class="element-box-head-des-content">
              {{ userName }}，{{
                nutritionTips && errorlist.length > 0
                  ? "您的健康隐患在于" + this.errorlist.join() + "，"
                  : ""
              }}{{
                nutritionTips && morefood.length > 0 && lessfood.length > 0
                  ? "经过分析，本周饮食的" +
                    morefood.join() +
                    "等摄入量较多；" +
                    lessfood.join() +
                    "等摄入量较少；"
                  : lessfood.length > 0
                  ? +"经过分析，本周饮食的" + lessfood.join() + "等摄入量较少；"
                  : morefood.length > 0
                  ? "经过分析，本周饮食的" + morefood.join() + "等摄入量较多；"
                  : ""
              }}{{
                sportTips
                  ? "其次本周的运动热量消耗较少，运动时间较少，运动距离较少。"
                  : ""
              }}{{
                nutritionTips && sportTips
                  ? "长期如此将影响您的身体健康，可能加重病情，请尽早科学合理的安排饮食与运动，并实时监测身体相关指标。"
                  : ""
              }}

              {{
                !nutritionTips && !sportTips
                  ? "您的饮食与运动完美执行了一周，有没有发现身体开始有些变化了呢，建议继续保持!"
                  : ""
              }}
            </div>
          </div>
          <div class="table">
            <div v-for="(item, index) in nutritionlist" :key="index">
              <div class="table-head">{{ item.title }}</div>
              <ul class="table-table">
                <li class="table-li">
                  <span></span>
                  <span>建议摄入</span>
                  <span>实际摄入</span>
                  <span>最小差值</span>
                </li>
                <li
                  class="table-li table-oli"
                  v-for="(oitem, oindex) in item.elements"
                  :key="oindex"
                >
                  <span
                    v-for="(zitem, zindex) in oitem"
                    :key="zindex"
                    @click.stop="selcet($event, index, oindex, zindex)"
                    >{{ zitem.name }}
                    <span
                      :class="{
                        iconfont: zindex == 0,
                        'icon-wenhao': zitem.isactive1 && zindex == 0,
                      }"
                    ></span>
                    <span
                      v-show="zitem.isactive"
                      class="table-oli-position"
                      :style="zitem.positionClass"
                      >{{ describeHealth }}</span
                    >
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="save-bnt">
        <div class="save-bnt-left" @click="iselement = !iselement">返回</div>
        <div class="save-bnt-right" @click.stop="gopush">
          <img :src="vip" alt="" /> 申请专家服务
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var icon = require("../../assets/image/element.png");
var vip = require("../../assets/image/vip.png");
var oldindex = null;
var oldoindex = null;
import { foodtype } from "./foodtype";

export default {
  data() {
    return {
      // 显示隐藏
      iselement: false,
      // 图标
      icon,
      // 提交
      vip,
      // 营养元素
      nutritionlist: [
        {
          title: "饮食分析",
          elements: [
            [
              {
                name: "热量热量",
                isactive: false,
                positionClass: "",
              },
              { name: "﹤612" },
              { name: "213" },
              { name: "399" },
            ],
            [
              {
                name: "热量热量",
                isactive: false,
                positionClass: "",
              },
              { name: "﹤612" },
              { name: "213" },
              { name: "399" },
            ],
            [
              {
                name: "热量热量",
                isactive: false,
                positionClass: "",
              },
              { name: "﹤612" },
              { name: "213" },
              { name: "399" },
            ],
          ],
        },
        {
          title: "饮食分析",
          elements: [
            [
              {
                name: "热量热量",
                isactive: false,
                positionClass: "",
              },
              { name: "﹤612" },
              { name: "213" },
              { name: "399" },
            ],
            [
              {
                name: "热量热量",
                isactive: false,
                positionClass: "",
              },
              { name: "﹤612" },
              { name: "213" },
              { name: "399" },
            ],
            [
              {
                name: "热量热量",
                isactive: false,
                positionClass: "",
              },
              { name: "﹤612" },
              { name: "213" },
              { name: "399" },
            ],
          ],
        },
      ],
      // 内容
      userName: "",
      nutritionTips: false,
      sportTips: false,
      // 元素过高/过低集合
      morefood: [],
      lessfood: [],
      // 健康描述
      describeHealth: "",
    };
  },
  components: {},
  methods: {
    gopush() {
      this.iselement = !this.iselement;
      this.$router.push({
        name: "applyfor",
        query: {
          srcType: 3,
          istype:'week'
        },
      });
    },
    // 点击消失
    selcet1() {
      if (oldindex != null && oldoindex != null) {
        this.nutritionlist[oldindex].elements[oldoindex][0].isactive = false;
        this.nutritionlist[oldindex].elements[oldoindex][0].positionClass = "";
      }
      oldindex = null;
      oldoindex = null;
    },
    // 点击
    selcet(e, index, oindex, zindex) {
      if (
        zindex > 0 ||
        !this.nutritionlist[index].elements[oindex][0].isactive1
      ) {
        return;
      }
      let positionClass = {
        left: e.clientX,
        top: e.clientY,
      };
      if (oldindex != null && oldoindex != null) {
        this.nutritionlist[oldindex].elements[oldoindex][0].isactive = false;
        this.nutritionlist[oldindex].elements[oldoindex][0].positionClass = "";
      }

      this.nutritionlist[index].elements[oindex][0].isactive = true;
      this.nutritionlist[index].elements[
        oindex
      ][0].positionClass = positionClass;

      this.describeHealth =
        this.nutritionlist[index].elements[oindex][0].name +
        "，" +
        ("长期摄入过高易导致" +
          foodtype[this.nutritionlist[index].elements[oindex][0].name].more) +
        ("长期缺乏易引起" +
          foodtype[this.nutritionlist[index].elements[oindex][0].name].less);

      oldindex = index;
      oldoindex = oindex;
    },
    // 参数定义
    pageele() {
      this.$http
        .request({
          url: "/ajax/web/report/analysis",
          method: "get",
          params: {
            userId: this.userid || 700563286080376832,
            start: (this.start && this.start.replace(/-/g, "")) || "20201123",
            end: (this.end && this.end.replace(/-/g, "")) || "20201129",
          },
        })
        .then((res) => {
          console.log(res, "====res123");
          if (res && res.respBody) {
            let obj=res.respBody
            let type = {
              nutrition: "饮食分析",
              sport: "运动分析",
            };

            let nutritionlist = [];
            let morefood = [];
            let lessfood = [];
            
            for (let key in obj) {
              if (key in type) {
                let elements = [];
                for (let okey in obj[key]) {
                  let ele = [];

                  obj[key][okey].forEach((item, index) => {
                    if (index == 2) {
                      if (
                        (item > 0 && key == "nutrition") ||
                        (item > 0 && key == "sport")
                      ) {
                        lessfood.push(okey);
                      } else if (
                        (item < 0 && key == "nutrition") ||
                        (item < 0 && key == "sport")
                      ) {
                        morefood.push(okey);
                      }
                    }
                    ele.push({
                      name: item,
                    });
                  });
                  if (key == "nutrition") {
                    ele.unshift({
                      isactive1: true,
                      name: okey,
                      isactive: "",
                      positionClass: "",
                    });
                  } else {
                    ele.unshift({
                      isactive1: false,
                      name: okey,
                    });
                  }

                  elements.push(ele);
                }

                nutritionlist.push({
                  title: type[key],
                  elements,
                });
              }
            }
            console.log(morefood, "morefood", lessfood, "lessfood");
            this.morefood = morefood;
            this.lessfood = lessfood;
            this.nutritionlist = nutritionlist;
            this.nutritionTips = obj.nutritionTips;
            this.sportTips = obj.sportTips;
          }
        })
        .catch((err) => {
          console.log(err);
          let obj = {
            nutritionTips: true,
            sportTips: true,
            sport: {
              "热量(千卡)": [">3318", "0", "3318"],
              "时长(分钟)": [">910", "0", "910"],
              "距离(米)": [">63140", "0", "63140"],
            },
            nutrition: {
              热量: ["--", "2291.77", "1.00"],
              碳水: ["--", "206.30", "-1.00"],
              脂肪: ["--", "130.57", "0.00"],
              蛋白质: ["--", "84.10", "0.00"],
              钠: ["--", "794.81", "0.00"],
              钾: ["--", "2994.64", "0.00"],
              钙: ["--", "710.96", "0.00"],
              维生素C: ["--", "220.64", "0.00"],
            },
          };

          let type = {
            nutrition: "饮食分析",
            sport: "运动分析",
          };

          let nutritionlist = [];
          let morefood = [];
          let lessfood = [];

          for (let key in obj) {
            if (key in type) {
              let elements = [];
              for (let okey in obj[key]) {
                let ele = [];

                obj[key][okey].forEach((item, index) => {
                  if (index == 2) {
                    if (
                      (item > 0 && key == "nutrition") ||
                      (item > 0 && key == "sport")
                    ) {
                      lessfood.push(okey);
                    } else if (
                      (item < 0 && key == "nutrition") ||
                      (item < 0 && key == "sport")
                    ) {
                      morefood.push(okey);
                    }
                  }
                  ele.push({
                    name: item,
                  });
                });
                if (key == "nutrition") {
                  ele.unshift({
                    isactive1: true,
                    name: okey,
                    isactive: "",
                    positionClass: "",
                  });
                } else {
                  ele.unshift({
                    isactive1: false,
                    name: okey,
                  });
                }

                elements.push(ele);
              }

              nutritionlist.push({
                title: type[key],
                elements,
              });
            }
          }
          console.log(morefood, "morefood", lessfood, "lessfood");
          this.morefood = morefood;
          this.lessfood = lessfood;
          this.nutritionlist = nutritionlist;
          this.nutritionTips = obj.nutritionTips;
          this.sportTips = obj.sportTips;
        });
    },
    // 个人信息
    getUserInfo() {
      this.$http
        .request({ url: "/ajax/user/wx/triage/getBasicProfile" })
        .then((res) => {
          if (res && res.respBody) {
            console.log(res.respBody);
            if (res.respBody.realName) {
              if (res.respBody.realName.indexOf("先生") != -1) {
                this.userName = res.respBody.realName;
              } else {
                let sexobj = {
                  1: "先生",
                  2: "女士",
                };
                this.userName =
                  res.respBody.realName[0] + sexobj[res.respBody.sex];
              }
            }
          }
        });
    },
  },
  created() {
    this.pageele();
    this.getUserInfo();
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.element {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(112, 112, 112, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  .element-box {
    width: rpx(686);
    height: rpx(1200);
    background: #f2f6ff;
    border-radius: rpx(24) rpx(24) 0 0;
    overflow: auto;
    .element-box-head {
      height: rpx(480);
      background-color: #2869fc;
      position: relative;
      .element-box-head-icon {
        height: rpx(236);
        display: flex;
        align-items: center;
        justify-content: center;
        & > img {
          width: rpx(460);
          height: rpx(166);
        }
      }
      .element-box-head-box {
        position: absolute;
        width: 100%;
        .element-box-head-des {
          margin: 0 auto;
          width: rpx(654);
          // min-height: rpx(504);
          background: #f2f6ff;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
          border-radius: 8px;
          padding: rpx(16);
          .element-box-head-des-content {
            // min-height: rpx(468);
            background: #ffffff;
            border-radius: 8px;
            padding: rpx(30);
            font-size: rpx(32);
            font-family: Source Han Sans CN;
            font-weight: 500;
            line-height: rpx(48);
            color: #333333;
          }
        }
        .table {
          padding: 0 rpx(30) rpx(230);
          .table-head {
            height: rpx(96);
            display: flex;
            align-items: center;
            font-size: rpx(32);
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #333333;
          }
          .table-table {
            // padding-bottom: rpx(120);
            .table-li {
              height: rpx(60);
              line-height: rpx(60);
              background: #dfe9fe;
              display: flex;
              align-items: center;
              color: #5886ec;
              & > span {
                flex: 1;
                text-align: center;
                height: 100%;
                border-right: 2px solid #ffffff;
                font-size: rpx(24);
                font-family: Source Han Sans CN;
              }
              & > span:last-of-type {
                border-right: 0;
              }
            }
            .table-oli {
              background-color: #f8f8f8;
              color: #666666;
              & > span {
                position: relative;
                .icon-wenhao::before {
                  position: absolute;
                  top: rpx(-18);
                  color: #666;
                  font-size: rpx(24);
                }
                .table-oli-position {
                  position: absolute;
                  padding: rpx(10);
                  width: rpx(400);
                  margin-top: rpx(26);
                  background: #fff;
                  border-radius: rpx(12);
                  z-index: 99;
                  text-align: left;
                  line-height: rpx(36);
                }
              }
            }
            .table-oli:nth-of-type(2n) {
              background-color: #fff;
            }
          }
        }
      }
    }
    // 提交
    .save-bnt {
      position: absolute;
      left: 50%;
      margin-left: rpx(-343);
      bottom: 0;
      height: rpx(110);
      width: rpx(686);
      background: #ffffff;
      box-shadow: 0 -20px 20px rgba(27, 102, 255, 0.2);
      display: flex;
      z-index: 999;
      .save-bnt-left {
        flex: 1;
        height: 100%;
        text-align: center;
        line-height: rpx(110);
        color: #666666;
        font-size: rpx(32);
        font-family: Source Han Sans CN;
      }
      .save-bnt-right {
        width: rpx(400);
        height: 100%;
        background: #1b66ff;
        text-align: center;
        line-height: rpx(110);
        color: #fff;
        font-size: rpx(32);
        font-family: Source Han Sans CN;
        & > img {
          width: rpx(48);
          height: rpx(48);
        }
      }
    }
  }
}
</style>
