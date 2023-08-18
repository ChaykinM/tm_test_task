import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'showcase',
    meta: {
      title: 'Витрина',
    },
    component: () => import(/* webpackChunkName: "showcase" */ '@/views/ShowcaseView.vue')
  },
  {
    path: "/404",
    name: "pageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "page-not-found" */ "@/views/PageNotFound.vue"
      ),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.afterEach((to) => {
  document.title = to.meta.title || "TM test task";
});


export default router
