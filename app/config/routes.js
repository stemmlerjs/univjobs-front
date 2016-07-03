import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { SignupContainer, CreateStudentProfileContainer, 
  CreateEmployerProfileContainer } from '../containers'

// Purpose of IndexRoute - if none of the routes match, we go here
export default function getRoutes(checkAuth) {

  return (
    <Router history={hashHistory}>
      <Route path='/' component={SignupContainer}/>
      <Route path='createaccount/st' component={CreateStudentProfileContainer} />
      <Route path='createaccount/em' component={CreateEmployerProfileContainer} />
    </Router>
  )
}

