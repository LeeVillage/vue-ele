import Vue from 'vue';
import VueRouter from 'vue-router';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';
import goods from 'components/goods/goods';

Vue.use(VueRouter);

export default new VueRouter({
  // mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods',
      component: goods
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/ratings',
      component: ratings
    }
  ]
});
