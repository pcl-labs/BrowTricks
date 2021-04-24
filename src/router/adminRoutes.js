import AppBarLayout from '@/layouts/AppBarCardLayout.vue';

export const adminRoutes = [
  {
    path: '/tenant/:tenantSlug/admin',
    name: 'SuperAdmin',
    component: () => import('@/views/SuperAdmin.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: {
        backRoute: { name: 'TenantHome' },
        title: 'Super Admin'
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/admin/users',
    name: 'SuperAdminUsers',
    component: () => import('@/views/SuperAdminUsers.vue'),
    meta: {
      layout: AppBarLayout,
      appBar: {
        backRoute: { name: 'SuperAdmin' },
        title: 'Users'
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/admin/users/:userId',
    name: 'SuperAdminUserView',
    component: () => import('@/views/SuperAdminUserView.vue'),
    props: true,
    meta: {
      layout: AppBarLayout,
      appBar: {
        backRoute: { name: 'SuperAdminUsers' },
        title: 'User Profile'
      }
    }
  }
];
