<template>
  <div class="app">
    <transition :name="transitionName">
        <router-view/>
    </transition>
      <player :style="playerOffset" style="z-index: 99999"></player>
  </div>
</template>

<script>
import Player from "@/components/Player.vue";
import { mapGetters } from "vuex";
import transitionMixin from '@/mixin/transition';
export default {
  components: { Player },
  mixins: [transitionMixin],
  data() {
    return {
      transitionName: '',
    }
  },
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
@import "@/assets/style/transition.scss";

.app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
