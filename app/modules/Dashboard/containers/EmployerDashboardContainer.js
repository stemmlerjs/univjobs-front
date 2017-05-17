// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { EmployerDashboard } from 'modules/Dashboard'
import { StudentProfileModal } from 'modules/SharedComponents'

import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import SkyLight from 'react-skylight'
import {Combobox} from 'react-widgets'

// ====== REDUX AND STATE IMPORTS =======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStudents as getStudentsREST } from 'helpers/dashboard'
import { authRedirectFilter } from 'config/routes'
import * as dashboardActionCreators from 'redux/modules/dashboard/dashboard'
import inviteStudentModal from 'redux/modules/dashboard/inviteStudentModal'
import * as jobActionCreators from 'redux/modules/job/job'

// ================CSS IMPORTS============================== //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'
import { inviteStudentStyle, inviteStudentModalContainer, comboBox, inviteStudentModalButtonsContainer,
  inviteStudentModalInputContainer, inviteStudentModalApplicantsCount, cancelBtn, acceptBtn,
  loader, failureMessage, successMessage, listItems } from '../styles/EmployerDashboardStyles.css'


 /*
  * InviteListItem
  *
  * This small component shows on the modal where we choose
  * which job we want to invite the student to.
  * 
  * It simply shows if the student was already invited to the
  * job or not.
  *
  */

const InviteListItem = React.createClass({
  render() {
    var job = this.props.item

    return (
      <div className={listItems}>
        <div>{job.title}</div>
        {job.invited 
          ? <div>&#10004;</div>
          : ''
        }
        
      </div>
    )
  }
})

