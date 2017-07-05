import { employerProfilePUT, employerProfilePATCH, validateEmployerProfileFields,
  studentProfilePUT, studentProfilePATCH, validateStudentProfileFields,
  compareToSnapshot, getUserInfo, extractLanguageId,
  extractClubsObject, extractSportsObject } from 'helpers/profile'
import { toISO, hasCarBoolean } from 'helpers/utils'

// =======================================================
// ==================== ACTIONS ==========================
// =======================================================


// ********** Base form actions **************
const UPDATE_PROFILE_FIELD = 'PROFILE.UPDATE_PROFILE_FIELD'

const TOGGLE_BUTTON = 'PROFILE.TOGGLE_BUTTON'

const UPDATE_TAG = 'PROFILE.UPDATE_TAG'

const SAVING_PROFILE_INFO = 'PROFILE.SAVING_PROFILE_INFO'
const SAVED_PROFILE_INFO_SUCCESS = 'PROFILE.SAVED_PROFILE_INFO_SUCCESS'
const SAVED_PROFILE_INFO_FAILURE = 'PROFILE.SAVED_PROFILE_INFO_FAILURE'

const FETCHING_PROFILE_INFO = 'PROFILE.FETCHING_INFO'
const FETCHED_PROFILE_INFO_SUCCESS = 'PROFILE.FETCHED_INFO_SUCCESS'
const FETCHED_PROFILE_INFO_FAILURE = 'PROFILE.FETCHED_INFO_FAILURE'

// =======================================================
// ================== ACTION CREATORS ====================
// =======================================================
export function toggleButton(booleanState, buttonName) {
    return {
        type: TOGGLE_BUTTON,
        booleanState,
        buttonName
    }
}

export function updateTag(listName) {
    return {
        type: UPDATE_TAG,
        listName
    }
}

export function updateProfileField(fieldName, newValue, isAStudent) {
  return {
    type: UPDATE_PROFILE_FIELD,
    fieldName,
    newValue,
    isAStudent
 }
}

/*===============FETCHING PROFILE INFO==============*/
export function fetchingProfileInfo() {
    return {
        type: FETCHING_PROFILE_INFO
    }
}

export function fetchedProfileInfoSuccess (isProfileCompleted, isEmailVerified, profileInfo, isAStudent) {
  return {
    type: FETCHED_PROFILE_INFO_SUCCESS,
    isProfileCompleted,
    isEmailVerified,
    profileInfo,
    isAStudent
  }
}

export function fetchedProfileInfoFailure (error) {
  return {
    type: FETCHED_PROFILE_INFO_FAILURE,
    error
  }
}


export function savingProfileInfo() {
    return {
        type: SAVING_PROFILE_INFO
    }
}

/*NOTE: Should this have an input
 *
 * */
export function savedProfileSuccess() {
  return {
    type: SAVED_PROFILE_INFO_SUCCESS
  }
}
export function savedProfileFailure(profileErrorsObj, error, isAStudent) {
  return {
    type: SAVED_PROFILE_INFO_FAILURE,
    isAStudent,
    error,
    profileErrorsObj
  }
}

// =======================================================
// ===================== THUNK ===========================
// =======================================================
// REF: https://github.com/ReactjsProgram/Redux-Immutable/commit/c1b261b21150e472c6199dcda7bcb792a81678f8
// https://online.reacttraining.com/courses/redux-and-immutablejs/lectures/946352
//
//
//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleToggleButton(booleanState, buttonName) {
    return function(dispatch) {
        //ACTION: FETCHING_USER_PROFILE 
        dispatch(toggleButton(booleanState, buttonName))
    }
}

export function handleSaveNewTag(newTagName, pickList, textField, updateProfileFieldName) {
    return function(dispatch) {
        //ACTION: FETCHING_USER_PROFILE 
        dispatch(saveNewTag())
        
        
        
        //Enter new tag into sportsTeam or clubsList
        dispatch(updateProfileField(updateProfileFieldName, newTagName, true))
    }
}

