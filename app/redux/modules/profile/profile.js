import { employerProfilePUT, employerProfilePATCH, validateEmployerProfileFields,
  studentProfilePUT, studentProfilePATCH, validateStudentProfileFields,
  compareToSnapshot, getUserInfo } from 'helpers/profile'
import { toISO, hasCarBoolean } from 'helpers/utils'

// =======================================================
// ==================== ACTIONS ==========================
// =======================================================


// ********** Base form actions **************
const UPDATE_PROFILE_FIELD = 'PROFILE.UPDATE_PROFILE_FIELD'

const SAVING_PROFILE_INFO = 'PROFILE.SAVING_PROFILE_INFO'
const SAVED_PROFILE_INFO_SUCCESS = 'PROFILE.SAVED_PROFILE_INFO_SUCCESS'
const SAVED_PROFILE_INFO_FAILURE = 'PROFILE.SAVED_PROFILE_INFO_FAILURE'

const FETCHING_PROFILE_INFO = 'PROFILE.FETCHING_INFO'
const FETCHED_PROFILE_INFO_SUCCESS = 'PROFILE.FETCHED_INFO_SUCCESS'
const FETCHED_PROFILE_INFO_FAILURE = 'PROFILE.FETCHED_INFO_FAILURE'

// =======================================================
// ================== ACTION CREATORS ====================
// =======================================================

export function updateProfileField(fieldName, newValue, isAStudent) {
  return {
    type: UPDATE_PROFILE_FIELD,
    fieldName,
    newValue,
    isAStudent
 }
}

export function fetchingProfileInfo() {
    return {
        type: FETCHING_PROFILE_INFO
    }
}

