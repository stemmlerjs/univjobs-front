import React, { Component, PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { StudentDashboard } from 'modules/Dashboard'

import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as dashboardActionCreators from 'redux/modules/dashboard/dashboard'
import { authRedirectFilter } from 'config/routes'
import * as fetch from 'helpers/dashboard'
import * as list from 'helpers/lists'

import { pageContainer } from '../styles/index.css'

const actionCreators = {
  ...userActionCreators,
  ...dashboardActionCreators
}

const StudentDashboardContainer = React.createClass({
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
	 redirectTo: '/job/mylistings'   // if not an EMPLOYER, redirect to the employer equivalent 
		 			 // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

/**
 * retrieveJobs
 *	This function fetches two endpoints:
 *	    - api/jobs
 *	    - api/questions
 *      Then it gives the data into the store called dashboard
 */
  retrieveJobs () {
   const promise = new Promise((resolve, reject) => {
      axios.all([
         fetch.getJobs(this.context.store),	
      	 fetch.getQuestions(this.context.store, actionCreators)
      ])
      .then((response) => resolve(true))
      .catch((response) => resolve(true))
    })
   return promise;
  },

/** retrieveAllLists 
 *   	This function retrieves all the api endpoints needed
 *   	to display the proper job informations
 * 
 */
  retrieveAllLists() {
	const promise = new Promise((resolve, reject) => {
		axios.all([
			  fetch.getIndustries(this.context.store, actionCreators),
			  fetch.getJobTypes(this.context.store, actionCreators),
		])
		.then((response) => resolve(true))
		.catch((response) => resolve(true))
	})
	return promise
  },

/** showModal
 *
 * This function takes in the submit event & the job id
 * It calls a dispatch modalCliked & showModal(id)
 * Once the store is notified, a reducer should be activated to find the appropriate job info,
 * then supplies the modal the appropraite job info
 * After, the modal appears to the user of the job info they pressed
 *
 * @param(e) - DOM event
 * @param(j) - Object job
 * @param(q) - Object questions
*/
  showModal (e, j) {
  	e.preventDefault()
	console.log('ON SHOW MODAL')
	this.context.store.dispatch(actionCreators.modalClicked(j.id))

	//After modal is clicked, get the questions & match the question id with the job id
	//Once matched, pass the questions inside the modal to supply to questions variables
	this.context.store.dispatch(actionCreators.showModal(j, this.getQuestions()))
  },

/* getQuestions
 * 	This function passes the function matchQuestions and uses the filter function
 * 	on the questions array. It will return a new array that is filtered with the associated
 * 	job ids from the questions ids
 *
 * */
  getQuestions() {	
	  debugger
	  return this.props.questions.filter(this.filterQuestions) 
  },

/** filterQuestions
 *     This function takes two params, job id & questions object.
 *     It returns all the questions that matches the question ids
 *
 *      TODO: Refactor this whole process in which the backend or front-end will handle
 *            the fetching of questions
 *
 *
 *      NOTE: 
 *         - Should we combine the questions in with the api endpoint, the same way user & job is handled?
 *         - Should we separate it like how I am doing it right now?
 *         - In what way is the best approach?
 *         - What do we want to achieve out of this?
 *
*/

  filterQuestions(question) {
	  console.log("***********FILTER QUESTIONS**********")
	  return question.job === this.context.store.getState().dashboard.modal.jobId
  },
  
/** hideModal
 *   This event gives the user
  */
  hideModal (e, id) {
	this.context.store.dispatch(actionCreators.hideModal(id))
  },

/** applyClicked
 *
 *  This event is pressed the button inside JobCardModal
 *  It should passed the two answers given by the user and it's student id
 */
  applyClicked (e, questions) {
	e.preventDefault()
	console.log(questions)
	
	//Get all the inputs from store
	// If firstAnswer & secondAnswer is empty
	// 	dispatch an error message using ReactToastr
	// Else
	// 	dispatch an actionCreator
	// 	PUT or POST into the server
	// 	Return a success indicator
	// 	empty the answers values
	//
  },

  componentWillMount() {
	console.log("componentWillMount")
	this.doRedirectionFilter()
	.then(this.retrieveJobs())
	.then(this.retrieveAllLists())
	.then(this.props.closeOverlay())
  },

  componentWillUnmount() {
    console.log("Component WillUnmount")
  },

  render () {
    return (
      <div className={pageContainer}>
      <SidebarContainer />
       <StudentDashboard 
          jobs={this.props.jobs} 
	  onShowModal={this.showModal}
	  onHideModal={this.hideModal}
	  onApplyClicked={this.applyClicked}
	  modal={this.context.store.getState().dashboard.modal}
	  industries={this.props.industries}
	  jobTypes={this.props.jobTypes}
	  questions={this.props.questions}
	  answerOne={this.props.answer.answerOne}
	  answerTwo={this.props.answer.answerTwo}
	  updateAnswerField={this.props.updateAnswerField}
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

function mapStateToProps({user, dashboard}) {
  return {
	  user: user ? user : {},
	  jobs: dashboard.studentDashboard.jobs ? dashboard.studentDashboard.jobs : [],
	  questions: dashboard.studentDashboard.jobs ? dashboard.studentDashboard.questions : [],
	  modal : dashboard.studentDashboard.jobs ? dashboard.modal : '',
	  industries : dashboard.studentDashboard.jobs ? dashboard.lists.industries : [],
	  jobTypes : dashboard.studentDashboard.jobs ? dashboard.lists.jobTypes : [],
	  answer : dashboard.studentDashboard.questions ? dashboard.answer : {},
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentDashboardContainer)
