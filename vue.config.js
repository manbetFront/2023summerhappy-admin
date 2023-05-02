const path = require('path');
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");


module.exports = {
  // 公共路径
  publicPath: '/',
  // 不同的环境打不同包名
  outputDir: 'dist',
  assetsDir: 'static',
  //此处引入第三方插件
  pluginOptions: {
  },


  //打包时是否产生map文件
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',

  //对内部的 webpack 配置进行更细致的修改
  chainWebpack: config => {
    //在路由中用懒加载时，webpack默认有预加载此设置是关闭预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    //压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
    // 设置别名
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'))
      .set('@service', path.resolve(__dirname, './src/services/modules'))
      .set('@utils', path.resolve(__dirname, './src/utils'))

    config.module.rules.delete("svg");
    config.module
      .rule("svg-smart")
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/assets/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]"
      });

    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config.output.filename('[name].[hash:8].js').end();
  },

  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      }),
      // 将 dll 注入到 生成的 html 模板中
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: '/vendor',
        // dll最终输出的目录
        outputPath: './vendor'
      }),

      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$/, // 需要压缩的文件类型
        threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      })

    ]
  }

}

