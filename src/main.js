import Vue from 'vue'
import Rainbow from './rainbow.vue'
import test from './views/test.vue'
import test1 from './views/test1.vue'

import VueRouter from 'vue-router' 
import VueResource from 'vue-resource' 
//注册两个插件 
Vue.use(VueResource) 
Vue.use(VueRouter)


const router = new VueRouter({
  // mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/test',
      component: test
    },
     {
      path: '/test1',
      component: test1
    },
    
    { path: '*', redirect: '/test'}
  ]
})

const app = new Vue({
    router: router,
    render: h => h(Rainbow)
}).$mount('#app')