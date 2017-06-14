
import React, { PropTypes } from 'react'
import { authRedirectFilter } from 'config/routes'
import { SidebarContainer } from 'modules/Main'
import { EmployerProfile } from 'modules/Profile'
import axios from 'axios'
import * as lists from 'helpers/lists'
import { Title } from 'modules/SharedComponents'

import config from 'config'

// ====== REDUX AND STATE IMPORTS =======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as profileActionCreators from 'redux/modules/profile/profile'
import * as listActionCreators from 'redux/modules/list/list'

// ============= MESSAGES ===============
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
// ======================================


// =============== OTHER ================

var beingDraggedOver = false;

import { pageContainer } from 'sharedStyles/sharedContainerStyles.css'

const actionCreators = {
  ...listActionCreators,
  ...profileActionCreators,
  ...userActionCreators
}

const EmployerProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  },

 /** retrieveAllLists
  *
  * This function acquires all the required lists from /api/lists/{choice}
  * and resolves it's returned promise object on completion.
  *
  * @return (Promise)
  *
  */

  retrieveAllLists() {
    const promise = new Promise((resolve, reject) => {
      if (this.props.industryList.length == 0) {
        console.log("[Univjobs]: v1.0 - Getting all static lists.")
        this.props.getAllStaticLists()
      }

        this.props.handleGetIndustries()
          .then((resp) => resolve(true))
          .catch((resp) => resolve(true))
    })
      return promise
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
        redirectTo: '/profile/st' // if not an employer, redirect to the student equivalent
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
    if(this.context.store.getState().rootApplication.isOverlayActive){
      this.props.closeOverlay()
    }
  },

  /*
  * componentWillReceiveProps
  *
  * When props come in, lets do the following:
  * - check for error messages to display an error message
  * - check for a success message to display a success message
  *
  * @param (Object) newProps
  */

  componentWillReceiveProps(newProps) {
    let error = newProps.error;
    let submitSuccess = newProps.submitSuccess;
  },

  /*
  * componentWillMount
  *
  * When the actual DOM is loaded, lets get all the lists required
  * then do the redirection filter (if required) and then
  * close the overlay
  *
  * @param (Object) newProps
  */

  componentWillMount() {
    /*  On page load, we will first get all the required lists for the screen */
    
      this.doRedirectionFilter()

      /*
       * If the profile is not completed, we can show a toastr.
       * If the profile IS completed, we just advance.
       */

      .then(({isProfileCompleted}) => {
        return new Promise((resolve, reject) => {
          
          if (isProfileCompleted == 0) {
            this.refs.container.info(
              "Thanks!",
              "Before you can move on, we need you to finish your profile.", {
                timeout: 3000
              });

            resolve()
          }

          else {
            console.log("profile complete, continue")
            resolve()
          }

        })
      })
      .then(this.retrieveAllLists)
      .then(this.finallyDisableOverlay)
      .catch((err) => {
        console.log("[componentWillMount]: Employer Profile - Error occurred", err)
      })
  },

  handleSubmit(empProps) {
    // If Profile is NOT completed, do /PUT. All fields must be populated and valid.
    if(!this.props.isProfileCompleted) {
      this.context.store.dispatch(
        profileActionCreators.submitProfileFirstTime(1, empProps, this.props.user,
        
        /*
         * Success Callback
         */

        () => {
          this.refs.container.success(
            "Woohoo :)",
            "Profile successfully updated!", {
            timeOut: 3000
          });

          this.context.store.dispatch(userActionCreators.setProfileCompleted())
        },

        /*
         * Failure Callback
         */
        
        (error) => {

          this.refs.container.error(
            error,
            "Something went wrong while trying to submit", {
            timeOut: 3000
          });

        })
      )
    } else {
      // If Profile is completed already, do /PATCH. All fields must be populated and valid.
      this.context.store.dispatch(
        profileActionCreators.updateProfile(1, empProps, this.props.user, this.props.snapshot,
        
        /*
         * Success Callback
         */

        () => {

          this.refs.container.success(
            "Woohoo :)",
            "Profile successfully updated!", {
            timeOut: 3000
          });

        },

        /*
         * Failure Callback
         */
        
        (error) => {

          this.refs.container.error(
            error,
            "Something went wrong while trying to submit", {
            timeOut: 3000
          });

        })
      )
      console.log("Profile already completed, lets patch this")
    }
  },

  /*
  * onDragOver
  * 
  * On the drag over of the profile picture, we conditionally style it to smooth it out.
  */

  onDragOver () {
    if (!beingDraggedOver) {
      beingDraggedOver = true;
      document.getElementById('dropPhotoDiv').classList.add('profilePictureDragDrop')
    }
  },

  /*
  * onDragLeave
  * 
  * On the drag over of the profile picture, we conditionally style it to smooth it out.
  */

  onDragLeave () {
    beingDraggedOver = false;
    document.getElementById('dropPhotoDiv').classList.remove('profilePictureDragDrop')
  },

  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer 
          isAStudent={false} 
          logoUrl={this.props.logoUrl}
          profilePicture={typeof this.props.profile.logoUrl == "object" && this.props.profile.logoUrl !== null
            ? this.props.profile.logoUrl.preview
            : config.mediaUrl + this.props.profile.logoUrl}
        />
        <Title 
            titleName="My business profile"
            subHeading=""/>
        <EmployerProfile
          companyName={this.props.companyName}
          industry={this.props.industry}
          industryList={this.props.industryList}
          website={this.props.website}
          description={this.props.description}
          employeeCount={this.props.employeeCount}
          officeAddress={this.props.officeAddress}
          officeCity={this.props.officeCity}
          officePostalCode={this.props.officePostalCode}
          logoUrl={this.props.logoUrl}
          updateProfileField={this.props.updateProfileField}
          onSubmit={this.handleSubmit}
          submitErrorsExist={this.props.submitErrorsExist}
          profileErrorsMap={this.props.profileErrorsMap}
          email={this.props.user.email}
          firstName={this.props.user.firstName}
          lastName={this.props.user.lastName}
          dateJoined={new Date(this.props.user.dateJoined)}
          mobile={Number(this.props.user.mobile)}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
        />
        <ToastContainer ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" />
      </div>
    )
  }
})

