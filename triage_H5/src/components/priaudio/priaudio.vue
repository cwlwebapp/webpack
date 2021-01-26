<template>
  <div>
    <div class="pride-audio">
      <!-- <div class="pride-audio-title">{{title}}</div> -->
      <div class="pride-audio-subhead-title">来自好尔美健康管理语音版</div>
      <div class="pride-audio-content">
        <div class="pride-audio-progress">
          <div class="pride-audio-progress-percent" :style="{width:precent}"></div>
          <div class="pride-audio-progress-time">
            <span>{{currentTime|duration}}</span>
            <span>{{duration|duration}}</span>
          </div>
        </div>
        <img class="pride-audio-icon" @click="clicks(i)" :src="isaudio" alt />
      </div>
      <audio  ref="xx" :src="audio[i].src"></audio>
    </div>
  </div>
</template>

<script>
var audioicon = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/message/audioicon.png";
var audioplay = "https://ysch-user.oss-cn-shenzhen.aliyuncs.com/h5/message/audio.gif";
export default {
  data() {
    return {
      showaudio: false,
      duration: 0,
      currentTime: 0,
      precent: 0,
      audiolock: false
    };
  },
  methods: {
    clicks: function(i) {
      if (this.audiolock) {
        // 播放
        this.$refs.xx.pause();
        this.audiolock = false;
        this.showaudio = false;
        return;
      }

      let dom = document.querySelectorAll("audio");
      for (let i = 0; i < dom.length; i++) {
        dom[i].pause();
      }
      let lock = null;
      // 播放
      this.$refs.xx.play();
      this.audiolock = true;
      //监听播放了
      this.$refs.xx.addEventListener("play", e => {
        this.showaudio = true;
      });
      //时间函数
      this.$refs.xx.addEventListener("timeupdate", e => {
        if (lock) {
          return;
        }
        lock = setTimeout(() => {
          this.currentTime = this.$refs.xx.currentTime;
          this.precent = `${(this.currentTime / this.duration).toFixed(3) *
            100}%`;
          lock = null;
        }, 1000);
      });
      //监听播放了
      this.$refs.xx.addEventListener("pause", e => {
        this.currentTime = 0;
        this.audiolock = false;
        this.showaudio = false;
      });
    }
  },
  filters: {
    duration(val) {
      if (val) {
        let duration = Math.round(val);
        let minute = Math.floor(duration / 60);
        let second = duration % 60;
        return [minute, second].map(fn).join(":");
        function fn(n) {
          n = n.toString();
          return n[1] ? n : "0" + n;
        }
      } else {
        return "00:00";
      }
    }
  },
  computed: {
    isaudio() {
      return this.showaudio ? audioplay : audioicon;
    }
    // title() {
    //   return this.audio[this.i].parentNode.previousElementSibling.innerHTML;
    // }
  },
  mounted() {
    console.log(this.audio, "this.audio");
    this.$refs.xx.addEventListener("canplay", () => {
      this.duration = this.$refs.xx.duration;
      this.currentTime = this.$refs.xx.currentTime;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.pride-audio {
  width: rem(672);
  height: rem(200);
  background-color: #f9f9f9;
  border-radius: rem(16);
  padding: 0 rem(30);
  box-sizing: border-box;

  .pride-audio-title {
    height: rem(78);
    line-height: rem(78);
    font-size: rem(32);
    color: #323232;
    white-space: nowrap;
    /* text-emphasis: none; */
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }

  .pride-audio-subhead-title {
    text-align: left;
    color: #979797;
    font-size: rem(22);
    padding-top: rem(20);
  }

  .pride-audio-content {
    height: rem(70);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pride-audio-progress {
      width: rem(504);
      height: rem(6);
      background-color: #999;
      position: relative;
      .pride-audio-progress-percent {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0;
        background-color: #03020c;
      }

      .pride-audio-progress-percent::before {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: rem(-5);
        width: rem(10);
        height: rem(10);
        border-radius: 50%;
        background-color: #03020c;
      }

      .pride-audio-progress-time {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: rem(60);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .pride-audio-icon {
      width: rem(72);
      height: rem(72);
    }
  }
}
</style>


       