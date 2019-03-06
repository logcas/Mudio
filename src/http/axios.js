import axios from 'axios';
import config from '@/config';

if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = config.prod.baseUrl;
} else if(process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = config.dev.baseUrl;
}

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.response.use(
  res => {
    if((res.status >= 200 && res.status < 300) || res.status === 304 ) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export const $get = function(url, data) {
  return axios.get(url, {
    params: data,
  });
};

export const $post = function(url, data) {
  return axios.post(url, data);
};