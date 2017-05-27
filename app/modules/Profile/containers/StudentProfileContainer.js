import React, { PropTypes } from 'react' 
import { authRedirectFilter } from 'config/routes' 
import { StudentProfile } from 'modules/Profile' 
import { SidebarContainer } from 'modules/Main' 
import { pageContainer } from '../styles/StudentProfileContainerStyles.css' 
import axios from 'axios' 

import config from 'config'



// ========= REDUX AND STATE IMPORTS ========== //
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/user/user'
import * as profileActionCreators from 'redux/modules/profile/profile'
import * as listActionCreators from 'redux/modules/list/list'
// ============================================ //

// ============== MESSAGES =================== //
var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

// ========================================== //

const actionCreators = {
    ...listActionCreators,
	...profileActionCreators,
	...userActionCreators
}

const StudentProfileContainer = React.createClass({
  propTypes: {
      //TODO: Add propTypes here
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

 /** createNewTag
  *
  * This function creates a new tag, not in the data list[sports, clubs].
  * It takes the current value given by the user then creates an object with id and value, and concatenates them
  *
  * @return (Promise)
  :*
  */
   createNewTag(newValue, list, textField, updateProfileFieldName) {
       let pickList = {
                    //Master list
                    'schoolClubList': this.props.schoolClubList,
                    'sportsList': this.props.sportsList,
                    //propTypes, pushed to the database
                    'schoolClub': this.props.schoolClub,
                    'sportsTeam': this.props.sportsTeam

       }

       //Create a new tag array object
       //Temporarily concat new value to the old specified list. 
       //Updated list will show when queried
       let tag = [{ [textField]: newValue }].concat(pickList[updateProfileFieldName])
       
       this.props.updateProfileField(updateProfileFieldName, tag, true)
       
       //Create an action creator to display which list got updated
       this.props.updateTag(list)
       
   },

 /** retrieveAllLists
  *
  * This function acquires all the required lists from /api/lists/{choice}
  * and resolves it's returned promise object on completion.
  *
  * @return (Promise)
  :*
  */

  retrieveAllLists() {
    const promise = new Promise((resolve, reject) => {

      if (this.props.gendersList.length == 0) {
        console.log("[Univjobs]: v1.0 - Getting all static lists.")
        this.props.getAllStaticLists()
      }

        this.props.handleGetLanguages()
        this.props.handleGetSports()
        this.props.handleGetClubs()
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
        to: 'STUDENTS',			      // students only on this route
        redirectTo: '/profile/em'	// if not an employer, redirect to the student equivalent
      }
    }

     return authRedirectFilter(config, this.context.store, this.context.router)
  },

  handleSubmit(studentProps) {
   //If profile is NOT completed, do /PUT. All fields must be populated and valid.
   //debugger
   console.log(studentProps)
   if(!this.props.isProfileCompleted) {
	   this.context.store.dispatch(
		    profileActionCreators.submitProfileFirstTime(0, studentProps, this.props.user)
	    )
   } else {
   	this.context.store.dispatch(
	    profileActionCreators.updateProfile(0, studentProps, this.props.user, this.props.snapshot)
	)
	    console.log("Profile already completed, use PATCH")}
   },

   handleButtonToggle(booleanState, buttonName) {
       this.props.handleToggleButton(booleanState, buttonName)
   },

  /** finallyDisableOverlay
   * 
   * A handle to the closeOverlay() function passed down from a higher order component.
   * Invoked as the final function on page load.
   *
  */

  finallyDisableOverlay() {
  	if(this.context.store.getState().rootApplication.isOverlayActive) {
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

      //=======================submit & execute below=====================//
      //TODO: Success for first time submit, need to redirect to job search
      //
      //Check user if it is a
     let error = newProps.error;
     let submitSuccess = newProps.submitSuccess;
     
     if(submitSuccess) {
    	this.refs.container.success(
    		"Nice stuff!",
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
   * 4.)Then, put back snapshot user info into inputs (if user has completed profile)
   * 3.)Then, close the overlay
   *
   */

  componentWillMount() {
	    this.doRedirectionFilter()
      .then(this.retrieveAllLists())
	    .then(this.finallyDisableOverlay)

  },

  componentWillUnmount() {
    console.log("wait, no we have to check")
  },



  render () {
    return (
      <div className={pageContainer}>
        <SidebarContainer isAStudent={this.props.user.isAStudent} 
          profilePicture={typeof this.props.profile.photo == "object" && this.props.profile.photo !== null
            ? this.props.profile.photo.preview
            : config.mediaUrl + '/avatar/' + this.props.profile.photo
          } />
        <StudentProfile
      	  emailPreferences={this.props.emailPreferences}
      	  emailPrefList={this.props.emailPrefList}
      	  firstName={this.props.firstName}
      	  lastName={this.props.lastName}
      	  studentStatus={this.props.studentStatus}
      	  studentStatusList={this.props.studentStatusList}
      	  educationLevel={this.props.educationLevel}
      	  educationLevelList={this.props.educationLevelList}
      	  school={this.props.school}
      	  enrollmentDate={this.props.enrollmentDate}
      	  graduationDate={this.props.graduationDate}
      	  major={this.props.major}
      	  majorsList={this.props.majorsList}
      	  gpa={this.props.gpa}
      	  personalEmail={this.props.personalEmail}
      	  gender={this.props.gender}
      	  gendersList={this.props.gendersList}
      	  sportsTeam={this.props.sportsTeam}
          sportsList={this.props.sportsList}
      	  schoolClub={this.props.schoolClub}
          schoolClubList={this.props.schoolClubList}
      	  languages={this.props.languages}
      	  languagesList={this.props.languagesList}
      	  hasCar={this.props.hasCar}
      	  companyName={this.props.companyName}
      	  position={this.props.position}
      	  funFacts={this.props.funFacts}
      	  hometown={this.props.hometown}
      	  hobbies={this.props.hobbies}
      	  photo={this.props.photo}
      	  resume={this.props.resume}
      	  onSubmit={this.handleSubmit}
      	  updateProfileField={this.props.updateProfileField}
          sportsToggle={this.props.sportsToggle}
          clubsToggle={this.props.clubsToggle}
          languagesToggle={this.props.languagesToggle}
          gpaToggle={this.props.gpaToggle}
          emailToggle={this.props.emailToggle}
          onHandleButtonToggle={this.handleButtonToggle}
          onCreateNewTag={this.createNewTag}
      	 // submitErrorsExist={this.props.submitErrorsExist}
      	  propsErrorMap={this.props.propsErrorMap}
      	  snapshot={this.props.snapshot}/>
      	<ToastContainer ref="container"
      	  toastMessageFactory={ToastMessageFactory}
      	  className="toast-top-right" />
      </div>
    )
  },
})

function mapStateToProps({user, profile, list}) {
  return {
    user: user ? user : {},
    profile: profile.studentProfile ? profile.studentProfile : {},
    snapshot: profile.snapshot ? profile.snapshot : {},
    emailPreferences: profile.studentProfile.emailPreferences ? profile.studentProfile.emailPreferences : 2,  // DEFAULT value (string || number)
    emailPrefList: list.emailPreferencesArray ? list.emailPreferencesArray : [],                      // list of selected value (array)
    firstName: profile.studentProfile.firstName ? profile.studentProfile.firstName : '',
    lastName: profile.studentProfile.lastName ? profile.studentProfile.lastName : '',
    studentStatus: profile.studentProfile.studentStatus ? profile.studentProfile.studentStatus : 1,          // DEFAULT value (String || number)
    studentStatusList: list.studentStatusArray ? list.studentStatusArray : [],                    // list of selected value (array)
    educationLevel: profile.studentProfile.educationLevel ? profile.studentProfile.educationLevel : 1,
    educationLevelList: list.eduLevelsArray ? list.eduLevelsArray : [],
    /**
     * Get students school from snapshot
     * */
    school: profile.studentProfile ? profile.snapshot.name : '',
    enrollmentDate: profile.studentProfile.enrollmentDate ?  profile.studentProfile.enrollmentDate : new Date, 
    graduationDate: profile.studentProfile.graduationDate ? profile.studentProfile.graduationDate : new Date,  

    /*major(value, list)*/
    major: profile.studentProfile.major ? profile.studentProfile.major : 1,  
    majorsList: list.majorsArray ? list.majorsArray : [],

    /*gpa(value, boolean)*/
    gpa: profile.studentProfile.gpa ? profile.studentProfile.gpa : '0.00',
    gpaToggle: profile.studentProfile.gpaToggle ? profile.studentProfile.gpaToggle : false,

    /*personalEmail(value, boolean)*/
    personalEmail: profile.studentProfile.personalEmail ? profile.studentProfile.personalEmail : '',
    emailToggle: profile.studentProfile.emailToggle ? profile.studentProfile.emailToggle : false,

    /*gender(value, boolean, list)*/
    gender: profile.studentProfile.gender ? profile.studentProfile.gender : 1,
    gendersList: list.gendersArray ? list.gendersArray : [],

    /*sportsTeam(value, boolean, list)*/
    sportsTeam: profile.studentProfile.sportsTeam ? profile.studentProfile.sportsTeam : [],
    sportsToggle: profile.studentProfile.sportsToggle ? profile.studentProfile.sportsToggle : false,
    sportsList: list.sports ? list.sports : [],

    /*schoolClub(value, boolean, list)*/
    schoolClub: profile.studentProfile.schoolClub ? profile.studentProfile.schoolClub: [], 
    clubsToggle: profile.studentProfile.clubsToggle ? profile.studentProfile.clubsToggle : false,
    schoolClubList: list.schoolClubs ? list.schoolClubs : [],

    /*languages(value, boolean, list)*/
    languages: profile.studentProfile.languages ? profile.studentProfile.languages : [],
    languagesToggle: profile.studentProfile.languagesToggle ? profile.studentProfile.languagesToggle : false,
    languagesList: list.languages ? list.languages : [],

    /*hasCar(value)*/
    hasCar: profile.studentProfile.hasCar ? profile.studentProfile.hasCar : false,

    companyName: profile.studentProfile.companyName ? profile.studentProfile.companyName : '',
    position: profile.studentProfile.position ? profile.studentProfile.position : '',
    funFacts: profile.studentProfile.funFacts ? profile.studentProfile.funFacts : '',
    hometown: profile.studentProfile.hometown ? profile.studentProfile.hometown : '',
    hobbies: profile.studentProfile.hobbies? profile.studentProfile.hobbies: '',
    photo: profile.studentProfile.photo ? profile.studentProfile.photo : '',
    resume: profile.studentProfile.resume ? profile.studentProfile.resume : '',
    isProfileCompleted: profile.isProfileCompleted ? profile.isProfileCompleted : '',

    propsErrorMap: profile.studentProfile.propsErrorMap ? profile.studentProfile.propsErrorMap : { 
        emailPreferences: false,
        firstName: false,
        lastName: false,
        studentStatus: false,
        educationLevel: false,
        school: false,
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
        funFacts: false,
        hometown: false,
        hobbies: false,
        photo: false,
        resume: false,
        sportsToggle: false,
        clubsToggle: false,
        languagesToggle: false,
        emailToggle: false,
        gpaToggle: false,
    },
    error: profile.error ? profile.error : '',
    submitSuccess: profile.submitSuccess ? profile.submitSuccess : false
  }
}

function mapActionCreatorsToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(StudentProfileContainer)
