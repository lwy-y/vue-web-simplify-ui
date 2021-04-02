import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {
  messages
} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import custom from './components/custom/index.js'
import './mixin'
import store from './store'

import 'pl-table/themes/index.css'

//引入基本模板
let echarts = require('echarts/lib/echarts')

// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll') //图例翻译滚动

Vue.prototype.$echarts = echarts


// Vue.component('vue-drag-resize', VueDragResize)
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(custom)
Vue.use(ElementUI, {
  size: 'small'
});
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'dx0zcopASuISA4WNZ9XEWIVqwVPdL9vV'
// })
const i18n = new VueI18n({
  locale: 'zh',
  messages
});
const MaxTime = 1000 * 60 * 50;
const MinTime = 1000 * 60 * 35;

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | xx管理平台`;
  const role = sessionStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    if (to.path === '/retrieve-password') {
      next();
    } else {
      sessionStorage.removeItem("tokenTime");
      next('/login');
    }
  } else if (to.meta.permission) {
    let routerRole = []
    if (sessionStorage.getItem('menus')) {
      routerRole = JSON.parse(sessionStorage.getItem('menus'))[0].list;
      JSON.stringify(routerRole).indexOf(to.meta.title) != -1 ? next() : next('/403');
    } else {
      // let tokenTime = sessionStorage.getItem("tokenTime");
      // if (tokenTime) {
      //   // //获取现在的时间戳
      //   let nowTime = new Date().getTime();
      //   let tokenMi = Number(tokenTime) + Number(MinTime)
      //   let tokenMa = Number(tokenTime) + Number(MaxTime)
      //   // //判断现在的时间戳在某个区间之间
      //   ////console.log(nowTime ,tokenMi , tokenMa)
      //   if (nowTime > tokenMi && nowTime < tokenMa) {
      //     getToken();
      //     next();
      //   } else if (nowTime > tokenMa) {
      //     sessionStorage.removeItem("tokenTime")
      //     //如果太长时间未登录
      //     next("/login");
      //   } else {
      //     next();
      //   }
      // } else {
      //   next();
      // }
      next();
    }
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      // let tokenTime = sessionStorage.getItem("tokenTime");
      // if (tokenTime) {
      //   // //获取现在的时间戳
      //   let nowTime = new Date().getTime();
      //   let tokenMi = Number(tokenTime) + Number(MinTime)
      //   let tokenMa = Number(tokenTime) + Number(MaxTime)
      //   // //判断现在的时间戳在某个区间之间
      //   ////console.log(nowTime ,tokenMi , tokenMa)
      //   if (nowTime > tokenMi && nowTime < tokenMa) {
      //     getToken();
      //     next();
      //   } else if (nowTime > tokenMa) {
      //     sessionStorage.removeItem("tokenTime")
      //     //如果太长时间未登录
      //     next("/login");
      //   } else {
      //     next();
      //   }
      // } else {
      //   next();
      // }
      next();
    }
  }
});


// function getToken() {
//   reLogin()
//     .then(res => {
//       ////console.log(res, "我在刷新token");
//       sessionStorage.setItem("token", res.data.token);
//       sessionStorage.setItem("tokenTime", (new Date().getTime()));
//     })
//     .catch(err => {
//       ////console.log(err);
//     });
// }

// 定义时间过滤器
function formatDate(date, fmt) {
  if (!date) {
    return "--"
  }
  date = new Date(date);
  if (typeof (fmt) === "undefined") {
    fmt = "yyyy-MM-dd HH:mm:ss";
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length));
    }
  }
  return fmt
};

//定义一个时间过滤器
Vue.filter("FormatDate", function (date, fmt) {
  return formatDate(date, fmt);
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');