import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/new',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve)
        },
        {
          path: '/product',
          component: resolve => require(['../components/page/Product.vue'], resolve)
        },
        {
          path: '/category',
          component: resolve => require(['../components/page/Category.vue'], resolve)
        },
        {
          path: '/lucky',
          component: resolve => require(['../components/page/Lucky.vue'], resolve)
        },
        {
          path: '/fans',
          component: resolve => require(['../components/page/Fans.vue'], resolve)
        },
        {
          path: '/ohmygod',
          component: resolve => require(['../components/page/God.vue'], resolve)
        },
        {
          path: '/attribute',
          component: resolve => require(['../components/page/Attribute.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
