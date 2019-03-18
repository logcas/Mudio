const _convertTime = Symbol('convertTime');
const _reset = Symbol('reset');
const _timerFunction = Symbol('timerFunction');
const _findCurrentIndex = Symbol('findCurrentIndex');
const _init = Symbol('init');

const STATUS = {
  UNLOADED: 'UNLOADED',
  PENDING: 'PENDING',
  PLAYING: 'PLAYING',
};

export default class LyricParser {
  /**
   * 
   * @param {string} lyric 歌词文本
   * @param {function} handler 处理当前歌词变化时的回调处理函数
   */
  constructor(lyric, handler = (() => {})) {
    if (lyric) this.load(lyric, handler);
  }

  load(lyric, handler = (() => {})) {
    if (!lyric || typeof lyric !== 'string' || lyric.trim() === '') throw new Error('lyric is illegal');
    if (this.status === STATUS.PLAYING) {
      this[_reset]();
    }
    this.lyric = lyric;
    this.handler = handler;
    this.lines = [];
    this[_init]();
  }

  play(now = 0) {
    this.status = STATUS.PLAYING;
    let idx = this[_findCurrentIndex](now);
    this.startTime = +new Date() - now;
    this.currentIdx = idx;

    // last lyric sentence
    this.handler(this.lines[idx - 1] || '', idx - 1);

    if(idx < this.lines.length) {
      clearTimeout(this.timer);
      this[_timerFunction]();
    }
  }

  pause() {
    this.status = STATUS.PENDING;
    clearTimeout(this.timer);
  }

  getAllLyric() {
    return this.lines.map(({
      word
    }) => word);
  }

  [_init]() {
    const lines = this.lyric.split('\n');
    const timeRegx = /\[[0-9\:\.]+\]/g;
    lines.forEach(line => {
      const idx = line.lastIndexOf(']') + 1;
      const word = idx !== -1 ? line.slice(idx) : '';
      let matchLine = line.match(timeRegx);
      if (matchLine) {
        matchLine.forEach(t => {
          this.lines.push({
            time: this[_convertTime](t.slice(1, -1)),
            word,
          });
        });
      }
    });
    this.lines.sort((a, b) => a.time - b.time);
  }

  [_reset]() {
    clearTimeout(this.timer);
    this.timer = null;
    this.currentIdx = -1;
    this.startTime = 0;
    this.status = STATUS.UNLOADED;
  }

  [_findCurrentIndex](time) {
    for (let i = 0; i < this.lines.length; ++i) {
      if (this.lines[i].time > time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  [_timerFunction]() {
    let line = this.lines[this.currentIdx];
    let delay = line.time - (+new Date() - this.startTime);

    this.timer = setTimeout(() => {
      this.handler(line.word, this.currentIdx++);
      if(this.currentIdx < this.lines.length && this.status === STATUS.PLAYING) {
        this[_timerFunction]();
      }
    }, delay);
  }

  /**
   * @description 时间转换
   * @param {string} t 时间字符串 e.g.'02:11.240' 转换为以秒为单位的浮点数
   */
  [_convertTime](t) {
    let ts = t.split(':').map(time => parseFloat(time)).reverse();
    let time = 0;
    for (let i = 0, base = 1; i < ts.length; ++i, base *= 60) {
      time += base * ts[i];
    }
    return time * 1000;
  }
}