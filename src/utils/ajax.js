import axios from "axios";
import { dict } from "./base";
// post请求头
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded;charset=UTF-8";

const ajax = axios.create({
  baseURL: dict.API_URL,
  timeout: 10000,
});


ajax.interceptors.request.use(
  config => {
    //const token = store.state.token;
    //token && (config.headers.Authorization = token);
    // config.headers["Content-Type"] =
    //   "application/x-www-form-urlencoded;charset=UTF-8";
    // config.headers["Content-Type"] =
    //   "application/json;charset=UTF-8";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);

    /**
     * 拦截器
     */
    // if (error.response.status) {
    //   switch (error.response.status) {
    //     // 401: 未登录
    //     // 未登录则跳转登录页面，并携带当前页面的路径
    //     // 在登录成功后返回当前页面，这一步需要在登录页操作。
    //     case 401:
    //       router.replace({
    //         path: "/login",
    //         query: { redirect: router.currentRoute.fullPath }
    //       });
    //       break;
    //     // 403 token过期
    //     // 登录过期对用户进行提示
    //     // 清除本地token和清空vuex中token对象
    //     // 跳转登录页面
    //     case 403:
    //       Toast({
    //         message: "登录过期，请重新登录",
    //         duration: 1000,
    //         forbidClick: true
    //       });
    //       // 清除token
    //       localStorage.removeItem("token");
    //       store.commit("loginSuccess", null);
    //       // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
    //       setTimeout(() => {
    //         router.replace({
    //           path: "/login",
    //           query: {
    //             redirect: router.currentRoute.fullPath
    //           }
    //         });
    //       }, 1000);
    //       break;
    //     // 404请求不存在
    //     case 404:
    //       Toast({
    //         message: "网络请求不存在",
    //         duration: 1500,
    //         forbidClick: true
    //       });
    //       break;
    //     // 其他错误，直接抛出错误提示
    //     default:
    //       Toast({
    //         message: error.response.data.message,
    //         duration: 1500,
    //         forbidClick: true
    //       });
    //   }
    //   return Promise.reject(error.response);
    // }
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    ajax
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    ajax
      //.post(url, QS.stringify(params))
      .post(url, JSON.parse(JSON.stringify(params)))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
//export default ajax;
