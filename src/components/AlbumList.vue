<template>
  <div class="list-box">
    <div class="list-header">
      <div class="title">{{ name }}</div>
      <div class="more">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconxiangyou"></use>
        </svg>
      </div>
    </div>
    <div class="list-body">
      <album v-for="(item,key) in data" :key="key" :data="item" :toRoute="toRoute"></album>
    </div>
  </div>
</template>

<script>
import Album from '@/components/Album.vue';
export default {
  components: { Album },
  props: {
    name: String,
    data: Array,
    toRoute: {
      type: String,
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

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
</style>
