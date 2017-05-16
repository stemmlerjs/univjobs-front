// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { StudentDashboard } from 'modules/Dashboard'

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
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

// ================CSS IMPORTS============================== //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'


const StudentDashboardContainer = React.createClass({
    propTypes: {
	  user: PropTypes.object, 
	  jobs: PropTypes.array, 
	  modal : PropTypes.object, 
	  industries : PropTypes.array,
	  jobTypes : PropTypes.object, 
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

    const jobAppModal = this.props.jobAppModal
    const questions = jobAppModal.selectedJob.questions

    const answerOneText = jobAppModal.answerOne
    const answerTwoText = jobAppModal.answerTwo
    const jobId = jobAppModal.selectedJob.jobId
    const question_one_id = questions[0] ? questions[0].question_id : null
    const question_two_id = questions[1] ? questions[1].question_id : null 

    // console.log(jobId, question_one_id, answerOneText, question_two_id, answerTwoText)
    this.props.submitJobApplication(jobId, question_one_id, answerOneText, question_two_id, answerTwoText)

    // Use these later - show toaster messages?
    // toastr.success("Successfully applied to jobs")
    // toastr.error("✋ You need to answer the employers question if you want to get a job")
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
      <SidebarContainer isAStudent={true}/>
      <StudentDashboard
        handleCardClick={this.openJobAppModal}
        onPinJob={this.pinJob}
        jobs={this.props.jobs ? this.props.jobs : ''}
        industries={this.props.industries ? this.props.industries : []}
        jobTypes={this.props.jobTypes ? this.props.jobTypes : []}
        answerOne={this.props.answer.answerOne}
        answerTwo={this.props.answer.answerTwo}
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

      <SkyLight
            ref="jobAppModal"
            title="Job application">
            <div>

            {
             /* 
              * ========= Job Details  ==========
              *
              * This section displays all of the job details.
              * TODO: fill in the rest of the details when the 
              * design is made.
              */
            } 

            { this.props.jobAppModal.selectedJob 
              ? <div>
                  <div>{this.props.jobAppModal.selectedJob.title}</div>
                  <div></div>
                </div>
              : ''
            }

            

            {
             /* 
              * ========= Questions ==========
              *
              * If there are even questions that need to be shown, we will display them.
              * We need to first check for the selectedJob attribute to exist (it only)
              * exists when we actually select a job.
              *
              */
            } 
              { this.props.jobAppModal.selectedJob 
                ? (<div> 
                    {
                     /*
                      * In this case, the selectedJob attribute 
                      * exists. Now we can check to see if we should display
                      * questions or not.
                      *
                      * We do that directly below in the next ternary statement.
                      */
                    }
                    { this.props.jobAppModal.selectedJob.questions.length != 0 
                      ? <div>
                          {
                           /* 
                            * In this case, THERE ARE questions that need
                            * to be answered. We iterate over each one and 
                            * render the HTML for each question and it's answer.
                            */
                          }

                          { this.props.jobAppModal.selectedJob.questions.map((question) => (
                            <div key={question.question_id}>
                              lkjlkjasdlkj
                              <div>{question.text}</div>
                              <input onChange={(e) => {

                               /* 
                                * Update the answers on change.
                                *
                                * To do this, the following block of code figures out
                                * which answer (1 or 2) is being answered and triggers
                                * the update accordingly.
                                */
                                var _this = this;
                                var q = this.props.jobAppModal.selectedJob.questions;
                                for (var i = 0; i < q.length; i++) {
                                  if (q[i].question_id == question.question_id) {
                                     _this.context.store.dispatch(_this.props.updateAnswerText(i + 1, e.target.value)) 
                                  }
                                }

                              }} type="textarea"/>
                            </div>
                          ))}
                          
                        </div>
                      : ''
                    }

                  </div>)
                : ''}

              {
               /* 
                * ========= Buttons ==========
                *
                * Apply to job or close the modal.
                *
                */
                <div>
                  <button onClick={this.closeJobAppModal}>Close</button>
                  <button onClick={this.openConfirmApplyModal}>Apply</button>
                </div>
              }

              
            </div>
        </SkyLight>

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
        *
        */
      } 

      <SkyLight
            ref="confirmApplyModal"
            title="Apply to job?">
            <div>
              <button onClick={this.closeConfirmApplyModal}>Cancel</button>
              <button onClick={this.applyToJob}>Yes, apply</button>
            </div>
      </SkyLight>

	  <ReduxToastr
	    timeOut={4000}
	    newestOnTop={false}
	    position="top-right"/>
    </div>
    )
  },
})

/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

function mapStateToProps({user, dashboard, job}) {
  return {
	  user: user ? user : {},
	  jobs: job.studentJobsView ? job.studentJobsView : [],
	  jobAppModal: dashboard.studentDashboard.jobAppModal ? dashboard.studentDashboard.jobAppModal : {},
	  industries : dashboard.industries ? dashboard.industries.data : [],
	  jobTypes : dashboard.jobTypes ? dashboard.jobTypes.data : [],
	  answer : dashboard.studentDashboard.jobs ? dashboard.answer : {},
	  pin: dashboard.studentDashboard.response ? dashboard.studentDashboard.pin : {},
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
