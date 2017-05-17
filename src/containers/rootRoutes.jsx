import React,{Component} from 'react'
import {Provider} from 'react-redux'
import { Router, Route, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Example from './example'
import Ex from './ex'

export default class Root extends Component{
	render(){
		const {store} = this.props
		const history = syncHistoryWithStore(browserHistory, store)
		return (
			<Provider store={store}>
			  <div>
			    <Router history={history}>
						<Route path="/ex/am" component={Example}/>
						<Route path="/" component={Ex}/>
			    </Router>
			  </div>
			</Provider>
		)
	}
}
