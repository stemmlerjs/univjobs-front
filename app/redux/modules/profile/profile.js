import { employerProfilePUT, employerProfilePATCH, compareToSnapshot, validateEmployerProfileFields } from 'helpers/profile'

// =======================================================
// ==================== ACTIONS ==========================
// =======================================================

// ********** Profile List GETTER actions **************
const GET_INDUSTRIES = 'PROFILE.LIST.GET_INDUSTRIES'
const GET_EMAIL_PREFERENCES = 'PROFILE.LIST.GET_EMAIL_PREFERENCES'
const GET_STUDENT_STATUSES = 'PROFILE.LIST.GET_STUDENT_STATUSES'
const GET_EDU_LEVELS = 'PROFILE.LIST.GET_EDU_LEVELS'
const GET_MAJORS = 'PROFILE.LIST.GET_MAJORS'
const GET_GENDERS = 'PROFILE.LIST.GET_GENDERS'
const GET_SPORTSTEAMS = 'PROFILE.LIST.GET_SPORTSTEAMS'
const GET_SCHOOL_CLUBS = 'PROFILE.LIST.GET_SCHOOL_CLUBS'
const GET_LANGUAGES = 'PROFILE.LIST.GET_LANGUAGES'
const GET_CITIES = 'PROFILE.LIST.GET_CITIES'

// ********** Profile List SUCCESS actions **************
const RETRIEVED_LIST = 'PROFILE.RETRIEVED_LIST'

const RETRIEVED_INDUSTRIES = 'PROFILE.LIST.RETRIEVED_INDUSTRIES'
const RETRIEVED_EMAIL_PREFERENCES = 'PROFILE.LIST.RETRIEVED_EMAIL_PREFERENCES'
const RETRIEVED_STUDENT_STATUSES = 'PROFILE.LIST.RETRIEVED_STUDENT_STATUSES'
const RETRIEVED_EDU_LEVELS = 'PROFILE.LIST.RETRIEVED_EDU_LEVELS'
const RETRIEVED_MAJORS = 'PROFILE.LIST.RETRIEVED_MAJORS'
const RETRIEVED_GENDERS = 'PROFILE.LIST.RETRIEVED_GENDERS'
const RETRIEVED_SPORTSTEAMS = 'PROFILE.LIST.RETRIEVED_SPORTSTEAMS'
const RETRIEVED_SCHOOL_CLUBS = 'PROFILE.LIST.RETRIEVED_SCHOOL_CLUBS'
const RETRIEVED_LANGUAGES = 'PROFILE.LIST.RETRIEVED_LANGUAGES'
const RETRIEVED_CITIES = 'PROFILE.LIST.RETRIEVED_CITIES'

// ********** Base form actions **************
const UPDATE_PROFILE_FIELD = 'PROFILE.UPDATE_PROFILE_FIELD'
const SAVE_PROFILE_ERROR = 'PROFILE.SAVE_PROFILE_ERROR'
const SAVE_PROFILE_SUCCESS = 'PROFILE.SAVE_PROFILE_SUCCESS'

const FETCHING_PROFILE_INFO_SUCCESS = 'PROFILE.FETCHING_INFO_SUCCESS'

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

export function listRetrieved(listName, listArray) {
  switch(listName) {
    case 'INDUSTRIES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_INDUSTRIES,
        list: listArray
      }
    }
    case 'EMAIL_PREFERENCES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_EMAIL_PREFERENCES,
        list: listArray
      }
    }
    case 'STUDENT_STATUSES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_STUDENT_STATUSES,
        list: listArray
      }
    }
    case 'EDU_LEVELS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_EDU_LEVELS,
        list: listArray
      }
    }
    case 'MAJORS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_MAJORS,
        list: listArray
      }
    }
    case 'GENDERS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_GENDERS,
        list: listArray
      }
    }
    case 'SPORTS_TEAMS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_SPORTSTEAMS,
        list: listArray
      }
    }
    case 'SCHOOL_CLUBS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_SCHOOL_CLUBS,
        list: listArray
      }
    }
    case 'LANGUAGES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_LANGUAGES,
        list: listArray
      }
    }
    case 'CITIES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_CITIES,
        list: listArray
      }
    }
    default:
      return state
  }
}

export function fetchingProfileInfoSuccess (isProfileCompleted, profileInfo, isAStudent) {
  return {
    type: FETCHING_PROFILE_INFO_SUCCESS,
    isProfileCompleted,
    profileInfo,
    isAStudent
  }
}

export function saveProfileError(profileErrorsObj, error, isAStudent) {
  return {
    type: SAVE_PROFILE_ERROR,
    isAStudent,
    error,
    profileErrorsObj
  }
}

