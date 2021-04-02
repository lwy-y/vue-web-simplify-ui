import request from '../utils/request';

export const fetchData = query => {
  return request({
    url: './table.json',
    method: 'get',
    params: query
  });
};

/**
 * 登录
 * @param data 数据
 * @returns {AxiosPromise} 返回请求体
 */
export const Login = data => {
  return request({
    url: 'system/login',
    method: 'post',
    data: data
  });
};

export const LoginOut = () => {
  return request({
    url: 'system/logout',
    method: 'get'
  });
}

/**
 * 短信验证码验证
 * @param {*} data
 */
export const msgVerify = data => {
  return request({
    url: '/system/msgVerify',
    method: 'post',
    data: data
  });
}

/**
 * 忘记密码验证短信发送
 * @param {*} data
 */
export const codeVerify = data => {
  return request({
    url: '/system/codeVerify',
    method: 'post',
    data: data
  });
}

/**
 * 获取图形验证码
 * @param {*}
 */
export const getValidateCodeImage = () => {
  return request({
    url: '/system/validateCode/getValidateCodeImage',
    method: 'get'
  });
}

//修改密码
export const changePassword = (data) => {
  return request({
    url: '/system/changePassword',
    method: 'post',
    params: data
  })
}

//刷新token
export const reLogin = () => {
  return request({
    url: '/system/reLogin',
    method: 'post',
  })
}