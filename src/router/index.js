import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: () =>
      import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
    meta: {
      title: '自述文件'
    },
    children: [{
      path: '/dashboard',
      component: () =>
        import( /* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue'),
      meta: {
        title: '系统首页'
      }
    },
    {
      path: '/404',
      component: () =>
        import( /* webpackChunkName: "404" */ '../pages/404.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/403',
      component: () =>
        import( /* webpackChunkName: "403" */ '../pages/403.vue'),
      meta: {
        title: '403'
      }
    },
    ]
  },
  {
    path: '/login',
    component: () =>
      import( /* webpackChunkName: "login" */ '../pages/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
  ]
});