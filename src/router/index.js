import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop/test-tenant-slug',
    name: 'CustomerHome',
    component: () => import('@/views/CustomerHome.vue')
  },
  {
    path: '/shop/test-tenant-slug/business-hours',
    name: 'CustomerBusinessHours',
    component: () => import('@/views/CustomerBusinessHours.vue')
  },
  {
    path: '/shop/test-tenant-slug/contact',
    name: 'CustomerContact',
    component: () => import('@/views/CustomerContact.vue')
  },
  {
    path: '/shop/test-tenant-slug/categories',
    name: 'CustomerCategories',
    component: () => import('@/views/CustomerCategories.vue')
  },
  {
    path: '/test-tenant-slug/client-management',
    name: 'TenantClientManagement',
    component: () => import('@/views/TenantClientManagement.vue')
  },
  {
    path: '/test-tenant-slug/client-management-empty-test',
    name: 'TenantClientManagement',
    component: () => import('@/views/TenantClientManagementEmptyTest.vue')
  },
  {
    path: '/',
    redirect: { name: 'CustomerHome' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
