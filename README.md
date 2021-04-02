# vue-manage-system
基于 Vue + Element UI 的后台管理系统解决方案。[线上地址](https://lin-xin.gitee.io/example/work/)
### 项目目录表 src
 |-- api【接口联调文件】
    |-- commodity 【商品接口文件】
    |-- deliver【发货单接口文件】
    |-- entrepot【仓库接口文件】
    |-- mrb【退货单接口文件】
    |-- order【订单接口文件】
    |-- report【报表模块接口文件】
    |-- source【信息基础模块接口文件】
    |-- system【系统管理模块接口文件】
    |-- app.json【小程序页面配置文件】
    |-- app.wxss【小程序全局样式文件】
    |-- project.config.json【小程序配置文件】
    |-- serve_config.js【小程序环境配置文件】
 |--assets【全局图片文件以及css样式】
    |-- 401_images【403图片配置内容】
    |-- 404_images【404图片配置内容】
    |--css【全局css样式】
    |--img【全局图片】
 |--components【插件】
    |--common【全局插件存放（全局使用），比如导航栏】
    |--custom【全局插件存放（部分使用），比如标题】
    |--page【页面内容】
        |--change-goods-log【修改商品的日志-已弃用】
        |--commodity【商品页面】
        |--entrepot【仓库商品库存页面--已弃用】
        |--inventory【库存管理页面】
        |--order【订单管理模块页面(包括发货单以及退货单)】
        |--report【统计报表模块页面】
        |--system【系统管理模块页面】
        |--tactics【基础信息模块页面】
|--config【地址信息以及生产开发环境信息配置】
|--mixin【全局混入】
|--router【路由配置】
|--store【vue以及vuex的使用】
|--utils【全局工具配置使用】

##项目启动
开发环境启动-npm run dev
环境打包-npm run build