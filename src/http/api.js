import { $get } from './axios';

export default {
  // 主页
  // 最新大碟
  GetNewestAlbum: () => $get('/album/newest'),
  // 推荐歌单
  GetRecommandedSongs: () => $get('/personalized'),
  // 热门歌手
  GetHottestSingers: () => $get('/top/artists?offset=0&limit=20'),

  // 专辑详细页
  GetAlbumDetail: (p) => $get('/album', p),

  // 获取歌曲URL
  GetSongURL: (p) => $get('/song/url', p),

  // 推荐歌单详情页
  GetSongListDetail: (p) => $get('/playlist/detail', p),

  // 歌手详细页
  GetSingerDetail: (p) => $get('/artists', p),
}