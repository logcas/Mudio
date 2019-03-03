<template>
  <div class="home">
    <div class="page-container">
      <router-view></router-view>
    </div>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "home",
  components: { Navbar }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.home {
  position: relative;
  .page-container {
    margin-bottom: px2rem(102);
  }
}
</style>

