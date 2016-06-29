import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { Users } from 'redux/modules'
import thunk from 'redux-thunk'

import { initializeBodyStyles } from 'helpers/styles'
initializeBodyStyles();

const store = createStore(Users, 
  compose(applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

ReactDOM.render(
  <Provider store={store}>
    { getRoutes() }
  </Provider>,
  document.getElementById('app')
)