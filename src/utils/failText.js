const failTest = {
  400: {
    title: '参数错误',
    isRouter: false
  },
  500: {
    title: '系统错误',
    isRouter: false
  },
  404: {
    title: '路径错误',
    isRouter: false
  },
  401: {
    title: '登录信息已失效，请重新登录！',
    isRouter: true,
    path: '/login'
  }
}

export {
  failTest
}