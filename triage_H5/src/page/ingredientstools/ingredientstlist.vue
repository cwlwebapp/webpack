<template>
  <div class="ingredientstlist" @scroll="scrolllist($event)">
    <div class="ingredientstlist-head">
      <!-- 搜索 -->
      <div class="ingredientstools-head-input">
        <span class="iconfont icon-sousuo"></span
        ><input
          class="icon-sousuo-input"
          type="text"
          placeholder="查查什么能吃"
          @input="selectinput($event)"
        />
        <!-- 搜索蒙版 -->
        <div
          class="ingredientstools-head-input-list"
          v-show="selectlist && selectlist.length != 0"
          @touchmove.prevent
        >
          <ul class="ingredientstools-head-input-list-panle">
            <li
              v-for="(item, index) in selectlist"
              :key="index"
              @click="
                $router.push({
                  name: 'ingredientsdetail',
                  query: { code: item.id },
                })
              "
            >
              <p>
                <span>{{ item.name }}</span>
                <span
                  v-show="item.internalDesc && item.internalDesc.length != 0"
                  class="des"
                  >({{ item.internalDesc && item.internalDesc.join() }})</span
                >
              </p>
              {{ item.alias | aliasjion }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 分类 -->
      <div class="ingredientstlist-class">
        <!-- <div
          class="ingredientstlist-class-title ingredientstlist-class-title-width"
        > -->
        <div class="ingredientstlist-class-title">
          <span
            :class="{
              'ingredientstlist-class-title-one': true,
              active: $route.query.class1 == 1,
            }"
            >{{ name1 || "人群" }}
            <!-- <span class="iconfont icon-duobianxing-copy-copy"></span> -->
            <span class="iconfont">&nbsp;</span>
          </span>
          <span :class="{ active: $route.query.class2 == 2 }"
            >{{ name2 || "食物分类" }}
            <!-- <span class="iconfont icon-duobianxing-copy-copy"></span> -->
            <span class="iconfont">&nbsp;</span>
          </span>
        </div>
        <div
          :class="{ 'ingredientstlist-class-title': true, active: active }"
          @click="screen"
        >
          <span class="iconfont icon-duobianxing-copy-copy"></span>
          筛选
        </div>
        <!-- 分类蒙版 -->
        <div class="ingredientstlist-class-list" v-show="active">
          <ul class="ingredientstlist-class-list-oul">
            <div v-for="(item, index) in classlist" :key="index">
              <li class="ingredientstlist-class-list-title">{{ item.name }}</li>
              <span
                @click="selectbnt(index, oindex, item)"
                :class="{
                  'ingredientstlist-class-list-title-li': true,
                  active: oitem.active,
                }"
                v-for="(oitem, oindex) in item.titlelsit"
                :key="oindex"
                >{{ oitem.title }}</span
              >
            </div>
            <div class="ingredientstlist-class-list-food">
              <span @click="empty">清空条件</span>
              <span @click="confirm">确定</span>
            </div>
          </ul>
        </div>
      </div>
      <!-- 异吃 可吃 -->
      <ul class="ingredientstlist-different">
        <li
          :class="{ active: item.diseaseType === $route.query.diseaseType }"
          v-for="(item, index) in foodlist"
          :key="index"
        >
          <img :src="item.icon" alt="" />{{ item.iconname }}
        </li>
      </ul>
    </div>
    <!-- 卡片 -->
    <div class="ingredientstoolscardbox">
      <ingredientstoolscard
        class="ingredientstoolscard"
        :itme="itme"
        v-for="(itme, index) in carlist"
        :key="index"
        @click.native="
          $router.push({
            name: 'ingredientsdetail',
            query: { id: itme.id },
          })
        "
      >
        <div class="ingredientstools-attention-card-head-right">
          {{ itme.num }} <span>(千克/100g)</span>
        </div>
      </ingredientstoolscard>
      <div class="analyse-content-bloodpress1" v-show="carlist.length == 0">
        <img :src="nodata" alt="" />
        <p>
          <!-- {{
              title_active == 0
                ? "暂无检测数据"
                : title_active == 1
                ? "暂无饮食打卡数据"
                : title_active == 2
                ? "暂无运动打卡数据"
                : "暂未数据"
            }} -->
          暂未数据
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ingredientstoolscard from "../../components/ingredients/ingredientstoolscard";
import { foodlist } from "./ingredientstool";
var nodata =
  "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/newweek/nodata.png";