export function handleGetUserProfile(dispatch) {
    return function(dispatch) {
        //ACTION: FETCHING_USER_PROFILE 
        dispatch(fetchingProfileInfo())
        return getUserInfo()
            .then((resp) => 
                console.log(resp)
            )
            .catch((err) => 
                console.log(err)
            )
    }
}


/*
* submitProfileFirstTime
*
* This first submit to the profile will be done through the use of a PUT request.
* We change the isProfileCompleted flag to == true after this.
*
* @param userTypeInt (Number) - 0 if a student, 1 if employer
* @param profileInfo (Object) - data to PUT
* @param user (Object) - data to PUT
*
*/
export function submitProfileFirstTime(userTypeInt, profileInfo, user, successCallback, failureCallback) {
  return function (dispatch) {
	console.log(userTypeInt, profileInfo, user)
    dispatch(savingProfileInfo())
    switch(userTypeInt) {
      case 0:
    	console.log("SUBMITTING STUDENT PROFILE FIRST TIME")

     /*
      * First, we need to validate the profile fields.
      * Ensure that any fields that needed to be filled out are filled out.
      */
        
    	validateStudentProfileFields(profileInfo, (errorExist, profileFieldErrors) => {

        /*
         * An error occured. Some fields that needed to be filled out were not properly
         * filled out.
         */

    	  if(errorExist) {

    	    // DISPATCH - SAVE_PROFILE_ERROR
    	    dispatch(savedProfileFailure(profileFieldErrors, [
            "Couldn't save profile.",
    	      "Please fill in missing fields"
    	    ], true))

    	  } 
        
        /*
         * Otherwise, all is well. We should go ahead and submit.
         * But we should also set default values for things if they are null.
         * 
         * Important: If we check the redux store, we'll see that there are a bunch
         * of fields that don't assume the default values that they should be assuming 
         * until the user actually interacts with that input field. This means that we
         * are going to have to set the default values in the object that we're using to
         * update the profile with, here.
         */
        
        else {
    	   console.log('SUBMIT STUDENT PROFILE NO ERRORS')
    	    // No errors, proceed to /PUT on api/me

          /*
           * SET DEFAULT VALUES (if not interacted with) BEFORE SUBMIT.
           */



          var putData = {
              "is_a_student": true,
              "is_profile_completed": true,
              "email": user.email,
              "first_name": profileInfo.firstName,
              "last_name": profileInfo.lastName,
              "is_active": true,
              "date_joined": user.dateJoined,
              "mobile": user.mobile,
        	    "schoolName": profileInfo.school,
              languages: btoa(JSON.stringify(extractLanguageId(profileInfo.languages))),
              sports: btoa(JSON.stringify(extractSportsObject(profileInfo.sportsTeam, profileInfo))),
              clubs: btoa(JSON.stringify(extractClubsObject(profileInfo.schoolClub, profileInfo))),
              edu_level_id: profileInfo.educationLevel.id ? profileInfo.educationLevel.id : profileInfo.educationLevel,
              email_pref: profileInfo.emailPreferences.id ? profileInfo.emailPreferences.id : profileInfo.emailPreferences,
              status: profileInfo.studentStatus.id ? profileInfo.studentStatus.id : 1,
              enroll_date: toISO(profileInfo.enrollmentDate),
              grad_date: toISO(profileInfo.graduationDate),
              major_id: profileInfo.major.id ? profileInfo.major.id : profileInfo.major,
              GPA: JSON.stringify(parseFloat(profileInfo.gpa)),
              personal_email: profileInfo.personalEmail,
              gender: profileInfo.gender.id ? profileInfo.gender.id : profileInfo.gender,
                /*Converts the value to num*/
              has_car: profileInfo.hasCar === true ? JSON.stringify(1) : JSON.stringify(0),
              recent_company_name: profileInfo.companyName,
              recent_company_position: profileInfo.position,
              fun_fact: profileInfo.funFacts,
              hometown: profileInfo.hometown,
              hobbies: profileInfo.hobbies,
              profilepicture: profileInfo.photo,
              resume: profileInfo.resume,
      	  }
    	    studentProfilePUT(putData)
    	     .then((res) => {
    		// DISPATCH - SAVE_PROFILE_SUCCESS
    	        dispatch(savedProfileSuccess())

              successCallback()
    	     })
    	     .catch((err) => {
    	       // DISPATCH - SAVE_PROFILE_ERROR
    	        dispatch(savedProfileFailure({}, [
                'HTTP Error Occurred',
                err
              ], true))

              failureCallback('Some error occurred trying to update!')
    	     })
    	    }
    	  })
    	  return;

      // ===================================================== //
      // ========== EMPLOYER ================================= //
      // ===================================================== //

      case 1:
        console.log("SUBMITTING EMPLOYER PROFILE FIRST TIME")

        validateEmployerProfileFields(profileInfo, (errorsExist, profileFieldErrors) => {
          if(errorsExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(savedProfileFailure(profileFieldErrors, [
              "Couldn't save profile.",
              'Please fill in missing fields'
            ], false))

          } else {

            // No errors, proceed to /PUT on api/me
            var putData = {
              "user-is_a_student": false,
              "user-is_profile_completed": true,
              "user-email": user.email,
              "user-first_name": user.firstName,
              "user-last_name": user.lastName,
              "user-is_active": true,
              "user-date_joined": user.dateJoined,
              "user-mobile": user.mobile,
              is_a_student: false,
              is_profile_completed: true, // set this flag to true so we know for next time
              company_name: profileInfo.companyName,
              logo: profileInfo.logoUrl,
              office_address: profileInfo.officeAddress,
              office_city: profileInfo.officeCity,
              office_postal_code: profileInfo.officePostalCode,
              description: profileInfo.description,
              website: profileInfo.website,
              employee_count: profileInfo.employeeCount,
              industry: profileInfo.industry.id,
              date_joined: user.dateJoined,
              first_name: user.firstName,
              last_name: user.lastName,
              email: user.email
            }

            employerProfilePUT(putData)
            .then((res) => {

                // DISPATCH - SAVED_PROFILE_SUCCESS
                dispatch(savedProfileSuccess())

                successCallback()
              })
              .catch((err) => {
                // DISPATCH - SAVED_PROFILE_ERROR
                dispatch(savedProfileFailure({}, [
                    'HTTP Error Occurred.\n',
                    err.message
                ], false))

                failureCallback('Some error occurred trying to update!')

              })
          }
        })
        return;
      default:
        return;
    }
  }
}

