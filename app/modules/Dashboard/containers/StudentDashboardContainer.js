// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { StudentDashboard } from 'modules/Dashboard'
import { JobCardModal } from 'modules/SharedComponents'

import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import SkyLight from 'react-skylight'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as dashboardActionCreators from 'redux/modules/dashboard/dashboard'
import * as jobActionCreators from 'redux/modules/job/job'
import jobAppModal from 'redux/modules/dashboard/jobAppModal'
import * as list from 'helpers/lists'
import * as fetch from 'helpers/dashboard'
import { authRedirectFilter } from 'config/routes'

// ==================MESSAGES============================== //

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// ================CSS IMPORTS============================== //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'
import { applyButton, cancelBtn, applyButtonsContainer } from '../styles/StudentDashboardStyles.css'


const StudentDashboardContainer = React.createClass({
    propTypes: {
	  user: PropTypes.object, 
	  jobs: PropTypes.array, 
	  modal : PropTypes.object, 
	  industries : PropTypes.object,
	  jobTypes : PropTypes.array, 
	  answer : PropTypes.object, 
	  pin: PropTypes.object
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
    	  student: '/join',	     // if not logged in, go here (student)
    	  employer: '/join'      // if not logged in, go here (employer)
      },
      restricted: {
        to: 'STUDENTS',		              // STUDENTS only on this route
	      redirectTo: '/job/mylistings'   // if not an EMPLOYER, redirect to the employer equivalent
		 		
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  clearJobStore() {
  	this.context.store.getState().dashboard.jobs = this.context.store.getState().dashboard.studentDashboard.jobs.filter((k) => {
  		return k.id != this.context.store.getState().dashboard.modal.jobId ? k : ''
  	})
  },



  /* pinJob 
   *   This function pins the job, passes the student id and job id,
   *   then the the ids are given to in the payload to transfer a request
   * */
  pinJob(e, job) {
      //debugger
      e.preventDefault()
      e.stopPropagation()

      if(!job.pinned) {
          this.props.handlePinJob(job)
      } else {
         this.props.handleUnPinJob(job)
      } 
  },

  /*
   * applyToJob
   *
   *  This event is pressed the button inside JobCardModal
   *  It should passed the two answers given by the user and it's student id
   */

  applyToJob () {
    const _this = this;
    const jobAppModal = this.props.jobAppModal
    const questions = jobAppModal.selectedJob.questions

    const answerOneText = jobAppModal.answerOne
    const answerTwoText = jobAppModal.answerTwo
    const jobId = jobAppModal.selectedJob.job_id
    const question_one_id = questions[0] ? questions[0].question_id : null
    const question_two_id = questions[1] ? questions[1].question_id : null 

    if (questions.length !== 0) {

     /*
      * The user didnt answer all the questions asked. 
      */

      if ((answerOneText == "" && question_one_id !== null) || (answerTwoText == "" && question_two_id !== null)) {

        this.refs.container.error(
          "Hold up.",
          "✋ You need to answer the employer's question if you want to apply to this job.", {
            timeout: 3000
          });

      }

      /*
      * The user answered all the questions or it's not necessary to answer
      * questions because there isn't any.
      */

      else {

        doApplyToJob()
        
      }
    }

   /*
    * This job didn't have any questions, lets apply!
    */

    else {

      doApplyToJob()

    }

   /*
    * applyToJob
    *
    * Do the actual application of the job. 
    */

    function doApplyToJob () {

     /*
      * Lockout. Don't allow them to click to apply again if we're currently applying.
      */

      if (!_this.props.isApplying) {

        _this.props.submitJobApplication(jobId, question_one_id, answerOneText, question_two_id, answerTwoText)
        
          .then((response) => {

            function checkIfSuccessOrFailure () {
              var rejectSuccess = _this.context.store.getState().dashboard.studentDashboard.jobAppModal.success

              if (rejectSuccess) {

                _this.refs.container.success(
                "Nice work on applying to that job.",
                "Done!",
                {
                  timeout: 3000
                });

               /*
                * Remove that job from the dashboard now.
                */

                _this.props.updateAppliedJob(jobId)

               /*
                * Close the apply and job modal
                */

                _this.closeConfirmApplyModal()
                _this.closeJobAppModal()

              }

              else {

                _this.refs.container.error(
                "Whoops.",
                "Something went wrong trying to hire this student.", {
                  timeout: 3000
                });

              }
            }

            setTimeout(checkIfSuccessOrFailure.bind(_this), 500)

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

  handleUpdateAnswerText (index, val) {
    this.props.updateAnswerText(index, val)
  },

 /*
  * openConfirmApplyModal
  *
  * When a student finally clicks Apply, they are presented with this
  * confirmation modal to make sure that the student really wants 
  * to submit their application.
  *
  * This pops up overtop of the job app modal.
  */

  openConfirmApplyModal () {
    this.refs.confirmApplyModal.show()
  },

 /*
  * closeConfirmApplyModal
  *
  * Close the confirm apply modal that pops up overtop of the
  * job app modal.
  */

  closeConfirmApplyModal () {
    this.refs.confirmApplyModal.hide()
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
    console.log(this.props, "Student dashboard container props")
    return (
      <div className={pageContainer} >
      <SidebarContainer isAStudent={true} profilePicture={config.mediaUrl + '/avatar/' + this.props.profile.photo}/>
      <StudentDashboard
        handleCardClick={this.openJobAppModal}
        onPinJob={this.pinJob}
        jobs={this.props.jobs ? this.props.jobs : ''}
        industries={this.props.industries ? this.props.industries : {}}
        jobTypes={this.props.jobTypes ? this.props.jobTypes : []}
        pin={this.props.pin}
	    />

      {
       /* 
        * ========================================
        *           jobAppModal
        * ========================================
        * 
        * This is the main modal for this screen.
        * It's purpose is to allow the student to see 
        * the details for a job and apply to the job
        * after filling in any answers to questions if necessary.
        */
      } 
      <div id="job-app-modal-wrapper">
        <SkyLight
              ref="jobAppModal"
              >

              {this.props.jobAppModal.selectedJob 
                ? <JobCardModal
                    title={this.props.jobAppModal.selectedJob.title}
                    questions={this.props.jobAppModal.selectedJob.questions}
                    job={this.props.jobAppModal.selectedJob}
                    updateAnswerText={this.props.updateAnswerText}
                    closeJobAppModal={this.closeJobAppModal}
                    openConfirmApplyModal={this.openConfirmApplyModal}
                    updateAnswerText={this.handleUpdateAnswerText}
                    industries={this.props.industries}
                    />
                : ''
              }
              
          </SkyLight>
        </div>

    {
       /* 
        * ========================================
        *           Confirm Apply to job
        * ========================================
        * 
        * This is the main modal for this screen.
        * It's purpose is to allow the student to see 
        * the details for a job and apply to the job
        * after filling in any answers to questions if necessary.
        *
        */
      } 
      <div id="apply-to-job-modal-wrapper">
        <SkyLight
              ref="confirmApplyModal"
              title="Apply to job?">
              <div>Position: {this.props.jobAppModal.selectedJob ? this.props.jobAppModal.selectedJob.title : ''}</div>
              <div className={applyButtonsContainer}>
                <button className={applyButton} onClick={this.applyToJob}>YES, APPLY</button>
                <button className={cancelBtn} onClick={this.closeConfirmApplyModal}>CANCEL</button>
              </div>
        </SkyLight>
      </div>

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

function mapStateToProps({user, dashboard, job, profile, list}) {
  return {
	  user: user ? user : {},
    profile: profile.studentProfile ? profile.studentProfile : {},
	  jobs: job.studentJobsView ? job.studentJobsView : [],
	  jobAppModal: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal : {},
	  industries : list.industries ? list.industries : [],
	  jobTypes : list.jobTypesArray ? list.jobTypesArray : [],
	  answer : dashboard.studentDashboard.jobs ? dashboard.answer : {},
	  pin: dashboard.studentDashboard.response ? dashboard.studentDashboard.pin : {},
    isApplying: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal.isApplying : false,
    applySuccess: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal.applySuccess : false
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentDashboardContainer)
