<template>
  <transition name="fade">
    <router-view/>
  </transition>
</template>

<style lang="scss">
.fade-enter-active, .fade-enter-leave {
  transition: all 2.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
