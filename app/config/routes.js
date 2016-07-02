import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { SignupContainer, CreateStudentProfileContainer } from '../containers'
import { syncHistoryWithStore } from 'react-router-redux'

// Purpose of IndexRoute - if none of the routes match, we go here
export default function getRoutes(store, checkAuth) {
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Router history={history}>
      <Route path='/' component={SignupContainer}/>
      <Route path='create/student' component={CreateStudentProfileContainer} />
    </Router>
  )
}

