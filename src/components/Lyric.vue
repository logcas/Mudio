<template>
  <div class="lyric">
    <div class="content" :style="offset">
      <p
        class="word"
        v-for="(item,idx) in lyric"
        :key="idx"
        :class="{hightlight: currentIndex === idx }"
      >{{ item }}</p>
    </div>
  </div>
</template>

<script>
const LYRIC_HEIGHT = 0.5; // rem
export default {
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    lyric: Array
  },
  computed: {
    offset() {
      let offsetY = -this.currentIndex * LYRIC_HEIGHT + 5 + "rem";
      return {
        transform: `translate(-50%,${offsetY})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.lyric {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: px2rem(640);
  height: px2rem(640);
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  font-size: px2rem(32);

  .content {
    position: absolute;
    width: 100%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s linear;
  }

  .word {
    color: $unlikeColor;
    line-height: px2rem(50);

    &.hightlight {
      color: $lightColor;
      font-size: px2rem(40);
      font-weight: bold;
    }
  }
}
</style>
