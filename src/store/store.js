import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


import rootReducer from './reducers'

import { composeWithDevTools } from "redux-devtools-extension";
const middlewares = [thunk ];
//Create store
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
)
)


export default store;