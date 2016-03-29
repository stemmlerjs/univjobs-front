import React from 'react'
import {  browserHistory, Router, Route, IndexRoute } from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <Route path='/home' component={Home} />
    </Route>
  </Router>
)

export default routes
