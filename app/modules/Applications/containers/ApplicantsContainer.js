
/*
 * ApplicatntsContainer
 *
 * The container logic that renders all students that applied to a job
 *
 */

// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { Applicants } from 'modules/Applications'

// ==============THIRD PARTY IMPORTS========================= //
import axios from 'axios'
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'
import SkyLight from 'react-skylight'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as jobActionCreators from 'redux/modules/job/job'
import * as applicantsActionCreators from 'redux/modules/applicants/applicants'
import * as list from 'helpers/lists'
import * as utils from 'helpers/utils'

// =============EXTRA IMPORTS========================== //
import { authRedirectFilter } from 'config/routes'

// ==============CSS IMPORTS============================= //
import pageContainer  from 'sharedStyles/sharedContainerStyles.css'


const ApplicantsContainer = React.createClass({

  propTypes: {
    user: PropTypes.object 
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
        student: '/join',	                 // if not logged in, go here (student)
        employer: '/join'                  // if not logged in, go here (employer)
      },
      restricted: {
         to: 'EMPLOYERS',		               // EMPLOYERS only on this route
	       redirectTo: '/job/myapplicants'   // if not an EMPLOYER, redirect to the employer equivalent
		 			                                 // This might change to employer categories
      }
    }
    return authRedirectFilter(config, this.context.store, this.context.router)
  },

  openConfirmRejectStudentModal () {
    this.refs.confirmRejectStudentModal.show()
  },

  closeConfirmRejectStudentModal () {
    this.refs.confirmRejectStudentModal.hide()
  },

  componentWillMount() {
    this.doRedirectionFilter()
      .then(this.props.getAllJobsQuestionsAnswersForEmployer)
      .then(this.props.closeOverlay())
  },

  componentWillUnmount() {
    console.log("Component WillUnmount")
  },

  render () {
    console.log(this.props.jobs)
    return (
      <div className={pageContainer}>
        <SidebarContainer isAStudent={this.props.user.isAStudent}/>
        <Applicants
          jobs={this.props.jobs}
          currentSelectedJob={this.props.currentSelectedJob}
          changeSelectedJob={this.props.changeSelectedJob}
          handleOpenConfirmRejectStudentModal={this.openConfirmRejectStudentModal}
          handleCloseConfirmRejectStudentModal={this.closeConfirmRejectStudentModal}
          />
          
        {
         /* 
          * ===================================
          *      confirmRejectStudentModal
          * ===================================
          *
          * This is the reject modal. 
          * It pops up before we reject the student.
          */
        }

        <SkyLight
            ref="confirmRejectStudentModal"
            title="">
            <div>
              <div>
                <button>YES, REJECT</button>
                <button onClick={this.closeConfirmRejectStudentModal}>CANCEL</button>
              </div>
            </div>
        </SkyLight>
        
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
 * 	In other words, all questions are queried in the dashboard page
 */

function mapStateToProps({user, job, applicants}) {
  return {
	  user: user ? user : {},
    jobs: job.employerJobs ? job.employerJobs : [],
    currentSelectedJob: applicants.currentSelectedJob ? applicants.currentSelectedJob : {}
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
      ...jobActionCreators,
      ...applicantsActionCreators
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(ApplicantsContainer)
