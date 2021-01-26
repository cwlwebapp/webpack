<template>
    <div>
        <van-button @click="clickStart">Start Vant</van-button>
    </div>
</template>
<script>
    import {Button} from 'vant';
    export default {
      name: 'template',
      mixins: [
      ],
      components: {
          [Button.name]: Button,
      },
      props: {
      },
      data() {
        return {
        }
      },
      computed: {
      },
      watch: {
      },
      created() {
      },
      mounted() {
      },
      destroyed() {
      },
      methods: {
          clickStart () {
              this.$toast('Now, enjoy Vant');
              this.$http.get('/url', {})
              .then((data) => {
                console.log(data);
              });
          }
      }
    }
</script>
<style scoped>
</style>
