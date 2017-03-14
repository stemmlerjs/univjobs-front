import React, { Component, PropTypes } from 'react'
import { SidebarContainer } from 'modules/Main'
import { Applicants } from 'modules/Applications'
import pageContainer  from '../styles/index.css'
import axios from 'axios'
import * as list from 'helpers/lists'
import * as utils from 'helpers/utils'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import { authRedirectFilter } from 'config/routes'

import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'


const actionCreators = {
  ...userActionCreators,
}

const ApplicantsContainer = React.createClass({
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
         to: 'EMPLOYERS',		 // EMPLOYERS only on this route
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
      /*
	axios.all([
		application.getStudentApplications(this.context.store, actionCreators),
		list.getIndustries(this.context.store, actionCreators),
		list.getJobTypes(this.context.store, actionCreators),
       ])
      */
  },

  showModal (e, j) {
      /*
  	e.preventDefault()
	  console.log('ON SHOW MODAL')
	  console.log(j)
	  this.context.store.dispatch(actionCreators.applicationModalClicked(j.id))
  	  this.context.store.dispatch(actionCreators.applicationShowModal(j))
  */
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
       <Applicants/>
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
function mapStateToProps({user}) {
  return {
	  user: user ? user : {},
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(ApplicantsContainer)
