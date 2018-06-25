import Vue from 'vue'
import Router from 'vue-router'
// import的名字是自己定义的
import index from './views/index.vue'

Vue.use(Router)

// import的时候不用加{}
export default new Router({
  routes: [
    {
      path: '/',
      // 用来在方法中进行路由跳转的时候使用
      name: 'index',
      component: index
    }
  ]
})
