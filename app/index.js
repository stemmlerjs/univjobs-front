import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import * as reducers from 'redux/modules'
import thunk from 'redux-thunk'
//import createLogger from 'redux-logger'

// Import createMiddleware and a target
import { createMiddleware } from 'redux-beacon';
import { GoogleAnalytics } from 'redux-beacon/targets/google-analytics';

//Forms and toastr
import { reducer as formReducers } from 'redux-form'
import { reducer as toastrReducer, ReduxToastr } from 'react-redux-toastr'

//Styles
import { initializeBodyStyles } from 'helpers/styles'

window.React = React

// Initialize CSS Styles for BODY tag
initializeBodyStyles();

// ======================================================== //
// ================ APP ROOT REDUCERS ===================== //
// ======================================================== //

/* NOTE: Testing redux-form
 * */
reducers.form = formReducers
reducers.toastr = toastrReducer


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

// Define an event
const pageView = action => ({
    hitType: 'pageview',
     page: action.payload,
})

// Map the event to a Redux action
const eventsMap = {
    LOCATION_CHANGE: pageView,
}

// Create the middleware
const middleware = createMiddleware(eventsMap, GoogleAnalytics);

const store = createStore(rootReducer,
  compose(applyMiddleware(thunk, middleware),
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
