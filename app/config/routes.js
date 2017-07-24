import React from 'react'
import { Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
import { ApplicationsContainer, CategoriesContainer, CreateJobContainer, ContactPageContainer, 
         EmployerProfileContainer, EmployerDashboardContainer, InitialOverlay,
        SignupContainer, StudentDashboardContainer, StudentProfileContainer,
        AboutPageContainer, PinJobsContainer, MyListingsContainer,
        ApplicantsContainer, PasswordResetContainer, PageNotFoundContainer,
        Terms, Privacy, StudentSettingsContainer, PublicJobViewContainer } from 'modules'
import { checkIfAuthed } from 'helpers/auth'
import { syncHistoryWithStore } from 'react-router-redux'

// Purpose of IndexRoute - if none of the routes match, we go here
export default function getRoutes(store) {
  const history = syncHistoryWithStore(hashHistory, store)
  return (
    <Router history={history} >
        <Route path='/' component={InitialOverlay}>
          <Route path='/join' component={SignupContainer} />
          <Route path='/password/reset' component={PasswordResetContainer}/>
          <Route path='/password/confirm/:code' component={PasswordResetContainer} />

          <Route path='/profile/st' component={StudentProfileContainer} />
          <Route path='/profile/st/token/:token' component={StudentProfileContainer} />
          <Route path='/profile/em' component={EmployerProfileContainer} />
          <Route path='/profile/em/token/:token' component={EmployerProfileContainer} />

          <Route path='/categories' component={CategoriesContainer} />
          <Route path='/job/create/:jobtype' page={'createjob'} component={CreateJobContainer} />


          {
            /*
             * Private Job view urls
             */
          }
	        <Route path='/dashboard/st' page={'dashboard'} component={StudentDashboardContainer} />
          <Route path='/dashboard/st/:jobId' component={StudentDashboardContainer} />
          <Route path='/myapplications/st' page={'applications'} component={StudentDashboardContainer} />
          <Route path='/myapplications/st/:jobId' page={'applications'} component={StudentDashboardContainer} />
          <Route path='/pinnedjobs' page={'pinnedjobs'} component={StudentDashboardContainer} />
          <Route path='/pinnedjobs/:jobId' page={'pinnedjobs'} component={StudentDashboardContainer} />
          <Route path='/invitations' page={'invitations'} component={StudentDashboardContainer} />
          <Route path='/invitations/:jobId' page={'invitations'} component={StudentDashboardContainer} />

          {
            /*
             * Public Job view url
             */
          }

          <Route path='/posting/:jobId' component={PublicJobViewContainer} />

          <Route path='/dashboard/em' component={EmployerDashboardContainer} />
          <Route path='/myapplicants/em' component={ApplicantsContainer} />
          
          <Route path='/mylistings/em' component={MyListingsContainer} />
          <Route path='/settings/st' component={StudentSettingsContainer} />
          <Route path='contact-us' component={ContactPageContainer} />
          <Route path='about-us' component={AboutPageContainer} />
          <Route path='terms' component={Terms} />
          <Route path='privacy' component={Privacy} />
          <Route path='*' component={PageNotFoundContainer} />
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

export function authRedirectFilter({successRedirect, failureRedirect, restricted, profileIncompleteRedirect, justCheckAuth}, store, router) {
  console.log("Success redirect", successRedirect)

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

  function isUserInRestrictedRoute(isAStudent, cb) {
    if(restricted) {

      // If the route is restricted to EMPLOYERS and the user is a STUDENT
      if(restricted.to === 'EMPLOYERS' && isAStudent) {
        console.log(`AUTH: 'Student' in an Employer only route. GOTO: ${restricted.redirectTo}`)
        cb(true, restricted.redirectTo)

      // If the route is restricted to STUDENTS and the user is an employee
      } 
      
      else if (restricted.to === 'STUDENTS' && !isAStudent) {
        console.log(`AUTH: 'Employer' in a Student only route. GOTO: ${restricted.redirectTo}`)
        cb(true, restricted.redirectTo)
      }
      cb(false)
    } else {
      cb(false)
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

  function profileIncompleteRedirectCheck(isProfileCompleted, profileIncompleteRedirect, isAStudent, cb) {
    if((profileIncompleteRedirect === true) && (isProfileCompleted === 0)) {
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
    let isEmailVerified;

   /*
    * Confirm if the user is authenticated or not.
    * After this API call, we will be able to make decisions based on 
    * if the user isAuthenticated or not.
    */

    checkIfAuthed(store)
    .then(() => {

     /*
      * If justCheckAuth was set to TRUE, then we'll resolve this and not continue further any more.
      * We use this in places like the PublicJobViewContainer when we just want to know
      * if the user is logged in or not so we can know whether to display an option 
      * to "View in-app job".
      */

      if (justCheckAuth) {

        resolve()

      }

      /*
       * Otherwise, we're going to go ahead and do all of the redirection
       * configuration things that we do in most pages.
       */

      else {

        // After authentication, we know if the user is a student or an employer
        isAStudent = store.getState().user.isAStudent
        isUserInRestrictedRoute(isAStudent, (inRestrictedRoute, immediateRedirectTo) => {

          if(inRestrictedRoute) {
            router.replace(immediateRedirectTo)
            resolve()
          } 
          
          else {
            isProfileCompleted = store.getState().user.isProfileCompleted // 0 or 1
            isEmailVerified = store.getState().user.emailVerified         // boolean

            /*
              * If the profile wasn't completed and we're on a different page from the profile, just redirect to the profile page for 
              * either a student or an employer
              */

              if ((isProfileCompleted === 0 || !isEmailVerified) && isAStudent && window.location.href.indexOf('profile') === -1) {
                router.replace('/profile/st')
                resolve()
              }

              else if ((isProfileCompleted === 0 || !isEmailVerified) && !isAStudent && window.location.href.indexOf('profile') === -1) {
                router.replace('/profile/em')
                resolve()
              }

              /*
              * If we're on the profile page after being redirected there.
              */

              else if ((isProfileCompleted === 0 || !isEmailVerified) && window.location.href.indexOf('profile') !== -1) {
                resolve({isProfileCompleted, isEmailVerified})
              }

              else {

                /*
                * If the user's profile is not complete and it should be, redirect them to
                * where they really should be. Auth, however; was successful.
                */

                if((isProfileCompleted === 0 || !isEmailVerified)) {

                  console.log("AUTH: Successful auth but profile not complete!")

                  /*
                  * If the user is NOT in a restricted route and we've set where they need to redirect
                  * themselves to after successful auth. Like going to the /join page and already being logged in.
                  */

                  if(successRedirect && !inRestrictedRoute) {

                    /*
                    * If you're a student and we've set the success redirect config
                    */

                    if(successRedirect.student && isAStudent) {
                      console.log(`AUTH: 'Student' redirect provided. GOTO: ${successRedirect.student}`)
                      router.replace(successRedirect.student)

                      resolve({
                        isProfileCompleted,
                        isEmailVerified
                      })
                    } 

                    /*
                    * If you're an employer and we've set the success redirect config
                    */
                    
                    else if (successRedirect.employer && !isAStudent){
                      console.log(`AUTH: 'Employer' redirect provided. GOTO: ${successRedirect.employer}`)
                      router.replace(successRedirect.employer)

                      resolve({
                        isProfileCompleted,
                        isEmailVerified
                      })
                    }

                    /*
                    * If we forgot to set the config, do nothing. Stay at the /join page or whatever.
                    */

                    else {

                      resolve()

                    }

                  }

                  /*
                  * If successRedirect wasn't set at all OR you're in a restricted route, we gotta take you home.
                  */

                  else {
                    console.log("--------> routes.js line 243")
                    router.replace('/join')

                    reject();

                  }
                }

              /*
                * The user's profile is complete. Let them continue doing what they were doing.
                */

                else {

                  /*
                  * If you're on the login page and you're authenticated + profile is complete,
                  * go to dashboard.
                  */

                  if (window.location.href.indexOf('join') !== -1) {
                    if (isAStudent) {
                      router.replace('/dashboard/st')
                      resolve()
                    }

                    else {
                      router.replace('/dashboard/em')
                      resolve()
                    }
                  }

                  /*
                  * Just go ahead and do what you were doing if you're not on the 
                  * /join login page.
                  */

                  else {
                    resolve({
                      isProfileCompleted,
                      isEmailVerified
                    })
                  }

                  

                }

              }

          }
        })

      }
      
    })

   /*
    * The user was not logged in OR some sort of server side 
    * error has occured. If justCheckAuth is not set to TRUE,
    * then we'll redirect to /join.
    */

    .catch((err) => {
      
      /*
       * We're just checking if we're authenticated or not.
       */

      if (justCheckAuth) {

        resolve()

      }

      else {
        // User is not authenticated, therefore redirect them to login:
        router.replace('/join')

        resolve();
      }

      
    })
  })

  return promise;

}