export function saveProfileSuccess() {
  return {
    type: SAVE_PROFILE_SUCCESS
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
    switch(userTypeInt) {
      case 0:

        return;
      case 1:
        console.log("SUBMITTING EMPLOYER PROFILE FIRST TIME")
        validateEmployerProfileFields(profileInfo, (errorsExist, profileFieldErrors) => {
          if(errorsExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(saveProfileError(profileFieldErrors, [
              "Couldn't save profile.",
              'Please fill in missing fields'
            ], false))

          } else {
            // No errors, proceed to /PUT on api/me
            var putData = {
             // user: {
                "user-is_a_student": false,
                "user-is_profile_completed": true,
                "user-email": user.email,
                "user-first_name": user.firstName,
                "user-last_name": user.lastName,
                "user-is_active": true,
                "user-date_joined": user.dateJoined,
                "user-mobile": user.mobile,
              // },
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

                // DISPATCH - SAVE_PROFILE_SUCCESS
                dispatch(saveProfileSuccess())
              })
              .catch((err) => {
                // DISPATCH - SAVE_PROFILE_ERROR
                dispatch(saveProfileError({}, [
                  'HTTP Error Occurred',
                  err
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

        return;
      case 1:
        console.log("UPDATING PROFILE")
        validateEmployerProfileFields(profileInfo, (errorsExist, profileFieldErrors) => {
          if(errorsExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(saveProfileError(profileFieldErrors, [
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

            compareToSnapshot(snapshot, changedData, (result) => {
              employerProfilePATCH(result)
                .then((res) => {

                  // DISPATCH - SAVE_PROFILE_SUCCESS
                  dispatch(saveProfileSuccess())
                })
                .catch((err) => {

                  // DISPATCH - SAVE_PROFILE_ERROR
                  dispatch(saveProfileError({}, [
                    'HTTP Error Occurred',
                    err
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
  lists: {},
  isSubmittingForm: false,
  isProfileCompleted: false,
  submitErrorsExist: false,
  submitSuccess: false,
  error: ''
}

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

const initialStudentProfileState = {
	emailPreferences: '',
	firstName: '',
   	lastName: '',
  	studentStatus: '', 
   	degreeName: '',
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
   	hometown: '',
   	hobbies: '',
   	photo: '',
   	resume: '',
   	propsErrorMap: {}
}

const initialStudentProfileErrorState = {
	emailPreferences: false,
	firstName: false,
   	lastName: false,
  	studentStatus: false,
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
   	resume: false,
}

const initialListsState = {
  industries: [],
  emailPreferences: [],
  studentStatuses: [],
  eduLevels: [],
  majors: [],
  genders: [],
  sportsTeams: [],
  schoolClubs: [],
  languages: [],
  cities: []
}

// =======================================================
// ==================== REDUCERS =========================
// =======================================================

// ========= BASE PROFILE REDUCER

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
    case RETRIEVED_LIST:
      return {
        ...state,
        lists: lists(state.lists, action)
      }
    case FETCHING_PROFILE_INFO_SUCCESS: 
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
    case SAVE_PROFILE_ERROR:
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
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        submitSuccess: true,
        error: ''
      }
    default :
      return state
  }
}

// =========== EMPLOYER PROFILE (SUB-REDUCER)

function employerProfile(state = initialEmployerProfileState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD: 
      return {
        ...state,
        [action.fieldName]: action.newValue,
        propsErrorMap: employerProfileErrors(state.propsErrorMap, action)
      }
    case FETCHING_PROFILE_INFO_SUCCESS:
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
    case SAVE_PROFILE_ERROR:
      return {
        ...state,
        propsErrorMap: action.profileErrorsObj
      }
    default: 
      return state
  }
}

function employerProfileErrors(state = employerProfileErrorsInitialState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      return {
        ...state,
        [action.fieldName]: false
      }
  }
}

// =========== STUDENT PROFILE (SUB-REDUCER)

function studentProfile(state = initialEmployerProfileState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD: 
      return {
        ...state,
        [action.fieldName]: action.newValue
      }
    default: 
      return state
  }
}

// =========== LISTS (SUB-REDUCER)

function lists (state = initialListsState, action) {
  switch(action.listType) {
    case RETRIEVED_INDUSTRIES:
      return {
        ...state,
        industries: action.list
      }

    case RETRIEVED_EMAIL_PREFERENCES:
      return {
        ...state,
        emailPreferences: action.list
      }

    case RETRIEVED_STUDENT_STATUSES:
      return {
        ...state,
        studentStatuses: action.list
      }
      
    case RETRIEVED_EDU_LEVELS:
      return {
        ...state,
        eduLevels: action.list
      }   

    case RETRIEVED_MAJORS:
      return {
        ...state,
        majors: action.list
      }  

    case RETRIEVED_GENDERS:
      return {
        ...state,
        genders: action.list
      }  

    case RETRIEVED_SPORTSTEAMS:
      return {
        ...state,
        sportsTeams: action.list
      }   

    case RETRIEVED_SCHOOL_CLUBS:
      return {
        ...state,
        schoolClubs: action.list
      }  

    case RETRIEVED_LANGUAGES:
      return {
        ...state,
        languages: action.list
      }  

    case RETRIEVED_CITIES:
      return {
        ...state,
        cities: action.list
      }    
  }
}
