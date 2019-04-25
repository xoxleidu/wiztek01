import axios from "axios";
import { Message } from "element-ui";

//import store from "@/store";
import { dict } from "@/utils/base.js";

//获取用户token，如果没有，跳转到登录页面
// 创建axios实例
const ajax = axios.create({
  headers: {
    //"Authorization": "TTTTOOOKKK",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  baseURL: dict.BASE_URL
});
// 添加请求拦截器
ajax.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    Message({
      showClose: true,
      message: "调用接口错误:" + error,
      type: "error"
    });
    return Promise.reject(error);
  }
);
// 添加响应拦截器
ajax.interceptors.response.use(
  function(response) {
    if (typeof response.data == "string") {
      try {
        response.data = JSON.parse(response.data);
      } catch (err) {
        Message({
          showClose: true,
          message: "JSON格式错误！",
          type: "error"
        });
      }
    }
    if (response.status != 200) {
      Message({
        showClose: true,
        message: "接口错误，错误码" + response.status,
        type: "error"
      });

      return response;
    }
    // if (response.data.code == 3) {
    //   store.dispatch("loginOut").then(() => {
    //     location.reload();
    //   });
    // }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    Message({
      message: "接口错误:" + error,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);
export default ajax;
