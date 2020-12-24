// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from "./store";


Vue.prototype.$http=axios;   //替换vue提供的异步组件
Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = sessionStorage.getItem('Authorization')
    if (!config.headers.hasOwnProperty('Authorization') && token) {
      config.headers.Taken = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
