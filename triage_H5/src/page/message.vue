<template>
  <div ref="imageWrapper">
    <div class="head">{{detail.title}}</div>
    <shareIcon @goapp="goapp" />
    <div class="head-icon">
      <span>{{detail.source}}</span>
      {{detail.createtime|timeType}}
      <!-- v-if="isWxmp" -->
      <!-- class="iconfont icon-fenxiang1" -->
      <!-- <button  @click="$share" :style="comshare"></button> -->
    </div>
    <div class="content">
      <div v-html="detail.content"></div>
    </div>
    <div class="warn">
      如有相关版权问题，请与我们联系！
      <br />TEL:0755-27780149 E-mail：ysch88@ysch18.com
    </div>
    <div class="like" v-if="isshare">
      <div :class="[detail.liked?'like-active like-icon':'like-icon']" @click="likeme">
        <span class="iconfont icon-dianzan"></span>
        {{detail.likeCnt}}
      </div>
      <div :class="[detail.collected?'like-active like-icon':'like-icon']" @click="collectd">
        <span class="iconfont icon-shoucangchenggong"></span>
        {{detail.collectCnt}}
      </div>
    </div>
  </div>
</template>
<script>
import Util from "../libs/util";
import priaudio from "@/components/priaudio/priaudio.js";

import Vue from "vue";
export default {
  data() {
    return {
      // isWxmp: this.$util.isWxmp(),
      isshare: true,
      detail: {}
    };
  },
  filters: {
    timeType(value) {
      var date = new Date(value);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return (
        [year, month, day].map(fn).join("-") +
        " " +
        [hour, minute, second].map(fn).join(":")
      );

      function fn(n) {
        n = n.toString();
        return n[1] ? n : "0" + n;
      }
    }
  },
  components: {},
  methods: {
    //详情
    pageData() {
      this.$http
        .request({
          url: "/ajax/user/wx/information/detail",
          method: "get",
          params: {
            contentId: this.contentId
          }
        })
        .then(res => {
          console.log(res);
          if (res && res.respBody) {
            let detail = res.respBody.content;
            res.respBody.content = detail;
            this.detail = res.respBody;

            Util.share({
              type: "message", // 类型
              title: this.detail.title, // 标题
              imageUrl: this.detail.coverPicUrl // 图片
            });
            this.dealhtml();
          }
        });
    },
    // 点赞
    likeme() {
      let url = null;
      if (this.detail.liked) {
        url = "/ajax/user/wx/information/unlikeContent";
      } else {
        url = "/ajax/user/wx/information/likeContent";
      }
      this.$http
        .request({
          url: url,
          method: "get",
          params: {
            contentId: this.contentId
          }
        })
        .then(res => {
          console.log(res, "res");

          if (res && res.success) {
            let num = this.detail.likeCnt;
            if (this.detail.liked) {
              this.detail.likeCnt -= 1;
              num--;
            } else {
              this.detail.likeCnt += 1;
              num++;
            }
            (this.detail.liked = !this.detail.liked),
              (this.detail.likeCnt = this.detail.likeCnt);
          }
        });
    },
    // 收藏
    collectd(e) {
      let url = null;
      if (this.detail.collected) {
        url = "/ajax/user/wx/information/cancelfavorite";
      } else {
        url = "/ajax/user/wx/information/favoriteCollect";
      }

      this.$http
        .request({
          url: url,
          method: "get",
          params: {
            contentId: this.contentId
          }
        })
        .then(res => {
          console.log(res, "res");

          if (res && res.success) {
            let num = this.detail.likeCnt;
            if (this.detail.collected) {
              this.detail.collectCnt -= 1;
            } else {
              this.detail.collectCnt += 1;
            }
            (this.detail.collected = !this.detail.collected),
              (this.detail.collectCnt = this.detail.collectCnt);
          }
        });
    },
    // html 样式处理
    dealhtml() {
      this.$nextTick(() => {
        let audio = document.querySelectorAll("audio");
        let audioarr = [];
        if (audio) {
          for (var i = 0; i < audio.length; i++) {
            // audio[i].parentNode.previousElementSibling.style.color =
            //   "transparent";
            priaudio.replace(audio, i);
          }
        }
      });
    },
    //app 分享
    goapp(){
      let dom=this.$refs.imageWrapper
      this.$htmlcanvas(dom)
    }
  
  },
  created() {
    this.contentId = this.$route.query.id || 408;
    this.pageData();
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
@import "src/style/mixin";

.head {
  padding: rem(46) rem(36) 0;
  font-size: rem(48);
  line-height: rem(74);
  letter-spacing: rem(4);
  font-weight: 600;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  // word-break: break-all;
  // /*允许在单词内换行*/
  // text-align: left;
  // color: #323232;
  // text-overflow: -o-ellipsis-lastline;
  // /*css3中webkit内核提供的一个方法类似ellipsis*/
  // overflow: hidden;
  // text-overflow: ellipsis;
  // display: -webkit-box;
  // /*自适应盒子*/
  // /*-webkit-line-clamp: 2;*/
  // /*此处为1行,如果是两行就改成2*/
  // -webkit-box-orient: vertical;
}

.head-icon {
  height: rem(106);
  padding: 0 rem(36);
  display: flex;
  align-items: center;
  font-size: rem(24);
  color: #9c9c9c;

  & > span {
    display: inline-flex;
    // width: rem(62);
    // height: rem(30);
    padding: rem(6) rem(10);
    background-color: #efefef;
    align-items: center;
    justify-content: center;
    border-radius: rem(26);
    margin-right: rem(28);
  }

  // & > button {
  //   width: rem(42);
  //   height: rem(42);
  //   position: absolute;
  //   right: rem(36);
  //   font-size: rem(40);
  //   color: #525252;
  //   background-color: transparent;
  //   border: 0;
  // }
}

.content {
  padding: 0 rem(36);

  & > div {
    width: 100%;
  }

  & >>> audio {
    background-color: #f00;
  }
}

.warn {
  margin-top: rem(70);
  padding-left: rem(36);
  color: #a9a9a9;
  font-size: rem(18);
}

.like {
  margin: rem(80) 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .like-icon {
    width: rem(240);
    height: rem(100);
    border-radius: rem(46);
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: rem(2);
    border: rem(2) solid #b7b7b7;
    color: #b7b7b7;

    & > span {
      margin-right: rem(8);
    }
  }

  .like-active {
    border-color: #4bc5ef;
    color: #4bc5ef;
  }
}
</style>
