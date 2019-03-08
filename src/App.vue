<template>
  <div class="app">
    <transition name="fade">
      <router-view/>
    </transition>
      <player :style="playerOffset" style="z-index: 99999"></player>
  </div>
</template>

<script>
import Player from "@/components/Player.vue";
import { mapGetters } from "vuex";
export default {
  components: { Player },
  computed: {
    ...mapGetters(["isShowPlayer"]),
    playerOffset() {
      return {
        'top': this.isShowPlayer ? '0' : '100%',
      }
    },
  }
};
</script>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
