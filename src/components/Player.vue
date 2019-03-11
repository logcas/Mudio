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
      <lyric :currentIndex="lyricIndex" :lyric="lyric"></lyric>
      <progress-bar
        id="progress"
        :current="playedLength"
        :total="totalLength"
        @change-current="setCurrentTime"
      ></progress-bar>
    </div>
    <div class="album-info">
      <div>{{playedLength | timeTransform}}</div>
      <div>
        <span>{{ currentSong.name }}</span>
        <p v-show="hasNoSong">Mudio</p>
        <p v-show="isNotAllowed && !hasNoSong">该音乐没有版权，无法播放</p>
      </div>
      <div>{{totalLength | timeTransform}}</div>
    </div>
    <div class="player-control">
      <svg class="icon last" aria-hidden="true" @click="playLast">
        <use xlink:href="#iconkuaitui"></use>
      </svg>
      <svg class="icon pause" aria-hidden="true" @click="play">
        <use :xlink:href="playIcon"></use>
      </svg>
      <svg class="icon next" aria-hidden="true" @click="playNext">
        <use xlink:href="#iconkuaijin"></use>
      </svg>
    </div>
    <audio
      v-show="false"
      ref="player"
      :src="currentSong.url"
      autoplay
      @timeupdate="handleTimeUpdate"
      @durationchange="handleDurationChange"
      @ended="handleEnd"
    ></audio>
  </div>
</template>

<script>
import ProgressBar from "@/components/Progress.vue";
import Lyric from '@/components/Lyric.vue';
import { mapGetters, mapActions } from "vuex";
import lyricParser from '@/utils/lyricParser';
export default {
  name: "player",
  components: { ProgressBar, Lyric },
  watch: {
    'currentSong.lyric': function(lyric) {
      this.lyricParser.load(lyric);
      this.lyric = this.lyricParser.getAllLyric();
    },
  },
  computed: {
    ...mapGetters(["currentSong", "isPlaying", "playList"]),
    isNotAllowed() {
      return !this.currentSong.url;
    },
    hasNoSong() {
      return this.playList.length === 0;
    },
    playIcon() {
      return this.isPlaying ? "#iconpausezanting" : "#iconbofang";
    }
  },
  data() {
    return {
      playedLength: 0,
      totalLength: 0,

      lyricParser: new lyricParser(),
      lyricIndex: 0,
      lyric: [],
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
    ...mapActions(["playNext", "playLast"]),
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
    setCurrentTime(e) {
      this.$refs.player.currentTime = e;
    },
    handleTimeUpdate(e) {
      this.playedLength = e.target.currentTime;
      let idx = this.lyricParser.getCurrentIndex(e.target.currentTime);
      let word = this.lyricParser.getCurrentWord(idx);
      this.lyricIndex = idx;
    },
    handleDurationChange(e) {
      this.totalLength = e.target.duration;
      this.playedLength = 0;
      this.lyricIndex = 0;
    },
    handleEnd() {
      this.playNext();
    },
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
