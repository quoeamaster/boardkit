import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      component: () => import('@/views/Dashboard.vue'),
    },
    {
      path: '/tailwind-css-test',
      component: () => import('@/views/TailwindCSSTest.vue'),
    },
    {
      path: '/themes-demo',
      component: () => import('@/views/ThemesDemo.vue'),
    },
    {
      path: '/components-demo',
      component: () => import('@/views/ComponentsDemo.vue'),
    },

    // {
    //   path: '/components',
    //   component: () => import('@/views/ComponentsView.vue'),
    // },
    // {
    //   path: '/themes',
    //   component: () => import('@/views/ThemesView.vue'),
    // },
  ],
});

export default router;