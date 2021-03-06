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


var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


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
    this.props.inviteStudentToJob(this.props.inviteStudentModal.selectedJob.job_id, this.props.inviteStudentModal.selectedStudent.student_id,

    /*
     * Success callback
     */

    () => {

      this.refs.container.success(
          "Invited that student to the job!",
          "Did it.",
          {
            timeout: 3000
        });

      setTimeout(() => {
        this.closeInviteStudentModal()
      }, 2000)
    },
    
    /*
     * Failure callback
     */
    
    (errorMessage) => {

      this.refs.container.error(
          errorMessage,
          "Couldn't do that.",
          {
            timeout: 3000
        });

    })
  },

 /*
  * filterStudents
  *
  * Filter the students on the Employer Dashboard through (so far) if they
  * have a car and their program name.
  */

  filterStudents () {
    
    let filterConfig = this.props.filterConfig
    let students = this.props.students
    let filteredStudents = {}

    students = students.map((student) => {
      student.filter_show = true;
      return student
    })

    /*
     * Filter by the checkboxes first
     */
    
    if (filterConfig.hasCar) {
      for (let i = 0; i < students.length; i++) {

        if (students[i].has_car === 1) {
          filteredStudents[i] = students[i]
          continue
        }

      }
    }

    /*
     * Filter by Program of study.
     */
   
    if (filterConfig.program !== "") {
      for (let i = 0; i < students.length; i++) {

        if (students[i].major === filterConfig.program) {
          filteredStudents[i] = students[i]
          continue
        }

        delete filteredStudents[i]

      }
    }

   /*
    * Now, we will alter the store to show only the filtered students.
    * First, set all students to false (don't show).
    */

    if ((filterConfig.program !== "" && filterConfig.program !== undefined) || filterConfig.hasCar) {

      students = students.map((student) => {
        student.filter_show = false;
        return student
      })
      

      /*
      * Then, only show all the students that made it through the filter.
      */

      for (var key in filteredStudents) {
        students[Number(key)].filter_show = true
      }

    }

    /*
     * Update the store.
     */

    this.props.updateFilteredStudents(students)
    
  },

  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer isMobile={this.props.isMobile} isAStudent={false} profilePicture={typeof this.props.profile.logoUrl == "object" && this.props.profile.logoUrl !== null
            ? this.props.profile.logoUrl.preview
            : config.mediaUrl + this.props.profile.logoUrl}
            page={this.props.route.page}
        />

        
        <EmployerDashboard 
          students={this.props.students}
          lists={this.props.lists}
          handleOpenStudentProfileModal={this.openStudentProfileModal}
          handleCloseStudentProfileModal={this.closeStudentProfileModal}
          handleOpenInviteStudentModal={this.openInviteStudentModal}
          handleCloseInviteStudentModal={this.closeInviteStudentModal}
          industriesList={this.props.industryList ? this.props.industryList : []}
          programsList={this.props.majors ? this.props.majors : []}
          updateFilter={this.props.updateFilterSettings}
          filterStudents={this.filterStudents}
          filterConfig={this.props.filterConfig}
          updateFilterSettings={this.props.updateFilterSettings}
          handleToggleFilterMenu={() => {

            let delayedHidden = document.getElementById("delayed-overflow-hidden")

            /*
             * If the menu is opening, set overflow to hidden.
             * Then after 500 ms, set overflow to auto.
             */

            if (!this.props.filterMenuOpen) {
              console.log("Menu opening, keeping overflow:hidden set.")
              delayedHidden.style.overflow = 'hidden !important';

              setTimeout(() => {
                console.log("Menu open now. Turning off overflow.")
                //delayedHidden.style.overflow = 'auto !important';
              }, 3000)
            }

           /*
            * If the menu is closing, turn the overflow on right away.
            */

            else {
              console.log("Menu closing, turned overflow:hidden on.")
              delayedHidden.style.overflow = 'hidden !important';
            }

            this.props.toggleFilterMenu(false)
          }}
          filterMenuOpen={this.props.filterMenuOpen}
          isFetchingStudents={this.props.isFetchingStudents}
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
                      languagesString={this.props.studentProfileModal.student.languagesString}
                      major={this.props.studentProfileModal.student.major}
                      program={this.props.studentProfileModal.student.program}
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
                      recentCompanyName={this.props.studentProfileModal.student.recent_company_name}
                      recentCompanyPosition={this.props.studentProfileModal.student.recent_company_position}
                      skills={this.props.studentProfileModal.student.skills}
                      isDashboardCard={true}
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

            { 
              
              /*
               * Only allow the student to 
                this.props.employerHasActiveJobs 
               */
              
              this.props.employerHasActiveJobs 
              ? <div className={inviteStudentModalContainer}>
                  <div className={inviteStudentModalInputContainer}>
                    <div>Invite this student to apply to </div>
                      <Combobox
                        className={comboBox}
                        textField="title"
                        valueField="job_id"
                        filter="contains"
                        itemComponent={InviteListItem}
                        data={this.props.inviteStudentModal.jobInvitesForSelectedStudent ? this.props.inviteStudentModal.jobInvitesForSelectedStudent.filter((job) => {
                          return job.active !== 0 && job.verified == 1
                        }) : this.props.inviteStudentModal.jobInvitesForSelectedStudent}
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
                        : '#'} applicants
                  </div>
                  <div className={this.props.inviteStudentModal.isInviting ? loader : ''}></div>

                  <div className={inviteStudentModalButtonsContainer}>
                    <button className={cancelBtn} onClick={()=> {
                      this.refs.inviteStudentModal.hide()
                    }}>CANCEL</button>
                    <button className={acceptBtn} 
                      onClick={() => {
                        
                        /*
                         * If the user has selected a job to invite them to
                         */
                        if (this.props.inviteStudentModal.selectedJob.job_id !== undefined) {

                          /*
                           * If the job has NOT yet met it's capacity in terms of max 
                           * applicants, we can invite.
                           */

                          if (this.props.inviteStudentModal.selectedJob.applicants.length < this.props.inviteStudentModal.selectedJob.max_applicants) {
                            this.doInviteStudent()
                          }

                          /*
                           * Otherwise, if we've met our capacity, then we can't invite this student.
                           */
                          
                          else {
                            this.refs.container.error(
                              'No more applicant availability left.',
                              "Can't invite student to this job.",
                              {
                                timeout: 3000
                            });
                          }
                          
                        }

                        /*
                         * if the employer hasn't yet selected a job to invite them to.
                         */

                        else {
                          this.refs.container.error(
                            'No job selected.',
                            "Please select a job to invite this student to.",
                            {
                              timeout: 3000
                          });
                        }

                      }}>OK</button>
                  </div>
                </div>

              : 
                <div className={inviteStudentModalContainer}>
                  <div className={inviteStudentModalInputContainer}>
                    <div>You don't have any active jobs to invite students to yet! </div>
                  </div>
                  <div className={inviteStudentModalButtonsContainer}>
                    <button className={cancelBtn} onClick={()=> {
                      this.refs.inviteStudentModal.hide()
                    }}>CLOSE</button>
                  </div>
                </div>
             }
            
                  
          </SkyLight>

        </div>

        	<ToastContainer ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" />
      </div>
    )
  }
})