export function updateProfile(userTypeInt, profileInfo, user, snapshot, successCallback, failureCallback) {
  return function (dispatch) {
    switch(userTypeInt) {

     /*
      * Case 0 is for students.
      * 
      * This section updates the user's profile with the required student
      * fields.
      */

      case 0:
        console.log("UPDATING STUDENT PROFILE")

       /*
        * First, we need to check and see if there are
        * any errors that exist on screen here.
        */
        
        validateStudentProfileFields(profileInfo, (errorExist, profileFieldErrors) => {

         /*
          * There are definitely some errors. We can't continue
          * with submitting the user's profile. Also, we should display a toastr because of this.
          */

          if(errorExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(savedProfileFailure(profileFieldErrors, [    "Couldn't save profile.",
          "Please fill in missing fields"
            ], true))

            failureCallback("Ah man. Something's wrong in your profile.")

          } 

         /*
          * No errors occurred. Everything is as it should be, let's go ahead
          * and save the profile to the backend.
          */
          
          else {

            // No errors, proceed to /PUT on api/me
            var changedData = {
              user_firstname: profileInfo.firstName,
              user_lastname: profileInfo.lastName,
              edu_level: profileInfo.educationLevel ? profileInfo.educationLevel : profileInfo.educationLevel.id, 
              email_pref: profileInfo.emailPreferences ? profileInfo.emailPreferences : profileInfo.emailPreferences.id,
              status: profileInfo.studentStatus ? profileInfo.studentStatus : profileInfo.studentStatus.id, 
              enroll_date: toISO(profileInfo.enrollmentDate),
              grad_date: toISO(profileInfo.graduationDate),
              major: profileInfo.major  ? profileInfo.major : profileInfo.major.id,
              gpa: JSON.stringify(parseFloat(profileInfo.gpa)),
              personal_email: profileInfo.personalEmail,
              gender: profileInfo.gender ? profileInfo.gender : profileInfo.gender.id, 
              languages: btoa(JSON.stringify(extractLanguageId(profileInfo.languages))),
              sports: btoa(JSON.stringify(extractSportsObject(profileInfo.sportsTeam, profileInfo))),
              clubs: btoa(JSON.stringify(extractClubsObject(profileInfo.schoolClub, profileInfo))),
              /*Converts the value to num*/
              has_car: profileInfo.hasCar === false ? JSON.stringify(0) : JSON.stringify(1),
              recent_company_name: profileInfo.companyName,
              recent_company_position: profileInfo.position,
              fun_fact: profileInfo.funFacts,
              hometown: profileInfo.hometown,
              hobbies: profileInfo.hobbies,
              profilepicture: profileInfo.photo,
              resume: profileInfo.resume,
        	  }
            compareToSnapshot(snapshot, changedData, (result) => {

                //changed photo_url & resume_url to reflect backend data
                result.p
              studentProfilePATCH(result)
                .then((res) => {

                  // DISPATCH - SAVE_PROFILE_SUCCESS
                  dispatch(savedProfileSuccess())

                  successCallback()
                })
                .catch((err) => {

                  // DISPATCH - SAVE_PROFILE_ERROR
                  dispatch(savedProfileFailure({}, [
                     'HTTP Error Occurred',
                     err
                  ], false))

                  failureCallback('Some error occurred trying to update!')
                })
             })
            }
          })
        return;

     /*
      * Case 1 is for employers.
      * 
      * This section updates the user's profile with the required employer
      * fields.
      */

      case 1:
        console.log("UPDATING EMPLOYER PROFILE")

        /* First, validate all of the employer fields.
        */

        validateEmployerProfileFields(profileInfo, (errorsExist, profileFieldErrors) => {

         /* After a pass through each of the fields, we will know if 
          * an error exists.
          */

          if(errorsExist) {

            /*
            * Display an error message using the ToastContainer
            * if an error occurred.
            *
            * TODO: Show a different error based on error types.
            */

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(savedProfileFailure(profileFieldErrors, [
              "Couldn't save profile.\n",
              'Please fill in missing fields'
            ], false))

          } else {

           /*
            * No errors, proceed to /PATCH on api/me.
            */

            var changedData = {
              company_name: profileInfo.companyName,
              logo: profileInfo.logoUrl,
              office_location: profileInfo.officeAddress,
              office_city: profileInfo.officeCity,
              office_postal_code: profileInfo.officePostalCode,
              description: profileInfo.description,
              website: profileInfo.website,
              employee_count: profileInfo.employeeCount,
              industry: profileInfo.industry.id ? profileInfo.industry.id : profileInfo.industry,
            }

           /*
            * Figure out what fields need to be updated.
            */

            compareToSnapshot(snapshot, changedData, (result) => {

             /*
              * Perform the HTTP request.
              */

              employerProfilePATCH(result)
                .then((res) => {

                  // DISPATCH - SAVE_PROFILE_SUCCESS
                  dispatch(savedProfileSuccess())
                })
                .catch((err) => {

                  // DISPATCH - SAVE_PROFILE_ERROR
                  dispatch(savedProfileFailure({}, [
                    'HTTP Error Occurred.\n',
                    err.message
                ], false))

                })
            })
          }
        })
        return;
      default:
        return;
    }
  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialState = {
  employerProfile: {},
  studentProfile: {},
  snapshot: {},
  isSubmittingForm: false,
  isProfileCompleted: false,
  submitErrorsExist: false,
  submitSuccess: false,
  error: ''
}



// =======================================================
// ==================== REDUCERS =========================
// =======================================================

/* ===================================================================
*   PROFILE (MAIN, shared amount both employer and student)
*  ===================================================================
*/

export default function profile (state = initialState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      if(action.isAStudent) {
        return {
          ...state,
          studentProfile: studentProfile(state.studentProfile, action),
          submitSuccess: false,
          error: ''
        }
      } else {
        return {
          ...state,
          employerProfile: employerProfile(state.employerProfile, action),
          submitSuccess: false,
          error: ''
        }
      }
    case FETCHING_PROFILE_INFO:
        return {
            ...state,
        }
    case FETCHED_PROFILE_INFO_SUCCESS:
      if(action.isAStudent) {
        return {
          ...state,
          isProfileCompleted: action.isProfileCompleted,
          studentProfile: studentProfile(state.studentProfile, action),
          snapshot: action.profileInfo
        }
      } else {
        return {
          ...state,
          isProfileCompleted: action.isProfileCompleted,
          employerProfile: employerProfile(state.employerProfile, action),
          snapshot: action.profileInfo
         }
      }
    case FETCHED_PROFILE_INFO_FAILURE:
          return {
            ...state,
            error
          }
    case SAVED_PROFILE_INFO_FAILURE:
      if(action.isAStudent) {
        return {
          ...state,
          submitErrorsExist: true,
          error: action.error,
          studentProfile: studentProfile(state.studentProfile, action)
        }
      } else {
        return {
          ...state,
          submitErrorsExist: true,
          error: action.error,
          employerProfile: employerProfile(state.employerProfile, action)
        }
      }
    case SAVED_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        submitSuccess: true,
        error: ''
      }
    case TOGGLE_BUTTON: 
        return {
            ...state,
            studentProfile: studentProfile(state.studentProfile, action)
        }
    case UPDATE_TAG:
        return {
            ...state,
            studentProfile: studentProfile(state.studentProfile, action)
        }
    default :
      return state
  }
}

