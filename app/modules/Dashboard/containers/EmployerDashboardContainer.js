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

// ================CSS IMPORTS============================== //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'


const EmployerDashboardContainer = React.createClass({
  propTypes: {
    user: PropTypes.object, 
    students: PropTypes.object 
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

  /** finallyDisableOverlay
  *
  * A handle to the closeOverlay() function passed down from a higher order component.
  * Invoked as the final function on page load.
  */

  finallyDisableOverlay() {
    if(this.context.store.getState().application.isOverlayActive){
      this.props.closeOverlay()
    }
  },

  getStudents() {
    return getStudentsREST(this.context.store)
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
      .then(this.getStudents())
      .then(this.finallyDisableOverlay)
  },

  render () {
    this.finallyDisableOverlay()
    return (
      <div className={pageContainer}>
        <SidebarContainer isAStudent={false}/>
        <EmployerDashboard students={this.props.students}/>
      </div>
    )
  },
})

function mapStateToProps({user, dashboard}) {
  return {
    user: user ? user : {},
    students: dashboard.employerDashboard.students ? dashboard.employerDashboard.students : []
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(EmployerDashboardContainer)
