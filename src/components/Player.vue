<template>
  <div class="player">
    <div class="background">
      <img :src="currentSong.cover || '@/assets/cover.jpg'" class="cover">
    </div>
    <div class="mask"></div>
    <div class="nav">
      <svg class="icon" aria-hidden="true" @click="hidePlayer">
        <use xlink:href="#iconxiangxia"></use>
      </svg>
    </div>
    <div class="album">
      <img :src="currentSong.cover || '@/assets/cover.jpg'" class="album-cover">
      <progress-bar id="progress" :current="playedLength" :totalLength="totalLength"></progress-bar>
    </div>
    <div class="album-info">
      <div>{{playedLength | timeTransform}}</div>
      <div>
        <span>{{ currentSong.name }}</span>
        <p v-show="!currentSong.url">该音乐没有版权，无法播放</p>
      </div>
      <div>{{totalLength | timeTransform}}</div>
    </div>
    <div class="player-control">
      <svg class="icon last" aria-hidden="true">
        <use xlink:href="#iconkuaitui"></use>
      </svg>
      <svg class="icon pause" aria-hidden="true" @click="play">
        <use :xlink:href="playIcon"></use>
      </svg>
      <svg class="icon next" aria-hidden="true">
        <use xlink:href="#iconkuaijin"></use>
      </svg>
    </div>
    <audio v-show="false" ref="player" :src="currentSong.url" autoplay></audio>
  </div>
</template>

<script>
import ProgressBar from "@/components/Progress.vue";
import { mapGetters } from "vuex";
export default {
  name: "player",
  components: { ProgressBar },
  computed: {
    playIcon() {
      return this.isPlaying ? "#iconpausezanting" : "#iconbofang";
    },
    ...mapGetters(["currentSong", "isPlaying"])
  },
  data() {
    return {
      playedLength: 0,
      totalLength: 0
    };
  },
  filters: {
    timeTransform: function(value) {
      let val = parseFloat(value);
      val = Math.floor(val);
      let h = Math.floor(val / 3600);
      val = val % 3600;
      let m = Math.floor(val / 60);
      val = val % 60;
      let s = val;
      let time = "";
      time += s > 10 ? s : "0" + s;
      time = (m > 10 ? m : "0" + m) + ":" + time;
      h && (time = (h > 10 ? h : "0" + h) + ":" + time);
      return time;
    }
  },
  methods: {
    play() {
      this.$store.commit("setPlaying", !this.isPlaying);
      if (this.isPlaying) {
        this.$refs.player.play();
      } else {
        this.$refs.player.pause();
      }
    },
    hidePlayer() {
      this.$store.commit("showPlayer", false);
    },
    showPlayerStatus() {
      let {
        currentSrc,
        error,
        buffered,
        src,
        currentTime,
        paused
      } = this.$refs.player;
      console.log("----------------------------------------");
      console.log("currentSrc:", currentSrc);
      console.log("error: ", error);
      console.log("buffered: ", buffered);
      console.log("src: ", src);
      console.log("currentTime: ", currentTime);
      console.log("isPaused: ", paused);
    }
  },
  mounted() {
    this.$refs.player.addEventListener("timeupdate", e => {
      this.playedLength = e.target.currentTime;
    });
    this.$refs.player.addEventListener("durationchange", e => {
      this.totalLength = e.target.duration;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.player {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: top 0.5s ease-in-out;

  .album {
    position: relative;
    margin-top: px2rem(96);
    text-align: center;
    z-index: 99;

    .album-cover {
      width: px2rem(640);
      height: px2rem(640);
      box-shadow: 0 0 px2rem(80) #000;
    }

    #progress {
      position: absolute;
      bottom: px2rem(10);
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .album-info,
  .player-control {
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: px2rem(640);
    z-index: 99;
    font-size: px2rem(32);
    color: #fff;
  }

  .player-control {
    margin-top: px2rem(50);
    .last,
    .next {
      font-size: px2rem(66);
    }
    .pause {
      font-size: px2rem(98);
    }
  }

  .nav {
    position: relative;
    padding-left: px2rem(48);
    height: px2rem(144);
    line-height: px2rem(144);
    font-size: px2rem(48);
    color: #fff;
    z-index: 999;
  }

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    .cover {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
