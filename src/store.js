import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/http/api';
import Toast from '@/components/Toast/index.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowPlayer: false, // 是否显示播放器
    isPlaying: false, // 是否正在播放
    currentSong: { // 当前播放
      id: 0,
      url: '',
      name: '',
      artist: '',
      cover: '',
    },
    playList: [], // 播放列表
    currentIdex: 0, // 播放列表正在播放的歌曲索引
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
    playList: (state) => {
      return state.playList;
    },
  },
  mutations: {
    // 设置播放状态
    setPlaying(state, isPlay) {
      state.isPlaying = isPlay;
    },
    // 控制播放器显隐
    showPlayer(state, isShow) {
      state.isShowPlayer = isShow;
    },
    // 设置当前歌曲
    setSong(state, song) {
      state.currentSong = song;
    },
    // 加入到播放列表
    addPlayList(state, song) {
      let idx = -1;
      for (let i = 0; i < state.playList.length; ++i) {
        if (state.playList[i].id === song.id) {
          idx = i;
          break;
        }
      }
      if(idx !== -1) return;
      state.playList.push(song);
    },
    // 从播放列表中移除
    removePlayList(state, songId) {
      let idx = -1;
      for (let i = 0; i < state.playList.length; ++i) {
        if (state.playList[i].id === songId) {
          idx = i;
          break;
        }
      }
      if (idx === -1) return;
      state.playList.splice(idx, 1);
    },
    // 播放上一首
    playLast(state) {
      let idx = state.currentIdex;
      idx = idx - 1 >= 0 ? idx - 1 : state.playList.length - 1;
      let song = state.playList[idx];
      state.currentSong = song;
      state.currentIdex = idx;
    },
    // 下一首
    playNext(state) {
      let idx = state.currentIdex;
      idx = idx + 1 < state.playList.length ? idx + 1 : 0;
      let song = state.playList[idx];
      state.currentSong = song;
      state.currentIdex = idx;
    },
  },
  actions: {
    // 设置当前播放的歌曲
    async setCurrentSong({
      commit
    }, payload) {
      const {
        data
      } = await api.GetSongURL({
        id: payload.id
      });
      const url = data[0].url;
      if(!url) {
        Toast('没有版权，无法播放', 1500);
        return;
      }
      let song = Object.assign(payload, {
        url
      });
      commit('setSong', song);
      commit('addPlayList', song)
      commit('setPlaying', true);
      commit('showPlayer', true);
    },
  }
})