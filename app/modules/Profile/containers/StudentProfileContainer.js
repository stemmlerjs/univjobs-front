import React, { PropTypes } from 'react'
import { authRedirectFilter } from 'config/routes'
import { StudentProfile } from 'modules/Profile'
import { SidebarContainer } from 'modules/Main'
import { pageContainer } from '../styles/StudentProfileContainerStyles.css'
import * as lists from 'helpers/lists'
import axios from 'axios'

// ========= REDUX AND STATE IMPORTS ========== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as profileActionCreators from 'redux/modules/profile/profile'
// ============================================ //

// ============== MESSAGES =================== //
var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
// ========================================== //

const actionCreators = {
	...profileActionCreators,
	...userActionCreators
}

const StudentProfileContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
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
	   axios.all([
		    lists.getEmailPref(this.context.store),
		    lists.getStudentStatus(this.context.store),
	//	    lists.getEducationLevel(this.context.store),
	//	    list.getMajor(this.context.store),
	//	    list.getGender(this.context.store),

	   ])
	    .then((resp) => resolve(true))
	    .catch((resp) => resolve(true))
	})
	return promise;
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
        employer: '/join'	// if not logged in, go here (employer)
      },
      restricted: {
        to: 'STUDENTS',			// students only on this route
        redirectTo: '/profile/em'	// if not an employer, redirect to the student equivalent
      }
    }

     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  /** finallyDisableOverlay
   * 
   * A handle to the closeOverlay() function passed down from a higher order component.
   * Invoked as the final function on page load.
   *
  */

  finallyDisableOverlay() {
	if(this.context.store.getState().application.isOverlayActive) {
	  this.props.closeOverlay()
	}
  },

  /** componentWillReceiveProps
   *
   * When props comes in, let's do the following:
   * - check for error messages to the display an error message 
   * - check for a message to display a success message  
   */

  componentWillReceiveProps(newProps) {
     let error = newProps.error;
     let submitSuccess = newProps.submitSuccess;
     
     if(submitSuccess) {
	this.refs.container.success(
		"Success in StudentProfileContainer",
		"Profile succesfully updated", {
		   timeout: 3000
		});
     }
     
     if(error) {
	this.refs.container.error(
		error,
		"Something went kaboom!", {
		   timeout: 3000
		});
     }
  },

  /*
   * componentWillMount
   *
   * When the DOM is loaded, do the following:
   * 1.)Get all lists required
   * 2.)Then, do the redirection filter (if required)
   * 3.)Then, close the overlay
   *
   */

  componentWillMount() {
	this.retrieveAllLists()
	.then(this.doRedirectionFilter)
	.then(this.finallyDisableOverlay)
  },

  componentWillUnmount() {
    console.log("wait, no we have to check")
  },

  handleSubmit(studentProps) {
   //If profile is NOT completed, do /PUT. All fields must be populated and valid.
   if(!this.props.isProfileCompleted) {
	   this.context.store.dispatch(
		profileActionCreators.submitProfileFirstTime(1, studentProps, this.props.user)
	    )
   }// else {
   	//this.context.store.dispatch(
	//  profileActionCreators.updateProfile(1, studentProps, this.props.user, this.props.snapshot)
	//)
	//console.log("Profile already completed, use PATCH")}
   //}
  },

  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer/>
        <StudentProfile
      	  emailPreferences={this.props.emailPreferences}
      	  emailPrefList={this.props.emailPrefList}
      	  firstName={this.props.firstName}
      	  lastName={this.props.lastName}
      	  studentStatus={this.props.studentStatus}
      	  studentStatusList={this.props.studentStatusList}

	  /*       
	  degreeName={this.props.degreeName}
	  schoolName={this.props.schoolName}
	  enrollmentDate={this.props.enrollmentDate}
	  graduationDate={this.props.graduationDate}
	  major={this.props.major}
	  gpa={this.props.gpa}
	  personalEmail={this.props.personalEmail}
	  gender={this.props.gender}
	  sportsTeam={this.props.sportsTeam}
	  schoolClub={this.props.schoolClub}
	  languages={this.props.languages}
	  hasCar={this.props.hasCar}
	  companyName={this.props.companyName}
	  position={this.props.position}
	  hometown={this.props.hometown}
	  hobbies={this.props.hobbies}
	  photo={this.props.photo}
	  resume={this.props.resume}
*/
	  updateProfileField={this.props.updateProfileField}
	  submitErrorsExist={this.props.submitErrorsExist}
	  profileErrorsMap={this.props.profileErrorsMap}
	
	/>
	<ToastContainer ref="container"
	  toastMessageFactory={ToastMessageFactory}
	  className="toast-top-right" 
	/>
      </div>
    )
  },
})

