module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/': {
        target:'http://testoms.hdnmgroup.com/ordercenter/',//测试接口
        // target:'http://eoms.hdnmgroup.com/ordercenter/',//生产线上接口
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        },
        timeout: 60000 * 60 * 2 * 2,
      }
    }
  },
  configureWebpack: {
    externals: {
      echarts: "echarts" // 配置使用CDN
    },

    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }

  }
}