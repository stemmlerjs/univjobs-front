import React from 'react'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { StudentSignupContainer } from '../containers'

// Purpose of IndexRoute - if none of the routes match, we go here
export default function getRoutes(checkAuth) {
  return (
    <Router history={hashHistory}>
      <Router path='/' component={StudentSignupContainer} >
      </Router>
    </Router>
  )
}