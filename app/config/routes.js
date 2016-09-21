
import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { SignupContainer, StudentProfileContainer, EmployerProfileContainer, InitialOverlay, CategoriesContainer, CreateJobContainer } from 'modules'
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
          <Route path='/job/create/:jobtype' component={CreateJobContainer} />
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

export function authRedirectFilter({successRedirect, failureRedirect, restricted, profileIncompleteRedirect}, store, router) {

  /*
  * isUserInRestrictedRoute()
  * 
  * Based on if the current user is in a restricted route, the user will be redirected to a
  * new route. 
  * 
  * @param (boolean) - isAStudent
  * @return (boolean)
  * @see {restricted}
  */

  function isUserInRestrictedRoute(isAStudent) {
    if(restricted) {

      // If the route is restricted to EMPLOYERS and the user is a STUDENT
      if(restricted.to === 'EMPLOYERS' && isAStudent) {
        console.log(`AUTH: 'Student' in an Employer only route. GOTO: ${restricted.redirectTo}`)
        router.replace(restricted.redirectTo)
        return true;

      // If the route is restricted to STUDENTS and the user is an employee
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

 /*
  * profileIncompleteRedirectCheck()
  * 
  * Based on if the current user is in a restricted route, the user will be redirected to a
  * new route. 
  *  
  * @param
  * @see {restricted}
  */

  function profileIncompleteRedirectCheck(isProfileCompleted, profileIncompleteRedirect, isAStudent,cb) {
    if((profileIncompleteRedirect === true) && (isProfileCompleted === false)) {
      if(isAStudent) {
        router.replace('/profile/st')
        cb(false)
      } else {
        router.replace('/profile/em')
        cb(false)
      }
    } else {
      cb(true)
    }
  }

  const promise = new Promise((resolve, reject) => {
    let isAStudent;
    let inRestrictedRoute;
    let isProfileCompleted;

    checkIfAuthed(store)
    .then(() => {

      // After authentication, we know if the user is a student or an employer
      isAStudent = store.getState().user.isAStudent
      inRestrictedRoute = isUserInRestrictedRoute(isAStudent)
      isProfileCompleted = store.getState().user.isProfileCompleted

      // Now, we want to redirect the user back to /profile IF their profile is not complete and we have configured
      // this to happen for the route in question.

      profileIncompleteRedirectCheck(isProfileCompleted, profileIncompleteRedirect, isAStudent, (result) => {
        if(!result) {
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
        }
      })

      resolve()
    })
    .catch((err) => {

      // After authentication, we know if the user is a student or an employer
      isAStudent = store.getState().user.isAStudent
      inRestrictedRoute = isUserInRestrictedRoute(isAStudent)
      isProfileCompleted = store.getState().user.isProfileCompleted

      // Now, we want to redirect the user back to /profile IF their profile is not complete and we have configured
      // this to happen for the route in question.

      profileIncompleteRedirectCheck(isProfileCompleted, profileIncompleteRedirect, isAStudent, (result) => {
        if(!result) {
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
        }
      })
      resolve();
    })
  })

  return promise;

}

