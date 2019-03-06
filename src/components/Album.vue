<template>
  <div class="album" @click="$router.push({ name: toRoute, params: { uid: data.id } })">
    <img class="cover" :src="data.picUrl">
    <div class="name">{{ data.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    toRoute: String,
  },
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
