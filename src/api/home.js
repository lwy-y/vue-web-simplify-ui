import request from '../utils/request';

// 提货卡最近7天兑换量
export const thkExchange =(query)=>{
  return request({
    url:'/order/chart/dhl_shippingOrderCount',
    method: 'get',
    params: query
  })
}

// 提货卡最近7天发货量
export const thkShipment =(query)=>{
  return request({
    url:'/order/chart/fhl_shippingOrderCount',
    method: 'get',
    params: query
  })
}

// 提货卡最近7天超期发货
export const thkOverdue =(query)=>{
  return request({
    url:'/order/chart/cqwf_shippingOrderCount',
    method: 'post',
    params: query
  })
}

// 商品列表
export const productList = (data) => {
  return request({
    url: '/order/product/list',
    method: 'post',
    data
  })
}

// 储值卡最近7天兑换量
export const zzdhExchange = (data) => {
  return request({
    url: '/order/chart/card_zzdhl_shippingOrderCount',
    method: 'post',
    data
  })
}

// 储值卡七天发货量
export const zzdhShipment = (data) => {
  return request({
    url: '/order/chart/card_shippingOrderCount',
    method: 'post',
    data
  })
}

// 储值卡超期未发
export const zzdhOverdueList = (data) => {
  return request({
    url: '/order/chart/card_cqwf_shippingOrderCount',
    method: 'post',
    data
  })
}