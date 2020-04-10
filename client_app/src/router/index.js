import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { // 初始
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '任务列表首页',
      login: true
    }
  },
  { // login
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
    }
  },
  { // register
    path: '/reg',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: '注册',
    }
  },
  // about
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于我们',
      login: true
    }
  },
  { // 404
    path: '*',
    name: 'NotFound404',
    component: () => import('../views/404.vue'),
    meta: {
      title: '页面不存在',
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 导航守卫
 * 全局前置守卫
 * 判断用户是否为登录状态
 */
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  if(to.matched.some((item) => item.meta.login)){

    let user_id = localStorage.getItem("username");
    if(user_id){
      next()
    }else{
      router.push({
        path: "/login",
        query: {
          redirect: to.path.slice(1)
        }
      })
    }

  }else{

  }
  next()
})

export default router
