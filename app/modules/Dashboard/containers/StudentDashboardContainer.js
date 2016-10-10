import React, { PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { StudentDashboard } from 'modules/Dashboard'
import { getJobs } from 'helpers/dashboard'
import SkyLight from 'react-skylight'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as dashboardActionCreators from 'redux/modules/dashboard/dashboard'
import { authRedirectFilter } from 'config/routes'


const actionCreators = {
  ...userActionCreators,
  ...dashboardActionCreators
}

const StudentDashboardContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

/**
  * handleSwitchUserType
  *
  *  Intially, we assume the user is a Student (users.isAStudent === true).
  *  This flips the switch on that.
  *
  handleSwitchUserType (e) {
    e.preventDefault()
    this.props.switchedUserType(this.props.isAStudent)
  },
  */

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
        student: '/join',                 // if not logged in, go here (student)
        employer: '/join'                 // if not logged in, go here (employer)
      },
      restricted: {
        to: 'STUDENTS',                   // employers only on this route
        redirectTo: '/dashboard/em'       // if not an employer, redirect to the student equivalent
      }
    }

    return authRedirectFilter(config, this.context.store, this.context.router)
  },

  /* Handles the fetch of the job feed.
   * NOTE: Might want to add listener here in the future
   *
   * */
  handleFetchJobs() {
	//Dispatch to fetch jobs
	//
  
  },

  componentWillMount() {
    this.doRedirectionFilter()
      .then(this.props.closeOverlay())
  },

  render () {
  console.log(this.props)
    return (
      <div>
      <SidebarContainer />
       <StudentDashboard />
      </div>
    )
  },
})

/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

function mapStateToProps({jobs}) {
  return {
	//isAStudent: user.isAsStudent ? true : false,
	//isProfileCompleted: user.isProfileCompleted ?true : false,
	//user: user ? user : {}	
	// id: jobs.id,
	// user: {
	//   website: jobs.user.website,
	//   first_name: jobs.user.first_name,
	//   logo: jobs.user.logo,
	//   office_city: jobs.user.office_city,
	//   last_name: jobs.user.last_name,
	//   employee_count: jobs.user.employee_count,
	//   office_postal_code: jobs.user.office_postal_code,
	//   company_name: jobs.user.company_name,
	//   industry: jobs.user.industry,
	//   office_address: jobs.user.office_address,
	//   mobile: jobs.user.mobile,
	//   description: jobs.user.description,
	// },
	// type: jobs.user.type,
	// title: jobs.user.title,
	// paid: jobs.user.paid,
	// start_date: jobs.user.start_date,
	// responsibilities: jobs.user.responsibilities,
	// qualification: jobs.user.qualification,
	// address: jobs.user.address,
	// city: jobs.user.city,
	// compensation: jobs.user.compensation,
	// max_applicants: jobs.user.max_applicants,
	// active: jobs.user.active,
	// verified: jobs.user.verified,
	// isFetching: false,
	// error: props.error,
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
  return bindActionCreators(actionCreators, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentDashboardContainer)
