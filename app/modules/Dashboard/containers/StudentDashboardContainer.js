import React, { PropTypes } from 'react'
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

/** showModal
 *
 * This function takes in the submit event & the job id
 * It calls a dispatch modalCliked & showModal(id)
 * Once the store is notified, a reducer should be activated to find the appropriate job info,
 * then supplies the modal the appropraite job info
 * After, the modal appears to the user of the job info they pressed
 *
 * @param(e) - DOM event
 * @param(id) - Number 
*/
  showModal (e, j) {
  	e.preventDefault()
	console.log('ON SHOW MODAL')
	console.log(j)
	this.context.store.dispatch(actionCreators.modalClicked(j.id))
	this.context.store.dispatch(actionCreators.showModal(j))
	// Call dispatch(modalClicked) & showModal(id)
	// Use reducer to supply modal state with the job id passed from modal
	//Then make modal appear with the appropriate job info.
	//
	//  -----> NOTE: 
	//           - Should we just pass the whole job itself?
	//           - Should we also create a separate container for job card modal? It has it's own event
  },

  
/** hideModal
 *   This event gives the user
  */
  hideModal (e, id) {
	this.context.store.dispatch(actionCreators.hideModal(id))
  },

/** applyClicked
 *  This event is pressed the button inside JobCardModal
 *  It should passed the two answers given by the user and it's student id
 */
  applyClicked (e, a) {
	e.preventDefault()
	console.log(a)
  },

/** doRedirectionFilter
  *
  * The redirection filter is the process that occurs each time we enter this container.
  * Used in every higher order component and supplied with a config, it ensures that the
  * user is redirected to the appropriate page based on their authentication status and 
  * user type.
  *
  * @return (Promise)
  *
  */

  doRedirectionFilter(){
    const config = {
      failureRedirect: {
        student: '/join',                 // if not logged in, go here (student)
        employer: '/join'                 // if not logged in, go here (employer)
      },
      restricted: {
        to: 'STUDENTS',                   // employers only on this route
        redirectTo: '/dashboard/em'       // if not an employer, redirect to the student equivalent
      }
    }

    return authRedirectFilter(config, this.context.store, this.context.router)
  },

  retrieveJobs () {
   const promise = new Promise((resolve, reject) => {
      axios.all([
         fetch.getJobs(this.context.store)	
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
 *
 *        NOTE:
 *        	The state is becomes mutable after the first list is fetched
 * 	        For now, I will just get the info from the lists.js as a quick solution.
 * 	        Will also refer to the specific store to be able to trace the origin of the data
 *
 * 	 TODO:
 * 	 	Testing the actionCreators being passed
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
	  modal : dashboard.studentDashboard.jobs ? dashboard.modal : '',
	  industries : dashboard.studentDashboard.jobs ? dashboard.lists.industries : [],
	  jobTypes : dashboard.studentDashboard.jobs ? dashboard.lists.jobTypes : [],
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
