import React, { Component, PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { PinJobs } from 'modules/PinJobs'
import { pageContainer } from '../styles/index.css'
import * as list from 'helpers/lists'
import * as fetch from 'helpers/pinJobs'
// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as pinJobsActionCreators from 'redux/modules/pinJobs/pinJobs'
import { authRedirectFilter } from 'config/routes'
// ============================================================ //

// ==================MESSAGES============================== //
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'
// ====================================== //


const actionCreators = {
  ...userActionCreators,
  ...pinJobsActionCreators
}

const PinJobsContainer = React.createClass({
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

  showModal(e, j) {
	e.preventDefault()
	console.log("Test")
  },

  componentWillMount() {
  	console.log("componentWillMount")
	this.doRedirectionFilter()
	.then(this.props.handleGetIndustries())
	.then(this.props.handleGetJobTypes())
	.then(this.props.handleGetPinnedJobs())
	.then(this.props.handleGetQuestions())
	.then(this.props.closeOverlay())
  },

  componentWillUnmount() {
    console.log("Component WillUnmount")
  },

  render () {
    return (
      <div className={pageContainer} >
          <SidebarContainer isAStudent={true}/>
          <PinJobs
	      handleCardClick={this.showModal}
	      jobs={this.props.jobs ? this.props.jobs : ''}
	      industries={this.props.industries ? this.props.industries : ''}
	      jobTypes={this.props.jobTypes ? this.props.jobTypes : ''}
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

function mapStateToProps({user, pinJobs}) {
  return {
	  user: user ? user : {},
	  jobs: pinJobs.jobs.data ? pinJobs.jobs.data : '',
	  industries: pinJobs.industries.data ? pinJobs.jobs.data : '',
	  jobTypes: pinJobs.jobTypes.data ? pinJobs.jobTypes.data : ''
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(PinJobsContainer)