function mapStateToProps({user, profile, list}) {
  return {
    user: user ? user : {},
    profile: profile.employerProfile ? profile.employerProfile : {},
    snapshot: profile.snapshot ? profile.snapshot : {},
    companyName: profile.employerProfile.companyName ? profile.employerProfile.companyName : '',
    industry: profile.employerProfile.industry ? profile.employerProfile.industry : '',
    industryList: list.industriesArray ? list.industriesArray : [],
    website: profile.employerProfile.website ? profile.employerProfile.website : '',
    description: profile.employerProfile.description ? profile.employerProfile.description : '',
    employeeCount: profile.employerProfile.employeeCount ? profile.employerProfile.employeeCount : '',
    officeAddress: profile.employerProfile.officeAddress ? profile.employerProfile.officeAddress : '',
    officeCity: profile.employerProfile.officeCity ? profile.employerProfile.officeCity : '',
    officePostalCode: profile.employerProfile.officePostalCode ? profile.employerProfile.officePostalCode : '',
    logoUrl: profile.employerProfile.logoUrl ? profile.employerProfile.logoUrl : '',
    isProfileCompleted: profile.isProfileCompleted ? profile.isProfileCompleted : '',
    submitErrorsExist: profile.submitErrorsExist ? profile.submitErrorsExist : false,
    profileErrorsMap: profile.employerProfile.propsErrorMap ? profile.employerProfile.propsErrorMap : {
      companyName: false,
      industry: false,
      logoUrl: false,
      website: false,
      description: false,
      employeeCount: false,
      officeAddress: false,
      officeCity: false,
      officePostalCode: false
    },
    error: profile.error ? profile.error : '',
    submitSuccess: profile.submitSuccess ? profile.submitSuccess : false
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(EmployerProfileContainer)
