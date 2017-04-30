// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { PinJobs } from 'modules/PinJobs'

// ==============THIRD PARTY IMPORTS========================= //
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as pinJobsActionCreators from 'redux/modules/pinJobs/pinJobs'
import * as list from 'helpers/lists'
import * as fetch from 'helpers/pinJobs'

// =======================OTHER IMPORTS============================== //
import { authRedirectFilter } from 'config/routes'

// ==============CSS IMPORTS============================= 
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'


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

  /* pinJob 
   *   This function pins the job, passes the student id and job id,
   *   then the the ids are given to in the payload to transfer a request
   * */
  pinJob(e, job) {
      //debugger
      e.preventDefault()
      e.stopPropagation()
      this.props.handleUnPinJob(job)

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
      this.context.store.dispatch(actionCreators.pinJobsModalClicked(j.id))
  	  this.context.store.dispatch(actionCreators.pinJobsShowModal(j))
  },


  hideModal (e, id) {
      this.context.store.dispatch(actionCreators.pinJobsHideModal(id))
      this.context.store.getState().pinJobs.answer.answerOne = ''
  	  this.context.store.getState().pinJobs.answer.answerTwo = ''
  },
  /** applyClicked
   *
   *  This event is pressed the button inside JobCardModal
   *  It should passed the two answers given by the user and it's student id
   */

  applyClicked (e, questions) {
    e.preventDefault()

        debugger
    /* Create Large Object */
    let applicationInfo = {
      "job": this.context.store.getState().pinJobs.modal.jobId,
      "students": this.context.store.getState().user.email,
      "answers": [{
        "question": questions[0].id,
        "student": this.context.store.getState().user.email,
        "text": this.props.answer.answerOne,
        "job": this.context.store.getState().pinJobs.modal.jobId,
      }, {
        "question": questions[1].id,
        "student": this.context.store.getState().user.email,
        "text": this.props.answer.answerTwo,
        "job": this.context.store.getState().pinJobs.modal.jobId,
      }]
    }

    // Given that answers fields were populated, continue
  	if (this.props.answer.answerOne && this.props.answer.answerTwo) {
		this.props.handleSubmitAnswers(applicationInfo)
  		 .then(this.context.store.dispatch(actionCreators.pinJobsHideModal(0)))
		 //TODO: Replace with a Celebration GIF 
  		 .then(toastr.success("Successfully applied to jobs"))
  	} else {
  		toastr.error("✋ You need to answer the employers question if you want to get a job")
  	}
  },

  componentWillMount() {
  	console.log("componentWillMount")
	this.doRedirectionFilter()
	.then(this.props.handleGetIndustries())
	.then(this.props.handleGetJobTypes())
	.then(this.props.handleGetPinnedJobs())
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
    	        onHideModal={this.hideModal}
	            onPinJob={this.pinJob}
    	        onApplyClicked={this.applyClicked}
    	        updateAnswerField={this.props.pinJobsUpdateAnswerField}
	            modal={this.props.modal}
	            jobs={this.props.jobs ? this.props.jobs : ''}
	            industries={this.props.industries ? this.props.industries : ''}
	            jobTypes={this.props.jobTypes ? this.props.jobTypes : ''}
	            answerOne={this.props.answer.answerOne}
	            answerTwo={this.props.answer.answerTwo} 
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
	  industries: pinJobs.industries.data ? pinJobs.industries.data : '',
	  jobTypes: pinJobs.jobTypes.data ? pinJobs.jobTypes.data : '',
	  answer: pinJobs.jobs ? pinJobs.answer : {},
	  modal: pinJobs.modal ? pinJobs.modal : ''
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
    ...pinJobsActionCreators
  
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(PinJobsContainer)