/* ===================================================================
*   EMPLOYER PROFILE REDUCERS
*  ===================================================================
*/

const initialEmployerProfileState = {
  companyName: '',
  industry: '',
  website: '',
  description: '',
  employeeCount: '',
  officeAddress: '',
  officeCity: '',
  officePostalCode: '',
  logoUrl: '',
  propsErrorMap: {}
}

function employerProfile(state = initialEmployerProfileState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
        propsErrorMap: employerProfileErrors(state.propsErrorMap, action)
      }
    case FETCHED_PROFILE_INFO_SUCCESS:
      return {
        ...state,
          companyName: action.profileInfo.company_name,
          industry: action.profileInfo.industry,
          website: action.profileInfo.website,
          description: action.profileInfo.description,
          employeeCount: action.profileInfo.employee_count,
          officeAddress: action.profileInfo.office_address,
          officeCity: action.profileInfo.office_city,
          officePostalCode: action.profileInfo.office_postal_code,
          logoUrl: action.profileInfo.logo_url
      }
    case SAVED_PROFILE_INFO_FAILURE:
      return {
        ...state,
        propsErrorMap: action.profileErrorsObj
      }
    default:
      return state
  }
}

const employerProfileErrorsInitialState = {
  companyName: false,
  industry: false,
  logoUrl: false,
  website: false,
  description: false,
  employeeCount: false,
  officeAddress: false,
  officeCity: false,
  officePostalCode: false
}

