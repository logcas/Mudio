<template>
  <div class="discovery">
    <h1 class="title">探索</h1>
    <album-list name="新碟上架"></album-list>
    <album-list name="推荐歌单"></album-list>
  </div>
</template>

<script>
import AlbumList from '@/components/AlbumList.vue';
export default {
  components: { AlbumList },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.discovery {
  & > .title {
    padding: px2rem(48) px2rem(20);
    font-size: px2rem(56);
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
      white-space:nowrap;
      overflow: auto;
    }
  }
}
</style>
