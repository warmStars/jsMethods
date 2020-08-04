## 1.前端常用api方法
时间转换、正则校验、前端存储
## 2.使用
定义全局：main.js
const warmstars = require("warmstars");
Vue.prototype.utils = warmstars;
组件使用：this.utils