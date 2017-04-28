## 目录
* [开发环境](#开发环境)
* [构建好的目录](#构建好的目录)
* [npm初始化package.json](#npm初始化packagejson)
* [安装React基础框架](#安装React基础框架)
* [安装webpack和webpack-dev-server](#安装webpack和webpack-dev-server)
* [创建并配置webpack.config.js](#创建并配置webpackconfigjs)
* [定义ActionType](#定义ActionType)
* [定义reducer](#定义reducer)
* [生成store对象用于管理react中的state](#生成store对象用于管理react中的state)
* [生成store对象用于管理react中的state](#生成store对象用于管理react中的state)
* [编辑actions](#编辑actions)
* [安装react-router](#安装react-router)
* [Redux配合react-router使用](#Redux配合react-router使用)
* [写一个使用了store数据的React组件](#写一个使用了store数据的React组件)
* [在package.json中添加scripts](#在packagejson中添加scripts)
* [结束](#结束)


## 开发环境
* macOS
* [node](https://nodejs.org/en/download/)
* [npm](https://docs.npmjs.com/getting-started/installing-node)
* [atom](https://atom.io/)
注：如连接无法打开请使用代理

## 构建好的目录

```
react_cli
├── build
├── node_modules
├── src
├──├──assets
├──├──components
├──├──config
├──├──containers
├──├──redux
├──├──├──actions
├──├──├──configureStore
├──├──├──constants
├──├──├──reducers
├──├──index.jsx
├── .babelrc
├── package.json
├── webpack.config.js
```
## npm初始化package.json

```
➜ mkdir react-cli       #新建项目文件夹
➜ cd react-cli          #进入
➜ npm init  #初始化package.json

name: (react_cli)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author: Asir
license: (ISC)
```
根据提示输入内容，也可以直接回车，然后在package.json文件中修改

## 安装React基础框架

```
➜ npm install --save react react-dom

├── react@15.4.1
├── react-dom@15.4.1
```
## 安装webpack和webpack-dev-server

```
➜ npm install --save webpack webpack-dev-server

├── webpack@2.3.2 #用于将代码整体打包压缩输出的工具
├── webpack-dev-server@2.4.2 #用于开发模式代码调试与热更新
```
## 安装配置webpack用到的库

* babel相关的库，用来打包编译转换为目前主流浏览器支持的JS语法

```
➜ npm install --save-dev babel babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-3
├── babel@6.23.0
├── babel-loader@6.4.1
├── babel-preset-es2015@6.24.0  #打包编译ES6转ES5的库
├── babel-preset-react@6.23.0   #打包编译jsx语法
├── babel-preset-stage-3@6.22.0 #打包编译async|await语法
```
更多babel相关请查阅[官方文档](https://babeljs.io)、[中文网](http://babeljs.cn)

* style相关库，用来打包css，编译less、sass

```
➜ npm install --save-dev  style-loader css-loader less-loader sass-loader less node-sass
├── style-loader@0.16.1
├── css-loader@0.27.3
├── less-loader@4.0.2
├── sass-loader@6.0.3
├── less@2.7.2
├── node-sass@4.5.1
```

* path 用于拼接路径

```
➜ npm install --save-dev path
├── path@0.12.7
```

* html-webpack-plugin 模板插件用于导出html时，可以使用模板

```
➜ npm install --save-dev html-webpack-plugin
├── html-webpack-plugin@2.28.0
```

## 创建并配置webpack.config.js

```
➜ atom webpack.config.js

var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports= {
  entry:  path.resolve(APP_PATH, 'index.jsx'),
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  //babel重要的loader在这里
  module: {
    rules: [
      {
        test: /\.(less|scss|css)$/,
        loaders: ['css-loader', 'sass-loader', 'less-loader']
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: APP_PATH,
      }
    ]
  },

  devtool: 'eval-source-map', //开发环境

  devServer: {
   compress: true, // 启用Gzip压缩
   historyApiFallback: true, // 为404页启用多个路径
   hot: true, // 模块热更新，配置HotModuleReplacementPlugin
   https: false, // 适用于ssl安全证书网站
   noInfo: true, // 只在热加载错误和警告
   // ...
 },

 plugins: [
   new HtmlwebpackPlugin({
    title: '记账本',
    template: 'build/template/index.html'
  })
 ],
}
```

更多webpack配置查看[http://webpack.github.io/](http://webpack.github.io/)

创建.babelrc,用于babel调用的插件配置

```
➜ atom .babelrc

{
  "presets": ["es2015","react", "stage-3"]
}

```
更多babel配置查看[https://babeljs.io/](https://babeljs.io/)


## 安装Redux及相关组件
```
npm install --save react-redux
npm install --save redux redux-thunk redux-logger
npm install --save redux-immutablejs immutable
```
关于immutable的使用请参考[http://www.jianshu.com/p/dec712858b27](http://www.jianshu.com/p/dec712858b27)

## 定义ActionType
在目录src/redux/constants下新建index.js

```
export const EXAMPLE = 'EXAMPLE'
```

## 定义reducer
在目录src/redux/reducers下新建index.js

```
import { combineReducers } from 'redux'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import {
  EXAMPLE
} from '../constants'

const example = createReducer(fromJS({
  title: "项目构建成功"
}),{
  [EXAMPLE]: (state, action) => {
    return state.merge({
          title: action.payload.title
    })
  }
})

const rootReducer = combineReducers({
  example
})

export default rootReducer

```


## 生成store对象用于管理react中的state

在目录src/redux/configureStore下新建index.js


```
➜ cd src/redux/configureStore && atom index.js
```


index.js内容如下

```
import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import createLogger from 'redux-logger';

const logger = createLogger({
  level: 'info',
  logger: console,
  collapsed: true
})
const createStoreWithMiddleware = process.env.NODE_ENV === 'development' ? applyMiddleware(
  thunk, logger
)(createStore) : applyMiddleware(
  thunk
)(createStore)

export default configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}

```
代码中使用了redux中的createStore方法用于生成store对象和applyMiddleware方法用于redux中间件，中间件使用了redux-thunk用于actions扩展，也就是上一节我们留下的一个疑问。actions中除了可以写包含type属性的对象外，使用thunk中间件后可以在actions写业务数据逻辑，

## 编辑actions
在src/redux/actions目录下新建example.js

```
import {
  EXAMPLE
} from '../constants'

function example(val){
  return {
    type: EXAMPLE,
    payload: {
      title: val
    }
  }
}

export function changeTitle(val){
  return (dispatch, getState) => {
    dispatch(example(val))
  }
}
```
redux框架的设计原理参考[http://www.jianshu.com/p/ec820d8581cd](http://www.jianshu.com/p/ec820d8581cd)


## 安装react-router
基础路由库

```
npm install --save react-router
```
使用文档:[https://github.com/ReactTraining/react-router](https://github.com/ReactTraining/react-router)

## 安装react-router-redux
```
npm install --save react-router-redux
```

使用文档:[https://github.com/reactjs/react-router-redux](https://github.com/reactjs/react-router-redux)

## Redux配合react-router使用
history + store (redux) → react-router-redux → enhanced history → react-router

src/containers/rootRoutes.jsx

```
import React,{Component} from 'react'
import {Provider} from 'react-redux'
import { Router, Route, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Example from './example'
export default class Root extends Component{
	render(){
		const {store} = this.props
		const history = syncHistoryWithStore(browserHistory, store)
		return (
			<Provider store={store}>
			  <div>
			    <Router history={browserHistory}>
						<Route path="/" component={Example}/>
			    </Router>
			  </div>
			</Provider>
		)
	}
}

```

configureStore/index.js

```
import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import { createLogger } from 'redux-logger';
import { routerMiddleware} from 'react-router-redux'
import { browserHistory} from 'react-router'

const middleware = routerMiddleware(browserHistory)
const logger = createLogger({
  level: 'info',
  logger: console,
  collapsed: true
})
const createStoreWithMiddleware = process.env.NODE_ENV === 'production' ? applyMiddleware(
  middleware, thunk
)(createStore) : applyMiddleware(
  middleware, thunk, logger
)(createStore)

const configureStore = (initialState) => {
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}
export default configureStore
```
更多react-router使用方法查看[https://github.com/ReactTraining/react-router](https://github.com/ReactTraining/react-router)

## 写一个使用了store数据的React组件
src/containers/example.jsx
```

import React, { Component }from 'react'
import { render } from 'react-dom'
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from 'Actions'

class Example extends Component {
  constructor(props) {
    super(props);
  }
  showModal (e) {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.props.actions.changeTitle("React世界欢迎您")
  }
  render() {
    return (
      <div>
         <input readOnly onClick={this.showModal.bind(this)} value={this.props.example.title} style={{width:'100%', height:'50px', border:0, background:"#CCCCCC"}}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    example: state.example.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(Example)

```

## 在package.json中添加scripts

```
"scripts": {
    "start": "webpack-dev-server --hot --inline --port 8080 --host 192.168.31.182",  #添加项
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

现在启动webpack-dev-server, 可以在浏览器中看到，输出的HelloWorld页

	➜ npm start


## 结束
至此，我们使用webpack, babel, redux, react-router及相关库构建了基于React的脚手架。
