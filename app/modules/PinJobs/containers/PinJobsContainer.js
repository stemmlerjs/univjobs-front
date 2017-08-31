// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { PinJobs } from 'modules/PinJobs'

import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as dashboardActionCreators from 'redux/modules/dashboard/dashboard'
import * as jobActionCreators from 'redux/modules/job/job'
import jobAppModal from 'redux/modules/dashboard/jobAppModal'
import * as list from 'helpers/lists'

// =======================OTHER IMPORTS============================== //
import { authRedirectFilter } from 'config/routes'

// ==============CSS IMPORTS=============================
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const PinJobsContainer = React.createClass({
    propTypes: {
      user: PropTypes.object,
      jobs: PropTypes.array,
      jobTypes : PropTypes.array,
      answer : PropTypes.object,
      modal : PropTypes.object,
    },

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
	    redirectTo: '/dashboard/em'   // if not an EMPLOYER, redirect to the employer equivalent
		 			 // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  /*
   * pinJob
   *
   * This will actually pin or unpin the job based on the current
   * status of the job.
   */

  pinJob(e, job) {

      e.preventDefault()
      e.stopPropagation()

     /*
      * Lockout
      */

      if (!this.props.isPinningJob) {

        if(job.pinned == 0) {

         /*
          * PIN the job and display the
          * toaster based on the success of it.
          */

          this.props.pinJob(job.job_id,

         /*
          * Success Callback
          */

          () => {

            this.refs.container.success(
              "Job saved to My Pinned Jobs.",
              "Pinned!",
              {
                timeout: 3000
              });

          },

         /*
          * Failure callback
          */

          () => {

            this.refs.container.error(
              "Whoops.",
              "Something went wrong pinning this job.", {
                timeout: 3000
              });

          })

        } else {

         /*
          * UNPIN the job and display the
          * toaster based on the success of it.
          */

          this.props.unpinJob(job.job_id,

          () => {

            this.refs.container.success(
              "Removed this job from your Pinned Jobs.",
              "Unpinned!",
              {
                timeout: 3000
              });

          },

          () => {

            this.refs.container.error(
              "Whoops.",
              "Something went wrong unpinning this job.", {
                timeout: 3000
              });

          })

        }

      }
  },

 /*
  * openJobAppModal
  *
  * Opens the job app modal that contains all of the job
  * details, questions and answers fields so that students
  * may apply to a job.
  */

  openJobAppModal(e, selectedJob) {
    e.preventDefault()
    this.props.openJobAppModal(selectedJob)
    this.refs.jobAppModal.show()
  },

 /*
  * closeJobAppModal
  *
  * Closes the job app modal.
  */

  closeJobAppModal() {
    this.refs.jobAppModal.hide()
  },

  componentWillMount() {

	  this.doRedirectionFilter()
      .then(this.props.getAllJobsStudentJobView())
      .then(this.props.handleGetIndustries())
      .then(this.props.handleGetJobTypes())
      .then(this.props.closeOverlay())

  },

  componentWillUnmount() {

  },

  render () {
    return (
      <div className={pageContainer} >
          <SidebarContainer isMobile={this.props.isMobile} isAStudent={true} 
            profilePicture={config.mediaUrl + '/avatar/' + this.props.profile.photo}
            page={this.props.route.page}/>
            
          <PinJobs
            handleCardClick={this.openJobAppModal}
            handlePinJob={this.pinJob}
            jobs={this.props.jobs ? this.props.jobs : ''}
            industries={this.props.industries ? this.props.industries : {}}
            jobTypes={this.props.jobTypes ? this.props.jobTypes : []}
	        />

          <ToastContainer ref="container"
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right" />
      </div>
    )
  },
})



/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

function mapStateToProps({user, job, profile, list, dashboard}) {
  return {
    profile: profile.studentProfile ? profile.studentProfile : {},
	  jobs: job.studentJobsView ? job.studentJobsView : [],
    industries : list.industries ? list.industries : [],
    jobTypes : list.jobTypesArray ? list.jobTypesArray : [],
    jobAppModal: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal : {},
    isApplying: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal.isApplying : false,
    applySuccess: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal.applySuccess : false,
    isPinningJob: job.isPinningJob ? job.isPinningJob : false,
    pinJobSuccess: job.pinJobSuccess ? job.pinJobSuccess : false
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
  return bindActionCreators({
    ...userActionCreators,
    ...dashboardActionCreators,
    ...jobActionCreators,
    ...jobAppModal.actionCreators
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(PinJobsContainer)
