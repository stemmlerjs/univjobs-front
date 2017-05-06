// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { StudentDashboard } from 'modules/Dashboard'

// ==============THIRD PARTY IMPORTS========================= //

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as dashboardActionCreators from 'redux/modules/dashboard/dashboard'
import * as jobActionCreators from 'redux/modules/job/job'
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

  clearJobStore() {
  	this.context.store.getState().dashboard.jobs = this.context.store.getState().dashboard.studentDashboard.jobs.filter((k) => {
  		return k.id != this.context.store.getState().dashboard.modal.jobId ? k : ''
  	})
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
      this.context.store.dispatch(actionCreators.dashboardModalClicked(j.id))
      this.context.store.dispatch(actionCreators.dashboardShowModal(j, j.questions))
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


 /** hideModal
  *   This event gives the user
  */
  hideModal (e, id) {
      this.context.store.dispatch(actionCreators.dashboardHideModal(id))
      this.context.store.getState().dashboard.answer.answerOne = ''
      this.context.store.getState().dashboard.answer.answerTwo = ''
  },

  /** applyClicked
   *
   *  This event is pressed the button inside JobCardModal
   *  It should passed the two answers given by the user and it's student id
   */

  applyClicked (e, questions) {
    e.preventDefault()

    // Create Large Object
    let applicationInfo = {
      "job": this.context.store.getState().dashboard.modal.jobId,
      "students": this.context.store.getState().user.email,
      "answers": [{
        "question": questions[0].id,
        "student": this.context.store.getState().user.email,
        "text": this.props.answer.answerOne,
        "job": this.context.store.getState().dashboard.modal.jobId,
      }, {
        "question": questions[1].id,
        "student": this.context.store.getState().user.email,
        "text": this.props.answer.answerTwo,
        "job": this.context.store.getState().dashboard.modal.jobId,
      }]
    }

    // Given that answers fields were populated, continue
  	if (this.props.answer.answerOne && this.props.answer.answerTwo) {
		this.props.handleSubmitAnswers(applicationInfo)
  		.then(this.context.store.dispatch(actionCreators.dashboardHideModal(0)))

        /*TODO: ADD CELEBRATORY GIF 
         *
         * NOTE: Future addition would be to give tips while they wait for the job
         * */
		.then(toastr.success("Successfully applied to jobs"))
  	} else {
  		toastr.error("✋ You need to answer the employers question if you want to get a job")
  	}
  },

  componentWillMount() {
  	console.log("componentWillMount")
  	this.doRedirectionFilter()
    .then(this.props.getAllJobsStudentJobView())
    .then(this.props.handleGetIndustries())
    .then(this.props.handleGetJobTypes())
  	.then(this.props.closeOverlay())
  },

  componentWillUnmount() {
    console.log("Component WillUnmount")
  },

  render () {
    return (
      <div className={pageContainer} >
      <SidebarContainer isAStudent={true}/>
      <StudentDashboard
    	  handleCardClick={this.showModal}
    	  onHideModal={this.hideModal}
    	  onApplyClicked={this.applyClicked}
    	  onPinJob={this.pinJob}
          modal={this.props.modal}
          jobs={this.props.jobs ? this.props.jobs : ''}
    	  industries={this.props.industries ? this.props.industries : []}
    	  jobTypes={this.props.jobTypes ? this.props.jobTypes : []}
    	  answerOne={this.props.answer.answerOne}
    	  answerTwo={this.props.answer.answerTwo}
    	  updateAnswerField={this.props.dashboardUpdateAnswerField}
          pin={this.props.pin}
	    />

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
	  modal : dashboard.studentDashboard.jobs ? dashboard.modal : '',
	  industries : dashboard.industries ? dashboard.industries.data : '',
	  jobTypes : dashboard.jobTypes ? dashboard.jobTypes.data : '',
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
    ...jobActionCreators
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentDashboardContainer)
