import axios from "axios";
import { dict } from "./base";

const ajax = axios.create({
  baseURL: dict.API_URL
});

ajax.interceptors.request.use(
  config => {
    config.headers["Content-Type"] =
      "application/x-www-form-urlencoded;charset=UTF-8";
    //config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  res => {
    if (res.status != 200) {
      Message({
        showClose: true,
        message: "返回错误，错误码" + res.status,
        type: "error"
      });
      return res;
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default ajax;
