<template>
  <div>
    <div @click="xx">我是odiv{{aa}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
   model: {
    prop: "aa",
    event: "change"
  },
  props: {
    aa: {
      type: String,
      value: "我是子组件的值"
    }
  },
 
  components: {},
  methods: {
    xx() {
      let a=this.aa +1;
      this.$emit("change", a);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "src/style/mixin";
</style>

