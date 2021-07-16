import { createRouter, createWebHistory } from 'vue-router'

// import EmptyLayout from "@/layout/empty.vue";
interface a {
  a: string
}

const children: any[] = [
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
        ssr: {
          title: '列表',
          keyword: 'keywords',
          description: '描述',
        },
        meta: {
          actived: 'order',
          name: '订单列表',
          icon: {
            default: 'iconcopy_outline',
            active: 'iconcopy_outline',
          },
        },
        // component: () => import("@/views/order/order-list/index.vue")
      },
      {
        name: 'order-detail',
        path: 'detail/:id?',
        meta: {
          name: '订单详情',
        },
        hidden: true,
        // component: () => import("@/views/order/order-detail/index.vue")
      },
      {
        name: 'service-detail',
        path: 'service/detail/:id?',
        hidden: true,
        // component: () => import("@/views/service/service-detail.vue")
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
    // component: EmptyLayout,
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
        // component: () =>
        //     import("@/views/delivery/delivery-list/index.vue")
      },
    ],
  },
]

export const routes = [
  {
    name: 'defaultLayout',
    path: '/',
    // component: () => import("@/layout/index.vue"),
    redirect: '/order',
    children,
  },
]

export const menus = children.map((item) => item.children).flat()

console.log(menus)

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(import.meta.env.VITE_ROUTE_BASE as string),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-new

  next()
})

export default router