const EmployerDashboardContainer = React.createClass({
  propTypes: {
    user: PropTypes.object, 
    students: PropTypes.array 
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
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
        student: '/join',         // if not logged in, go here (student)
        employer: '/join'         // if not logged in, go here (employer)
      },
      restricted: {
        to: 'EMPLOYERS',          // employers only on this route
        redirectTo: '/dashboard/st' // if not an employer, redirect to the student equivalent
      }
    }

    return authRedirectFilter(config, this.context.store, this.context.router)
  },

 /*
  * finallyDisableOverlay
  *
  * A handle to the closeOverlay() function passed down from a higher order component.
  * Invoked as the final function on page load.
  */

  finallyDisableOverlay() {

   /*
    * TODO: Watch out for places where we've changed 'application' to rootApplication.
    * This might screw us up because the overlay stays open.
    */

    if(this.context.store.getState().rootApplication.isOverlayActive){
      this.props.closeOverlay()
    }
  },

  /*
  * componentWillMount
  *
  * When the actual DOM is loaded, let's first do the redirection filter before we
  * close the overlay
  *
  * @param (Object) newProps
  */

  componentWillMount() {
    /*  On page load, we will first get all the required lists for the screen */  
    this.doRedirectionFilter()
      .then(this.props.getStudents)
      .then(this.props.getAllJobsQuestionsAnswersForEmployer)
      .then(this.finallyDisableOverlay)
  },

 /*
  * openStudentProfileModal
  *
  * Needs to be triggered when the employer clicks on "SEE MORE"
  * for a student. Should open a modal with the selected student
  * and show more information about them.
  *
  */

  openStudentProfileModal(selectedStudent) {
    this.props.openStudentProfileModal(selectedStudent)
    this.refs.studentProfileModal.show()
  },

  selectInviteJob (job) {
    this.context.store.dispatch(this.props.selectJobInviteModal(job))
  },
  

  closeStudentProfileModal() {

  },

 /*
  * openInviteStudentModal
  *
  * Needs to be triggered when the employer clicks on "INVITE"
  * for a student. Should open a modal with options to select 
  * the job that the employer wants to invite the student for and then
  * should allow the employer to invite the student to the selected
  * job.
  */

  openInviteStudentModal(selectedStudent) {

   /*
    * Close the student profile modal if it's open; we need to do this
    * first because we can open it from the student profile modal now.
    */

    this.refs.studentProfileModal.hide()

   /*
    * Add the student obj to the invite modal so that we can display the 
    * student selected.
    */

    this.props.openInviteStudentModal(selectedStudent, this.props.jobs)
    this.refs.inviteStudentModal.show()
  },

  closeInviteStudentModal() {
    setTimeout(()=> {
      this.refs.inviteStudentModal.hide()
    }, 2000)
  },

  componentWillUpdate(props) {

   /* 
    * After a successful invite, we want to close the modal.
    */

    if (props.inviteStudentModal.success == true) {
      this.closeInviteStudentModal()
    }
  },

 /*
  * doInviteStudent
  *
  * This should actually start the process of inviting the student.
  * There are a couple of states to this as should be reflected in
  * our action creators.
  *
  * When we initiate inviting the student to a job, we shouldn't be able
  * to close the "invite student modal" until it has completed or it has 
  * failed. This means that we need some sort of "locking" where we can't 
  * click away and close the modal.
  */

  doInviteStudent() {
    this.props.inviteStudentToJob(this.props.inviteStudentModal.selectedJob.job_id, this.props.inviteStudentModal.selectedStudent.student_id)
  },

  render () {
    this.finallyDisableOverlay()
    return (
      <div className={pageContainer}>
        <SidebarContainer isAStudent={false}/>
        <EmployerDashboard 
          students={this.props.students}
          lists={this.props.lists}
          handleOpenStudentProfileModal={this.openStudentProfileModal}
          handleCloseStudentProfileModal={this.closeStudentProfileModal}
          handleOpenInviteStudentModal={this.openInviteStudentModal}
          handleCloseInviteStudentModal={this.closeInviteStudentModal}
        />

        {/* =======================================
                    SEE STUDENT DETAILS MODAL
            =======================================
        */}
        <div id="student-profile-modal-wrapper">
          <SkyLight
              hideOnOverlayClicked
              ref="studentProfileModal"
              title="">
              { 
                this.props.studentProfileModal.student 
                  ? <StudentProfileModal
                      pictureUrl={config.mediaUrl + 'avatar/' + this.props.studentProfileModal.student.photo_url}
                      name={this.props.studentProfileModal.student.user_firstName.substring(0,1).toUpperCase() + this.props.studentProfileModal.student.user_firstName.substring(1) + ' ' 
                            + this.props.studentProfileModal.student.user_lastName.substring(0,1).toUpperCase() + this.props.studentProfileModal.student.user_lastName.substring(1)}
                      funFact={this.props.studentProfileModal.student.fun_fact}
                      educationLevel={this.props.studentProfileModal.student.edu_level}
                      hasCar={this.props.studentProfileModal.student.has_car}
                      hobbies={this.props.studentProfileModal.student.hobbies}
                      languages={this.props.studentProfileModal.student.languages}
                      clubsString={this.props.studentProfileModal.student.clubsString}
                      sportsString={this.props.studentProfileModal.student.sportsString}
                      major={this.props.studentProfileModal.student.major}
                      gpa={this.props.studentProfileModal.student.gpa}
                      gradDate={new Date(this.props.studentProfileModal.student.grad_date)}
                      schoolName={this.props.studentProfileModal.student.school_name}
                      hometown={this.props.studentProfileModal.student.hometown}
                      hobbies={this.props.studentProfileModal.student.hobbies}
                      recentCompanyName={this.props.studentProfileModal.student.recent_company_name}
                      recentPosition={this.props.studentProfileModal.student.recent_company_position}
                      lists={this.props.lists}
                      handleOpenInviteStudentModal={this.openInviteStudentModal}
                      studentObj={this.props.studentProfileModal.student}
                      />
                  : ''
              } 
          </SkyLight>
        </div>

        {/* =======================================
                      INVITE STUDENT MODAL
            =======================================
        */}
        <div id="invite-student-modal-wrapper">
          <SkyLight
              afterClose={this.props.getAllJobsQuestionsAnswersForEmployer}
              ref="inviteStudentModal">
              <div className={inviteStudentModalContainer}>
                <div className={inviteStudentModalInputContainer}>
                  <div>Invite this student to apply to </div>
                    <Combobox
                      className={comboBox}
                      textField="title"
                      valueField="job_id"
                      filter="contains"
                      itemComponent={InviteListItem}
                      data={this.props.inviteStudentModal.jobInvitesForSelectedStudent}
                      onChange={(value) => {
                        this.selectInviteJob(value)
                      }}
                    />
                </div>
                <div className={inviteStudentModalApplicantsCount}>
                  {this.props.inviteStudentModal.currentApplicants !== undefined
                    ? this.props.inviteStudentModal.currentApplicants
                    : '#'} of {this.props.inviteStudentModal.maxApplicants 
                      ? this.props.inviteStudentModal.maxApplicants
                      : '#'} applicants</div>
                <div className={this.props.inviteStudentModal.isInviting ? loader : ''}></div>

                {/* SUCCESS MESSAGE*/}
                <div className={successMessage}>{this.props.inviteStudentModal.isInviting == false & this.props.inviteStudentModal.success == true 
                  ? "Success!"
                  : ''}
                </div>

                {/* FAILURE MESSAGE */}
                <div className={failureMessage}>{this.props.inviteStudentModal.isInviting == false & this.props.inviteStudentModal.error !== '' 
                  ? this.props.inviteStudentModal.error
                  : ''}
                </div>

              </div>
              
              <div className={inviteStudentModalButtonsContainer}>
                <button className={cancelBtn} onClick={()=> {
                  this.refs.inviteStudentModal.hide()
                }}>CANCEL</button>
                <button className={acceptBtn} onClick={this.doInviteStudent}>OK</button>
              </div>

          </SkyLight>

        </div>
      </div>
    )
  }
})

function mapStateToProps({user, dashboard, job, list}) {
  return {
    user: user ? user : {},
    students: dashboard.employerDashboard.students ? dashboard.employerDashboard.students : [],
    inviteStudentModal: dashboard.employerDashboard.inviteStudentModal ? dashboard.employerDashboard.inviteStudentModal : {},
    studentProfileModal: dashboard.employerDashboard.studentProfileModal ? dashboard.employerDashboard.studentProfileModal: {},
    jobs: job.employerJobs ? job.employerJobs :  [],
    lists: list ? list : {}
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators({
    ...dashboardActionCreators,
    ...jobActionCreators,
    ...inviteStudentModal.actionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(EmployerDashboardContainer)
