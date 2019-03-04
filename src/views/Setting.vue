<template>
  <div>
    <h1>Page Setting</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
    <h1>Page me</h1>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$parent.$el.children[0]);
    });
  }
};
</script>
