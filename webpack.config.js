var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var CompressionPlugin = require('compression-webpack-plugin')


var APP_PATH = path.resolve(__dirname, 'src');
var BUILD_PATH = path.resolve(__dirname, 'build');
var PublicPath = '/';
var devtool = 'eval-source-map';
var plugins = [
    new HtmlwebpackPlugin({
      title: '',
      template: './assets/template/index.html',
      inject: true, //自动注入
      minify: {
        removeComments: true, //去注释
        collapseWhitespace: true, //压缩空格，
        removeAttributeQuotes: true // 去掉属性引用
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.min.js?[hash:6]',
      minChunks: 2,
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false, //去掉注释
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new CompressionPlugin({ //Gzip压缩
      asset: "[path].gz",
      algorithm: "gzip",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ExtractTextPlugin({
      filename: "[name].css?[hash:6]",
      disable: process.env.NODE_ENV === "development"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.HotModuleReplacementPlugin(),
  ]
if (process.argv.indexOf('-p') > -1) {
  plugins.push(new webpack.DefinePlugin({//生产环境
      'process.env': {
          NODE_ENV: JSON.stringify('production')
      }
  }));
  devtool = false;
  PublicPath = 'https://static.jyall.com/jywk/'
}

module.exports= {
  context: APP_PATH,
  entry:  {
    app: './app.jsx',
    vendors: [
      'zscroller',
      'whatwg-fetch',
      'react',
      'react-dom',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'redux-immutablejs'
    ]
  },
  output: {
    publicPath: PublicPath,
    path: BUILD_PATH,
    filename: 'assets/js/[name].js?[hash:6]',
    chunkFilename: "assets/js/[name].js?[hash:6]"
  },
  //babel重要的loader在这里
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1',
            'px2rem-loader?remUnit=100', //移动端rem适配
            'postcss-loader',
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1',
            'px2rem-loader?remUnit=100', //移动端rem适配
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1',
            'px2rem-loader?remUnit=100', //移动端rem适配
            'postcss-loader',
            'less-loader',
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192&name=assets/images/[name].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: APP_PATH,
      }
    ]
  },
  devtool: devtool, //开发环境
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /$uri/, to: '/index.html' }
      ]
    },
    compress: true, // 启用Gzip压缩
    hot: true, // 模块热更新，配置HotModuleReplacementPlugin
    https: false, // 适用于ssl安全证书网站
    noInfo: false, // 只在热加载错误和警告
    proxy: {
      "/v1/data/*": {
        target: "http://10.10.32.156",
        secure: false
      }
    }
  },
  resolve: {
      extensions: ['.web.js','.js', '.jsx', '.json', '.css', '.less' , '.scss'],//后缀名自动补全
      alias: {
          Styles: path.resolve(__dirname, 'src/assets/styles/'),
          Actions: path.resolve(__dirname, 'src/redux/actions/'),
          Config: path.resolve(__dirname, 'src/config/')
      }
  },
  plugins: plugins
}
