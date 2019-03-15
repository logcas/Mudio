/**
 * @description 简易防抖函数
 * @param {function} fn 原函数
 * @param {number} wait 等待事件
 */
export default function debounce(fn, wait = 300) {
  let timer = null;
  let self = this;
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, wait);
  };
}