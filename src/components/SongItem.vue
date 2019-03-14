<template>
  <li class="song-item" :class="{'is-playing': current === index}">
    <div class="left">{{index}}</div>
    <div class="center" @click="setSong">
      <p class="name">{{song.name}}</p>
      <p class="artist">{{song.artist}}</p>
    </div>
    <div class="right"><svg class="icon" aria-hidden="true" @click="removeSong">
  <use xlink:href="#iconempty"></use>
</svg></div>
  </li>  
</template>

<script>
export default {
  name: 'song-item',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    song: Object,
    current: Number,
  },
  methods: {
    setSong() {
      this.$emit('set-song', this.song);
    },
    removeSong() {
      this.$emit('remove-song', this.song.id);
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";
.song-item {
  display: flex;
  flex-flow: row nowrap;
  font-size: px2rem(32);
  margin: px2rem(20);
  background: rgb(233, 232, 232);
  border-radius: px2rem(20);

  &.is-playing {
    background: $mainColor;
  }

  &:active {
    background: $borderColor;
    color: $lightColor;
  }
}

.left, .right {
  width: px2rem(80);
  height: px2rem(80);
  line-height: px2rem(80);
  text-align: center;
}

.right {
  font-size: px2rem(50);
}

.center {
  flex-grow: 1;

  .name {
    font-size: px2rem(32);
    height: px2rem(50);
    line-height: px2rem(50);
  }
  
  .artist {
    font-size: px2rem(26);
    color: $titleColor;
    height: px2rem(30);
    line-height: px2rem(30);
  }
}

</style>
