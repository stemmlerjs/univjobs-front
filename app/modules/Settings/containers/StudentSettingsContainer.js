// ==============REACT BUILTIN========================= //
import React, { Component, PropTypes } from 'react'

// ==============MADE COMPONENTS========================= //
import { SidebarContainer } from 'modules/Main'
import { StudentSettings } from 'modules/Settings'

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

var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const StudentSettingsContainer = React.createClass({
    propTypes: {
      user: PropTypes.object,
      //id: PropTypes.string.isRequired,
      //isChecked: PropTypes.bool,
      //clickedButton: PropTypes.func,
    },

	contextTypes: {
		router: PropTypes.object.isRequired,
		store: PropTypes.object.isRequired
	},

    clickedButton(e, id, isChecked) {
        e.preventDefault()
        console.log(id)
        console.log(isChecked)
        //Receive the id, isChecked
        //Change state to true or false
        //Change css style
    
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

  render () {
    return (
      <div className={pageContainer} >
          <SidebarContainer isAStudent={true} profilePicture={config.mediaUrl + '/avatar/' + this.props.profile.photo}/>
          <StudentSettings
                id={'name'}
                isChecked={true}
                onClickedButton={this.clickedButton}
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
