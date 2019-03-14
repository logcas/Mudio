<template>
  <div class="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view />
      </keep-alive>
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
  },
  mounted() {
    /**
     * @description 解决移动端 :active 伪类的问题
     */
    document.body.addEventListener('touchstart', function() {});
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

#playlist {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
