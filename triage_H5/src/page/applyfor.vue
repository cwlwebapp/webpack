<template>
  <div class="applyfor">
    <div class="applyfor-title">申请人</div>
    <input class="applyfor-input" v-model="data.userName" type="text" />
    <div class="applyfor-title">联系电话</div>
    <input class="applyfor-input" v-model="data.phone" type="text" />
    <div class="applyfor-title">接听时间（单选）</div>
    <div
      :class="{ 'applyfor-bnt': true, active: activeindex == index }"
      @click="bnt(index)"
      v-for="(item, index) in arr"
      :key="index"
    >
      {{ item }}
    </div>
    <button class="applyfor-save" @click="save">确定申请</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: ["都可以", "上午8:00~12:00", "下午2:00~6:00"],
      activeindex: 0,
      data: {
        userName: "",
        phone: "",
        visitTime: 0,
        src: this.$util.isWxmp() ? 1 : 2,
        srcType: "",
        type: 1,
      },
    };
  },
  components: {},
  methods: {
    bnt(index) {
      this.activeindex = index;
      this.data.visitTime = index;
    },
    save() {
      this.$http
        .request({
          url: "/ajax/web/user/apply/save",
          method: "post",
          data: this.data,
        })
        .then((res) => {
          console.log(res, "====res");
          if (res && res.success) {
            this.$Dialog
              .alert({
                title: "您已提交申请服务成功，我们将在24小时内回访，请耐心等待",
                confirmButtonText: "我知道了",
              })
              .then((res) => {
                console.log(res);
                if (this.$util.isApp()) {
                  // this.$toast("app");
                  if (this.$route.query.istype == "week") {
                    this.$router.go(-1);
                  } else {
                    app.goApp("finish");
                  }
                } else if (this.$util.isWxmp()) {
                  if (this.$route.query.istype == "week") {
                    this.$router.go(-1);
                  }
                } else {
                  this.$toast("h5");
                }
                this.$router.go(-1);
              });
          }
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
                this.data.userName = res.respBody.realName;
              } else {
                let sexobj = {
                  1: "先生",
                  2: "女士",
                };
                this.data.userName =
                  res.respBody.realName[0] + sexobj[res.respBody.sex];
              }
            }
            this.data.phone = res.respBody.phone;
          }
        });
    },
  },
  created() {
    this.getUserInfo();
    Object.assign(this.data, {
      srcType: this.$route.query.srcType,
    });
  },
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
.applyfor {
  padding: 0 rpx(30);
  .applyfor-title {
    height: rpx(96);
    display: flex;
    align-items: center;
    font-size: rpx(32);
    font-family: Source Han Sans CN;
  }
  .applyfor-input {
    width: rpx(686);
    height: rpx(88);
    border: 1px solid #666666;
    text-align: center;
    font-size: rpx(32);
    font-family: Source Han Sans CN;
    color: #333;
  }
  .applyfor-bnt {
    width: rpx(686);
    height: rpx(88);
    text-align: center;
    line-height: rpx(88);
    background: #ffffff;
    border: 2px solid #dddddd;
    border-radius: rpx(16);
    font-size: rpx(32);
    font-family: Source Han Sans CN;
    color: #333;
    margin-bottom: rpx(24);
    &.active {
      border-color: #1b66ff;
    }
  }
  .applyfor-save {
    width: rpx(686);
    height: rpx(110);
    background: #1b66ff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: rpx(56);
    font-size: rpx(32);
    font-family: Source Han Sans CN;
    font-weight: 500;
    line-height: rpx(110);
    text-align: center;
    color: #ffffff;
    position: fixed;
    bottom: rpx(56);
    border-width: 0;
    border-color: #ffffff;
    &::before {
      border-color: #ffffff;
    }
  }
}
</style>
