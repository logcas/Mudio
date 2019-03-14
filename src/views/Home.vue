<template>
  <div class="home">
    <div class="page-container" ref="wrapper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <navbar @touchstart.native="handleTouchStart" @touchend.native="handleTouchEnd"></navbar>
    <transition name="fade">
      <play-list id="playlist" v-show="isShowPlayList" @hide-playlist="isShowPlayList = false"></play-list>
    </transition>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import PlayList from "@/views/PlayList.vue";

export default {
  name: "home",
  components: { Navbar, PlayList },
  data() {
    return {
      scroll: null,
      transitionName: "",

      isShowPlayList: false,
      touchY: 0,
    };
  },
  methods: {
    handleTouchStart(e) {
      this.touchY = e.changedTouches[0].clientY;
    },
    handleTouchEnd(e) {
      let touchY = e.changedTouches[0].clientY;
      let delta = Math.abs(this.touchY - touchY);
      if(delta >= 20) {
        if(this.touchY > touchY) this.isShowPlayList = true;
        else this.isShowPlayList = false;
      }
    },
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
  height: 100%;
  .page-container {
    height: px2rem(1232);
  }
}

#playlist {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: px2rem(1232);
}

</style>

