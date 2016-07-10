import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import * as reducers from 'redux/modules'
import thunk from 'redux-thunk'
import { initializeBodyStyles } from 'helpers/styles'
import { checkIfAuthed } from 'helpers/auth'

// Initialize CSS Styles for BODY tag
initializeBodyStyles();

const store = createStore(combineReducers(reducers), 
  compose(applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

function checkAuth (nextState, replace) {
  var isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname

  // If you're logged in, you can't get here
  if (nextPathName === '/' || nextPathName === '/login') {
    if (isAuthed === true) {
      replace('/profile/st')
    }
  // If you're not logged in, you're going here
  } else {
    if (isAuthed !== true) {
      replace('/')
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    { getRoutes(checkAuth) }
  </Provider>,
  document.getElementById('app')
)