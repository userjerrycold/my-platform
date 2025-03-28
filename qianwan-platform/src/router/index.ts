import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/life/recipes'
  },
  {
    path: '/life',
    name: 'Life',
    meta: { title: '生活' },
    children: [
      {
        path: 'recipes',
        name: 'Recipes',
        component: () => import('../views/Life/Recipes.vue'),
        meta: { title: '菜谱' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/Life/Menu.vue'),
        meta: { title: '菜单' }
      }
    ]
  },
  {
    path: '/work',
    name: 'Work',
    meta: { title: '工作' },
    children: [
      {
        path: 'knowledge',
        name: 'Knowledge',
        component: () => import('../views/Work/Knowledge.vue'),
        meta: { title: '知识库' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫确保始终有激活的二级菜单
router.beforeEach((to, from, next) => {
  if (to.matched.length === 1 && to.meta.title) {
    const firstChild = routes.find(r => r.path === to.path)?.children?.[0]
    if (firstChild) {
      next({ path: `${to.path}/${firstChild.path}` })
      return
    }
  }
  next()
})

export default router