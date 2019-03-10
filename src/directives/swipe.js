export default {
  bind(el, { value }) {
    el.$touchStart = function(e) {
      console.log(e);
      let touch = e.changedTouches[0];
      el.$touchX = touch.pageX;
      el.$isTouch = true;
    };
    el.$touchEnd = function(e) {
      if(!el.$isTouch) return;
      el.$isTouch = false;
      let touch = e.changedTouches[0];
      if(Math.abs(touch.pageX - el.$touchX) > 30) {
        (typeof value === 'function') && value();
      }
    };
    el.addEventListener('touchstart', el.$touchStart);
    el.addEventListener('touchend', el.$touchEnd);
  },
  unbind(el) {
    el.removeEventListener('touchstart', el.$touchStart);
    el.removeEventListener('touchend', el.$touchEnd);
  }
}
