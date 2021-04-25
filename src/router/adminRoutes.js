import AppBarLayout from '@/layouts/AppBarCardLayout.vue';

export const adminRoutes = [
  {
    path: '/tenant/:tenantSlug/admin',
    name: 'SuperAdmin',
    component: () => import('@/views/SuperAdmin.vue'),
    meta: {
      admin: true,
      layout: AppBarLayout,
      appBar: {
        backRoute: { name: 'TenantHome' },
        title: 'Super Admin'
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/admin/tenants',
    name: 'SuperAdminTenantsList',
    component: () => import('@/views/SuperAdminTenantsList.vue'),
    meta: {
      admin: true,
      layout: AppBarLayout,
      appBar: {
        backRoute: { name: 'SuperAdmin' },
        title: 'Tenants'
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/admin/tenants/:id',
    name: 'SuperAdminTenantView',
    component: () => import('@/views/SuperAdminTenantView.vue'),
    meta: {
      admin: true,
      layout: AppBarLayout,
      appBar: {
        backRoute: { name: 'SuperAdminTenantsList' },
        title: 'Tenant Profile'
      }
    }
  }
];