function mapStateToProps({user, profile}) {
  return {
    user: user ? user: {},
    snapshot: profile.snapshot ? profile.snapshot : {},
    emailPreferences: profile.studentProfile.emailPreferences ? profile.studentProfile.emailPreferences : 2,  // DEFAULT value (string || number)
    emailPrefList: profile.lists.emailPreferences ? profile.lists.emailPreferences : [],                      // list of selected value (array)
    firstName: profile.studentProfile.firstName ? profile.studentProfile.firstName : '',
    lastName: profile.studentProfile.lastName ? profile.studentProfile.lastname : '',
    studentStatus: profile.studentProfile.studentStatus ? profile.studentProfile.studentStatus : '',          // DEFAULT value (String || number)
    studentStatusList: profile.lists.studentStatuses ? profile.lists.studentStatuses : [],                    // list of selected value (array)

    /*
    degreeName: profile.studentProfile.degreeName ? profile.studentProfile.degreeName : '',
    schoolName: profile.studentProfile.schoolName ? profile.studentProfile.schoolName : '',
    enrollmentDate: profile.studentProfile.enrollmentDate ?  profile.studentProfile.enrollmentDate : '', 
    graduationDate: profile.studentProfile.graduationDate ? profile.studentProfile.graduationDate : '',  
    major: profile.studentProfile.major ? profile.studentProfile.major : '',  
    gpa: profile.studentProfile.gpa ? profile.studentProfile.gpa : '',
    personalEmail: profile.studentProfile.personalEmail ? profile.studentProfile.personalEmail : '',
    gender: profile.studentProfile.gender ? profile.studentProfile.gender : '',
    sportsTeam: profile.studentProfile.sportsTeam ?
    profile.studentProfile.sporsTeam : '',
    schoolClub: profile.studentProfile.schoolClub ? profile.studentProfile.schoolClub: '', 
    languages: profile.studentProfile.languages ? profile.studentProfile.languages : '',
    hasCar: profile.studentProfile.hasCar ? profile.studentProfile.hasCar : '',
    companyName: profile.studentProfile.companyName ? profile.studentProfile.companyName : '',
    position: profile.studentProfile.position ? profile.studentProfile.position : '',
    hometown: profile.studentProfile.hometown ? profile.studentProfile.hometown : '',
    photo: profile.studentProfile.photo ? profile.studentProfile.photo : '',
    resume: profile.studentProfile.resume ? profile.studentProfile.resume : '',
    */
    propsErrorMap: profile.studentProfile.propsErrorMap ? profile.studentProfile.propsErrorMap : { 
	emailPreferences: false,
	firstName: false,
   	lastName: false,
  	studentStatus: false,
   /*
	degreeName: false,
   	schoolName: false,
   	enrollmentDate: false,
   	graduationDate: false,
   	major: false,
   	gpa: false,
   	personalEmail: false,
   	gender: false,
   	sportsTeam: false,
   	schoolClub: false,
   	languages: false,
   	hasCar: false,
   	companyName: false,
   	position: false,
   	hometown: false,
   	hobbies: false,
   	photo: false,
   	resume: false
	*/
    },
    error: profile.error ? profile.error : '',
    submitSuccess: profile.submitSuccess ? profilesubmitSuccess : false
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentProfileContainer)
