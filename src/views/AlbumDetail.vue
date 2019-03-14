<template>
  <div class="album-detail">
    <public-header></public-header>
    <div class="album-cover">
      <img :src="album.picUrl" class="cover">
      <div class="album-description">
        <h1 class="title">{{album.name}}</h1>
        <p class="introdction">{{album.artist.name}}</p>
      </div>
    </div>
    <div class="button-group">
      <button class="btn" @click="addAllToPlayList">
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
      <div
        class="song"
        v-for="(song, index) in songs"
        :key="index"
        :data-id="song.id"
        @click="playSong(song)"
      >
        <span class="index">{{ index + 1 }}</span>
        <span class="name">{{ song.name }}</span>
      </div>
    </div>
    <div class="tips">这是底部o(*￣▽￣*)ブ</div>
  </div>
</template>

<script>
import PublicHeader from "@/components/Header.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  components: { PublicHeader },
  computed: {
    ...mapGetters(["playList", "isPlaying", "albumId"])
  },
  data() {
    return {
      scroll: null,

      album: {
        name: "",
        artist: { name: "" },
        picUrl: ""
      },
      songs: null,
      uid: 0
    };
  },
  created() {
    this.uid = this.$route.params.uid;
    this.setAlbumId(this.uid);
    this.fetchData();
  },
  activated() {
    let uid = this.$route.params.uid;
    if(uid === this.albumId) return;
    this.uid = uid;
    this.setAlbumId(this.uid);
    this.fetchData();
  },
  mounted() {},
  methods: {
    ...mapActions(["setCurrentSong"]),
    ...mapMutations(["addPlayList", "setAlbumId"]),
    async fetchData() {
      try {
        let data = await this.$http.GetAlbumDetail({ id: this.uid });
        this.album = data.album;
        this.songs = data.songs;
      } catch (e) {
        console.log(e);
      }
    },
    playSong(song) {
      const { id, name } = song;
      const artist = this.album.artist.name;
      const cover = this.album.picUrl;
      this.setCurrentSong({ id, name, cover, artist });
    },
    addAllToPlayList() {
      console.log('click');
      this.songs.forEach((song, idx) => {
        const { id, name } = song;
        const artist = this.album.artist.name;
        const cover = this.album.picUrl;
        this.addPlayList({ song: { id, name, cover, artist }});
        if (idx === 0) {
          this.setCurrentSong({ id, name, cover, artist });
        }
      });
    }
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
