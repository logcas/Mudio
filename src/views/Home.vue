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
import BScroll from "better-scroll";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "home",
  components: { Navbar },
  data() {
    return {
      scroll: null
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

.home {
  position: relative;
  .page-container {
    height: px2rem(1232);
  }
}
</style>

