const timeTransform = Symbol();
const divideLrc = Symbol();

export default class lrcParser {
  constructor(lrcText) {
    this.lrc = lrcText || '';
    this.lyric = [];
    this[divideLrc]();
  }

  load(lrcText) {
    this.lrc = lrcText;
    this[divideLrc]();
  }

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

  getCurrentWord(index) {
    return this.lyric[index] ? this.lyric[index] : '';
  }

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
    let lrc = this.lrc.split('\n').filter(content => content !== '');
    lrc = lrc.map(content => {
      let idx = content.indexOf(']');
      if(idx === -1) return;
      let time = this[timeTransform](content.slice(1, idx));
      let words = content.slice(idx + 1);
      return [time, words];
    });
    this.lyric = lrc;
  }
}