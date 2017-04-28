import { combineReducers } from 'redux'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { routerReducer } from 'react-router-redux'
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
  example,
  routing: routerReducer
})

export default rootReducer
