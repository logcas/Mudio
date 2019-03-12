<template>
  <div class="nav">
    <div class="nav-item" :class="{'on-active': currentIndex === 1 }" @click="$router.push({ name: 'me'})">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconhtmal5icon02"></use>
      </svg>
    </div>
    <div class="nav-item" :class="{'on-active': currentIndex === 2 }" @click="$router.push({ name: 'discovery'})">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icontansuob"></use>
      </svg>
    </div>
    <div class="nav-item" :class="{'on-active': currentIndex === 3 }" @click="$router.push({ name: 'setting'})">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconshezhi"></use>
      </svg>
    </div>
  </div>
</template>

<script>
const pageHook = {
  'me': 1,
  'discovery': 2,
  'setting': 3,
};
export default {
  data() {
    return {
      currentIndex: 1,
    };
  },
  watch: {
    '$route': function(to) {
      this.currentIndex = this.getIndex(to.name);
    },
  },
  methods: {
    getIndex(name) {
      return pageHook[name] ? pageHook[name] : 0;
    },
  },
  created() {
    this.currentIndex = this.getIndex(this.$route.name);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/common.scss";

.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px2rem(102);
  background: $navbarColor;
  border-top: 1px solid $borderColor;

  .nav-item {
    width: px2rem(56);
    height: px2rem(56);
    font-size: px2rem(56);
    line-height: px2rem(56);
    color: $normalColor;

    &.on-active {
      color: $activeColor;
    }
  }
}
</style>
