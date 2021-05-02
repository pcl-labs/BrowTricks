import AppBarCardLayout from '@/layouts/AppBarCardLayout.vue';
import AppBarSwitcherLayout from '@/layouts/AppBarSwitcherLayout.vue';

export const TenantPanelRoutes = [
  {
    path: '/tenant/:tenantSlug',
    name: 'TenantHome',
    props: true,
    component: () => import('@/views/TenantHome.vue'),
    meta: {
      layout: AppBarCardLayout,
      pageBackground: 'bg-background',
      title: 'Home',
      appBar: { noHeader: true }
    }
  },
  {
    path: '/tenant/:tenantSlug/intro',
    name: 'TenantIntro',
    props: true,
    component: () => import('@/views/TenantIntro.vue'),
    meta: {
      layout: AppBarCardLayout,
      appBar: { noHeader: true }
    }
  },
  {
    path: '/tenant/:tenantSlug/account',
    name: 'Account',
    props: true,
    component: () => import('@/views/Account.vue'),
    meta: {
      layout: AppBarSwitcherLayout,
      appBar: {
        title: 'My Account'
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/account/settings',
    name: 'AccountSettings',
    props: true,
    component: () => import('@/views/AccountSettings.vue'),
    meta: {
      layout: AppBarCardLayout,
      appBar: {
        title: 'Settings',
        backRoute: { name: 'Account' }
      }
    }
  },
  {
    path: '/tenant-signup',
    name: 'TenantSignup',
    props: true,
    component: () => import('@/views/TenantSignup.vue'),
    meta: {
      noNavigation: true,
      layout: AppBarCardLayout,
      pageBackground: 'bg-background',
      needsUserInfo: true,
      appBar: {
        title: 'Create Business Profile'
      }
    }
  },
  {
    path: '/manage-account',
    name: 'AccountManage',
    props: true,
    component: () => import('@/views/AccountManage.vue'),
    meta: {
      noNavigation: true,
      layout: AppBarCardLayout,
      pageBackground: 'bg-background',
      needsUserInfo: true,
      appBar: {
        title: 'Manage Account',
        backRoute: { name: 'AccountSettings' }
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/billing',
    name: 'AccountBilling',
    props: true,
    component: () => import('@/views/AccountBilling.vue'),
    meta: {
      layout: AppBarCardLayout,
      pageBackground: 'bg-brand7',
      needsUserInfo: true,
      appBar: {
        title: 'Billing',
        backRoute: { name: 'AccountManage' }
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/activity',
    name: 'AccountActivity',
    props: true,
    component: () => import('@/views/AccountActivity.vue'),
    meta: {
      layout: AppBarCardLayout,
      pageBackground: 'bg-brand7',
      needsUserInfo: true,
      appBar: {
        title: 'Activity'
      }
    }
  },
  {
    path: '/tenant/:tenantSlug/transaction-details',
    name: 'TransactionDetails',
    props: true,
    component: () => import('@/views/TransactionDetails.vue'),
    meta: {
      layout: AppBarCardLayout,
      pageBackground: 'bg-brand7',
      needsUserInfo: true,
      appBar: {
        title: 'Transaction Details',
        backRoute: { name: 'AccountActivity' }
      }
    }
  }
];
