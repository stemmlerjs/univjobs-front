/*ApplicationsContainer
 *
 *The container logic that renders all student applications for a particular job posting from an employer
 * */

// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { Applications } from 'modules/Applications'

// ==============THIRD PARTY IMPORTS========================= //
import axios from 'axios'
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as applicationActionCreators from 'redux/modules/application/application'
import * as list from 'helpers/lists'
import * as utils from 'helpers/utils'
import * as application from 'helpers/application'

// =============EXTRA IMPORTS========================== //
import { authRedirectFilter } from 'config/routes'

// ==============CSS IMPORTS============================= //
import { pageContainer }  from 'sharedStyles/sharedContainerStyles.css'


const ApplicationsContainer = React.createClass({

    /*TODO: Define the required typechecking variables
    *
    * */
    propTypes: {
        //Insert typechecking variables
	    user: PropTypes.object, 
        applications : PropTypes.object,
        industries : PropTypes.object,
        jobTypes : PropTypes.object, 
        applicationModal: PropTypes.object,
      	onShowModal: PropTypes.func,
      	onHideModal: PropTypes.func
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
	 redirectTo: '/job/myapplicants'   // if not an EMPLOYER, redirect to the employer equivalent
		 			 // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

/**
 * retrieveAll
 *	This function fetches from endpoints api/job/my_applications:
 *
 *
 *
 * #REFERRENCE:
 * 	https://developers.google.com/web/fundamentals/getting-started/primers/promises
 */

  retrieveAll() {
	axios.all([
		application.getStudentApplications(this.context.store, actionCreators),
		list.getIndustries(this.context.store, actionCreators),
		list.getJobTypes(this.context.store, actionCreators),
       ])
  },

  showModal (e, j) {
  	e.preventDefault()
	//debugger
	  console.log('ON SHOW MODAL')
	  console.log(j)
	  this.context.store.dispatch(actionCreators.applicationModalClicked(j.id))
  	  this.context.store.dispatch(actionCreators.applicationShowModal(j))
  },

  hideModal (e, id) {
  	this.context.store.dispatch(actionCreators.applicationHideModal(id))
  },

  componentWillMount() {
	console.log("componentWillMount")
	this.doRedirectionFilter()
	.then(this.retrieveAll())
	.then(this.props.closeOverlay())

  },

  componentWillUnmount() {
    console.log("Component WillUnmount")
  },

  render () {
    return (
      <div className={pageContainer}>
      <SidebarContainer isAStudent={this.props.user.isAStudent}/>
       <Applications
       	  user={this.props.user}
       	  applications={this.props.applications}
      	  industries={this.props.industries}
      	  jobTypes={this.props.jobTypes}
      	  applicationModal={this.props.applicationModal}
      	  onShowModal={this.showModal}
      	  onHideModal={this.hideModal}
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

/*NOTE: Questions should also be filtered in the Dashboard.
 * 	At the moment we are borrowing every single question in the dashboard
 * 	Is there a better way?
 *
 * 	In other words, all questions are queried in the dashboard page*/
function mapStateToProps({user, application, profile, createJob}) {
  return {
	  user: user ? user : {},
	  applications : application.studentApplications ? application.studentApplications.applications : {},
	  industries : profile ? profile.lists.industries : {},
	  jobTypes : createJob ? createJob.lists.jobTypes : {},
	  applicationModal: application.studentApplications ? application.applicationModal : '',
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
    ...applicationActionCreators,
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(ApplicationsContainer)
