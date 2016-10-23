import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import * as reducers from 'redux/modules'
import thunk from 'redux-thunk'
import { reducer as formReducers } from 'redux-form'
import { initializeBodyStyles } from 'helpers/styles'

// Initialize CSS Styles for BODY tag
initializeBodyStyles();

// ======================================================== //
// ================ APP ROOT REDUCERS ===================== //
// ======================================================== //

/* NOTE: Testing redux-form
 * */
reducers.form = formReducers 

console.log(reducers)
const appReducer = combineReducers(reducers)
const rootReducer = (state, action) => {

  // When the Redux action LOGGING_OUT is called from anywhere,
  // force initialstate on the entire Redux store by setting state
  // to === undefined.

  if(action.type === 'LOGGING_OUT') {
    state = undefined
  }

  // Return the appReducer 

  return appReducer(state, action)
}

const store = createStore(rootReducer, 
  compose(applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));


ReactDOM.render(
  <Provider store={store}>
    { getRoutes() }
  </Provider>,
  document.getElementById('app')
)

// ======================================================== //
// ===================== TEST INIT ======================== //
// ======================================================== //

const initTest = false;

if(initTest) {

}
