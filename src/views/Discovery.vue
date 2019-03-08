<template>
  <div class="discovery">
    <h1 class="title">
      Mudio
      <img
        src="@/assets/album.png"
        class="playingAlbum"
        @click="showPlayer"
        :class="{ rotate: isPlaying }"
      >
    </h1>
    <album-list name="新碟上架" :data="newestAlbum" toRoute="album"></album-list>
    <album-list name="推荐歌单" :data="recommandSongs" toRoute="album"></album-list>
    <album-list name="热门歌手" :data="hottestSingers" toRoute="artist"></album-list>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import AlbumList from "@/components/AlbumList.vue";
import { mapGetters } from "vuex";
export default {
  components: { AlbumList },
  data() {
    return {
      scroll: null,

      // 主页数据
      newestAlbum: [],
      recommandSongs: [],
      hottestSingers: [],
    };
  },
  computed: {
    ...mapGetters(["isPlaying", 'currentSong'])
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$parent.$el.children[0]);
    });
  },
  methods: {
    showPlayer() {
      this.$store.commit("showPlayer", true);
    },
    // 进入时初始化数据
    async fetchData() {
      try {
        let newestAlbum = await this.$http.GetNewestAlbum();
        this.newestAlbum = newestAlbum.albums;

        let recommandSongs = await this.$http.GetRecommandedSongs();
        this.recommandSongs = recommandSongs.result;

        let hottestSingers = await this.$http.GetHottestSingers();
        this.hottestSingers = hottestSingers.artists;

      } catch (e) {
        console.log(`error occured: ${e}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.discovery {
  & > .title {
    padding: px2rem(48) px2rem(20);
    font-size: px2rem(56);

    .playingAlbum {
      float: right;
      margin-top: px2rem(7);
      width: px2rem(74);
      height: px2rem(74);
      border-radius: px2rem(37);

      &.rotate {
        animation: rotate 3s linear infinite;
      }
    }
  }

  .list-box {
    .list-header {
      display: flex;
      padding: 0 px2rem(20);
      justify-content: space-between;
      align-items: center;
      font-size: px2rem(36);
      color: $titleColor;

      .title {
        font-weight: bold;
      }
    }

    .list-body {
      padding: px2rem(10);
      white-space: nowrap;
      overflow: auto;
    }
  }
}
</style>
