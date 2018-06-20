import Vue from 'vue';
import Router from 'vue-router';
import Schedule from '@/pages/Schedule';
import Coop from '@/pages/Coop';
import History from '@/pages/History';
import Add from '@/pages/Add';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/coop/:coopId',
      name: 'coop',
      props: true,
      component: Coop
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/add/:coopId',
      name: 'add',
      props: true,
      component: Add
    },
    {
      path: '/edit/:coopId/:resultId',
      name: 'edit',
      props: true,
      component: Add
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});
