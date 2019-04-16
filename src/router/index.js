import Vue from "vue";
import Router from "vue-router";
//import mainW from "@/components/main-w";
import mainH from "@/components/main-h";
import nopath from "@/pages/404";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

NProgress.inc(0.2);
NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false
});

Vue.use(Router);

var routes = [
  {
    path: "/login",
    meta: { name: "登录", hidden: true },
    component: () => import("@/pages/login.vue")
  },
  // {
  //   path: "/w",
  //   meta: { name: "首页", single: true, icon: "fa fa-desktop", p: "admin" },
  //   component: mainW
  // },
  {
    path: "/",
    meta: { name: "首页", single: true, icon: "fa fa-home" },
    component: mainH
  },
  {
    path: "/livePredict",
    meta: { name: "实况预报", single: true },
    component: mainH,
    children: [
      {
        path: "/livePredict",
        component: () => import("@/pages/livePredict/index")
      }
    ]
  },
  {
    path: "/StatisticalAnalysis",
    meta: { name: "统计分析", single: true },
    component: mainH,
    children: [
      {
        path: "/StatisticalAnalysis",
        component: () => import("@/pages/StatisticalAnalysis/index")
      }
    ]
  },
  {
    path: "/BeltRoad",
    meta: { name: "一带一路", single: true },
    component: mainH,
    children: [
      {
        path: "/BeltRoad",
        component: () => import("@/pages/BeltRoad/index")
      }
    ]
  },
  {
    path: "/productMade",
    meta: { name: "产品制作", single: true },
    component: mainH,
    children: [
      {
        path: "/productMade",
        component: () => import("@/pages/productMade/index")
      }
    ]
  },
  {
    path: "/systemMonitoring",
    meta: { name: "系统监控", single: true },
    component: mainH,
    children: [
      {
        path: "/systemMonitoring",
        component: () => import("@/pages/systemMonitoring/index")
      }
    ]
  },
  // {
  //   path: "/user",
  //   meta: { name: "用户", hideInBread: true, icon: "fa fa-user" },
  //   component: mainH,
  //   children: [
  //     {
  //       path: "/user/list",
  //       meta: { name: "列表", single: true, icon: "fa fa-list" },
  //       component: () => import("@/pages/user/index"),
  //       children: [
  //         {
  //           path: "/user/list/info",
  //           meta: { name: "liebiao", hidden: true },
  //           component: () => import("@/pages/user/info")
  //         }
  //       ]
  //     },
  //     {
  //       path: "/user/info",
  //       meta: { name: "信息", hidden: true },
  //       component: () => import("@/pages/user/info")
  //     },
  //     {
  //       path: "/user/infos",
  //       meta: { name: "信息", icon: "fa fa-window-maximize" },
  //       component: () => import("@/pages/user/info")
  //     }
  //   ]
  // },
  // {
  //   path: "/components",
  //   component: mainH,
  //   meta: { name: "组件", hideInBread: true, icon: "fa fa-cube" },
  //   children: [
  //     {
  //       path: "/select",
  //       meta: { name: "选择框", icon: "fa fa-check-square-o" },
  //       component: () => import("@/components/select/index")
  //     },
  //     {
  //       path: "/table",
  //       meta: { name: "表格", single: true, icon: "fa fa-table" },
  //       component: () => import("@/components/table/index"),
  //       children: [
  //         {
  //           path: "/table/info",
  //           meta: { name: "详情", hidden: true },
  //           component: () => import("@/components/table/info")
  //         }
  //       ]
  //     },
  //     {
  //       path: "/upload",
  //       meta: { name: "上传", icon: "fa fa-upload" },
  //       component: () => import("@/components/upload/upload")
  //     },
  //     {
  //       path: "/editor",
  //       meta: { name: "富文本", icon: "fa fa-pencil-square-o" },
  //       component: () => import("@/components/editor/editor")
  //     }
  //   ]
  // },
  // {
  //   path: "/test",
  //   meta: { name: "测试", single: true, icon: "fa fa-wrench" },
  //   component: () => import("@/test")
  // },
  {
    path: "*",
    component: nopath,
    meta: { name: "错误", hidden: true }
    // children: [
    //   {
    //     path: "",
    //     component: () => import("@/pages/404.vue")
    //   }
    // ]
  }
];

/**
 * 创建路由实例
 */
var router = new Router({
  // mode: "history",
  routes: routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
