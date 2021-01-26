<template>
  <div class="ingredientsdetail">
    <div class="ingredientsdetail-head">
      <div class="ingredientstools-attention-card-head">
        <div class="ingredientstools-attention-card-head-left">
          <img :src="pageDatelist.image" alt="" />
          <div class="ingredientstools-attention-card-head-left-title">
            <div class="ingredientstools-attention-card-head-left-title-head">
              {{ pageDatelist.name
              }}<span
                v-show="pageDatelist.alias && pageDatelist.alias.length != 0"
                >{{ pageDatelist.alias && pageDatelist.alias.join() }}</span
              >
            </div>
            {{ pageDatelist.foodSubType && pageDatelist.foodSubType.name }}
          </div>
        </div>
        <span>100g</span>
      </div>
      <!-- <p class="ingredientsdetail-head-des" >
        {{ pageDatelist.desc }}
      </p> -->
      <div class="ingredientsdetail-head-food">
        <img v-show="false" :src="pull" alt="" />
        <!-- 营养数 -->
        <div class="ingredientsdetail-head-food-box" ref="pull">
          <div
            class="ingredientsdetail-head-food-box-content"
            v-for="(item, index) in nutritionlist"
            :key="index"
          >
            <p
              class="ingredientsdetail-head-food-box-head"
              v-show="item.nutritiontableleft.length > 1"
            >
              {{ item.title }}
            </p>
            <ul class="ingredientsdetail-head-food-box-tale">
              <li class="ingredientsdetail-head-food-box-td">
                <div
                  v-show="item.nutritiontableleft.length > 1"
                  class="ingredientsdetail-head-food-box-tr"
                  :style="{
                    background: litem.style,
                    color: litem.titlecolor || '',
                  }"
                  v-for="(litem, lindex) in item.nutritiontableleft"
                  :key="lindex"
                >
                  <span>{{ litem.project }}</span>
                  <span>{{ litem.unit }}</span>
                  <span>{{ litem.many }}</span>
                </div>
              </li>
              <li class="ingredientsdetail-head-food-box-td">
                <div
                  v-show="item.nutritiontableright.length > 1"
                  class="ingredientsdetail-head-food-box-tr"
                  :style="{
                    background: ritem.style,
                    color: ritem.titlecolor || '',
                  }"
                  v-for="(ritem, rindex) in item.nutritiontableright"
                  :key="rindex"
                >
                  <span>{{ ritem.project }}</span>
                  <span>{{ ritem.unit }}</span>
                  <span>{{ ritem.many }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="ingredientstools-food">已经到底了~~</div>
  </div>
</template>

<script>
let pull = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/pull.png";
let pointer = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/pointer.png";

let exchange = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/exchange.png";
let withdraw = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/withdraw.png";

import echarts from "echarts";
import { pie, carlist, nutritionlist } from "./ingredientstool";
import ingredientstoolscard from "../../components/ingredients/ingredientstoolscard";
let myChart_pie = null,
  three = ["protein", "carbohydrate", "fat"];

let basic = {
  fiber_dietary: "膳食纤维",
  saturated_fat: "饱和脂肪",
  mufa: "单不饱和脂肪",
  fat: "脂肪",
  cholesterol: "总胆固醇",
  carbohydrate: "碳水化合物",
  fatty_acid: "反式脂肪",
  pufa: "多不饱和脂肪",
  protein: "蛋白质",
  sugar: "糖",
};
let mineral = {
  iron: "铁",
  copper: "铜",
  iodine: "碘",
  kalium: "钾",
  zinc: "锌",
  manganese: "锰",
  fluorine: "氟",
  natrium: "钠",
  calcium: "钙",
  selenium: "硒",
  phosphor: "磷",
  magnesium: "镁",
};

let vitamin = {
  vitamin_a: "维生素A",
  vitamin_c: "维生素C",
  vitamin_d: "维生素D",
  biotin: "生物素",
  carotene: "胡萝卜素",
  vitamin_e: "维生素E",
  niacin: "烟酸",
  vitamin_b6: "维生素B6",
  vitamin_k: "维生素K",
  pantothenic: "泛酸",
  folacin: "叶酸",
  choline: "胆碱",
  thiamine: "维生素B1",
  lactoflavin: "维生素B2",
  vitamin_b12: "维生素B12",
};
let other = {
  gl: "血糖负荷",
  alcohol: "酒精度",
  calory: "热量",
  gi: "指数",
};
export default {
  data() {
    return {
      // 图标
      pull,
      pointer,
      exchange,
      // 总数据
      pageDatelist: {},
      // 三大营养素
      threeNutrients: [],
      // 对等食材
      carlist,
      // 展示营养素
      istable: false,
      // 营养素
      nutritionlist: [],
      // 等值换
      equalFoods: [],
      // 滚动距离
      distance: 0,
    };
  },
  components: {
    ingredientstoolscard,
  },
  methods: {
    // 食材详情
    pageDate() {
      this.$http
        .request({
          method: "post",
          url: "/ajax/web/nutri/fooddetailById/" + this.$route.query.id,
        })
        .then((res) => {
          console.log(res, "=====res333");
          if (res && res.respBody) {
            this.pageDatelist = res.respBody;
            // 三大营养素
            let arr = [],
              total = 0;
            for (let key in res.respBody.nutrients) {
              let name = {
                protein: "蛋白质",
                carbohydrate: "碳水",
                fat: "脂肪",
              };
              let hex = {
                protein: "#29ab91",
                carbohydrate: "#F05A49",
                fat: "#2B91E2",
              };
              if (three.includes(key)) {
                res.respBody.nutrients[key].title = name[key];
                res.respBody.nutrients[key].hex = hex[key];
                arr.push(res.respBody.nutrients[key]);
                total += res.respBody.nutrients[key].value * 1;
              }
            }

            // arr.forEach((item, index) => {
            //   pie.color[index] = item.hex;
            //   pie.series[0].data[index].value = item.value;
            //   pie.series[0].data[index].name =
            //     ((item.value * 100) / total).toFixed(1) + "%";
            // });
            // myChart_pie.setOption(pie, true);
            this.threeNutrients = arr;
            // 等值兑换
            console.log(
              res.respBody.equalFoods,
              "res.respBody.equalFoods======="
            );
            function taglistobj(obj) {
              let arr = [];
              for (let key in obj) {
                arr.push({
                  tagname: key,
                  tagicon: obj[key],
                });
              }
              return arr;
            }

            this.equalFoods = res.respBody.equalFoods.map((item, index) => {
              return {
                id: item.key && item.key.id,
                value: (this.$router.query &&
                this.$router.query.weight != undefined
                  ? (this.$router.query.weight / 100) * item.value
                  : item.value
                ).toFixed(1),
                code: item.key && item.key.code,
                icon: item.key && item.key.image,
                name: item.key && item.key.name,
                subhead:
                  item.key &&
                  item.key.internalDesc &&
                  item.key.internalDesc.join(),
                des: item.key && item.key.alias && item.key.alias.join(),
                num:
                  item.key &&
                  item.key.nutrients &&
                  item.key.nutrients.calory &&
                  item.key.nutrients.calory.value,
                taglist: taglistobj(item.key && item.key.diseaseStatus),
                imgid: item.key && item.key.foodType && item.key.foodType.code,
              };
            });
            // 基础营养素
            let nutritionlist = [
              {
                title: "基础营养素",
                nutritiontableleft: [
                  {
                    project: "项目",
                    unit: "单位",
                    many: "每100g",
                    style: "#4EBE93",
                    titlecolor: "#fff",
                  },
                ],
                nutritiontableright: [
                  {
                    project: "项目",
                    unit: "单位",
                    many: "每100g",
                    style: "#4EBE93",
                    titlecolor: "#fff",
                  },
                ],
              },
              {
                title: "矿物质",
                nutritiontableleft: [
                  {
                    project: "项目",
                    unit: "单位",
                    many: "每100g",
                    style: "#4C6DCF",
                    titlecolor: "#fff",
                  },
                ],
                nutritiontableright: [
                  {
                    project: "项目",
                    unit: "单位",
                    many: "每100g",
                    style: "#4C6DCF",
                    titlecolor: "#fff",
                  },
                ],
              },
              {
                title: "维生素",
                nutritiontableleft: [
                  {
                    project: "项目",
                    unit: "单位",
                    many: "每100g",
                    style: "#F97A78",
                    titlecolor: "#fff",
                  },
                ],
                nutritiontableright: [
                  {
                    project: "项目",
                    unit: "单位",
                    many: "每100g",
                    style: "#F97A78",
                    titlecolor: "#fff",
                  },
                ],
              },
              {
                title: "其他",
                nutritiontableleft: [
                  {
                    project: "项目",
                    unit: "单位",
                    many: "每100g",
                    style: "#333333",
                    titlecolor: "#fff",
                  },
                ],
                nutritiontableright: [],
              },
            ];
            let basicindex = 0,
              basicindex1 = 0,
              basicindex2 = 0,
              mineralindex = 0,
              mineralindex1 = 0,
              mineralindex2 = 0,
              vitaminindex = 0,
              vitaminindex1 = 0,
              vitaminindex2 = 0,
              otherindex = 0,
              otherindex1 = 0,
              otherindex2 = 0;
            let unitobj = {
              milliGrams: "mg",
              grams: "g",
              microGrams: "μg",
            };
            for (let key in res.respBody.nutrients) {
              if (key in basic) {
                if (basicindex % 2 == 0) {
                  nutritionlist[0].nutritiontableleft.push({
                    project: basic[key],
                    unit: unitobj[res.respBody.nutrients[key].unit]||res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: basicindex1 % 2 ? "#E5ECF4" : "",
                  });
                  ++basicindex1;
                } else {
                  nutritionlist[0].nutritiontableright.push({
                    project: basic[key],
                    unit: unitobj[res.respBody.nutrients[key].unit]||res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: basicindex2 % 2 ? "" : "#E5ECF4",
                  });
                  ++basicindex2;
                }
                ++basicindex;
              } else if (key in mineral) {
                if (mineralindex % 2 == 0) {
                  nutritionlist[1].nutritiontableleft.push({
                    project: mineral[key],
                    unit: unitobj[res.respBody.nutrients[key].unit]||res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: mineralindex1 % 2 ? "#E5ECF4" : "",
                  });
                  ++mineralindex1;
                } else {
                  nutritionlist[1].nutritiontableright.push({
                    project: mineral[key],
                    unit: unitobj[res.respBody.nutrients[key].unit]||res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: mineralindex2 % 2 ? "" : "#E5ECF4",
                  });
                  ++mineralindex2;
                }
                ++mineralindex;
              } else if (key in vitamin) {
                if (vitaminindex % 2 == 0) {
                  nutritionlist[2].nutritiontableleft.push({
                    project: vitamin[key],
                    unit: unitobj[res.respBody.nutrients[key].unit]||res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: vitaminindex1 % 2 ? "#F8E4E5" : "",
                  });
                  ++vitaminindex1;
                } else {
                  nutritionlist[2].nutritiontableright.push({
                    project: vitamin[key],
                    unit: unitobj[res.respBody.nutrients[key].unit]||res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: vitaminindex2 % 2 ? "" : "#F8E4E5",
                  });
                  ++vitaminindex2;
                }
                ++vitaminindex;
              } else if (key in other) {
                if (otherindex % 2 == 0) {
                  nutritionlist[3].nutritiontableleft.push({
                    project: other[key],
                    unit: unitobj[res.respBody.nutrients[key].unit]||res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: otherindex1 % 2 ? "#E8E8E8" : "",
                  });
                  ++otherindex1;
                } else {
                  nutritionlist[3].nutritiontableright.push({
                    project: vitamin[key],
                    unit: unitobj[res.respBody.nutrients[key].unit]||res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: otherindex2 % 2 ? "" : "#E8E8E8",
                  });
                  ++otherindex2;
                }
                ++otherindex;
              }
            }
            this.nutritionlist = nutritionlist;
          }
        });
    },
  },
  created() {
    this.pageDate();
  },
  mounted() {},
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.ingredientsdetail {
  .ingredientsdetail-head {
    padding: rpx(30) rpx(30) 0;
    .ingredientstools-attention-card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: rpx(30);
      .ingredientstools-attention-card-head-left {
        display: inline-flex;
        & > img {
          width: rpx(96);
          height: rpx(96);
          background: #f5f5f5;
          border: 1px solid #f5f5f5;
          border-radius: rpx(16);
          margin-right: rpx(30);
        }
        .ingredientstools-attention-card-head-left-title {
          font-size: rpx(28);
          color: #666666;
          .ingredientstools-attention-card-head-left-title-head {
            font-size: rpx(36);
            font-weight: 550;
            color: #000000;
            margin-bottom: rpx(12);
            & > span {
              font-size: rpx(24);
              color: #666666;
              display: inline-block;
              transform: scale(0.8);
            }
          }
        }
      }
    }
    .ingredientsdetail-head-des {
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: rpx(120);
    }
    .ingredientsdetail-head-food {
      height: rpx(72);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      & > img {
        width: rpx(34);
        height: rpx(17);
      }
    }
    .ingredientsdetail-head-food-box {
      position: absolute;
      left: rpx(-30);
      // top: rpx(72);
      top: 0;
      width: 100vw;
      min-height: 100vh;
      background-color: #fff;
      z-index: 999;
      padding: 0 rpx(30);

      .ingredientsdetail-head-food-box-head {
        // margin-bottom: rpx(20);
        padding: rpx(20);
        color: #000000;
        font-weight: bold;
        font-size: rpx(32);
      }
      .ingredientsdetail-head-food-box-tale {
        display: flex;
        // justify-content: space-between;
        .ingredientsdetail-head-food-box-td {
          width: 50%;
          // padding: 0 rpx(16);
          .ingredientsdetail-head-food-box-tr {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: rpx(56);
            & > span {
              font-size: rpx(20);
              text-align: center;
              &:nth-child(1) {
                flex: 3;
              }
              &:nth-child(2) {
                flex: 1;
              }
              &:nth-child(3) {
                flex: 2;
              }
            }
          }
        }
      }
    }
  }
  // 数据底部
  .ingredientstools-food {
    height: rpx(90);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f9;
    color: #999999;
    font-size: rpx(24);
    margin-top: rpx(30);
  }
}
</style>
