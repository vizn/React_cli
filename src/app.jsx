import React, { Component }from 'react'
import { render } from 'react-dom'
import {  Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import configureStore from './redux/configureStore'
import Root from './containers/rootRoutes'

const store = configureStore()
const app = document.createElement('div')
document.body.appendChild(app)
render(  <Root store={store} />, app)
