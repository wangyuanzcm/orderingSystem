// @ts-nocheck
// 不需要下面这几行，只是本地发布DEMO用
// const Mock = require("mockjs");
// Mock.setup({
//   timeout: "0-500",
// });

/**
 * 模拟数据
 * 这个文件使用了兼容IE11的语法，
 * 也没有弄成ts,因为server.js中要用到此文件
 * **/


// 所有的用户数据
export const users = [
  {
    id: 1,
    username: "admin",
    password: "123456",
    phone: "13600000000",
    email: "admin@react.com",
    desc: "超级管理员",
    conditions: 1,
    roles: [1, 2, 3],
  },
  {
    id: 2,
    username: "user",
    password: "123456",
    phone: "13600000001",
    email: "user@react.com",
    desc: "普通管理员",
    conditions: 1,
    roles: [2],
  },
  {
    id: 3,
    username: "user",
    password: "123456",
    phone: "13600000001",
    email: "user@react.com",
    desc: "普通管理员3",
    conditions: 1,
    roles: [2],
  },
  {
    id: 4,
    username: "user",
    password: "123456",
    phone: "13600000001",
    email: "user@react.com",
    desc: "普通管理员4",
    conditions: 1,
    roles: [2],
  },
  {
    id: 5,
    username: "user",
    password: "123456",
    phone: "13600000001",
    email: "user@react.com",
    desc: "普通管理员5",
    conditions: 1,
    roles: [2],
  },
];

// 所有的菜单数据
export const menus = [
  {
    id: 1,
    title: "购物车",
    icon: "icon-home",
    url: "/cart",
    parent: null,
    desc: "购物车",
    sorts: 0,
    conditions: 1
  },

  {
    id: 2,
    title: "系统管理",
    icon: "icon-setting",
    url: "/system",
    parent: null,
    desc: "系统管理目录分支",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 3,
    title: "用户管理",
    icon: "icon-user",
    url: "/system/useradmin",
    parent: 2,
    desc: "系统管理/用户管理",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 4,
    title: "角色管理",
    icon: "icon-team",
    url: "/system/roleadmin",
    parent: 2,
    desc: "系统管理/角色管理",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 5,
    title: "权限管理",
    icon: "icon-safetycertificate",
    url: "/system/poweradmin",
    parent: 2,
    desc: "系统管理/权限管理",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 6,
    title: "菜单管理",
    icon: "icon-appstore",
    url: "/system/menuadmin",
    parent: 2,
    desc: "系统管理/菜单管理",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 7,
    title: "操作日志",
    icon: "icon-appstore",
    url: "/system/operatelog",
    parent: 2,
    desc: "系统管理/操作日志",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 8,
    title: "商品列表",
    icon: "icon-home",
    url: "/productlist",
    parent: null,
    desc: "商品列表",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 9,
    title: "订单列表",
    icon: "icon-home",
    url: "/orderlist",
    parent: null,
    desc: "订单列表",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 10,
    title: "收件信息",
    icon: "icon-home",
    url: "/receiverinfo",
    parent: null,
    desc: "收件信息",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 11,
    title: "业绩统计",
    icon: "icon-home",
    url: "/statistics",
    parent: null,
    desc: "业绩统计",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 12,
    title: "商品设置",
    icon: "icon-home",
    url: "/productsetting",
    parent: null,
    desc: "商品设置",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 13,
    title: "优惠设置",
    icon: "icon-home",
    url: "/discountSetting",
    parent: null,
    desc: "商品设置",
    sorts: 0,
    conditions: 1,
  },
  {
    id: 14,
    title: "商品详情设置",
    icon: "icon-home",
    url: "/productItemSetting",
    parent: null,
    desc: "商品详情设置",
    sorts: 0,
    conditions: 1,
  },
];

