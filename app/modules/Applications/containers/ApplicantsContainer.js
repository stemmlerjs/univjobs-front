
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

import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import axios from 'axios'
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'
import SkyLight from 'react-skylight'
import { StudentProfileModal } from 'modules/SharedComponents'

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
import { rejectButton, cancelBtn, rejectButtonsContainer } from '../styles/index.css'

// ============== MESSAGES =================== //
var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


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

  openConfirmRejectStudentModal (studentObject) {

   /*
    * As we open the Confirm Reject Student Modal, we 
    * need to change the applicants.selectedStudent so that if we 
    * are to reject them, we have both the  
    * student id and the job id.
    * 
    * Job Id is acquired from applicants.selectedJob.
    */
    console.log(studentObject, "kajsdlkjsa")
    this.context.store.dispatch(this.props.changeSelectedStudent(studentObject))

    this.refs.confirmRejectStudentModal.show()
  },

 /* 
  * handleRejectStudent
  * 
  * This actually goes and performs the reject student functionality.
  * We want to display a toaster if all went well and display one if
  * something broke as well.
  */

  handleRejectStudent() {
    var jobId = this.props.currentSelectedJob.job_id;
    var studentId = this.props.currentSelectedStudent.student_id;

    this.props.rejectStudent(jobId, studentId)
    .then(() => {
      
      function checkIfSuccessOrFailure () {
        var rejectSuccess = this.context.store.getState().applicants.rejectSuccess

        if (rejectSuccess) {

          this.refs.container.success(
          "All done.",
          "Successfully rejected student.", {
            timeout: 3000
          });
         
          this.closeConfirmRejectStudentModal()

        }

        else {

          this.refs.container.error(
          "Whoops.",
          "Something went wrong trying to reject this student.", {
            timeout: 3000
          });

        }
      }

      setTimeout(checkIfSuccessOrFailure.bind(this), 1000)

      
    })
  },

  closeConfirmRejectStudentModal () {
    this.refs.confirmRejectStudentModal.hide()
  },

  handleOpenStudentProfileAndAnswersModal (studentObject) {
    console.log(studentObject)
    this.props.openStudentProfileAndAnswersModal(studentObject)
    this.refs.studentProfileAndAnswersModal.show()
  },

  handleCloseStudentProfileAndAnswersModal () {
    this.refs.studentProfileAndAnswersModal.hide()
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
    return (
      <div className={pageContainer}>
        <SidebarContainer isAStudent={this.props.user.isAStudent} profilePicture={config.mediaUrl + this.props.profile.logoUrl}/>
        <Applicants
          jobs={this.props.jobs}
          currentSelectedJob={this.props.currentSelectedJob}
          changeSelectedJob={this.props.changeSelectedJob}
          handleOpenConfirmRejectStudentModal={this.openConfirmRejectStudentModal}
          handleCloseConfirmRejectStudentModal={this.closeConfirmRejectStudentModal}
          handleOpenStudentProfileAndAnswersModal={this.handleOpenStudentProfileAndAnswersModal}
          handleCloseStudentProfileAndAnswersModal={this.handleCloseStudentProfileAndAnswersModal}
          lists={this.props.lists}
          hiddenStudents={this.props.hiddenStudents}
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
        <div id="confirm-reject-student-modal-wrapper">
          <SkyLight
              ref="confirmRejectStudentModal"
              title="">
              <div>
                { this.props.currentSelectedStudent
                  ? <div>Are you sure you want to REJECT 
                          {` ${this.props.currentSelectedStudent.user_firstName} ${this.props.currentSelectedStudent.user_lastName} `}
                        from your <b>{this.props.currentSelectedJob.title}</b> position?</div>
                  : ''}
                <div className={rejectButtonsContainer}>
                  <button className={rejectButton} onClick={this.handleRejectStudent}>YES, REJECT</button>
                  <button className={cancelBtn} onClick={this.closeConfirmRejectStudentModal}>CANCEL</button>
                </div>
              </div>
          </SkyLight>
        </div>

        {/* =======================================
                    SEE STUDENT DETAILS MODAL
            =======================================
        */}
        <div id="student-profile-modal-wrapper">
          <SkyLight
              hideOnOverlayClicked
              ref="studentProfileAndAnswersModal"
              title="">
              { 
                this.props.studentProfileAndAnswersModal.student 
                  ? <StudentProfileModal
                      pictureUrl={config.mediaUrl + 'avatar/' + this.props.studentProfileAndAnswersModal.student.photo_url}
                      name={this.props.studentProfileAndAnswersModal.student.user_firstName.substring(0,1).toUpperCase() + this.props.studentProfileAndAnswersModal.student.user_firstName.substring(1) + ' ' 
                            + this.props.studentProfileAndAnswersModal.student.user_lastName.substring(0,1).toUpperCase() + this.props.studentProfileAndAnswersModal.student.user_lastName.substring(1)}
                      funFact={this.props.studentProfileAndAnswersModal.student.fun_fact}
                      educationLevel={this.props.studentProfileAndAnswersModal.student.edu_level}
                      hasCar={this.props.studentProfileAndAnswersModal.student.has_car}
                      hobbies={this.props.studentProfileAndAnswersModal.student.hobbies}
                      languages={this.props.studentProfileAndAnswersModal.student.languages}
                      clubsString={this.props.studentProfileAndAnswersModal.student.clubsString}
                      sportsString={this.props.studentProfileAndAnswersModal.student.sportsString}
                      major={this.props.studentProfileAndAnswersModal.student.major}
                      gpa={this.props.studentProfileAndAnswersModal.student.gpa}
                      gradDate={new Date(this.props.studentProfileAndAnswersModal.student.grad_date)}
                      schoolName={this.props.studentProfileAndAnswersModal.student.school_name}
                      hometown={this.props.studentProfileAndAnswersModal.student.hometown}
                      hobbies={this.props.studentProfileAndAnswersModal.student.hobbies}
                      recentCompanyName={this.props.studentProfileAndAnswersModal.student.recent_company_name}
                      recentPosition={this.props.studentProfileAndAnswersModal.student.recent_company_position}
                      lists={this.props.lists}
                      handleOpenInviteStudentModal={this.openInviteStudentModal}
                      studentObj={this.props.studentProfileAndAnswersModal.student}
                      recentCompanyName={this.props.studentProfileAndAnswersModal.student.recent_company_name}
                      recentCompanyPosition={this.props.studentProfileAndAnswersModal.student.recent_company_position}
                      resumeUrl={config.mediaUrl + 'res/' + this.props.studentProfileAndAnswersModal.student.resume_url}
                      isDashboardCard={false}
                      handleOpenConfirmRejectStudentModal={this.openConfirmRejectStudentModal}
                      questions={this.props.currentSelectedJob.questions.filter((question) => question.job_id == this.props.currentSelectedJob.job_id)}
                      answers={this.props.currentSelectedJob.answers.filter((answer) => answer.job_id == this.props.currentSelectedJob.job_id && answer.student == this.props.studentProfileAndAnswersModal.student.student_id)}
                      />
                  : ''
              } 
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

/*NOTE: Questions should also be filtered in the Dashboard.
 * 	At the moment we are borrowing every single question in the dashboard
 * 	Is there a better way?
 *
 * 	In other words, all questions are queried in the dashboard page
 */

function mapStateToProps({user, job, profile, applicants, list}) {
  return {
	  user: user ? user : {},
    profile: profile.employerProfile ? profile.employerProfile : {},
    jobs: job.employerJobs ? job.employerJobs : [],
    currentSelectedJob: applicants.currentSelectedJob ? applicants.currentSelectedJob : {},
    currentSelectedStudent: applicants.currentSelectedStudent ? applicants.currentSelectedStudent : {},
    isRejecting: applicants.isRejecting ? applicants.isRejecting : false,
    rejectSuccess: applicants.rejectSuccess ? applicants.rejectSuccess : false,
    error: applicants.error ? applicants.error : '',
    hiddenStudents: applicants.hiddenStudents ? applicants.hiddenStudents : {},
    lists: list ? list : {},
    studentProfileAndAnswersModal: applicants.studentProfileAndAnswersModal ? applicants.studentProfileAndAnswersModal: {},
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
