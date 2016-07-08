import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { SignupContainer, StudentProfileContainer, 
  EmployerProfileContainer, CategoriesContainer } from '../containers'

// Purpose of IndexRoute - if none of the routes match, we go here
export default function getRoutes(checkAuth) {

  return (
    <Router history={hashHistory}>
      <Route path='/' component={SignupContainer}/>
      <Route path='profile/st' component={StudentProfileContainer} />
      <Route path='profile/em' component={EmployerProfileContainer} />
      <Route path='categories' component={CategoriesContainer} />
    </Router>
  )
}

