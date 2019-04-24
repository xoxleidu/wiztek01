# wiztek

> A Vue.js project

# 前后端单词定义

- 所有参数和数据库字段一致
- 添加 add
- 删除 delete
- 修改 update
- 查询 get
- 子元素 children
- 联合查询 by 例如：getDeviceByUserId

# 前端框架说明

- 采用 vue-cli3 作为脚手架
- 采用 element-ui 作为主开发框架

## 文件夹说明

- src 源码目录
- pages 所有逻辑页面，和路由尽量保持一致
- api 所有通信请求 按大模块分开文件，最终都需要导入到 index.js 中，
  utils/ajax.js 放入 axios 全局设置和发送接收拦截器
  api 文件引用 `import ajax from "@/utils/ajax.js";`
  页面引入 API 自己写的接口时 `import {接口名称} "@/api/index"` 即可
- components 组件目录 组件命名规范 ： 组件形式-模块名称 例如 （select-user）
  引入时 `import selectUser "@/api/selectUser"` 即可
- router 路由文件分离页面 按大模块分离 最终导入到 /src/router.js 中
- style 样式
- utils 工具 js
  utils/base.js 放入全局公用字典
  utils/utils.js 放入全局公用方法
  以上 2 个文件都会注入到 vue 的 prototype 中，页面内使用时
  `this.$dict.getBar()`
  `this.$utils.foo()`
- public 发布所需的公开文件/静态文件等（例如需要下载的 excel 模版）

## 引入插件

- axios.js 收发 ajajx
- qs.js 对象转 URL 字符串
- moment.js 日期处理
- normalize.css
- lodash.js 基础方法库
- Decimal.js 小数运算处理库（解决 js 小数运算失精问题）
- leaflet 地图插件
- d3 d3 绘图插件
- echarts 百度图表绘制工具

# 编码规范

- 所有 JavaScript 中命名如无特殊情况，均采用驼峰写法
- 构造函数或类名 首字母大写
- 注入的方法或属性以及动态增加的方法或属性 均以$开头 例如 Vue.prototype.$getName
- 禁止声明全局变量（特殊情况应向整个团队说明）
- 常量命名：全部大写，下划线（\_） 分割 例如： `const MY_NAME = "zjp";`
- 私有变量 以 （\_）开头

## Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn run dev
```

### Compiles and minifies for production

```
yarn run build
```
