import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // [lesson] set the base URL for the router (extract from the environment variable)
  history: createWebHistory(`${import.meta.env.BASE_URL}dashboard/`),

  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/DashboardRenderDemo.vue'),
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
  ],
});

export default router;
