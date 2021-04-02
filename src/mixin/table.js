import Vue from 'vue'
/**
 * 表单相关混入处理
 * @author lmh
 */
Vue.mixin({
  filters: {
    //表单空值则转化为——
    resetNull(string) {
      if ((!string) && string !== 0) {
        return '--'
      } else {
        return string
      }
    },
    //长字符串数据处理
    longDeal(string) {
      if ((!string) && string !== 0) {
        return '--'
      } else if (string.length > 11) {
        let newString = string.substring(0, 11) + "..."
        //console.log(newString);
        return newString
      } else {
        return string
      }
    },
    //表单店铺名称长度修改
    shopDeal(string) {
      if ((!string) && string !== 0) {
        return '--'
      } else if (string.length > 3) {
        let newString = string.substring(0, 3) + "..."
        return newString
      } else {
        return string
      }
    },
    //平台订单号长字符串传值
    orderNoDeal(string) {
      if ((!string) && string !== 0) {
        return '--'
      } else if (string.length > 21) {
        let newString = string.substring(0, 19) + "..."
        return newString
      } else {
        return string
      }
    },
  }
})