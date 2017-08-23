// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { MyPostings, MyClosedPostings, MyAwaitingPostings } from 'modules/MyPostings'

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

var jobs = [
  {
    jobId: 1,
    title: 'Marketing Street Team - Brampton'
  },
  {
    jobId: 2,
    title: 'Post-Punk Guitarist'
  }
]

const MyPostingsContainer = React.createClass({
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
    	  student: '/join',	            // if not logged in, go here (student)
    	  employer: '/join'             // if not logged in, go here (employer)
      },
      restricted: {
        to: 'EMPLOYERS',		          // STUDENTS only on this route
	      redirectTo: '/dashboard/st'   // if not an EMPLOYER, redirect to the student equivalent
		 			                            // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },


  componentWillMount() {
      this.doRedirectionFilter()
        // .then(this.props.handleGetJobs(this.props.profile.snapshot.employer.employer_base_id))
        .then(this.props.handleGetIndustries())
        .then(this.props.handleGetJobTypes())
  	    .then(this.props.closeOverlay())
  },

  render () {
    return (
      <div className={pageContainer} >
        <SidebarContainer isMobile={this.props.isMobile} isAStudent={false} 
          page={this.props.route.page}
          profilePicture={config.mediaUrl + this.props.profile.employerProfile.logoUrl}
        />

        {

          /*
           * My Open Postings
           * My Closed Postings
           * My Awaiting Postings
           */

          this.props.route.page === "postings-open"
            ? <MyPostings 
                jobs={jobs}
                selectedJobId={null}
              />
            : this.props.route.page === "postings-closed"
            ? <MyClosedPostings 
                jobs={jobs}
                selectedJobId={null}
              />
            : this.props.route.page === "postings-approval"
            ? <MyAwaitingPostings 
                jobs={jobs}
                selectedJobId={null}
              />
            : ''
        }
        
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(MyPostingsContainer)
