import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui'
import { post, fetch, patch, put } from './utils/http'
// 为什么在这里引用
import './assets/iconfont/iconfont.css'

Vue.use(Mint)
Vue.config.productionTip = false
Vue.prototype.$http = axios
// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