export function fetchedProfileInfoSuccess (isProfileCompleted, profileInfo, isAStudent) {
  return {
    type: FETCHED_PROFILE_INFO_SUCCESS,
    isProfileCompleted,
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
export function savedProfileSucces() {
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
export function submitProfileFirstTime(userTypeInt, profileInfo, user) {
  return function (dispatch) {
	console.log(userTypeInt, profileInfo, user)
    dispatch(savingProfileInfo())
    switch(userTypeInt) {
      case 0:
    	console.log("SUBMITTING STUDENT PROFILE FIRST TIME")
        
    	validateStudentProfileFields(profileInfo, (errorExist, profileFieldErrors) => {
    	  if(errorExist) {

    	    // DISPATCH - SAVE_PROFILE_ERROR
    	    dispatch(savedProfileFailure(profileFieldErrors, [
            "Couldn't save profile.",
    	      "Please fill in missing fields"
    	    ], true))

    	  } else {
    	   console.log('SUBMIT STUDENT PROFILE NO ERRORS')
    	    // No errors, proceed to /PUT on api/me
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
      		  languages: profileInfo.languages,
      		  sports: profileInfo.sportsTeam,
      		  clubs: profileInfo.schoolClub,
              edu: profileInfo.educationLevel.id,
      		  email_pref: profileInfo.emailPreferences.id,
      		  status: profileInfo.studentStatus.id,
      		  enroll_date: toISO(profileInfo.enrollmentDate),
      		  grad_date: toISO(profileInfo.graduationDate),
      		  major: profileInfo.major.id,
      		  GPA: profileInfo.gpa,
      		  personal_email: profileInfo.personalEmail,
      		  gender: profileInfo.gender.id,
      		  has_car: hasCarBoolean(profileInfo.hasCar),
      		  company: profileInfo.companyName,
      		  position: profileInfo.position,
      		  fun_fact: profileInfo.funFacts,
      		  hometown: profileInfo.hometown,
      		  hobbies: profileInfo.hobbies,
      		  photo: profileInfo.photo,
      		  resume: profileInfo.resume,
      	  }
    	    studentProfilePUT(putData)
    	     .then((res) => {
    		// DISPATCH - SAVE_PROFILE_SUCCESS
    	        dispatch(savedProfileSuccess())
    	     })
    	     .catch((err) => {
    	       // DISPATCH - SAVE_PROFILE_ERROR
    	        dispatch(savedProfileFailure({}, [
    			'HTTP Error Occurred',
    			err
    		], true))
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
              })
              .catch((err) => {
                // DISPATCH - SAVED_PROFILE_ERROR
                dispatch(savedProfileFailure({}, [
                  'HTTP Error Occurred.\n',
                  err.message
              ], false))

              })
          }
        })
        return;
      default:
        return;
    }
  }
}

export function updateProfile(userTypeInt, profileInfo, user, snapshot) {
  return function (dispatch) {
    switch(userTypeInt) {
      case 0:
        console.log("UPDATING STUDENT PROFILE")
        validateStudentProfileFields(profileInfo, (errorExist, profileFieldErrors) => {
          if(errorExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(savedProfileFailure(profileFieldErrors, [    "Couldn't save profile.",
          "Please fill in missing fields"
            ], true))

          } else {
            // No errors, proceed to /PUT on api/me
            var changedData = {
             // user: {
             //   "user-is_a_student": true,
             //   "user-is_profile_completed": true,
             //   "user-email": user.email,
             //   "user-first_name": user.firstName,
             //   "user-last_name": user.lastName,
             //   "user-is_active": true,
             //   "user-date_joined": user.dateJoined,
             //   "user-mobile": user.mobile,
             // 	is_a_student: false,
             // 	is_profile_completed: true, // set this flag to true so we know for next time
        		  languages: profileInfo.languages,
        		  sports: profileInfo.sportsTeam,
        		  clubs: profileInfo.schoolClub,
        		  email_pref: profileInfo.emailPreferences,
        		  status: profileInfo.studentStatus,
        		  enroll_date: toISO(profileInfo.enrollmentDate),
        		  grad_date: toISO(profileInfo.graduationDate),
        		  major: profileInfo.major,
        		  GPA: profileInfo.gpa,
        		  personal_email: profileInfo.personalEmail ,
        		  gender: profileInfo.gender,
        		  has_car: profileInfo.hasCar,
        		  company: profileInfo.companyName,
        		  position: profileInfo.position,
        		  fun_fact: profileInfo.funFacts,
        		  hometown: profileInfo.hometown,
        		  hobbies: profileInfo.hobbies,
        		  photo: profileInfo.photo,
        		  resume: profileInfo.resume,
        	  }
            compareToSnapshot(snapshot, changedData, (result) => {
              studentProfilePATCH(result)
                .then((res) => {

                  // DISPATCH - SAVE_PROFILE_SUCCESS
                  dispatch(savedProfileSuccess())
                })
                .catch((err) => {

                  // DISPATCH - SAVE_PROFILE_ERROR
                  dispatch(savedProfileFailure({}, [
                     'HTTP Error Occurred',
                     err
                  ], false))
                })
             })
            }
          })
        return;
      case 1:
        console.log("UPDATING EMPLOYER PROFILE")
        validateEmployerProfileFields(profileInfo, (errorsExist, profileFieldErrors) => {
          if(errorsExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(savedProfileFailure(profileFieldErrors, [
              "Couldn't save profile.\n",
              'Please fill in missing fields'
            ], false))

          } else {
            // No errors, proceed to /PATCH on api/me

            var changedData = {
             // user: {
              //"user-is_a_student": false,           // doesn't change
              //   "user-is_profile_completed": true,
              //   "user-email": user.email,
              //   "user-first_name": user.firstName,
              //   "user-last_name": user.lastName,
              //   "user-is_active": true,
              //   //"user-date_joined": user.dateJoined,  // doesn't change
              //   "user-mobile": user.mobile,
              // // },
              //is_a_student: false,                  // doesn't change
              // is_profile_completed: true, // set this flag to true so we know for next time
              company_name: profileInfo.companyName,
              logo: profileInfo.logoUrl,
              office_location: profileInfo.officeAddress,
              office_city: profileInfo.officeCity,
              office_postal_code: profileInfo.officePostalCode,
              description: profileInfo.description,
              website: profileInfo.website,
              employee_count: profileInfo.employeeCount,
              industry: profileInfo.industry.id ? profileInfo.industry.id : profileInfo.industry,
              // date_joined: user.dateJoined,
              // first_name: user.firstName,
              // last_name: user.lastName,
              // email: user.email
            }
            //debugger;
            compareToSnapshot(snapshot, changedData, (result) => {
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
          logoUrl: action.profileInfo.logo
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
  emailPreferences: '',
  firstName: '',
  lastName: '',
  studentStatus: '',
  educationLevel: '',
  schoolName: '',
  enrollmentDate: '',
  graduationDate: '',
  major: '',
  gpa: '',
  personalEmail: '',
  gender: '',
  sportsTeam: '',
  schoolClub: '',
  languages: '',
  hasCar: '',
  companyName: '',
  position: '',
  funFacts: '',
  hometown: '',
  hobbies: '',
  photo: '',
  resume: '',
  propsErrorMap: {}
}

function studentProfile(state = initialStudentProfileState, action) {
  switch(action.type) {
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
