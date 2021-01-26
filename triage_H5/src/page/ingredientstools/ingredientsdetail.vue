<template>
  <div class="ingredientsdetail" ref="scrolllist" @scroll="scrolllist($event)">
    <div class="ingredientsdetail-head" ref="headHeight">
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
      </div>
      <!-- <p
        :class="{
          'ingredientsdetail-head-des': true,
          'ingredientsdetail-head-des-active': pulleventtxt,
        }"
      > -->
      <p ref="desc">
        {{ desc }} <span v-show="isdesc" @click="textshow">点击展开</span>
      </p>
      <!-- <div class="ingredientsdetail-head-food" v-show="!pulleventtxt"> -->
      <!-- <img  :src="pull" alt="" @click="pullevent" /> -->
      <!-- <img :src="pull" alt="" @click="pulleventtext" /> -->
      <!-- 营养数 -->
      <!-- <div
          class="ingredientsdetail-head-food-box"
          v-show="istable"
          ref="pull"
        >
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
      </div> -->
      <!-- 标签 -->
      <div class="ingredientstools-attention-card-bottom">
        <div
          v-for="(zitme, zindex) in pageDatelist.diseaseStatus"
          :key="zindex"
        >
          <img :src="zitme | tagicon" alt="" /> {{ zindex }}
        </div>
      </div>
    </div>
    <div class="ingredientsdetail-box">
      <!-- 热量 -->
      <div class="ingredientsdetail-box-content">
        <div class="ingredientsdetail-box-content-head">热量</div>
        <p class="ingredientsdetail-box-content-num">
          {{ pageDatelist.nutrients && pageDatelist.nutrients.calory.value }}
          <span>千卡</span>
        </p>
        <p class="ingredientsdetail-box-content-des">每100g(可食用部分）</p>
        <ul class="ingredientsdetail-box-content-oul">
          <div class="ingredientsdetail-box-content-line">
            <li></li>
            &nbsp;
            <li></li>
            &nbsp;
            <li></li>
            <img
              :style="{ left: 100 - pageDatelist.rank * 1 + '%' }"
              class="pointer"
              :src="pointer"
            />
          </div>
        </ul>
        <p class="ingredientsdetail-box-content-oul-des">
          热量低于<br />
          {{ 100 - pageDatelist.rank * 1 }}%的{{
            (pageDatelist.foodSubType && pageDatelist.foodSubType.name) ||
            "同类"
          }}
        </p>
      </div>
      <!-- 营养元素 -->
      <div class="ingredientsdetail-box-content">
        <div class="ingredientsdetail-box-content-head">
          营养元素
          <span
            @click="
              $router.push({
                name: 'foodelements',
                query: { id: $route.query.id },
              })
            "
            >更多详情 ></span
          >
        </div>
        <div class="ingredientsdetail-box-content-nutrition">
          <div class="pie-box">
            <div class="pie" ref="pie"></div>
            <div class="pie" ref="pie1"></div>
            <div class="pie" ref="pie2"></div>
          </div>

          <ul class="pie-title">
            <li v-for="(item, index) in threeNutrients" :key="index">
              <div>
                <!-- <div  class="pie" :ref="item.ref"></div> -->
                <div class="pie-title-bottom">
                  <!-- <span :style="{ color: item.hex }"> -->
                  <span>
                    <!-- <span class="garden" :style="{ background: item.hex }"></span -->
                    <!-- <span class="garden"></span> -->
                    {{ item.title }}</span
                  >
                  {{ item.value }}g
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 热量等值兑换 -->
      <div class="ingredientsdetail-box-content" v-if="pageDatelist.equalFoods">
        <div class="ingredientsdetail-box-content-head">热量等值的食材</div>
        <ingredientstoolscard
          class="ingredientstoolscard"
          :itme="itme"
          v-for="(itme, index) in equalFoods"
          :key="index"
        >
          <div
            v-show="$route.query.weight != undefined"
            class="ingredientstoolscard-bnt"
            @click="conversion(itme)"
          >
            <img
              :src="exchange1(itme.id) ? revocation : exchange"
              alt=""
            />&nbsp;&nbsp; <span v-if="exchange1(itme.id)">取消对换</span
            ><span v-else>对换{{ itme.value }}g</span>
          </div>
        </ingredientstoolscard>
      </div>
    </div>
    <!-- 底部 -->
    <div class="ingredientstools-food">已经到底了~~</div>
  </div>
</template>

<script>
let pull =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/pull.png";
let pointer =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/pointer.png";

let exchange =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/exchange.png";
let revocation =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/revocation.png";

let withdraw =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/withdraw.png";

let yi =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/yi.png";
let ke =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/ke.png";
let sh =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/ingredientstools/sh.png";

import echarts from "echarts";
import { pie0, pie1, pie2, carlist, nutritionlist } from "./ingredientstool";
import ingredientstoolscard from "../../components/ingredients/ingredientstoolscard";

console.log(pie0, "=============pie0");

let myChart_pie = null,
  myChart_pie1 = null,
  myChart_pie2 = null,
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
      revocation,
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
      // 文本拉伸
      pulleventtxt: false,
      //
      desc: "",
      isdesc: true,
    };
  },
  filters: {
    // icon表示
    tagicon(val) {
      if (val == -1) {
        return sh;
      } else if (val == 0) {
        return ke;
      } else if (val == 1) {
        return yi;
      }
    },
  },
  watch: {
    "pageDatelist.desc"() {
      let str = "";
      this.$nextTick(() => {
        let num = Math.ceil(
          (this.$refs.desc && this.$refs.desc.offsetWidth) / 14
        );
        if (num * 3 - 10 < this.pageDatelist.desc.length) {
          str =
            this.pageDatelist.desc &&
            this.pageDatelist.desc.slice(0, num * 3 - 10) + "...";
        } else {
          str = this.pageDatelist.desc;
          this.isdesc = false;
        }
        this.desc = str;
      });
    },
  },
  computed: {},
  components: {
    ingredientstoolscard,
  },
  methods: {
    // id兑换
    exchange1(id) {
      return id == this.$route.query.selectedId ? true : false;
    },
    textshow() {
      this.desc = this.pageDatelist.desc && this.pageDatelist.desc;
      this.isdesc = false;
    },
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
              total = 0,
              num = 0;
            for (let key in res.respBody.nutrients) {
              let name = {
                protein: "蛋白质",
                carbohydrate: "碳水",
                fat: "脂肪",
              };
              let hex = {
                protein: "#29AB91",
                carbohydrate: "#F05A49",
                fat: "#2B91E1",
              };

              if (three.includes(key)) {
                res.respBody.nutrients[key].title = name[key];
                res.respBody.nutrients[key].hex = hex[key];
                arr.push(res.respBody.nutrients[key]);
                total += res.respBody.nutrients[key].value * 1;
              }
            }

            // arr.forEach((item, index) => {
            //   // pie.color[index] = item.hex;
            // });
            console.log(pie0, "========123");
            pie0.series[0].data[0].value = arr[0].value;
            pie0.series[0].data[0].name =
              ((arr[0].value * 100) / total).toFixed(1) + "%";
            pie0.series[0].data[1].value = total - arr[0].value;

            pie1.series[0].data[0].value = arr[1].value;
            pie1.series[0].data[0].name =
              ((arr[1].value * 100) / total).toFixed(1) + "%";
            pie1.series[0].data[1].value = total - arr[1].value;

            pie2.series[0].data[0].value = arr[2].value;
            pie2.series[0].data[0].name =
              ((arr[2].value * 100) / total).toFixed(1) + "%";
            pie2.series[0].data[1].value = total - arr[2].value;

            myChart_pie.setOption(pie0, true);
            myChart_pie1.setOption(pie1, true);
            myChart_pie2.setOption(pie2, true);
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
            for (let key in res.respBody.nutrients) {
              if (key in basic) {
                if (basicindex % 2 == 0) {
                  nutritionlist[0].nutritiontableleft.push({
                    project: basic[key],
                    unit: res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: basicindex1 % 2 ? "#E5ECF4" : "",
                  });
                  ++basicindex1;
                } else {
                  nutritionlist[0].nutritiontableright.push({
                    project: basic[key],
                    unit: res.respBody.nutrients[key].unit,
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
                    unit: res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: mineralindex1 % 2 ? "#E5ECF4" : "",
                  });
                  ++mineralindex1;
                } else {
                  nutritionlist[1].nutritiontableright.push({
                    project: mineral[key],
                    unit: res.respBody.nutrients[key].unit,
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
                    unit: res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: vitaminindex1 % 2 ? "#F8E4E5" : "",
                  });
                  ++vitaminindex1;
                } else {
                  nutritionlist[2].nutritiontableright.push({
                    project: vitamin[key],
                    unit: res.respBody.nutrients[key].unit,
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
                    unit: res.respBody.nutrients[key].unit,
                    many: res.respBody.nutrients[key].value,
                    style: otherindex1 % 2 ? "#E8E8E8" : "",
                  });
                  ++otherindex1;
                } else {
                  nutritionlist[3].nutritiontableright.push({
                    project: vitamin[key],
                    unit: res.respBody.nutrients[key].unit,
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
    // 文本内容
    pulleventtext() {
      this.pulleventtxt = true;
      console.log("xxx");
    },
    // 下来展示
    pullevent() {
      this.istable = !this.istable;
      this.$nextTick(() => {
        this.distance =
          this.$refs.pull.offsetHeight + this.$refs.headHeight.offsetHeight;
        if (
          this.$refs.scrolllist.scrollTop >
          this.$refs.pull.offsetHeight +
            this.$refs.headHeight.offsetHeight -
            this.$refs.scrolllist.clientHeight
        ) {
          this.$refs.scrolllist.scrollTop =
            this.$refs.pull.offsetHeight +
            this.$refs.headHeight.offsetHeight -
            this.$refs.scrolllist.clientHeight;
        }
      });
    },
    // 滚动监听
    scrolllist(e) {
      if (
        this.istable &&
        e.target.scrollTop + e.target.clientHeight > this.distance
      ) {
        console.log(
          this.distance - e.target.clientHeight,
          "=======this.distance - e.target.clientHeight"
        );
        e.target.scrollTop =
          this.distance - e.target.clientHeight > 0
            ? this.distance - e.target.clientHeight
            : 0;
      }
      // e.target.scrollHeight=== e.target.clientHeight+e.target.scrollTop;
    },
    // 食品兑换bnt
    conversion(obj) {
      console.log(obj, "=======obj");
      if (this.$util.isApp()) {
        if (this.$route.query.weight != undefined) {
          if (
            this.$route.query.selectedId + "" == "null" ||
            this.$route.query.selectedId == "" ||
            (this.$route.query.id != obj.id &&
              this.$route.query.selectedId != obj.id)
          ) {
            app.onSelect(String(obj.id), obj.name, String(obj.value));
          } else {
            app.onSelect("", "", "");
          }
        }
      }
    },
  },
  created() {
    if (this.$route.query.code != undefined) {
      this.$route.query.id = this.$route.query.code;
      // this.$route.query.selectedId 兑换id
    }
  },
  mounted() {
    // window.addEventListener('scroll',(e)=>{
    //   console.log(e,'==========')
    // })
    console.log(this.$route.query, "===========query");
    // 初始化
    myChart_pie = echarts.init(this.$refs.pie);
    myChart_pie1 = echarts.init(this.$refs.pie1);
    myChart_pie2 = echarts.init(this.$refs.pie2);
    // myChart_pie.setOption(pie, true);
    // myChart_pie1.setOption(pie1, true);
    // myChart_pie2.setOption(pie2, true);
    // 数据更新
    this.pageDate();
    // 监听变动
    window.addEventListener("resize", () => {
      myChart_pie.resize();
      myChart_pie1.resize();
      myChart_pie2.resize();
    });
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.ingredientsdetail {
  overflow: auto;
  height: 100vh;
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
    p > span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: rpx(120);
      height: rpx(40);
      font-size: rpx(28);
      border: 1px solid #ccc;
      color: #3477ff;
    }
    // .ingredientsdetail-head-des {
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    // display: -webkit-box;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;
    // height: rpx(120);
    // &.ingredientsdetail-head-des-active {
    //   // min-height: rpx(120);
    //   height: auto;
    //   display: block;
    // }
    // }
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
    // 卡片底部
    .ingredientstools-attention-card-bottom {
      padding: rpx(30) 0;
      display: flex;
      flex-wrap: wrap;
      & > div {
        width: 33%;
        line-height: rpx(60);
        // margin-right: rpx(60);
        & > img {
          width: rpx(24);
          height: rpx(24);
        }
        // &:nth-of-type(3n) {
        //   margin-right: 0;
        // }
      }
    }
    .ingredientsdetail-head-food-box {
      position: absolute;
      left: rpx(-30);
      top: rpx(72);
      width: 100vw;
      min-height: 100vh;
      background-color: #fff;
      z-index: 999;
      padding: 0 rpx(30);

      .ingredientsdetail-head-food-box-head {
        margin-bottom: rpx(20);
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
  // 内容部分
  .ingredientsdetail-box {
    background-color: #f5f5f5;
    padding: rpx(18) rpx(30) 0 rpx(30);
    .ingredientsdetail-box-content {
      // height: rpx(318);
      background: #ffffff;
      border-radius: rpx(16);
      margin-bottom: rpx(30);
      .ingredientsdetail-box-content-head {
        height: rpx(80);
        display: flex;
        align-items: center;
        // justify-content: space-between;
        font-size: rpx(32);
        padding-left: rpx(16);
        padding-right: rpx(10);
        color: #000000;
        font-weight: bold;
        position: relative;
        &::before {
          content: "";
          width: rpx(6);
          height: rpx(32);
          background-color: #000000;
          margin-right: rpx(23);
        }
        & > span {
          position: absolute;
          right: rpx(12);
          top: 50%;
          margin-top: rpx(-20);
          font-size: rpx(24);
          color: #999999;
        }
      }
      .ingredientsdetail-box-content-num {
        text-align: center;
        // font-size: rpx(48);
        font-family: DIN;
        font-weight: bold;
        & > span {
          font-size: rpx(22);
          font-weight: normal;
        }
      }
      .ingredientsdetail-box-content-des {
        text-align: center;
        font-size: rpx(22);
        color: #999999;
      }
      .ingredientsdetail-box-content-oul {
        padding-top: rpx(42);
        text-align: center;
        & > .ingredientsdetail-box-content-line {
          display: inline-flex;
          position: relative;
          li {
            width: rpx(150);
            height: rpx(8);

            &:nth-child(1) {
              background: #fcc543;
              border-radius: rpx(50) 0 0 rpx(50);
            }
            &:nth-child(2) {
              background: #ffac20;
            }
            &:nth-child(3) {
              background: #f16203;
              border-radius: 0 rpx(50) rpx(50) 0;
            }
          }
          // 标题
          .pointer {
            position: absolute;
            left: 0;
            top: rpx(-21);
            width: rpx(24);
            height: rpx(21);
          }
        }
      }
      .ingredientsdetail-box-content-oul-des {
        font-size: rpx(22);
        color: #666666;
        text-align: center;
      }
      // 营养元素
      .ingredientsdetail-box-content-nutrition {
        padding: 0 rpx(30);
        .pie-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pie {
          width: rpx(148);
          height: rpx(148);
          // margin-right: rpx(90);
        }
        .pie-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          & > li {
            .pie-title-bottom {
              // width: rpx(125);
              height: rpx(80);
              width: rpx(148);
              display: flex;
              align-items: center;
              justify-content: space-around;
              font-size: rpx(24);
              color: #666666;
              & > span {
                // display: inline-flex;
                // align-items: center;
                // min-width: rpx(160);
                font-size: rpx(28);

                // color: #29ab91;
                // .garden {
                //   width: rpx(12);
                //   height: rpx(12);
                //   border-radius: 50%;
                //   // margin-right: rpx(18);
                // }
              }
            }
          }
        }
      }
      // 热量等值兑换
      .ingredientstoolscard {
        border: none;
        border-radius: none;
        .ingredientstoolscard-bnt {
          min-width: rpx(198);
          height: rpx(76);
          border-radius: rpx(38);
          background-color: #3cd29a;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #f5f5f5;
          font-size: rpx(24);
          & > img {
            width: rpx(24);
            height: rpx(21);
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