function mapStateToProps({user, profile, dashboard, job, list}) {
  return {
    user: user ? user : {},
    profile: profile.employerProfile ? profile.employerProfile : {},
    students: dashboard.employerDashboard.students ? dashboard.employerDashboard.students : [],
    isFetchingStudents: dashboard.employerDashboard.isFetching ? dashboard.employerDashboard.isFetching : false,
    inviteStudentModal: dashboard.employerDashboard.inviteStudentModal ? dashboard.employerDashboard.inviteStudentModal : {},
    studentProfileModal: dashboard.employerDashboard.studentProfileModal ? dashboard.employerDashboard.studentProfileModal: {},
    jobs: job.employerJobs ? job.employerJobs :  [],
    lists: list ? list : {},
    industryList: list.industriesArray ? list.industriesArray : [],
    majors: list.majorsArray ? list.majorsArray : [],
    filterConfig: dashboard.employerDashboard.filterConfig ? dashboard.employerDashboard.filterConfig : {
      hasCar: false,
      program: '',
      industry: ''
    },
    filterMenuOpen: dashboard.employerDashboard.filterMenuOpen ? dashboard.employerDashboard.filterMenuOpen : false,
    employerHasActiveJobs: job.employerHasActiveJobs ? job.employerHasActiveJobs : false
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
