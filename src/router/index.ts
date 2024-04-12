import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import { TrendCharts, Management, List } from "@element-plus/icons-vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/LoginView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/HomeIndex.vue"),
    children: [
      {
        path: "/echarts",
        name: "echarts",
        component: () => import("../views/home/children/EchartsView.vue"),
        meta: {
          title: "数据展示",
          icon: TrendCharts,
        },
      },
      {
        path: "/pay",
        name: "pay",
        component: () => import("../views/home/children/PayList.vue"),
        meta: {
          title: "缴费管理",
          icon: Management,
        },
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/home/children/UserOne.vue"),
        meta: {
          title: "住户信息",
          icon: List,
        },
        children: [
          {
            path: "/userList",
            name: "userList",
            component: () => import("../views/home/children/UserList.vue"),
            meta: {
              classifyTitle: "住户信息",
              title: "住户信息列表",
            },
          },
          {
            path: "/userUpdate",
            name: "userUpdate",
            component: () => import("../views/home/children/UserUpdate.vue"),
            meta: {
              classifyTitle: "住户信息",
              title: "住户信息修改",
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
