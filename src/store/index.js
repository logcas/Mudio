import Vue from 'vue'
import Vuex from 'vuex'
import playerModule from './modules/player';
import cacheModule from './modules/cache';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    'player': playerModule,
    'cache': cacheModule,
  }
});