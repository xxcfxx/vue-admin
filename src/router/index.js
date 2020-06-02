import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//引入布局组件
import Layout from '@/views/Layout/layout.vue';
const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: '主页'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: '登录'
    },
    component: () => import("../views/Login/login.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: '控制台',
      icon: 'console'
    },
    component: Layout,
    children: [{
      path: "/index",
      name: "Index",
      component: () => import("../views/Console/console.vue"),
      meta: {
        name: '首页'
      },
    }]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: '信息管理',
      icon: 'info'
    },
    component: Layout,
    children: [{
      path: "/infoIndex",
      name: "InfoIndex",
      component: () => import("../views/Info/index.vue"),
      meta: {
        name: '信息列表'
      }
    }, {
      path: "/infoCategory",
      name: "InfoCategory",
      component: () => import("../views/Info/category.vue"),
      meta: {
        name: '信息分类'
      }
    }]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      name: '用户管理',
      icon: 'user'
    },
    component: Layout,
    children: [{
      path: "/userList",
      name: "UserList",
      component: () => import("../views/User/user.vue"),
      meta: {
        name: '用户列表'
      }
    }]
  }
];

const router = new VueRouter({
  routes
});

export default router;
