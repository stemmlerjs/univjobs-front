
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
import { rejectButton, cancelBtn, rejectButtonsContainer, hireBtn, postHireBtnContainer, postHireContainer } from '../styles/index.css'

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

 /*
  * openConfirmRejectStudentModal
  *
  * Literally just opens the modal that allows the user 
  * to REJECT the student or not.
  */

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

    if (!this.props.isRejecting) {

      this.props.rejectStudent(jobId, studentId, 
    
     /*
      * Success callback
      */

      () => {

        this.refs.container.success(
          "All done.",
          "Successfully rejected student.", {
            timeout: 3000
          });
         
          this.closeConfirmRejectStudentModal()

      },

    /*
      * Failure callback
      */
      
      () => {

        this.refs.container.error(
          "Whoops.",
          "Something went wrong trying to reject this student.", {
            timeout: 3000
          });

      })

    }

  
  },

 /*
  * handleOpenStudentProfileAndAnswersModal
  *
  * For this, we need to pass in the student object so that we 
  * can display the student data in the modal.
  *
  */

  handleOpenStudentProfileAndAnswersModal (studentObject) {
    this.props.openStudentProfileAndAnswersModal(studentObject)
    this.refs.studentProfileAndAnswersModal.show()
  },

 /*
  * handleContactStudent
  *
  * When the employer clicks "CONTACT", we want to perform a call to the
  * backend to update that the employer has moved into the CONTACTED 
  * state for this applicant. 
  *
  * Additionally, the employer is going to need the contact credentials for this 
  * applicant. This means that we are going to need a new way to also retrieve the contact 
  * information (either their student email or the personal email).
  *
  * Here's what I think we should do:
  *
  * 1) In the API call to /jobs, there is an attribute called "applicants" that includes all the
  *    applicants for a job. If the STATE for an applicant is "CONTACTED", also return their contact 
  *    info for this applicant. 
  *
  * 2) Provide a way to acquire the contact info for ONE applicant. We're going to use an API call 
  *    of /contact/reveal/:jobId/:studentId which has a POST and a GET. 
  *
  *    The POST will change the STATE to "CONTACTED" given that the requesting employer owns the jobId,
  *    and then it will also return the preferred contact info for that applicant. 
  *
  *    The GET will simply return the contact info given that the job belongs to the requesting employer 
  *    and the state of the applicant is CONTACTED.
  */

  handleContactStudent (studentObj) {
    var jobId = studentObj.job_id;
    var studentId = studentObj.student_id;

   /*
    * Lockout. Don't allow them to click multiple times.
    */

    if (!this.props.isContacting) {

      this.props.contactStudent(jobId, studentId, this.props.jobs__addContactInfo, 

     /*
      * Success callback
      */

      () => {
        this.refs.container.success(
        "Success.",
        "Contact info for this student now available.", {
          timeout: 3000
        });


        /*
        * Really really hackish way to force the component to update
        * again with the unhidden contact info for the student.
        *
        * Close and reopen the modal really fast.
        */

        this.refs.studentProfileAndAnswersModal.hide()
        this.handleOpenStudentProfileAndAnswersModal(this.context.store.getState().applicants.studentProfileAndAnswersModal.student)
      },

     /*
      * Failure callback
      */

      () => {

        this.refs.container.error(
          "Whoops.",
          "Something went wrong trying to collect the contact info for this student.", {
            timeout: 3000
          });

      })

    }

    
  },

  handleOpenConfirmHireStudentModal (studentObject) {
    
    this.context.store.dispatch(this.props.changeSelectedStudent(studentObject))

    this.refs.confirmHireStudentModal.show()

  },

  closeConfirmHireStudent () {

    this.refs.confirmHireStudentModal.hide()

  },

 /*
  * handleHireStudent
  *
  */

  handleHireStudent (studentObj) {
    var jobId = this.props.currentSelectedStudent.job_id;
    var studentId = this.props.currentSelectedStudent.student_id;

    /*
    * Lockout. Don't allow them to click multiple times.
    */

    if (!this.props.isHiring) {

      this.props.hireStudent(jobId, studentId, 
      
     /*
      * Success callback
      */

      () => {

          this.refs.container.success(
            "Success.",
            "You've hired a student!", {
              timeout: 3000
          });

          /*
          * Close the confirm hire modal
          */

          this.refs.confirmHireStudentModal.hide()

          /*
          * Show the post-hire modal.
          * When they close the post-hire modal, we reload the page.
          */

          this.refs.postHireModal.show()

      },

     /*
      * Failure callback
      */
      
      () => {

        this.refs.container.error(
          "Whoops.",
          "Something went wrong trying to hire this student.", {
            timeout: 3000
          });

      })
    }

  },

  closePostHireModalAndReload () {
    this.refs.postHireModal.hide();

   /*
    * Now reload the page so that the completed job doesn't appear.
    */

    window.location.reload()
    
  },

  closeConfirmRejectStudentModal () {
    this.refs.confirmRejectStudentModal.hide()
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

  componentWillReceiveProps(newProps) {

  },

  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer isAStudent={this.props.user.isAStudent} profilePicture={typeof this.props.profile.logoUrl == "object" && this.props.profile.logoUrl !== null
            ? this.props.profile.logoUrl.preview
            : config.mediaUrl + this.props.profile.logoUrl}/>
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

        {
         /* 
          * ===================================
          *      confirmHireStudentModal
          * ===================================
          *
          * This is the reject modal. 
          * It pops up before we reject the student.
          */
        }
        <div id="confirm-hire-student-modal-wrapper">
          <SkyLight
              ref="confirmHireStudentModal"
              title="">
              <div>
                { this.props.currentSelectedStudent
                  ? <div>Are you sure you want to HIRE 
                          {` ${this.props.currentSelectedStudent.user_firstName} ${this.props.currentSelectedStudent.user_lastName} `}
                        for your <b>{this.props.currentSelectedJob.title}</b> position?</div>
                  : ''}
                <div className={rejectButtonsContainer}>
                  <button className={hireBtn} onClick={this.handleHireStudent}>YES, HIRE</button>
                  <button className={cancelBtn} onClick={this.closeConfirmHireStudent}>CANCEL</button>
                </div>
              </div>
          </SkyLight>
        </div>

        {
         /* 
          * ===================================
          *      postHireModal
          * ===================================
          *
          * Post-hire modal.
          * Show up after hiring the student and gives the
          * employer a little more information on what to do next.
          */
        }
        <div id="post-hire-modal-wrapper">
          <SkyLight
              ref="postHireModal"
              afterClose={this.closePostHireModalAndReload}
              title="">
              <div>
                <div className={postHireContainer}>
                  <h3>Congratulations for hiring a student through Univjobs.</h3>

                  <p>We've sent an email to your new hire telling them that you'll be following up shortly 
                  and we have informed all of the other applicants that the job is now closed.</p>

                  <p>Tell us about your experience using Univjobs; we'd like to improve in the future so that we can
                  make the hiring process easier.</p>

                  <p><i>The page will reload after you close this window.</i></p>
                </div>
                <div className={postHireBtnContainer}>
                  <button className={hireBtn} onClick={this.closePostHireModalAndReload}>OK</button>
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
                      handleContactStudent={this.handleContactStudent}
                      questions={this.props.currentSelectedJob.questions.filter((question) => question.job_id == this.props.currentSelectedJob.job_id)}
                      answers={this.props.currentSelectedJob.answers.filter((answer) => answer.job_id == this.props.currentSelectedJob.job_id && answer.student == this.props.studentProfileAndAnswersModal.student.student_id)}
                      isContacting={this.props.isContacting}
                      preferredEmail={this.props.studentProfileAndAnswersModal.student.preferred_email ? this.props.studentProfileAndAnswersModal.student.preferred_email : null}
                      isHiring={this.props.isHiring ? this.props.isHiring : false}
                      handleOpenConfirmHireStudentModal={this.handleOpenConfirmHireStudentModal}
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
    isContacting:  applicants.isContacting ? applicants.isContacting : false,
    contactSuccess: applicants.contactSuccess ? applicants.contactSuccess : false,
    isHiring: applicants.isHiring ? applicants.isHiring : false,
    hireSuccess: applicants.hireSuccess ? applicants.hireSuccess : false
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
