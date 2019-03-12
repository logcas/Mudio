/**
 * @description 主要用于缓存页面，如果ID相同则不会在ativate钩子中重新获取数据
 */

export default {
  state: {
    albumDetailId: 0,
    singerDetailId: 0,
    songListDetailId: 0,
  },
  getters: {
    albumId: function(state) {
      return state.albumDetailId;
    },
    singerId: function(state) {
      return state.singerDetailId;
    },
    songListId: function(state) {
      return state.songListDetailId;
    },
  },
  mutations: {
    setAlbumId(state, id) {
      state.albumDetailId = id;
    },
    setSingerId(state, id) {
      state.singerDetailId = id;
    },
    setSongListId(state, id) {
      state.songListDetailId = id;
    },
  }
}