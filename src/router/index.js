import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import { clientRoutes } from './clientRoutes';
import { TenantPanelRoutes } from './TenantRoutes';
import { authRoutes } from './authRoutes';
import { generalRoutes } from './generalRoutes';
import { formTemplateRoutes } from './formTemplateRoutes';
import { adminRoutes } from './adminRoutes';

Vue.use(VueRouter);

const routes = [
  ...formTemplateRoutes,
  ...TenantPanelRoutes,
  ...clientRoutes,
  ...adminRoutes,
  ...authRoutes,
  ...generalRoutes
];

const scrollBehavior = (to, from, savedPosition) => {
  return new Promise(resolve => {
    resolve(savedPosition || { x: 0, y: 0 });
  });
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior
});

function isRouteChangingUpdate(value) {
  store.dispatch('loading/loadingUpdate', value);
}

function loadActiveSubscription(tenantSlug) {
  if (!store.getters['subscription/getActiveSubscription'] && tenantSlug) {
    store.dispatch('subscription/fetchActiveSubscriptions', tenantSlug);
  }
  return;
}

router.beforeEach((to, from, next) => {
  isRouteChangingUpdate(true);

  store
    .dispatch('auth/ping')
    .then(async response => {
      await loadActiveSubscription(to.params?.tenantSlug);
      if (to.meta.admin) {
        if (response.isAdmin) return next();
        else return next({ name: 'PanelRedirector' });
      }
      return next();
    })
    .catch(() => {
      if (to.meta.isPublic) {
        if (to.meta.needsUserInfo) {
          console.log('Not authenticated');
        }
        return next();
      }
      return next({ name: 'Home' });
    });

  isRouteChangingUpdate(false);
});

export default router;
