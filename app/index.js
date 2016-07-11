import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import * as reducers from 'redux/modules'
import thunk from 'redux-thunk'
import { initializeBodyStyles } from 'helpers/styles'

// Initialize CSS Styles for BODY tag
initializeBodyStyles();

const store = createStore(combineReducers(reducers), 
  compose(applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));


ReactDOM.render(
  <Provider store={store}>
    { getRoutes() }
  </Provider>,
  document.getElementById('app')
)