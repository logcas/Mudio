<template>
  <div class="progress-bar">
    <div class="total" ref="totalTrack" @touchstart="handlTrackTouch">
      <div class="progress-track" :style="{ width: currentProgress }">
        <div class="dot" ref="scrollBall" @touchstart="handleTouchStart"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props: {
    current: Number,
    total: Number,
  },
  computed: {
    currentProgress() {
      return (this.current / this.total) * 100 + "%";
    }
  },
  data() {
    return {
      trackLeft: 0,
      totalLength: 0,

      isMoving: false,
      touchX: 0,
    };
  },
  mounted() {
    const { left, width } = this.$refs.totalTrack.getBoundingClientRect();
    this.totalLength = width;
    this.trackLeft = left;
  },
  methods: {
    handlTrackTouch(e) {
      this.calculateProgress(e);
    },
    handleTouchStart(e) {
      this.isMoving = true;
      document.addEventListener("touchmove", this.handleTouchMove);
      document.addEventListener("touchend", this.handleTouchEnd);
    },
    handleTouchMove(e) {
      if (!this.isMoving) return;
      this.calculateProgress(e);
    },
    handleTouchEnd(e) {
      this.isMoving = false;
      document.removeEventListener("touchmove", this.handleTouchMove);
      document.removeEventListener("touchend", this.handleTouchEnd);
    },
    calculateProgress(e) {
      this.touchX = e.changedTouches[0].clientX;
      let newCurrentLength;
      newCurrentLength =
        this.touchX - this.trackLeft > 0 ? this.touchX - this.trackLeft : 0;
      newCurrentLength =
        newCurrentLength < this.totalLength ? newCurrentLength : this.totalLength;
      let newCurrentTime = newCurrentLength / this.totalLength * this.total;
      this.$emit('change-current', newCurrentTime);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

$totalColor: #fff;

.total {
  position: relative;
  width: px2rem(640);
  height: px2rem(14);
  background: $totalColor;

  .progress-track {
    position: absolute;
    height: px2rem(14);
    background: $mainColor;

    .dot {
      position: absolute;
      width: px2rem(36);
      height: px2rem(36);
      border-radius: px2rem(18);
      top: px2rem(-9);
      right: px2rem(-9);
      background: $mainColor;
      box-shadow: 0 0 px2rem(10) #fff;
    }
  }
}
</style>
