<template>
    <div class="hello-page">
      <h1 class="title">VueMusic</h1>
      <div class="description">
        <p>可能是全宇宙</p>
        <p>最简洁的音乐播放器</p>
      </div>
    </div>
</template>

<script>
export default {
  name: "hello-page",
  mounted() {
    const timer = setTimeout(() => {
      this.$router.push({ name: 'discovery' });
    }, 2000);
    this.$once("hook:beforeDestroy", () => {
      clearTimeout(timer);
    });
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/style/common.scss";


.hello-page {
  position: relative;
  width: 100%;
  height: 100%;
  background: $mainColor;

  .title {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    font-size: px2rem(98);
    color: $lightColor;
  }

  .description {
    position: absolute;
    bottom: px2rem(80);
    left: px2rem(80);

    p {
      font-size: px2rem(48);
      color: $lightColor;
    }
  }
}
</style>
