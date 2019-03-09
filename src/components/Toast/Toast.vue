<template>
  <div class="toast">{{message}}</div>
</template>

<script>
export default {
  name: 'toast',
  data() {
    return {
      message: '',
    };
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: px2rem(10) px2rem(20);
  border-radius: px2rem(10);
  font-size: px2rem(32);
  color: #fff;
  background: $mainColor;
  text-align: center;
  z-index: 9999;
}
</style>
