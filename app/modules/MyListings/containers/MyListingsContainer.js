// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { MyListings } from 'modules/MyListings'

import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import axios from 'axios'
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as jobActionCreators from 'redux/modules/job/job'
import * as listActionCreators from 'redux/modules/list/list'
import * as fetch from 'helpers/dashboard'

// ==================OTHER IMPORTS============================== //
import { authRedirectFilter } from 'config/routes'

// ==============CSS IMPORTS============================= //
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'

const MyListingsContainer = React.createClass({
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
        to: 'EMPLOYERS',		 // STUDENTS only on this route
	      redirectTo: '/mylistings/em'   // if not an EMPLOYER, redirect to the employer equivalent
		 			 // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  /** showModal
   *
   * This function takes in the submit event & the job id
   * It calls a dispatch modalCliked & showModal(id)
   * Once the store is notified, a reducer should be activated to find the appropriate job info,
   * then supplies the modal the appropraite job info
   * After, the modal appears to the user of the job info they pressed
   *
   * @param(e) - DOM event
   * @param(j) - Object job
   * @param(q) - Object questions
  */
    //showModal(e, j)
  showModal(e, j) {
      e.preventDefault()
      //this.context.store.dispatch(actionCreators.dashboardModalClicked(j.id))
      //this.context.store.dispatch(actionCreators.dashboardShowModal(j, j.questions))
  },


  componentWillMount() {
      this.doRedirectionFilter()
        .then(this.props.handleGetJobs(this.props.profile.snapshot.employer.employer_base_id))
        .then(this.props.handleGetIndustries())
        .then(this.props.handleGetJobTypes())
  	    .then(this.props.closeOverlay())
  },


  componentWillUnmount() {
    console.log("Component WillUnmount")
  },

  render () {
    return (
      <div className={pageContainer} >
        <SidebarContainer isMobile={this.props.isMobile} isAStudent={false} 
          page={this.props.route.page}
          profilePicture={config.mediaUrl + this.props.profile.employerProfile.logoUrl}
        />
        <MyListings
            handleCardClick={this.showModal}
            jobs={this.props.job ? this.props.job : ''}
            industries={this.props.industryList}
    	      jobTypes={this.props.jobTypes}
            profile={this.props.profile}
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

function mapStateToProps({user, job, list, profile}) {
  return {
	  user: user ? user : {},
      job: job ? job.employerJobs.jobs : [],
      profile: profile ? profile : {},
      industryList: list.industries ? list.industries : [],
      jobTypes: list.jobTypes ? list.jobTypes : [],

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
    ...jobActionCreators,
    ...listActionCreators,
    ...userActionCreators,
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(MyListingsContainer)