// 所有的权限数据
export const powers = [
  {
    id: 1,
    menu: 3,
    title: "新增",
    code: "user:add",
    desc: "用户管理 - 添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 2,
    menu: 3,
    title: "修改",
    code: "user:up",
    desc: "用户管理 - 修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 3,
    menu: 3,
    title: "查看",
    code: "user:query",
    desc: "用户管理 - 查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 4,
    menu: 3,
    title: "删除",
    code: "user:del",
    desc: "用户管理 - 删除权限",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 5,
    menu: 3,
    title: "分配角色",
    code: "user:role",
    desc: "用户管理 - 分配角色权限",
    sorts: 5,
    conditions: 1,
  },

  {
    id: 6,
    menu: 4,
    title: "新增",
    code: "role:add",
    desc: "角色管理 - 添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 7,
    menu: 4,
    title: "修改",
    code: "role:up",
    desc: "角色管理 - 修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 8,
    menu: 4,
    title: "查看",
    code: "role:query",
    desc: "角色管理 - 查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 18,
    menu: 4,
    title: "分配权限",
    code: "role:power",
    desc: "角色管理 - 分配权限",
    sorts: 4,
    conditions: 1,
  },
  {
    id: 9,
    menu: 4,
    title: "删除",
    code: "role:del",
    desc: "角色管理 - 删除权限",
    sorts: 5,
    conditions: 1,
  },

  {
    id: 10,
    menu: 5,
    title: "新增",
    code: "power:add",
    desc: "权限管理 - 添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 11,
    menu: 5,
    title: "修改",
    code: "power:up",
    desc: "权限管理 - 修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 12,
    menu: 5,
    title: "查看",
    code: "power:query",
    desc: "权限管理 - 查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 13,
    menu: 5,
    title: "删除",
    code: "power:del",
    desc: "权限管理 - 删除权限",
    sorts: 2,
    conditions: 1,
  },

  {
    id: 14,
    menu: 6,
    title: "新增",
    code: "menu:add",
    desc: "菜单管理 - 添加权限",
    sorts: 1,
    conditions: 1,
  },
  {
    id: 15,
    menu: 6,
    title: "修改",
    code: "menu:up",
    desc: "菜单管理 - 修改权限",
    sorts: 2,
    conditions: 1,
  },
  {
    id: 16,
    menu: 6,
    title: "查看",
    code: "menu:query",
    desc: "菜单管理 - 查看权限",
    sorts: 3,
    conditions: 1,
  },
  {
    id: 17,
    menu: 6,
    title: "删除",
    code: "menu:del",
    desc: "菜单管理 - 删除权限",
    sorts: 2,
    conditions: 1,
  },
];
// 所有的角色数据
export const roles = [
  {
    id: 1,
    title: "超级管理员",
    desc: "超级管理员拥有所有权限",
    sorts: 1,
    conditions: 1,
    menuAndPowers: [
      { menuId: 1, powers: [] },
      { menuId: 2, powers: [] },
      { menuId: 3, powers: [1, 2, 3, 4, 5] },
      { menuId: 4, powers: [6, 7, 8, 9, 18] },
      { menuId: 5, powers: [10, 11, 12, 13] },
      { menuId: 6, powers: [14, 15, 16, 17] },
      { menuId: 7, powers: [] },
      { menuId: 8, powers: [] },
      { menuId: 9, powers: [] },
      { menuId: 10, powers: [] },
      { menuId: 11, powers: [] },
      { menuId: 12, powers: [] },
      { menuId: 13, powers: [] },
      { menuId: 14, powers: [] },
    ],
  },
  {
    id: 2,
    title: "普通管理员",
    desc: "普通管理员",
    sorts: 2,
    conditions: 1,
    menuAndPowers: [
      { menuId: 1, powers: [] },
      { menuId: 2, powers: [] },
      { menuId: 3, powers: [3] },
      { menuId: 4, powers: [6, 7, 8, 18] },
      { menuId: 5, powers: [10, 11, 12] },
      { menuId: 6, powers: [14, 15, 16] },
      { menuId: 7, powers: [] },
      { menuId: 8, powers: [] },
      { menuId: 9, powers: [] },
      { menuId: 10, powers: [] },
      { menuId: 11, powers: [] },
      { menuId: 12, powers: [] },
      { menuId: 13, powers: [] },
      { menuId: 14, powers: [] },

    ],
  },
  {
    id: 3,
    title: "运维人员",
    desc: "运维人员不能删除对象",
    sorts: 3,
    conditions: 1,
    menuAndPowers: [
      { menuId: 1, powers: [] },
      { menuId: 2, powers: [] },
      { menuId: 3, powers: [3] },
      { menuId: 4, powers: [7, 8] },
      { menuId: 5, powers: [11, 12] },
      { menuId: 6, powers: [15, 16] },
      { menuId: 7, powers: [] },
      { menuId: 8, powers: [] },
      { menuId: 9, powers: [] },
      { menuId: 10, powers: [] },
      { menuId: 11, powers: [] },
      { menuId: 12, powers: [] },
      { menuId: 13, powers: [] },
      { menuId: 14, powers: [] },

    ],
  },
];
