import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/http/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowPlayer: false,
    isPlaying: false,
    currentSong: {
      id: 0,
      url: '',
      name: '',
      artist: '',
      cover: '',
    }
  },
  getters: {
    isShowPlayer: (state) => {
      return state.isShowPlayer;
    },
    isPlaying: (state) => {
      return state.isPlaying;
    },
    currentSong: (state) => {
      return state.currentSong;
    },
  },
  mutations: {
    setPlaying(state, isPlay) {
      state.isPlaying = isPlay;
    },
    showPlayer(state, isShow) {
      state.isShowPlayer = isShow;
    },
    setSong(state, { url, name, cover }) {
      state.currentSong.url = url;
      state.currentSong.name = name;
      state.currentSong.cover = cover;
    },
  },
  actions: {
    // 设置当前播放的歌曲
    async setCurrentSong({ commit }, payload) {
      const { data } = await api.GetSongURL({ id: payload.id });
      const url = data[0].url;
      commit('setSong', { url, name: payload.name, cover: payload.cover });
      commit('setPlaying', true);
      commit('showPlayer', true);
    },
  }
})
