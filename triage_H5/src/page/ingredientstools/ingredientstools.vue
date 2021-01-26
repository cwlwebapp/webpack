<template>
  <div class="ingredientstools" @scroll="scrolllist($event)">
    <!-- 搜索标题 -->
    <div class="ingredientstools-head">
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
                  query: { id: item.id },
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
    </div>
    <!-- 食材分类 -->
    <div class="ingredientstools-style">
      <van-swipe indicator-color="white">
        <van-swipe-item>
          <!-- <img v-lazy="image" /> -->
          <div class="vant-div" v-for="(item, index) in vantlist" :key="index">
            <div class="vant-div-head">
              <div
                v-for="(oitem, oindex) in item.headlist"
                :key="oindex"
                @click="
                  $router.push({
                    name: 'ingredientstlist',
                    query: {
                      category: oitem.category,
                      name2: oitem.name,
                      class2: 2,
                    },
                  })
                "
              >
                <img :src="oitem.icon" alt="" />
                <p>{{ oitem.name }}</p>
              </div>
            </div>
            <div class="vant-div-head">
              <div
                v-for="(oitem, oindex) in item.foodlist"
                :key="oindex"
                @click="
                   $router.push({
                    name: 'ingredientstlist',
                    query: {
                      category: oitem.category,
                      name2: oitem.name,
                      class2: 2,
                    },
                  })
                "
              >
                <img :src="oitem.icon" alt="" />
                <p>{{ oitem.name }}</p>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分割线 -->
    <div class="ingredientstools-line"></div>
    <!-- 食物黑白榜 -->
    <div class="ingredientstools-list">
      <div class="ingredientstools-list-head">食物黑白榜</div>
      <ul class="ingredientstools-list-oul">
        <li
          :class="{ active: item.active }"
          v-for="(item, index) in title_list"
          :key="index"
          @click="select(index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul class="ingredientstools-list-img">
        <li
          v-for="(item, index) in img_list"
          :key="index"
          @click="foodtype(item)"
        >
          <img :src="item.img" alt="" />
          <div class="ingredientstools-list-img-mask">
            <img :src="item.icon" alt="" />
            <p>{{ item.iconname }}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 分割线 -->
    <div class="ingredientstools-line"></div>
    <!-- 大家都在关注 -->
    <div class="ingredientstools-attention">
      <div class="ingredientstools-attention-head">大家都在关注</div>
      <!-- 卡片 -->
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
          {{ itme.num }} <span>千卡/100g</span>
        </div>
      </ingredientstoolscard>
    </div>
    <!-- 底部 -->
    <div class="ingredientstools-food">已经到底了~~</div>
  </div>
</template>
<script>
import { vantlist, title_list, img_list } from "./ingredientstool";
import ingredientstoolscard from "../../components/ingredients/ingredientstoolscard";
let timmer = null,
  oindex = null; // 疾病筛选索引
