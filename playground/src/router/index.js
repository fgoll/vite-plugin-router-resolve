import { createRouter, createWebHistory } from 'vue-router'
// import Layout from ;

export const menus = [
  {
    name: 'order',
    path: '/order',
    redirect: '/order/list',
    meta: {
      name: '首页',
    },
    ssr: {
      title: '标题',
      keyword: 'keywords',
      description: '描述',
    },
    children: [
      {
        name: 'order-list',
        path: 'list',
        meta: {
          actived: 'order',
          name: '订单列表',
          icon: {
            default: 'iconcopy_outline',
            active: 'iconcopy_outline',
          },
        },
      },
      {
        name: 'order-detail',
        path: 'detail/:id?',
        meta: {
          name: '订单详情',
        },
        hidden: true,
      },
      {
        name: 'service-detail',
        path: 'service/detail/:id?',
        hidden: true,
      },
    ],
  },
  {
    name: 'delivery-list',
    path: '/delivery',
    meta: {
      name: '交付管理',
    },
    redirect: '/delivery/list',
    children: [
      {
        name: 'delivery-list',
        path: 'list',
        meta: {
          actived: 'delivery',
          name: '交付管理',
          icon: {
            default: 'iconConfirmreceipt_default',
            active: 'iconConfirmreceipt_default',
          },
        },
      },
    ],
  },
]

export const routes = [
  {
    name: 'defaultLayout',
    path: '/',
    // component: () => import("@/layout/index.vue"),
    children: menus,
  },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
