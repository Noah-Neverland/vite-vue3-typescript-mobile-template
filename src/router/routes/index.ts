export const basicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/index.vue'),
  },
];