// 私有属性 缓存问题
let timmer = null,
  // oldindex0 = null,
  // oldindex1 = null,
  // oldindex2 = null,
  lock = false;
export default {
  name: "ingredientstlist",
  data() {
    return {
      nodata,
      // 筛选选择
      active: false,
      // 搜索列表
      selectlist: [],
      //食材选择
      foodlist,
      // 类型切换
      classlist: [
        {
          name: "人群",
          titlelsit: [
            { title: "高血压", active: false, disease: "高血压" },
            { title: "糖尿病", active: false, disease: "糖尿病" },
            { title: "慢性肾病", active: false, disease: "慢性肾病" },
            { title: "高血脂", active: false, disease: "高血脂" },
            { title: "高尿酸血症", active: false, disease: "高尿酸血症" },
          ],
        },
        {
          name: "状态",
          titlelsit: [
            { title: "宜吃", active: false, diseaseType: 1 },
            { title: "可吃", active: false, diseaseType: 0 },
            { title: "慎吃", active: false, diseaseType: -1 },
          ],
        },
        {
          name: "食物分类",
          titlelsit: [
            {
              title: "全部",
              category: "",
              active: false,
            },
            {
              title: "五谷杂粮",
              category: "01,02,03",
              active: false,
            },
            {
              title: "蔬菜菌类",
              category: "04,05",
              active: false,
            },
            {
              title: "肉类/蛋类",
              category: "08,09,11",
              active: false,
            },
            {
              title: "水产/海鲜",
              category: "12",
              active: false,
            },

            {
              title: "水果",
              category: "06",
              active: false,
            },
            {
              title: "豆奶制品",
              category: "10",
              active: false,
            },
            {
              title: "坚果",
              category: "07",
              active: false,
            },
            {
              title: "补品/草药",
              category: "99",
              active: false,
            },
          ],
        },
      ],
      // 列表
      carlist: [],
      // 列表分页
      pageNum: 1,
      // 参数列表
      params: {
        class: 1,
        searchName: "",
        disease: "",
        category: "",
      },
      // 食物状态
      name1: "",
      name2: "",
      oldindex2: null,
      oldindex1: null,
      oldindex0: null,
    };
  },
  filters: {
    aliasjion(data) {
      if (data && data.length != 0) {
        // console.log(Object.values(data), "===========");
        let arr = Object.values(data);
        return arr[0];
      }
      return "";
    },
  },

  components: {
    ingredientstoolscard,
  },
  methods: {
    // 输入内容
    selectinput(e) {
      clearTimeout(timmer);
      // this.classlist.forEach((item,index)=>{
      //   item.
      // })
      timmer = setTimeout(() => {
        // console.log(e.target.value);
        if (e && e.target.value && e.target.value.length > 0) {
          let url =
            "/ajax/web/nutri/food/search?searchName=" +
            e.target.value +
            "&disease=&category=";
          this.$http
            .request({
              method: "post",
              url,
            })
            .then((res) => {
              console.log(res, "=====res");
              if (res && res.respBody) {
                this.selectlist = res.respBody;
                // console.log(this.selectlist,'======res.respBody')
              }
            });
        } else {
          this.selectlist = [];
          let url =
            "/ajax/web/nutri/food/search?searchName=" +
            "&disease=" +
            (this.$route.query.disease ? this.$route.query.disease : "") +
            "&category=" +
            (this.$route.query.category ? this.$route.query.category : "") +
            "&diseaseType=" +
            (this.$route.query.diseaseType != undefined
              ? this.$route.query.diseaseType
              : "") +
            "&pageNum=" +
            this.pageNum +
            "&pageSize=10";
          this.$http
            .request({
              method: "post",
              url,
            })
            .then((res) => {
              console.log(res, "=====res");
              if (res && res.respBody) {
                let carlist = [];
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
                res.respBody.forEach((item, index) => {
                  carlist.push({
                    code: item.code,
                    id: item.id,
                    icon: item.image,
                    name: item.name,
                    subhead: item.internalDesc && item.internalDesc.join(),
                    des: item.alias && item.alias.join(),
                    num:
                      item.nutrients &&
                      item.nutrients.calory &&
                      item.nutrients.calory.value,
                    taglist: taglistobj(item.diseaseStatus),
                    imgid: item && item.foodType && item.foodType.code,
                  });
                });
                console.log(carlist, "=============carlist");
                if (this.pageNum == 1) {
                  this.carlist = carlist;
                } else {
                  this.carlist = this.carlist.concat(carlist);
                }

                lock = true;
              }
            });
        }
      }, 500);
    },
    // 滚动监听
    scrolllist(e) {
      if (this.selectlist.length != 0) {
        e.target.scrollTop = 0;
      }

      console.log(
        e.target.scrollHeight,
        e.target.clientHeight,
        e.target.scrollTop,
        "============aaaaaaaaa"
      );
      if (
        e.target.scrollHeight <
          e.target.clientHeight + e.target.scrollTop + 100 &&
        lock
      ) {
        lock = false;
        this.pageNum++;
        this.selectinput();
      }
    },
    //  筛选
    screen() {
      this.classlist.forEach((item, index) => {
        for (let i = 0; i < item.titlelsit.length; i++) {
          // console.log(item.titlelsit[i], "===========");
          if (
            item.titlelsit[i] &&
            this.$route.query.category &&
            item.titlelsit[i].category == this.$route.query.category
          ) {
            item.titlelsit[i].active = true;
          }
          if (
            item.titlelsit[i] &&
            this.$route.query.disease &&
            item.titlelsit[i].disease == this.$route.query.disease
          ) {
            item.titlelsit[i].active = true;
          }
          if (
            item.titlelsit[i] &&
            this.$route.query.diseaseType != undefined &&
            item.titlelsit[i].diseaseType === this.$route.query.diseaseType
          ) {
            // console.log(
            //   item.titlelsit[i].diseaseType,
            //   this.$route.query.diseaseType,
            //   "==============this.$route.query.diseaseType"
            // );
            // oldindex = i;
            item.titlelsit[i].active = true;
          }
        }
      });
      this.active = !this.active;
    },
    // 分类选择
    selectbnt(index, oindex, obj) {
      if (index == 1) {
        if (this.oldindex1 != null) {
          this.classlist[index].titlelsit[this.oldindex1].active = false;
        } else {
          this.classlist[index].titlelsit = this.classlist[index].titlelsit.map(
            (item, index) => {
              Object.assign(item, { active: false });
              return item;
            }
          );
        }
        this.classlist[index].titlelsit[oindex].active = true;
        this.oldindex1 = oindex;
        // obj.active = !obj.active;
      } else if (index == 2) {
        // console.log('xxx')
        // obj.active = !obj.active;
        if (this.oldindex2 != null) {
          this.classlist[index].titlelsit[this.oldindex2].active = false;
        } else {
          this.classlist[index].titlelsit = this.classlist[index].titlelsit.map(
            (item, index) => {
              Object.assign(item, { active: false });
              return item;
            }
          );
        }
        this.classlist[index].titlelsit[oindex].active = true;
        this.oldindex2 = oindex;
      } else if (index == 0) {
        if (this.oldindex0 != null) {
          this.classlist[index].titlelsit[this.oldindex0].active = false;
        } else {
          this.classlist[index].titlelsit = this.classlist[index].titlelsit.map(
            (item, index) => {
              Object.assign(item, { active: false });
              return item;
            }
          );
        }
        this.classlist[index].titlelsit[oindex].active = true;
        this.oldindex0 = oindex;
      }
    },
    // 清空选择
    empty() {
      this.classlist.forEach((item, index) => {
        for (let i = 0; i < item.titlelsit.length; i++) {
          // console.log(item.titlelsit[i], "===========");
          if (item.titlelsit[i].active) {
            item.titlelsit[i].active = false;
          }
        }
        this.name1 = "";
        this.name2 = "";
        this.$route.query.disease = "";
        this.$route.query.diseaseType = "";
        this.$route.query.category = "";
      });
      // this.active = !this.active;
      // this.selectinput();
    },
    confirm() {
      this.pageNum = 1;
      this.name1 = "";
      this.name2 = "";
      this.classlist.forEach((item, index) => {
        console.log(item, "=======item");
        if (item.name == "食物分类") {
          let arr = [];
          this.$route.query.category = "";

          for (let i = 0; i < item.titlelsit.length; i++) {
            if (item.titlelsit[i].active) {
              arr.push(item.titlelsit[i].category);
              this.name2 = this.name2 + " " + item.titlelsit[i].title;
              this.$route.query.class2 = 2;
            }
          }

          this.$route.query.category = arr.join(",");
        } else if (item.name == "人群") {
          this.$route.query.disease = "";

          let arr = [];
          for (let i = 0; i < item.titlelsit.length; i++) {
            if (item.titlelsit[i].active) {
              arr.push(item.titlelsit[i].disease);
              this.name1 = this.name1 + " " + item.titlelsit[i].title;
            }
          }
          this.$route.query.disease = arr.join(",");
        } else if (item.name == "状态") {
          this.$route.query.diseaseType = "";
          for (let i = 0; i < item.titlelsit.length; i++) {
            if (item.titlelsit[i].active) {
              this.$route.query.diseaseType = item.titlelsit[i].diseaseType;
            }
          }
        }
      });

      if (
        this.$route.query.disease !== "" &&
        this.$route.query.diseaseType !== ""
      ) {
        this.$route.query.class1 = 1;
      }

      if (
        (this.$route.query.disease === "" &&
          this.$route.query.diseaseType === "") ||
        (this.$route.query.disease !== "" &&
          this.$route.query.diseaseType !== "")
      ) {
        this.active = !this.active;
      } else {
        if (
          this.$route.query.disease !== "" &&
          this.$route.query.diseaseType === ""
        ) {
          this.$toast("请选择状态");
        } else if (
          this.$route.query.disease === "" &&
          this.$route.query.diseaseType !== ""
        ) {
          this.$toast("请选择人群");
        }
        return;
      }
      this.selectinput();
    },
    // 关注食材
    // attention() {
    //   this.$http
    //     .request({
    //       method: "post",
    //       url: "/ajax/web/nutri/carefoods",
    //     })
    //     .then((res) => {
    //       console.log(res, "====1111");
    //       if (res && res.respBody) {
    //         let carlist = [];
    //         function taglistobj(obj) {
    //           let arr = [];
    //           for (let key in obj) {
    //             arr.push({
    //               tagname: key,
    //               tagicon: obj[key],
    //             });
    //           }
    //           return arr;
    //         }
    //         res.respBody.forEach((item, index) => {
    //           carlist.push({
    //             code: item.code,
    //             id: item.id,
    //             icon: item.image,
    //             name: item.name,
    //             subhead: item.internalDesc && item.internalDesc.join(),
    //             des: item.alias && item.alias.join(),
    //             num:
    //               item.nutrients &&
    //               item.nutrients.calory &&
    //               item.nutrients.calory.value,
    //             taglist: taglistobj(item.diseaseStatus),
    //           });
    //         });
    //         console.log(carlist, "=============carlist");
    //         this.carlist = carlist;
    //       }
    //     });
    // },
  },
  created() {
    console.log(this.$route.query, "===");
    this.name1 = this.$route.query.name1;
    this.name2 = this.$route.query.name2;
    // this.attention();
    this.selectinput();
  },
  activated() {
    console.log(123, this.$route.meta.keepAlive);
  },
  deactivated() {
    console.log(234, this.$route.meta.keepAlive);
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.ingredientstlist {
  height: 100vh;
  overflow: auto;
  padding-top: rpx(320);
  // height: rpx(72);
  .ingredientstlist-head {
    position: fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top: 0; /* 距离窗口顶部距离 */
    left: 0; /* 距离窗口左边的距离 */
    width: 100%; /* 宽度设置为100% */
    z-index: 99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
    background-color: #fff;
    // 搜索
    padding: 0 rpx(30);
    .ingredientstools-head-input {
      margin: rpx(30) 0;
      height: rpx(72);
      background: #f5f7fa;
      border-radius: rpx(8);
      display: flex;
      align-items: center;
      position: relative;
      .icon-sousuo {
        width: rpx(72);
        height: rpx(72);
        text-align: center;
        line-height: rpx(72);
        &::before {
          color: #c8c8c8;
          font-size: rpx(30);
        }
      }
      .icon-sousuo-input {
        width: 100%;
        height: 100%;
        background: #f5f7fa;
        &::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: #c8c8c8ff;
          font-size: rpx(28);
        }
      }
      // 搜索列表
      .ingredientstools-head-input-list {
        position: absolute;
        left: rpx(-30);
        top: rpx(102);
        width: 100vw;
        height: rpx(1280);
        // background-color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        .ingredientstools-head-input-list-panle {
          // width: 100%;
          & > li {
            padding: 0 rpx(102);
            background-color: #fff;
            height: rpx(94);
            // border-bottom: 1px solid #ccc;
            display: flex;
            // align-items: center;
            justify-content: center;
            color: #999999;
            flex-wrap: wrap;
            flex-direction: column;
            font-size: rpx(22);
            & > p {
              & > span {
                font-size: rpx(32);
                font-weight: bold;
                color: #000000;
              }
              & > .des {
                font-size: rpx(20);
                font-weight: normal;
                color: #999999;
              }
            }
          }
        }
      }
    }
    // 分类
    .ingredientstlist-class {
      display: flex;
      justify-content: space-between;
      font-size: rpx(28);
      position: relative;
      // .ingredientstlist-class-title-width {
      //   width: rpx(500);
      //   white-space: nowrap;
      //   text-overflow: ellipsis;
      //   overflow: hidden;
      // }
      .ingredientstlist-class-title-one {
        // margin-right: rpx(30);
        .icon-duobianxing-copy-copy::before {
          font-size: rpx(12);
          transform: scale(0.8);
          margin: 0 rpx(16);
        }
      }
      .active {
        color: #1b66ff;
      }
      .icon-duobianxing-copy-copy::before {
        font-size: rpx(12);
        transform: scale(0.8);
        margin: 0 rpx(16);
      }
      // 展示
      .ingredientstlist-class-list {
        position: absolute;
        left: rpx(-30);
        top: rpx(48);
        width: 100vw;
        height: rpx(1180);
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.5);
        .ingredientstlist-class-list-oul {
          background-color: #fff;
          padding: 0 rpx(30);
          li {
            display: flex;
            height: rpx(98);
            align-items: center;
            font-size: rpx(28);
          }
          .ingredientstlist-class-list-title-li {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            // width: rpx(136);
            // height: rpx(64);
            padding: rpx(12);
            background: #f5f5f5;
            border-radius: rpx(16);
            color: #666666;
            font-size: rpx(28);
            margin: 0 rpx(56) rpx(26) 0;
            &.active {
              border: 1px solid #1b66ff;
              box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
              background: #ffffff;
            }
          }
          .ingredientstlist-class-list-food {
            display: flex;
            height: rpx(128);
            align-items: center;
            justify-content: space-between;
            & > span {
              box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
              border-radius: rpx(44);
              height: rpx(88);
              line-height: rpx(88);
              text-align: center;
              color: #666666;
              font-size: rpx(28);
              &:nth-child(1) {
                width: rpx(216);
                background: #ffffff;
              }
              &:nth-child(2) {
                background: #1b66ff;
                width: rpx(436);
                color: #ffffff;
              }
            }
          }
          p {
            width: 136px;
            height: 64px;
            background: #ffffff;
            border: 1px solid #1b66ff;
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            border-radius: 16px;
          }
        }
      }
    }
    // 异吃 可吃
    .ingredientstlist-different {
      padding: rpx(30) 0;
      & > li {
        width: rpx(130);
        height: rpx(54);
        background: #fefefe;
        border: 1px solid #dddddd;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: rpx(26);
        display: inline-flex;
        align-items: center;
        justify-content: space-evenly;
        margin-right: rpx(42);
        &.active {
          border: 1px solid #1b66ff;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          background: #ffffff;
          color: #1b66ff;
        }
        & > img {
          width: rpx(24);
          height: rpx(24);
        }
      }
    }
  }
  //
  .ingredientstoolscardbox {
    background-color: #f5f5f9;
    padding: rpx(16) rpx(32);
    .ingredientstoolscard {
      border-radius: rpx(16);
      margin-bottom: rpx(14);
      .ingredientstools-attention-card-head-right {
        font-size: rpx(32);
        font-family: DIN;
        font-weight: bold;
        color: #000000;
        span {
          display: inline-block;
          transform: scale(0.8);
          font-size: rpx(20);
          color: #999999;
        }
      }
    }
    // 无数据页面
    .analyse-content-bloodpress1 {
      height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: rpx(414);
        height: rpx(398);
      }
    }
  }
}
</style>
