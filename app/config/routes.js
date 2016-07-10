import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { SignupContainer, StudentProfileContainer, 
  EmployerProfileContainer, CategoriesContainer } from '../containers'

// Purpose of IndexRoute - if none of the routes match, we go here
export default function getRoutes(checkAuth) {

  return (
    <Router history={hashHistory}>
      <Route path='/' component={SignupContainer} onEnter={checkAuth}/>
      <Route path='profile/st' component={StudentProfileContainer} onEnter={checkAuth}/>
      <Route path='profile/em' component={EmployerProfileContainer} onEnter={checkAuth}/>
      <Route path='categories' component={CategoriesContainer} onEnter={checkAuth}/>
    </Router>
  )
}

