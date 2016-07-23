import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { SignupContainer, StudentProfileContainer, 
  EmployerProfileContainer, CategoriesContainer } from '../containers'
import { checkIfAuthed } from 'helpers/auth'



// Purpose of IndexRoute - if none of the routes match, we go here
export default function getRoutes() {

  return (
    <Router history={hashHistory} >
      <Route path='/' component={SignupContainer} />
      <Route path='profile/st' component={StudentProfileContainer} />
      <Route path='profile/em' component={EmployerProfileContainer} />
      <Route path='categories' component={CategoriesContainer} />
    </Router>
  )
}


export function authRedirectFilter({successRedirect, failureRedirect}, store, router) {
  checkIfAuthed(store)
    .then(() => {
      const isAStudent = store.getState().user.isAStudent
      console.log("AUTH: Successful auth!")
      
      if(successRedirect) {
        if(successRedirect.student && isAStudent) {
          console.log(`AUTH: 'Student' redirect provided. GOTO: ${successRedirect.student}`)
          router.replace(successRedirect.student)
        } else if (successRedirect.employer && !isAStudent){
          console.log(`AUTH: 'Employer' redirect provided. GOTO: ${successRedirect.employer}`)
          router.replace(successRedirect.employer)
        }
      }
    })
    .catch((err) => {
      if(failureRedirect) {
        if(failureRedirect.student && isAStudent) {
          console.log(`AUTH: Failed 'Student' auth redirect provided. GOTO: ${failureRedirect.student}`)
          router.replace(failureRedirect.student)
        } else if (failureRedirect.employer && !isAStudent){
          console.log(`AUTH: Failed 'Employer' auth redirect provided. GOTO: ${failureRedirect.employer}`)
          router.replace(failureRedirect.employer)
        }
      } else {
        console.log(`AUTH: Failed auth, no redirect provided.`)
      }
    })
}

