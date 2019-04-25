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

export const buttonData2 = data => {
  //query = JSON.parse(JSON.stringify(query));
  var data = [
    {
      id: "dolore dolore",
      label: "qui consectetur nisi",
      pid: "esse cupidatat",
      url: "tempor commodo aliqua",
      children: {
        id: "officia dolor quis id exercitation",
        label: "in pariatur in veniam",
        pid: "occaecat culpa in",
        url: "et velit",
        show: true
      },
      checked: false,
      show: false
    },
    {
      id: "proident",
      label: "exercitation proident",
      pid: "dolor adipisicing aliquip",
      url: "sit fugiat magna Excepteur",
      children: {
        id: "fu",
        label: "et ut sit enim",
        pid: "consequat dolor laboris",
        url: "aliqua esse occaecat nostrud",
        show: false
      },
      checked: false,
      show: false
    },
    {
      id: "dolore esse",
      label: "mag",
      pid: "elit",
      url: "et ad aliquip",
      children: {
        id: "ea do ad",
        label: "in",
        pid: "nisi qui ad",
        url: "amet do minim",
        show: false
      },
      checked: true,
      show: false
    }
  ];
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
