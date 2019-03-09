<template>
  <div class="album-detail">
    <public-header></public-header>
    <div class="album-cover">
      <img :src="album.coverImgUrl" class="cover">
      <div class="album-description">
        <h1 class="title">{{album.name}}</h1>
      </div>
    </div>
    <div class="button-group">
      <button class="btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconbofang"></use>
        </svg>播放
      </button>
      <button class="btn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconxihuan"></use>
        </svg>喜欢
      </button>
    </div>
    <div class="song-list">
      <div class="song" v-for="(song, index) in songs" :key="index" :data-id="song.id" @click="playSong(song)">
        <span class="index">{{ index + 1 }}</span>
        <span class="name">《{{ song.name }}》 - {{ song.ar[0].name }}</span>
      </div>
    </div>
    <div class="tips">这是底部o(*￣▽￣*)ブ</div>
  </div>
</template>

<script>
import PublicHeader from "@/components/Header.vue";
import { mapActions } from "vuex";
export default {
  components: { PublicHeader },
  data() {
    return {
      scroll: null,

      album: {
        name: '',
        coverImgUrl: '',
      },
      songs: [],
      uid: 0
    };
  },
  created() {
    this.uid = this.$route.params.uid;
    this.fetchData();
  },
  mounted() {},
  methods: {
    async fetchData() {
      try {
        let data = await this.$http.GetSongListDetail({ id: this.uid });
        console.log(data);
        this.album = data.playlist;
        this.songs = this.album.tracks;
        console.log(this.songs);
      } catch (e) {
        console.log(e);
      }
    },
    ...mapActions(["setCurrentSong"]),
    playSong(song) {
      const { id, name, ar, al } = song;
      const artist = ar[0].name;
      const cover = al.picUrl;
      this.setCurrentSong({ id, name, cover, artist });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.album-detail {
  height: px2rem(1334);
  overflow: auto;
}

.album-cover {
  position: relative;
  width: 100%;
  height: px2rem(750);

  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .album-description {
    position: relative;
    padding: 0 px2rem(20);
    top: px2rem(500);
    bottom: 0;
    z-index: 2;
    color: $lightColor;

    .title {
      font-size: px2rem(62);
    }

    .introdction {
      font-size: px2rem(42);
    }
  }
}

.button-group {
  display: flex;
  padding: px2rem(20);
  justify-content: space-around;
  align-items: center;
}

.btn {
  padding: px2rem(20) px2rem(100);
  font-size: px2rem(32);
  border-radius: px2rem(10);
  border: none;
  outline: none;
  background: $buttonColor;
  color: $titleColor;
}

.song-list {
  border-top: 1px solid $buttonColor;

  .song {
    padding: px2rem(16) 0;
    font-size: px2rem(32);
    color: $titleColor;

    border-bottom-width: px2rem(1);
    border-bottom-style: solid;
    border-color: $buttonColor;

    .index {
      margin: 0 px2rem(32);
    }
  }
}

.tips {
  font-size: px2rem(24);
  color: $titleColor;
  padding: px2rem(32);
  text-align: center;
}
</style>
