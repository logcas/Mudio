<template>
  <div class="album" @click="$router.push({ name: 'album', uid })">
    <img class="cover" src="@/assets/cover.jpg">
    <svg class="icon like" aria-hidden="true">
      <use xlink:href="#iconxihuan"></use>
    </svg>
    <div class="name">A beautiful mindA beautiful mind</div>
  </div>
</template>

<script>
export default {
  props: {
    uid: {
      type: String,
      default: '666',
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.album {
  margin: px2rem(10);
  display: inline-block;
  width: px2rem(276);
  border-radius: px2rem(10);
  background: $lightColor;
  overflow: hidden;

  .cover {
    width: px2rem(276);
    height: px2rem(276);
    border-radius: px2rem(10) px2rem(10) 0 0;
  }

  .name {
    margin-right: px2rem(96);
    font-size: px2rem(24);
    color: $titleColor;
    word-wrap:break-word;
  }

  .like {
    float: right;
    margin: -px2rem(10) px2rem(10) px2rem(10) 0;
    font-size: px2rem(48);
    color: $unlikeColor;
  }
}
</style>