function employerProfileErrors(state = employerProfileErrorsInitialState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: false // we do this because if the field was updated, we'll assume there isn't an error until
                                  // the next submit
      }
  }
}

/* ===================================================================
*   STUDENT PROFILE REDUCERS
*  ===================================================================
*/

const initialStudentProfileState = {
  emailPreferences: 2,
  firstName: '',
  lastName: '',
  studentStatus: '',
  educationLevel: 0,
  schoolName: '',
  enrollmentDate: '',
  graduationDate: '',
  major: '',
  gpa: '',
  personalEmail: '',
  gender: '',
  sportsTeam: [],
  schoolClub: [],
  languages: [],
  hasCar: '',
  companyName: '',
  position: '',
  funFacts: '',
  hometown: '',
  hobbies: '',
  photo: '',
  resume: '',
  sportsToggle: false,
  clubsToggle: false,
  languagesToggle: false,
  gpaToggle: false,
  emailToggle: false,
  propsErrorMap: {}
}

function studentProfile(state = initialStudentProfileState, action) {
  switch(action.type) {
    case TOGGLE_BUTTON:
        return {
            ...state,
            [action.buttonName]: action.booleanState
    }
    case UPDATE_TAG:
        return {
            ...state,
            listName: action.listName
    }
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
        propsErrorMap: studentProfileErrors(state.propsErrorMap, action)
      }
    case SAVED_PROFILE_INFO_FAILURE:
      return {
        ...state,
        propsErrorMap: action.profileErrorsObj
      }
    case FETCHED_PROFILE_INFO_SUCCESS:
          return {
            ...state,
      		    emailPreferences: action.profileInfo.email_pref,
              firstName: action.profileInfo.user_firstname,
              lastName: action.profileInfo.user_lastname,
              studentStatus: action.profileInfo.status,
              enrollmentDate: action.profileInfo.enroll_date ? new Date(action.profileInfo.enroll_date) : null,
              graduationDate: action.profileInfo.grad_date ? new Date(action.profileInfo.grad_date) : null,
              major: action.profileInfo.major,
              educationLevel: action.profileInfo.edu_level,
              schoolName: action.profileInfo.name,
              gpa: action.profileInfo.gpa ? Number(action.profileInfo.gpa) : 0,
              personalEmail: action.profileInfo.personal_email,
        	    gender: action.profileInfo.gender,
              sportsTeam: action.profileInfo.tags ? action.profileInfo.tags.sports : [], //.map((sport) => sport.id),
      		    schoolClub: action.profileInfo.tags ? action.profileInfo.tags.clubs : [], //.map((club) => club.id),
              languages: action.profileInfo.tags ? action.profileInfo.tags.languages : [], //.map((language) => language.id),
              //TODO: convert to yes/no
              hasCar: hasCarBoolean(action.profileInfo.has_car),
      		    companyName: action.profileInfo.recent_company_name,
              position: action.profileInfo.recent_company_position,
              funFacts: action.profileInfo.fun_fact,
              hometown: action.profileInfo.hometown,
              hobbies: action.profileInfo.hobbies,
              photo: action.profileInfo.photo_url,
              resume: action.profileInfo.resume_url,

              //toggle if complex tags contain vars
              sportsToggle: action.profileInfo.tags ? action.profileInfo.tags.sports.length > 0 : false,
              clubsToggle: action.profileInfo.tags ? action.profileInfo.tags.clubs.length > 0 : false,
              languagesToggle: action.profileInfo.tags ? action.profileInfo.tags.languages.length > 0 : false,
              gpaToggle: action.profileInfo.gpa === 0 ,
              emailToggle: action.profileInfo.personal_email !== null,

              // Additional school details
              schoolAddress: action.profileInfo.school_address + ', ' + action.profileInfo.school_city + ' ' + action.profileInfo.school_postal_code
          }
    default:
      return state
  }
}


const initialStudentProfileErrorState = {
  emailPreferences: false,
  firstName: false,
  lastName: false,
  studentStatus: false,
  educationLevel: false,
  enrollmentDate: false,
  graduationDate: false,
  major: false,
  gpa: false,
  personalEmail: false,
  gender: false,
  sportsTeam: false,
  hasSports: false,
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
}

function studentProfileErrors(state = initialStudentProfileErrorState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: false
      }
  }
}
