// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { StudentSettings } from 'modules/Settings'
import SkyLight from 'react-skylight'

import config from 'config'

// ==============THIRD PARTY IMPORTS========================= //
import ReduxToastr from 'react-redux-toastr'
import {toastr} from 'react-redux-toastr'

// =============REDUX STATE & IMPORTS========================== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'

// =======================OTHER IMPORTS============================== //
import { authRedirectFilter } from 'config/routes'

// ==============CSS IMPORTS=============================
import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'
import { userProfileAdviceTitle, userProfileAdviceBody, cancelBtn, acceptBtn } from 'sharedStyles/sharedComponentStyles.css'

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const StudentSettingsContainer = React.createClass({
  propTypes: {
    user: PropTypes.object,
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
	    redirectTo: '/dashboard/em'   // if not an EMPLOYER, redirect to the employer equivalent
		 			 // This might change to employer categories
      }
    }
     return authRedirectFilter(config, this.context.store, this.context.router)
  },



  componentWillMount() {
	  this.doRedirectionFilter()
      .then(this.props.closeOverlay())
  },

  componentWillUnmount() {

  },

  confirmDeactivateAccount () {
    this.refs.confirmDeactivateAccount.show()
  },

  deactivateAccount () {

  },

  closeDeactivateAccount () {
    this.refs.confirmDeactivateAccount.hide()
  },

  render () {
    return (
      <div className={pageContainer} >
        <SidebarContainer isAStudent={true} profilePicture={config.mediaUrl + '/avatar/' + this.props.profile.photo}/>
        <StudentSettings
          handleConfirmDeactivateAccount={this.confirmDeactivateAccount}/>


          {
            /*
              * ========================================
              *           confirmDeactivateAccount
              * ========================================
              *
              * This will show right before a student gets to
              * actually deactivate their account. a
              *
              * It should let them know what the implications of
              * deactivating their account is.
              */
            }
            <div id="settings-confirm-deactivate-account-wrapper">
              <SkyLight ref="confirmDeactivateAccount">
                <div className={userProfileAdviceTitle}>Do ya really wanna deactivate your account? ✋</div>
                <div className={userProfileAdviceBody}>We just wanted you to know that profiles that have a <span className={userProfileAdviceTitle}>profile picture </span>
                  and a <span className={userProfileAdviceTitle}>resume</span> {"perform better than those that don't. You can still save your profile, we just thought we'd let you know."} </div>
                <br/>
                <div className={userProfileAdviceBody}>What do you wanna do?</div>
                <div>
                  <button className={acceptBtn} onClick={this.deactivateAccount}>Yes, deactivate account</button>
                  <button className={cancelBtn} onClick={this.closeDeactivateAccount}>Cancel</button>
                </div>
              </SkyLight>
            </div>


      </div>
    )
  },
})

/* The entire redux store is passed in here,
// Return an object defining which values you want to bind to props
//
// @params ({user}) contains BaseUser & Employer attributes
// */

function mapStateToProps({user, profile }) {
  return {
    profile: profile.studentProfile ? profile.studentProfile : {}
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
  }, dispatch)
}

// connect(specify_what_keys_you_want_from_store, wraps_dispatch_around_action_creators)(container)

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentSettingsContainer)
