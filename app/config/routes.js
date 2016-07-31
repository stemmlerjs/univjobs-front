import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { SignupContainer, StudentProfileContainer, EmployerProfileContainer, InitialOverlay, CategoriesContainer } from 'modules'
import { checkIfAuthed } from 'helpers/auth'

// Purpose of IndexRoute - if none of the routes match, we go here
export default function getRoutes() {

  return (
    <Router history={hashHistory} >
        <Route path='/' component={InitialOverlay}>
          <Route path='/join' component={SignupContainer} />
          <Route path='/profile/st' component={StudentProfileContainer} />
          <Route path='/profile/em' component={EmployerProfileContainer} />
          <Route path='/categories' component={CategoriesContainer} />
        </Route>
    </Router>
  )
}

/** 
  * authRedirectFilter
  *
  *   - This is a custom auth handler for doing page redirects based on the type of the user and their
  *     authentication status. 
  *   - While we initially wanted to use react-router's onEnter, there was an issue with
  *     doing asynchronous calls inside of the associated function to determine if the user's token is in fact- valid.
  *   - To use this, we must
  *
  * @params (Object) - the config object containing 3 optional attributes
  * @params (Object) - store : the redux store to check if the user is a student or employer
  * @params (Object) - router : react-router to perform the resulting redirect if necessary
  * @see - SignupContainer & EmployeeProfileContainer's "componentWillMount" on how to provide the config
  * 

  Structure of the config object:
    - the restricted attribute has the highest precedence on successful auth. If the user is able to authenticate, 
      the restricted redirect will be taken first before the successRedirect.
    - on a failed auth, the failureRedirect will be taken

    {
      successRedirect: {                (depending on user type, one of these urls will be used in a redirect)
        student: '/jobs/feed',
        employer: '/applications/feed'  
      },
      failureRedirect: '/join'              (this is taken upon unsuccessful authentication)
      restricted: {
        to: 'EMPLOYERS' || 'STUDENTS'   (use one of these to restrict the other)
        redirectTo: '/profile/st'       (usually the converse equivalent of the route)
      }
    }
  */

export function authRedirectFilter({successRedirect, failureRedirect, restricted}, store, router) {
  const isAStudent = store.getState().user.isAStudent
  const inRestrictedRoute = isUserInRestrictedRoute(isAStudent)

  function isUserInRestrictedRoute(isAStudent) {
    if(restricted) {
      if(restricted.to === 'EMPLOYERS' && isAStudent) {
        console.log(`AUTH: 'Student' in an Employer only route. GOTO: ${restricted.redirectTo}`)
        router.replace(restricted.redirectTo)
        return true;
      } else if (restricted.to === 'STUDENTS' && !isAStudent) {
        console.log(`AUTH: 'Employer' in a Student only route. GOTO: ${restricted.redirectTo}`)
        router.replace(restricted.redirectTo)
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  const promise = new Promise((resolve, reject) => {
    checkIfAuthed(store)
    .then(() => {
      console.log("AUTH: Successful auth!")
      if(successRedirect && !inRestrictedRoute) {
        if(successRedirect.student && isAStudent) {
          console.log(`AUTH: 'Student' redirect provided. GOTO: ${successRedirect.student}`)
          router.replace(successRedirect.student)
        } else if (successRedirect.employer && !isAStudent){
          console.log(`AUTH: 'Employer' redirect provided. GOTO: ${successRedirect.employer}`)
          router.replace(successRedirect.employer)
        }
      }
      resolve()
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
      resolve();
    })
  })

  return promise;

}

