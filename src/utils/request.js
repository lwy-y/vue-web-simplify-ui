import axios from 'axios';
import {
    M
} from './message.js';
import configOptions from '@/config';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    baseURL: configOptions.rootPath,
    timeout: 500000
});
let PostReplace = (data) => {
    let str = data;
    let json = {};
    for (let key in str) {
        if (str[key] && typeof str[key] === 'string') {
            if (str[key].indexOf('\\') !== -1) {
                json[key] = str[key].replace(/\\/g, '\\\\');
            } else {
                json[key] = str[key];
            }
        } else {
            json[key] = str[key];
        }
    }
    return json;
};
let firstIndex = '/';
// URL数据过滤拦截器
const ReplaceUrl = [
    firstIndex + 'order/orderList',
    firstIndex + 'order/shipping-order/list',
    firstIndex + 'order/product/list',
    firstIndex + 'order/product/list'
];
// 添加请求拦截器
service.interceptors.request.use(
    config => {

        let token = '';
        try {
            token = JSON.parse(sessionStorage.getItem('user')).token;
        } catch (e) {
            token = '';
        }
        if (token) {
            config.headers.common['x-token'] = token;
        }
        // 处理url参数，解决特殊字符处理
        let url = '';
        // console.log(config.url);
        if (config.url.indexOf('?') !== -1) {
            url = config.url.substring(0, config.url.indexOf('?'));
        } else {
            url = config.url;
        }
        if (ReplaceUrl.indexOf(url) !== -1) {
            if (config.method === 'post' || config.method === 'put') {
                if (config.data) {
                    config.data = PostReplace(config.data);
                }
            } else if (config.method === 'get') {
                if (config.params) {
                    config.params = PostReplace(config.params);
                }
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 添加响应拦截器
service.interceptors.response.use(
    response => {
        // console.log(response);
        // 判断请求状态码是否正确
        if (response.status === 200) {
            //判断返回状态码是否正确
            if (response.data.type !== 'application/vnd.ms-excel') {
                if (response.data.retCode === 0) {
                    return response.data;
                } else {
                    //状态码错误也跳转到catch中
                    M.error(response.data.retCode, response.data.message);
                    return Promise.reject(response);
                }
            } else {
                return response;
            }
        } else {
            //请求状态码错误也跳转到catch中
            M.error(response.data.retCode, response.data.message);
            return Promise.reject(response);
        }

    },
    error => {
        if (error.response.status == 401) {
            M.fail(error.response.status || 401);
            //在登录界面会清除一次该时间记录
            // sessionStorage.clear(); //删除用户信息
        }
        // 系统异常
        else if (error && error.response) {
            M.fail(error.response.status || 500);
        } else {
            M.fail(5000);
        }
        return Promise.reject(error.response);
    }
);

export default service;