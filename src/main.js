// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import bus from "@/utils/bus"
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import { utils, dict } from "@/utils/base";
import rules from "@/utils/rules";
//import 'leaflet/dist/leaflet.css'
import "../static/leaflet/leaflet.css";

Vue.use(ElementUI);
Vue.use(bus);
/* leaflet icon */

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

Vue.config.productionTip = false;

//全局工具
Vue.prototype.$utils = utils;
//全局字典
Vue.prototype.$dict = dict;
//全局验证
Vue.prototype.$rules = rules;

//组件间通信中间件

// var eventBus = {
//   install(Vue, options) {
//     Vue.prototype.$bus = Vue;
//   }
// };
// Vue.use(eventBus);
//Vue.prototype.$bus = Vue;

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
