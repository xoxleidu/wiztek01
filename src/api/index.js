import ajax from "@/utils/ajax.js";
import axios from "axios";
import qs from "qs";
export const buttonData = data => {
  //query = JSON.parse(JSON.stringify(query));
  var data = {
    time: 2017123118,
    c: 0,
    name: "TMPprs_850_D24",
    type: "value"
  };

  return ajax.get("/get", { params: data });
};

export const getPanelButtonState = () => {
  return ajax.get("/get");
};

export const getJsonFile = () => {
  return axios.get("static/button.json");
};

//获取城市列表
export const getJsonCitySelect = () => {
  return axios.get("/static/city.json");
};
//获取地图样式
export const getJsonMapStyle = () => {
  return axios.get("/static/mapStyle/mapStyle.json")
}
export const buttonData2 = data => {
  //query = JSON.parse(JSON.stringify(query));

  //后台POST 用requestParams接收时用
  var ss = qs.stringify(data);

  //后台POST 返回的不是JSON体时用
  //return ajax.post("/post", JSON.parse(JSON.stringify(data)));

  return ajax.post("/post", data);
};

export const login = data => {
  //query = JSON.parse(JSON.stringify(query));

  return ajax.post("/user/login", qs.stringify(data));
};
export const getUserList = data => {
  return ajax.get("/user/list", data);
};
export const searchGlobal = data => {
  console.log("API " + data);
  return ajax.get("/user/getTest", data);
};

export const searchAdd = data => {
  return ajax.post("/user/postTest", data);
};
export const getlonlat = () => {
  return ajax.get("/web/api/test/t3");
};
