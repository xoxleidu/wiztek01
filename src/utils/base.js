var BASE_URL = "http://localhost:8070/";
var API_URL = "http://yapi.demo.qunar.com/mock/40712";
var IMAGEL_URL = "https://jsonplaceholder.typicode.com/posts/";

var BASE_TABLE_PAGE = 1;
var BASE_TABLE_SIZE = 10;

var IMAGEL_TYPE = "image/jpeg";
var IMAGEL_SIZE = 1024*1024*2;

var dict = {
  //全局字典
  BASE_URL: BASE_URL, //web站点路径
  API_URL: API_URL, //API具体路径
  IMAGEL_URL: IMAGEL_URL, //图片上传路径
  BASE_TABLE_PAGE: BASE_TABLE_PAGE,
  BASE_TABLE_SIZE: BASE_TABLE_SIZE,
  IMAGEL_TYPE: IMAGEL_TYPE,
  IMAGEL_SIZE: IMAGEL_SIZE,

  PAY_MODE: [
    {
      label: "现金",
      value: 0
    },
    {
      label: "银联",
      value: 1
    },
    {
      label: "支付宝",
      value: 2
    },
    {
      label: "微信",
      value: 3
    }
  ],

  ENABLE_MODE: [
    {
      label: "启用",
      value: 0
    },
    {
      label: "停用",
      value: 1
    }
  ]
};
if (process.env.NODE_ENV == "production") {
  dict = Object.assign(dict, window.SITE_CONFIG);
}
if (process.env.NODE_ENV == "production") {
  //发布时，用public中的config.js声明的全局变量 覆盖API路径
  dict = Object.assign(dict, window.BEIDOU_CONFIG);
}
import utils from "@/utils/utils";
export { utils, dict };
