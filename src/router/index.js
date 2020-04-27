//引入vue
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'

import Login from '../views/login.vue'
//挂载路由
Vue.use(VueRouter)

//创建路由对象
const router = new VueRouter({
    routes:[
        {
            name:'login',
            path:'/login',
            component:Login
        }
    ]
  })

  export default router