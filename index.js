'use strict';
const dayjs = require('dayjs');
const axios = require('axios');
exports.formatDateTime = function (date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
exports.formatDateTime2 = function (date) {
    return dayjs(date).format('YYYY-MM-DD 00:00:00');
};
exports.formatDate = function (date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
exports.formatDate2 = function (date) {
    return dayjs(date).format('YYYY-MM-DD');
};
exports.seconds = function () {
    return dayjs().unix()
}
// 将json格式转成echart data格式
exports.jsonToList = function jsonToList(json) {
    if (json) {
        return Object.keys(json).map(key => {
            return {
                name: key,
                value: json[key]
            };
        });
    }
};
// 手机号格式校验
exports.validatephone = function (rule, value, callback, mag, msg) {
    if (!value) {
        return callback(new Error('手机号不可为空'));
    } else if (!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
        return callback(new Error('手机号输入错误'));
    } else {
        callback();
    }
};
// 邮箱格式校验
exports.validatemail = function (rule, value, callback, mag, msg) {
    if (!value) {
        return callback(new Error('邮箱不可为空'));
    } else if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))) {
        return callback(new Error('邮箱输入错误'));
    } else {
        callback();
    }
};
exports.singleValidIP = function (str) {
    //  IP地址合法校验: 排除 0.0.0.0; 排除 255.255.255.255; 支持区间录入
    let reg = /^((25[0-5]|2[0-4]\d|[1]{1}\d{1}\d{1}|[1-9]{1}\d{1}|\d{1})($|(?!\.$)\.)){4}$/;
    let regS = /^((25[0-5]|2[0-4]\d|[1]{1}\d{1}\d{1}|[1-9]{1}\d{1}|\d{1})($|(?!\.$)\.))$/;
    let regZ = /(^0{1,3}(\.0{1,3}){3}$)/;
    let regM = /(^255(\.255){3}$)/;
    if (/([-])/.test(str)) {
        // 支持区间录入
        let arr = str.split('-');
        if (arr.length === 2) {
            return reg.test(arr[0]) && regS.test(arr[1]);
        } else {
            return false;
        }
    } else {
        return reg.test(str) && !regZ.test(str) && !regM.test(str);
    }
};
exports.getSessionStorage = function (key) {
    if (sessionStorage.getItem(key)) {
        let data = sessionStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
    return '';
}
exports.setSessionStorage = function (key, data) {
    if (typeof data === 'undefined') {
        data = '';
    }
    data = JSON.stringify(data);
    sessionStorage.setItem(key, data);
}
exports.removeStorageData = function (key) {
    sessionStorage.removeItem(key);
}
// //获取url中参数
exports.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
exports.http = function (option) {
    // axios.defaults.baseURL = option.url;
    axios.defaults.timeout = 10000;
    if (option.header) {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    } else {
        axios.defaults.headers.post['Content-Type'] = 'application/json'
    }
    axios.interceptors.request.use(
        config => {
            return config;
        },
        error => {
            return Promise.error(error);
        })
    axios.interceptors.response.use(
        response => {
            const code = response.data.code;
            if (code === option.codeNumber) {
                return Promise.resolve(response);
            }
        }, error => {
            return Promise.reject(error.response);
        })
    if (option.method == 'get') {
        return new Promise((resolve, reject) => {
            axios.get(option.url, {})
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        });
    }
}