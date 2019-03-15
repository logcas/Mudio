/**
 * @description 歌词解析器
 * @author Lucas
 * @version v0.0.1
 */

 // 私有变量
const timeTransform = Symbol();
const divideLrc = Symbol();

export default class lrcParser {
  /**
   * 
   * @param {string} lrcText 歌词文本，非必须，可以从load函数载入
   */
  constructor(lrcText) {
    this.lrc = lrcText || '';
    this.lyric = [];
    this[divideLrc]();
  }
  /**
   * 
   * @param {string} lrcText 歌词文本
   */
  load(lrcText) {
    this.lrc = lrcText;
    this[divideLrc]();
  }

  /**
   * @description 通过播放时间获取歌词文本索引
   * @param {number} currentTime 当前播放时间
   */
  getCurrentIndex(currentTime) {
    if(typeof currentTime !== 'number') currentTime = parseFloat(currentTime);
    if(isNaN(currentTime)) return -1;
    let current = -1;
    for(let i = 0;i < this.lyric.length; ++i) {
      if(this.lyric[i][0] >= currentTime) {
        current = i;
        break;
      }
    }
    return current - 1;
  }

  // 根据索引获取某一句歌词
  getCurrentWord(index) {
    return this.lyric[index] ? this.lyric[index] : '';
  }

  // 返回全部歌词
  getAllLyric() {
    return this.lyric.map(item => item[1]);
  }

  /**
   * @description 时间转换
   * @param {string} t 时间字符串 e.g.'02:11.240' 转换为以秒为单位的浮点数
   */
  [timeTransform](t) {
    let ts = t.split(':').map(time => parseFloat(time)).reverse();
    let time = 0;
    for (let i = 0, base = 1; i < ts.length; ++i, base *= 60) {
      time += base * ts[i];
    }
    return time;
  }
  /**
   * @description 把歌词文本的歌词与时间分开
   */
  [divideLrc]() {
    const hasLrc = !!this.lrc;
    if(!hasLrc) return;
    let _lrc = this.lrc.split('\n').filter(content => content !== '');
    let lrc = [];
    _lrc.forEach(content => {
      let times = [];
      let end = content.indexOf(']');
      let start = content.indexOf('[');
      // 
      // 因为有些歌词是重复的，因此格式为 [00:05:12][00:01:13] XXXXXXXXX 这类
      // 需要循环把事件拿出来
      // 
      while(end !== -1 && start !== -1) {
        times.push(content.slice(start + 1, end));
        content = content.slice(end + 1);
        start = content.indexOf('[');
        end = content.indexOf(']');
      }
      times.forEach(t => {
        lrc.push([this[timeTransform](t), content]);
      });
    });
    lrc.sort((a, b) => {
      return a[0] - b[0];
    });
    this.lyric = lrc;
  }
}