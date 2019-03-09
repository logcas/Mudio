import Vue from 'vue';

export default Vue.mixin({
  data() {
    return {
      transistionName: '',
    };
  },
  watch: {
    '$route' (to, from) {
      if(from.path === '/') {
        this.transitionName = 'zoom';
      } else {
        let toPath = to.path.split('/').filter(el => el !== '');
        let fromPath = from.path.split('/').filter(el => el !== '');
        if(toPath.length >= fromPath.length) {
          this.transitionName = 'slideLeft';
        } else {
          this.transitionName = 'slideRight';
        }
      }
    }
  }
});
