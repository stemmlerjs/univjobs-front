
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
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager';


import { logger } from 'redux-beacon/extensions/logger';

//Forms and toastr
import { reducer as formReducers } from 'redux-form'
import { reducer as toastrReducer, ReduxToastr } from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux'

//Styles
import { initializeBodyStyles } from 'helpers/styles'

/*
 * Google Analytics events that map 
 * to redux actions.
 */

import eventsMap from 'analytics'
import Raven from 'raven-js';

// Set React to be global
window.React = React

// Configure Raven 
window.Raven = Raven;
Raven
    .config('https://10cfc8899913429fb9c9d3d5295e1f60@sentry.io/199562')
    .install();

// Initialize CSS Styles for BODY tag
initializeBodyStyles();

// ======================================================== //
// ================ APP ROOT REDUCERS ===================== //
// ======================================================== //

reducers.form = formReducers
reducers.toastr = toastrReducer

/*
 * Create the reducer for the entire app.
 * This defines all of the keys on the store through
 * the @@INIT patch that it will do with each sub-reducer.
 */

const appReducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

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

/*
 * Create the Google Analytics middleware for event mapping.
 * We take all of the mappings from the eventsMap object; this
 * tells us which analytics events to dispatch for what redux actions.
 */

console.log('[Univjobs]: Starting the app in ENV =', process.env.CURRENT_ENV)
const googleAnalyticsMiddleware = process.env.CURRENT_ENV === 'dev' ? createMiddleware(eventsMap, GoogleAnalytics, { logger }) : createMiddleware(eventsMap, GoogleAnalytics)
const tagManagerMiddleware = createMiddleware(eventsMap, GoogleTagManager());

/*
 * Apply all the middleware to create the redux store.
 * Specify the:
 * 
 * - root reducer with all of the keys for our store on it.
 * - redux thunk middleware
 * - google analytics middleware 
 * - chrome dev tools extension
 */

const store = createStore(rootReducer,
  compose(applyMiddleware(thunk, googleAnalyticsMiddleware, tagManagerMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

/*
 * Finally, render the react dom and create the store 
 * with all of it's fancy things on it.
 */

ReactDOM.render(
  <Provider store={store}>
    { getRoutes(store) }

  </Provider>,
  document.getElementById('app')
)
