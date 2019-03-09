import Toast from './Toast.vue';
import Vue from 'vue';

const ToastCons = Vue.extend(Toast);

export default function(message, duration) {
  let instance = new ToastCons({
    data: {
      message,
    },
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
  setTimeout(() => {
    document.body.removeChild(instance.$el);
  }, duration || 3000);
}