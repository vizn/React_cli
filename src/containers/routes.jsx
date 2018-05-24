import React, { Component } from 'react';

class Roots extends Component {
  render () {
    return (
      <div className="route-div" id="route_div">{this.props.children}</div>
    );
  }
}
const routes = {
  childRoutes: [{
    path: '/',
    component: Roots,
    indexRoute: {
      getComponent (nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./example').default)
        }, 'home')
      }
    },
    childRoutes: [{
      path: 'ex',
      onEnter: () => {
        location.href = 'https://m.jyall.com'
      },
      getComponent (nextState, callback) {
        require.ensure([], require => {
          callback(null, require('./ex').default)
        }, 'example')
      }
    }]
  }]
}

export default routes