export default {
  data() {
    return {
      // 模糊搜索列表
      selectlist: [],
      // 食材列表
      vantlist: vantlist,
      // 疾病筛选
      title_list: [
        { name: "高血压", active: false, disease: "高血压" },
        { name: "糖尿病", active: false, disease: "糖尿病" },
        { name: "慢性肾病", active: false, disease: "慢性肾病" },
        { name: "高血脂", active: false, disease: "高血脂" },
        { name: "高尿酸血症", active: false, disease: "高尿酸血症" },
      ],
      // 疾病筛选食品
      img_list,
      food: {
        disease: "",
        diseaseType: "",
      },
      // 卡片
      carlist: [],
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
  methods: {
    // 输入内容
    selectinput(e) {
      clearTimeout(timmer);
      timmer = setTimeout(() => {
        // console.log(e.target.value);
        if (e.target.value && e.target.value.length > 0) {
          this.$http
            .request({
              method: "post",
              url:
                "/ajax/web/nutri/food/search?searchName=" +
                e.target.value +
                "&disease=&category=",
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
        }
      }, 500);
    },
    // 滚动监听
    scrolllist(e) {
      if (this.selectlist.length != 0) {
        e.target.scrollTop = 0;
      }
      // e.target.scrollHeight=== e.target.clientHeight+e.target.scrollTop;
    },
    // 关注食材
    attention() {
      this.$http
        .request({
          method: "post",
          url: "/ajax/web/nutri/carefoods",
        })
        .then((res) => {
          console.log(res, "====1111");
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
            this.carlist = carlist;
          }
        });
    },
    // 黑白食品选择疾病
    select(index) {
      if (oindex != null) {
        this.title_list[oindex].active = false;
      }
      this.title_list[index].active = true;
      this.food.disease = this.title_list[index].disease;
      this.food.name1 = this.title_list[index].name;
      oindex = index;
    },
    // 黑白食品选择食品
    foodtype(item) {
      this.food.diseaseType = item.diseaseType;
      this.food.class1 = 1;
      if (this.food.disease!='') {
        this.$router.push({
          name: "ingredientstlist",
          query: this.food,
        });
      }
    },
  },
  components: {
    ingredientstoolscard,
  },
  created() {
    this.attention();
  },
};
</script>
<style lang='scss' scoped>
@import "src/style/mixin";
.ingredientstools {
  // background-color: #fff;
  // 食材搜索标题
  // display: block;
  height: 100vh;
  overflow: auto;
  .ingredientstools-head {
    height: rpx(108);
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 3px #f5f7fa;
    .ingredientstools-head-input {
      width: rpx(684);
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
            border-bottom: 1px solid #ccc;
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
  }
  // 食材分类
  .ingredientstools-style {
    height: rpx(298);
    margin-bottom: rpx(16);
    .van-swipe {
      height: 100%;
      .van-swipe-item {
        height: 100%;
        .vant-div {
          height: 100%;
          padding: 0 rpx(32);
          .vant-div-head {
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            & > div {
              flex: 1;
              img {
                width: rpx(48);
                height: rpx(48);
              }
              p {
                color: #333333;
                font-size: rpx(28);
              }
            }
          }
        }
      }
    }
  }
  // 分割线
  .ingredientstools-line {
    height: rpx(16);
    background-color: #f5f5f9;
  }
  // 食物黑名单
  .ingredientstools-list {
    height: rpx(348);
    padding: 0 rpx(30);
    .ingredientstools-list-head {
      height: rpx(104);
      line-height: rpx(104);
      color: #000000;
      font-weight: 560;
      font-size: rpx(32);
    }
    .ingredientstools-list-oul {
      height: rpx(64);
      display: flex;
      // justify-content: space-between;
      overflow: auto;
      & > li {
        color: #666666;
        font-size: rpx(28);
        margin-right: rpx(32);
        white-space: nowrap;
        transition: all 0.5s linear;
        &.active {
          color: #1b66ff;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 20%;
            width: rpx(50);
            height: rpx(4);
            margin-left: rpx(-25);
            background: #1b66ff;
          }
        }
      }
    }
    .ingredientstools-list-img {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > li {
        width: rpx(216);
        height: rpx(156);
        border-radius: rpx(16);
        border: 1px solid #ccc;
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        .ingredientstools-list-img-mask {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          // opacity: 0;
          background-color: rgba($color: #000, $alpha: 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          & > img {
            width: rpx(48);
            height: rpx(48);
          }
          & > p {
            color: #fcfcfc;
            font-size: rpx(24);
            position: relative;
            &::after {
              content: ">";
              position: absolute;
              left: 120%;
              top: 0;
              color: #fcfcfc;
            }
          }
        }

        // &:hover .active {
        //   opacity: 1;
        // }
      }
    }
  }
  // 大家都在关注
  .ingredientstools-attention {
    // height: rpx(348);
    padding: 0 rpx(30);
    background-color: #fff;
    .ingredientstools-attention-head {
      height: rpx(104);
      line-height: rpx(104);
      color: #000000;
      font-weight: 560;
      font-size: rpx(32);
    }
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

