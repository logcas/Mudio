import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowPlayer: false,
    isPlaying: false,
  },
  getters: {
    isShowPlayer: (state) => {
      return state.isShowPlayer;
    },
    isPlaying: (state) => {
      return state.isPlaying;
    },
  },
  mutations: {
    setPlaying(state, isPlay) {
      state.isPlaying = isPlay;
    },
    showPlayer(state, isShow) {
      state.isShowPlayer = isShow;
    },
  },
  actions: {

  }
})
