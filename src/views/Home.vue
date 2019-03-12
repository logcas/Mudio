<template>
  <div class="home">
    <div class="page-container" ref="wrapper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <navbar></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  components: { Navbar },
  data() {
    return {
      scroll: null,
      transitionName: ""
    };
  },
  mounted() {
    /*
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper);
    });
    */
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";
@import "@/assets/style/transition.scss";

.home {
  position: relative;
  .page-container {
    height: px2rem(1232);
  }
}
</style>

