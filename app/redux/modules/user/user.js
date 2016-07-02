  import { createStudentAccount } from 'helpers/auth'

  // ACTIONS
  const SWITCHED_TO_USER_TYPE_STUDENT = 'SWITCHED_TO_USER_TYPE_STUDENT'
  const SWITCHED_TO_USER_TYPE_EMPLOYER = 'SWITCHED_TO_USER_TYPE_EMPLOYER'

  const CREATING_USER_ACCOUNT = 'CREATING_USER_ACCOUNT'
  const CREATE_USER_ACCOUNT_SUCCESS = 'CREATE_USER_ACCOUNT_SUCCESS'
  const CREATE_USER_ACCOUNT_FAILURE = 'CREATE_USER_ACCOUNT_FAILURE'

  const UPDATE_USER_ACCOUNT_INFO = 'UPDATE_USER_ACCOUNT_INFO'
  const UPDATE_USER_ACCOUNT_INFO_SUCCESS = 'UPDATE_USER_ACCOUNT_INFO_SUCCESS'
  const UPDATE_USER_ACCOUNT_INFO_FAILURE = 'UPDATE_USER_ACCOUNT_INFO_FAILURE'

  const LOGGING_IN = 'LOGGING_IN'
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
  const LOGIN_FAILURE = 'LOGIN_FAILURE'
  const LOGGING_OUT = 'LOGGING_OUT'

  const FETCHING_USER_INFO = 'FETCHING_USER_INFO'
  const FETCHING_USER_INFO_SUCCESS = 'FETCHING_USER_INFO_SUCCESS'
  const FETCHING_USER_INFO_FAILURE = 'FETCHING_USER_INFO_FAILURE'


  // ACTION CREATORS
  export function switchedToStudent () {
    return {
      type: SWITCHED_TO_USER_TYPE_STUDENT
    }
  }

  export function switchedToEmployer () {
    return {
      type: SWITCHED_TO_USER_TYPE_EMPLOYER
    }
  }

  export function switchedUserType(wasAStudent) {
    return function (dispatch) {
      if(!wasAStudent) {
        dispatch(switchedToStudent())
      }

      if(wasAStudent) {
        dispatch(switchedToEmployer())
      }
    }
  }

  export function creatingUserAccount() {
    return {
      type: CREATING_USER_ACCOUNT,
      isCreatingAccount: true
    }
  }

  export function createUserAccountSuccess(token) {
    return {
      type: CREATE_USER_ACCOUNT_SUCCESS,
      accessToken: token
    }
  }

  export function createUserAccountFailure(error) {
    return {
      type: CREATE_USER_ACCOUNT_FAILURE,
      error: error
    }
  }

  export function createUserAccount(isAStudent, formData) {
    return function(dispatch) {
      dispatch(creatingUserAccount())
      if(isAStudent) {

      } else {

      }
      // If success
        // Get and store accessToken in cookies and store
        // dispatch CREATE_USER_ACCOUNT_SUCCESS (authToken)
        // (component allowed to push to router /profile)
        // exit

      // If fail
        // Dispatch CREATE_USER_ACCOUNT_FAILURE (errorMessage)
    }
  }

// ============================================================ //
// ======================= USER REDUCER ======================= //
// ============================================================ //

const initialState = {
  uid: '',
  isCreatingAccount: false,
  isFetching: false,
  studentProfile: {},
  employerProfile: {},
  isAStudent: true,
  accessToken: '',
  emailVerified: false,
  error: ''
}

export default function user (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SWITCHED_TO_USER_TYPE_STUDENT :
      return {
        ...state,
        isAStudent: true
      }
    case SWITCHED_TO_USER_TYPE_EMPLOYER :
      return {
        ...state,
        isAStudent: false
      }
    case CREATING_USER_ACCOUNT :
      return {
        ...state,
        isCreatingAccount: true
      }
    case CREATE_USER_ACCOUNT_SUCCESS :
      return {
        ...state,
        accessToken: action.accessToken,
        isCreatingAccount: false
      }
    case CREATE_USER_ACCOUNT_FAILURE :
      return {
        ...state,
        isCreatingAccount: false,
        error: action.error
      }
    case UPDATE_USER_ACCOUNT_INFO: 
      if(state.isAStudent) {
        return {
          ...state,
          // Initially, studentProfile will be null, other times, we will just be patching pieces of it on an update function.
          // We still need to maintain the state of the profile data as it's being constructored. Probably
          // on a separate modal or something.
          // action.profileData will have it 
          studentProfile: studentProfileInfo(state.studentProfile, action)
        }
      } 
      // else {
      //   ...state,
      //   employerProfile: employerProfileInfo(state.studentProfile, action)
      // }
    default :
      return state
  }
}

// ============================================================ //
// ================== STUDENT PROFILE REDUCER ================= //
// ============================================================ //

const initialStudentProfileState = {
  email: '',
  password: '',
  lastUpated: '',
  emailPreferenceOption: '',
  firstName: '',
  lastName: '',
  studentStatus: '',
  degreeName: '',
  schoolName: '',
  enrollmentMonth: '',
  enrollmentYear: '',
  graduationMonth: '',
  graduationYear: '',
  major: '',
  gpa: '',
  personalEmail: '',
  gender: '',
  playsOnSportsTeam: '',
  onSchoolClub: '',
  speaksOtherLanguages: '',
  hasCarOnCampus: '',
  mostRecentCompany: '',
  mostRecentPosition: '',
  funFact: '',
  city: '',
  hobbies: '',
  profilePicture: '',
  resume: ''
}

function studentProfileInfo (state = initialStudentProfileState, action) {
  switch (action.type) {
    case SWITCHED_TO_USER_TYPE_STUDENT :
      return {
        ...state,
        isAStudent: true
      }
    case SWITCHED_TO_USER_TYPE_EMPLOYER :
      return {
        ...state,
        isAStudent: false
      }
    default :
      return state
  }
}