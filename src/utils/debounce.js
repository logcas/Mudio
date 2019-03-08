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