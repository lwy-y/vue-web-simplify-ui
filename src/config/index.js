
//
//是否开发环境，否则为线上环境
const env = process.env.NODE_ENV === 'development'?'dev':'pro';
//是否开发环境，否则为测试环境
// const env = process.env.NODE_ENV === 'development'?'dev':'test';
const config = {
  dev:{
    path:"http://100.168.2.115:8081/ordercenter/",
    //系统所有接口的根路径
    rootPath:'/',
    //腾讯地图key
    mapKey:'AD4BZ-WYM6W-O4GR5-R2K4W-RZ4Y2-JQBKX',
    mapSDKSrc:'https://map.qq.com/api/js?v=2.exp&key=#mapKey#&callback=#initCallback#',
    //发送短信间隔时间,单位秒
    sendMsgInterval:120
  },
  pro:{
    path:"http://100.168.2.115:8081/ordercenter/",
    //系统所有接口的根路径
    rootPath:'/ordercenter/',
    //腾讯地图key
    mapKey:'ULUBZ-PSRKW-ZUVR7-OWJDS-R2PNS-DSFUX',
    mapSDKSrc:'https://map.qq.com/api/js?v=2.exp&key=#mapKey#&callback=#initCallback#',
    //发送短信间隔时间,单位秒
    sendMsgInterval:120
  },
  test:{
    path:"http://100.168.2.115:8081/ordercenter/",
    //系统所有接口的根路径
    rootPath:'/ordercenter/',
    //腾讯地图key
    mapKey:'ULUBZ-PSRKW-ZUVR7-OWJDS-R2PNS-DSFUX',
    mapSDKSrc:'https://map.qq.com/api/js?v=2.exp&key=#mapKey#&callback=#initCallback#',
    //发送短信间隔时间,单位秒
    sendMsgInterval:120
  }
}

export default  {
  ...config[env]
}
