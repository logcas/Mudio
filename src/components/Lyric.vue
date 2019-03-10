<template>
  <div class="lyric" v-swipe="handleSwipe">
    <transition name="zoom">
      <div class="content" :style="offset" v-show="isShowLyric">
        <p
          class="word"
          v-for="(item,idx) in lyric"
          :key="idx"
          :class="{hightlight: currentIndex === idx }"
        >{{ item }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import swipe from "@/directives/swipe";

const LYRIC_HEIGHT = 0.5; // rem
export default {
  directives: { swipe },
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
  },
  data() {
    return {
      isShowLyric: true,
    };
  },
  methods: {
    handleSwipe() {
      this.isShowLyric = !this.isShowLyric;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";
@import "@/assets/style/transition.scss";

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
    opacity: 0.5;

    &.hightlight {
      color: $lightColor;
      font-size: px2rem(40);
      font-weight: bold;
      opacity: 1;
    }
  }
}
</style>
