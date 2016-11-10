import React, { Component, PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { Application } from 'modules/Application'
import pageContainer  from '../styles/index.css'
import axios from 'axios'
import * as list from 'helpers/lists'
import * as utils from 'helpers/utils'
import * as application from 'helpers/application'
// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as applicationActionCreators from 'redux/modules/application/application'
import { authRedirectFilter } from 'config/routes'
// ============================================================ //

// ==================MESSAGES============================== //
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

// ====================================== //


const actionCreators = {
  ...userActionCreators,
  ...applicationActionCreators,
}

const ApplicationContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
	},
  /** doRedirectionFilter
   *
   * The redirection filter is the process that occurs each time we enter this container.
   * Used in every higher order component and supplied with a config, it ensures that the
   * user is redirected to the appropriate page based on their authentication status and 
   * user type.
   *
   * @ return (Promise)
   *
   */
  
  doRedirectionFilter() {
    const config = {
      failureRedirect: {
	 student: '/join',	// if not logged in, go here (student)
	 employer: '/join'      // if not logged in, go here (employer)
      },
      restricted: {
         to: 'STUDENTS',		 // STUDENTS only on this route
	 redirectTo: '/job/myapplicants'   // if not an EMPLOYER, redirect to the employer equivalent 
		 			 // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

/**
 * retrieveAll
 *	This function fetches from three endpoints:
 *		- api/job/my_applications
 *		- api/job/questions/<job_ids>
 *		- api/job/anwers/
 *
 * #NOTE: Needs better explanation
 *	Below implementation takes advantage of promise chains.
 *	Where api/job/my_applications is called first, once the jobs are returned
 *	It moves to next phase of the promises and creates more promises.
 *
 *	Reason behind this is due other endpoints need the job id
 *
 * #REFERRENCE:
 * 	https://developers.google.com/web/fundamentals/getting-started/primers/promises
 */

  retrieveAll() {

  	application.getJobs(this.context.store, actionCreators)
	.then(() => {
         	axios.all([
		    application.getQuestions(this.context.store, actionCreators, utils.multipleQueryList(this.props.jobs)),
		    application.getAnswers(this.context.store, actionCreators)
	 	])
	})
	.catch((err) => { console.log(err) })
  },


  componentWillMount() {
	console.log("componentWillMount")
	this.doRedirectionFilter()
	.then(this.retrieveAll())
	.then(this.props.closeOverlay())

  },


  componentWillUnmount() {
    console.log("Component WillUnmount")
  },

  render () {
    return (
      <div className={pageContainer}>
      <SidebarContainer />
       <Application 
       	  user={this.props.user}
       	  jobs={this.props.jobs}

	  /*FIXME: Create a reducer for the questions to pass to the store that is filtered*/
       	  questions={this.props.questions}
       	  answers={this.props.answers}
       /> 
      </div>
    )
  },
})

/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

/*NOTE: Questions should also be filtered in the Dashboard. 
 * 	At the moment we are borrowing every single question in the dashboard
 * 	Is there a better way?
 *
 * 	In other words, all questions are queried in the dashboard page*/
function mapStateToProps({user, application, dashboard}) {
  return {
	  user: user ? user : {},
	  jobs : application.studentApplications ? application.studentApplications.jobs : {},
	  answers : application.studentApplications ? application.studentApplications.answers : {},
	  questions: dashboard.studentDashboard ? dashboard.studentDashboard.questions : {}
  }
}

/** 
  * mapActionCreatorsToProps
  *
  * This function grabs all of the Action Creators on the object of the first parameter in the bindActionCreators function
  * and makes them available to us through THIS component's props (SignupContainer, this.props). We can then pass these to our child
  * components to use. DON'T MAKE A HABIT of doing this too deeply (drilling prop holes).
  *
  **/

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(ApplicationContainer)
