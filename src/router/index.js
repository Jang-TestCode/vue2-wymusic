import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Play from '@/views/play'
import Comment from '@/views/comment'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout',
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页' }, // 给当前路由添加属性值
      },
      {
        path: 'search',
        component: () => import('@/views/search'),
        meta: { title: '搜索' },
      },
    ],
  },
  {
    path: '/play',
    component: Play,
  },
  {
    path: '/comment',
    component: Comment,
  },
]

const router = new VueRouter({
  routes,
})

export default router
