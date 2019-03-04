<template>
  <div class="discovery">
    <h1 class="title">探索
      <img src="@/assets/cover.jpg" class="playingAlbum" @click="showPlayer" :class="{ rotate: isPlaying }">
    </h1>
    <album-list name="新碟上架"></album-list>
    <album-list name="推荐歌单"></album-list>
    <album-list name="热门歌手"></album-list>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import AlbumList from "@/components/AlbumList.vue";
import { mapGetters } from 'vuex';
export default {
  components: { AlbumList },
  data() {
    return {
      scroll: null
    };
  },
  computed: {
    ...mapGetters(['isPlaying']),
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$parent.$el.children[0]);
    });
  },
  methods: {
    showPlayer() {
      this.$store.commit("showPlayer", true);
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
