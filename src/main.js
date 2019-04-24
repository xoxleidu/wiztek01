// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import bus from "@/utils/bus";
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import { utils, dict } from "@/utils/base";
import rules from "@/utils/rules";
//import 'leaflet/dist/leaflet.css'
import "../static/leaflet/leaflet.css";

Vue.use(ElementUI);
Vue.use(bus);

Vue.config.productionTip = false;

//全局工具
Vue.prototype.$utils = utils;
//全局字典
Vue.prototype.$dict = dict;
//全局验证
Vue.prototype.$rules = rules;

//判断用户浏览器
console.log("我用的浏览器及其版本是", utils.browserVersion());
//对用户浏览器给出的建议

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
