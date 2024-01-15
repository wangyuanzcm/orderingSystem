import type { RouteRecordRaw } from 'vue-router';
// import RouterView from '@/layout/routerView/index.vue';
// import { t } from '@/hooks/useI18n';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'statistics',
    name: `统计信息`,
    meta: {
      title: `统计信息`,
      icon: 'icon-zhuomian',
      keepAlive: true,
    },
    component: () => import('@/views/statistics/index.vue'),
  },
  {
    path: 'cart',
    name: `购物车`,
    meta: {
      title: `购物车`,
      icon: 'icon-zhuomian',
      keepAlive: true,
    },
    component: () => import('@/views/cart/index.vue'),
  },
  {
    path: 'receiverinfo',
    name: `收件信息`,
    meta: {
      title: `收件信息`,
      icon: 'icon-zhuomian',
      keepAlive: true,
    },
    component: () => import('@/views/receiverinfo/index.vue'),
  },
  {
    path: 'orderlist',
    name: `订单列表`,
    meta: {
      title: `订单列表`,
      icon: 'icon-zhuomian',
      keepAlive: true,
    },
    component: () => import('@/views/orderlist/index.vue'),
  },
  {
    path: 'goods',
    name: `商品列表`,
    meta: {
      title: `商品列表`,
      icon: 'icon-zhuomian',
      keepAlive: true,
    },
    component: () => import('@/views/goods/index.vue'),
  },
  {
    path: 'creategoods',
    name: `新建/编辑商品`,
    meta: {
      title: '新建/编辑商品',
      icon: 'icon-zhuomian',
      hideInMenu: true,
      keepAlive: true,
      activeMenu: `goods`,
    },
    component: () => import(/* webpackChunkName: "lol-info-table" */ '@/views/goods/create.vue'),
  },
  {
    path: 'goodsdetail',
    name: `商品详情`,
    meta: {
      title: '商品详情',
      icon: 'icon-zhuomian',
      hideInMenu: true,
      keepAlive: true,
      activeMenu: `goods`,
    },
    component: () => import(/* webpackChunkName: "lol-info-table" */ '@/views/goods/detail.vue'),
  },
  {
    path: 'buygoods',
    name: `商品下单`,
    meta: {
      title: '商品下单',
      icon: 'icon-zhuomian',
      hideInMenu: true,
      keepAlive: true,
      activeMenu: `goods`,
    },
    component: () => import(/* webpackChunkName: "lol-info-table" */ '@/views/goods/buy.vue'),
  },
];

export default routes;
