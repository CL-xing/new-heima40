//引入vue
import Vue from 'vue'
//引入路由
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Personal from '@/views/Personal.vue'
//挂载路由
Vue.use(VueRouter)

//创建路由对象
const router = new VueRouter({
    routes:[
        {
            name:'login',
            path:'/login',
            component:Login
        },
        {
            name:'personal',
            path:'/personal/:id',
            component:Personal
        }
    ]
  })


  // 添加导航守卫
// to:目标路由对象
// 每次路由跳转都要执行一次导航守卫
  router.beforeEach((to, from, next) => {
    //    只有访问那些需要授权的api的时候，才需要进行守卫
    if (to.path.indexOf('/personal/')===0) {
        // 判断当前用户是否登陆过
        let token =localStorage.getItem('heima40_token');
        if(token){
            next()
        }else{
            next({ name: 'login' })
        }
    }else{
        next()
    }
})


  export default router