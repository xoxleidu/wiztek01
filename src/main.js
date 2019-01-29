// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import { utils, dict } from "@/utils/base";
import rules from "@/utils/rules";


Vue.use(ElementUI);

Vue.config.productionTip = false;

//全局工具
Vue.prototype.$utils = utils;
//全局字典
Vue.prototype.$dict = dict;
//全局验证
Vue.prototype.$rules = rules;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

// new Vue({
//   el: "#app",
//   router,
//   store,
//   render: h => h(App)
// });