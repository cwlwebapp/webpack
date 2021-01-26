<template>
  <div>
    <div class="content">
      <div v-html="content.content"></div>
    </div>
    <!-- <div class="diet" v-for="(itme, index) in [1, 2, 3]" :key="index">
      <div class="diet-title">
        <span
          :style="{
            backgroundImage: 'url(' + diet_title + ')',
          }"
          class=""
          >合谷
        </span>
      </div>
      <img class="diet-img" :src="diet_title" alt="" />
      <div class="diet-detaile">
        <div class="diet-detaile-title">人参红枣茶</div>
        <div class="diet-detaile-subtitle-title">材料</div>
        <div class="diet-detaile-subtitle-des">人参5克，红枣5枚。</div>
        <div class="diet-detaile-subtitle-title">做法</div>
        <div class="diet-detaile-subtitle-des">
          先将黑豆放入锅中，加水适量，煮沸40分钟至熟透，加肉片，煮熟，油料调味，可连服舒天。
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// let diet_title = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/traditional/diet_title.png";
export default {
  data() {
    return {
      // diet_title,
    };
  },
  props:['content'],
  components: {},
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.content {
  padding: 0 rem(36);

  & > div {
    width: 100%;
  }

  & >>> audio {
    background-color: #f00;
  }
}
// .diet {
//   padding: 0 rpx(30);
//   .diet-title {
//     height: rpx(146);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     & > span {
//       width: rpx(224);
//       height: rpx(76);
//       text-align: center;
//       line-height: rpx(76);
//       background-position: center;
//       background-size: 100% 100%;
//       background-repeat: no-repeat;
//       color: #FEFEFE;
//       font-size: rpx(32);
//     }
//   }
//   .diet-img {
//     height: rpx(340);
//     border: 1px solid #707070;
//   }
//   .diet-detaile {
//     padding: 0 rpx(24) rpx(18);
//     border: 1px solid #A88462;
//     border-top: none;
//     .diet-detaile-title {
//       color: #7C4B00;
//       font-size: rpx(30);
//       font-weight: bold;
//       height: rpx(106);
//       display: flex;
//       align-items: center;
//       position: relative;
//       &::after {
//         content: "";
//         width: rpx(42);
//         height: rpx(8);
//         background: #CF5259;
//         position: absolute;
//         left: 0;
//         bottom: rpx(10);
//       }
//     }
//     .diet-detaile-subtitle-title {
//       color: #7C4B00;
//       font-size: rpx(28);
//       padding: rpx(24) 0;
//     }
//     .diet-detaile-subtitle-des {
//       color: #666666;
//     }
//   }
// }
</style>
