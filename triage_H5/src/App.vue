
<template>
  <div>
    <keep-alive :include="routerlist">
      <router-view></router-view>
    </keep-alive>
    <loading v-model="$store.state.dataLoading"></loading>
    <div
      class="skeleton"
      v-show="!$route.meta.keepAlive && $store.state.skeleton"
    >
      <van-skeleton title :row="20" :loading="$store.state.skeleton">
        <!-- <div>实际内容</div> -->
      </van-skeleton>
    </div>
  </div>
</template>
<script>
import loading from "@/components/common/loading";

export default {
  data() {
    return {
      routerlist: [],
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.name == "ingredientstlist" && from.name == "ingredientstools"&&this.routerlist.indexOf(to.name)==-1) {
        this.routerlist.push(to.name);
      } else if (to.name == "ingredientstools" &&from.name == "ingredientstlist") {
        this.routerlist.remove(from.name);
      }
      console.log(this.routerlist, "===8888");
      //通过to/from.path判断是否是需要缓存的路径然后添加逻辑
    },
  },
  components: {
    loading,
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>
<style lang="scss">
// @import 'styles/common.css';
@import "style/base";
@import "style/mixin";

.ivu-timeline {
  // box-sizing: border-box;
  // padding-left: rem(10);
  .van-pull-refresh {
    padding-left: rem(10);
    padding-top: rem(6);
    .ivu-timeline-item-tail {
      border: rem(1) solid #0099fe;
    }
  }
  .ivu-timeline-item-head {
    background-color: #f7f7f7;
  }
}
.skeleton {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

.manual-wrap {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
  -webkit-transition: opacity ease 0.5s;
  transition: opacity ease 0.5s;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
}

.manual-wrap.active {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
.page-count {
  display: none;
}
</style>
