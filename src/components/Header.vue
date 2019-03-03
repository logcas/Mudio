<template>
  <div class="header">
    <div class="return" @click="$router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconfanhui"></use>
      </svg>
      <span>返回</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: px2rem(100);
  background: rgba(255,255,255,0.5);

  font-size: px2rem(48);

  z-index: 99;
}

</style>
