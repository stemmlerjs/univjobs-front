// ==============REACT BUILTIN========================= //
import React, { PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { EmployerDashboard } from 'modules/Dashboard'

// ==============THIRD PARTY IMPORTS========================= //

// ====== REDUX AND STATE IMPORTS =======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getStudents as getStudentsREST } from 'helpers/dashboard'
import { authRedirectFilter } from 'config/routes'
import * as dashboardActionCreators from 'redux/modules/dashboard/dashboard'

// ================CSS IMPORTS============================== //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'


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

  openStudentProfileModal() {

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

  openInviteStudentModal() {

  },

  closeInviteStudentModal() {

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

  },

  render () {
    this.finallyDisableOverlay()
    return (
      <div className={pageContainer}>
        <SidebarContainer isAStudent={false}/>
        <EmployerDashboard 
          students={this.props.students}
          handleOpenStudentProfileModal={this.openStudentProfileModal}
          handleCloseStudentProfileModal={this.closeStudentProfileModal}
          handleOpenInviteStudentModal={this.openInviteStudentModal}
          handleCloseInviteStudentModal={this.closeInviteStudentModal}
          handleDoInviteStudent={this.doInviteStudent}
        />
      </div>
    )
  }
})

function mapStateToProps({user, dashboard}) {
  return {
    user: user ? user : {},
    students: dashboard.employerDashboard.students ? dashboard.employerDashboard.students : []
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators({
    ...dashboardActionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(EmployerDashboardContainer)
