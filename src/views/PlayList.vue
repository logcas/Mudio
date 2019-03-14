<template>
  <div class="playlist">
    <h1 class="title">播放列表</h1>
    <ul class="list">
      <song-item
        v-for="(song,index) in playList"
        :key="song.id"
        :index="index + 1"
        :song="song"
        :current="current"
         @set-song="setSong"
         @remove-song="removeSong"
      />
    </ul>
    <svg class="icon close-button" aria-hidden="true" @click="$emit('hide-playlist')">
      <use xlink:href="#iconxiangxia"></use>
    </svg>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "play-list",
  components: { SongItem },
  computed: {
    ...mapGetters(["playList", "currentIndex"]),
    current() {
      return this.currentIndex + 1;
    }
  },
  methods: {
    ...mapMutations(["removePlayList"]),
    ...mapActions(["setCurrentSong"]),
    setSong(song) {
      this.setCurrentSong(song);
    },
    removeSong(songId) {
      this.removePlayList(songId);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";
.playlist {
  background: $backgroundColor;

  .title {
    padding: px2rem(48) px2rem(20);
    font-size: px2rem(56);
  }

  .list {
    height: px2rem(1000);
    overflow: auto;
  }

  .close-button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    font-size: px2rem(60);
  }
}
</style>
