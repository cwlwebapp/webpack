<template>
  <div class="healthtable">
    <div class="healthtable-head">
      <div class="healthtable-head-left"></div>
      <div class="healthtable-head-right">
        <div>建议摄入</div>
        <div>实际摄入</div>
        <div>差值</div>
      </div>
    </div>
    <div class="healthtable-head" v-for="(item,index) of tableList" :key="index">
      <div class="healthtable-head-left">{{item.name}}</div>
      <div :class="['healthtable-head-right', 'border',item.style]">
        <div v-for="(oitem,oindex) of item.value" :key="oindex">{{oitem}}</div>
      </div>
    </div>
    <!-- <div class="healthtable-head">
      <div class="healthtable-head-left">中餐</div>
      <div class="healthtable-head-right border">
        <div>612</div>
        <div>213</div>
        <div>399</div>
      </div>
    </div>
    <div class="healthtable-head">
      <div class="healthtable-head-left">晚餐</div>
      <div class="healthtable-head-right border bg">
        <div>612</div>
        <div>213</div>
        <div>399</div>
      </div>
    </div>
    <div class="healthtable-head">
      <div class="healthtable-head-left">加餐</div>
      <div class="healthtable-head-right border border-bottom">
        <div>612</div>
        <div>213</div>
        <div>399</div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [
        {
          name: "早餐",
          style: "bg",
          value: [612, 213, 399],
        },
        {
          name: "中餐",
          style: "",
          value: [612, 213, 399],
        },
        {
          name: "晚餐",
          style: "bg",
          value: [612, 213, 399],
        },
        {
          name: "加餐",
          style: "border-bottom",
          value: [612, 213, 399],
        },
      ],
    };
  },
  props: ["details"],
  components: {},
  created() {
    // console.log(this.details, "============details");
    let data = this.details;
    let seriesDate = [
      [],
      [],
      [],
      [],
    ];
    let serieslits = ["breakfast", "lunch", "supper", "addition"];
    serieslits.forEach((item, index) => {
      seriesDate[index].push(data[item].targetCalorie,  data[item].calorie,(data[item].targetCalorie - data[item].calorie));
    });

    this.tableList = this.tableList.map((item, index) => {
      Object.assign(item, {
        value: seriesDate[index],
      });
      return item
    });
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.healthtable {
  padding: 0 rpx(16) rpx(32) rpx(48);
  .healthtable-head {
    height: rpx(64);
    display: flex;
    align-items: center;
    color: #666666;
    .healthtable-head-left {
      width: rpx(130);
      color: #4893ff;
    }
    .healthtable-head-right {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      &.border {
        border-left: 1px solid #f4f4f4;
        border-right: 1px solid #f4f4f4;
      }
      &.border-bottom {
        border-bottom: 1px solid #f4f4f4;
      }
      &.bg {
        background-color: #f4f4f4;
      }

      & > div {
        flex: 1;
      }
    }
  }
}
</style>
