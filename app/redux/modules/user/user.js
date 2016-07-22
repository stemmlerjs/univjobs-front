  import { createStudentAccount } from 'helpers/auth'

  // **********************************************************************
  // **********************************************************************
  
  const SWITCHED_TO_USER_TYPE_STUDENT = 'SWITCHED_TO_USER_TYPE_STUDENT'
  const SWITCHED_TO_USER_TYPE_EMPLOYER = 'SWITCHED_TO_USER_TYPE_EMPLOYER'

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

  // **********************************************************************
  // **********************************************************************

  const CREATING_USER_ACCOUNT = 'CREATING_USER_ACCOUNT'
  const CREATE_USER_ACCOUNT_SUCCESS = 'CREATE_USER_ACCOUNT_SUCCESS'
  const CREATE_USER_ACCOUNT_FAILURE = 'CREATE_USER_ACCOUNT_FAILURE'

  export function creatingUserAccount() {
    return {
      type: CREATING_USER_ACCOUNT
    }
  }

  export function createUserAccountSuccess(token) {
    return {
      type: CREATE_USER_ACCOUNT_SUCCESS,
      accessToken: token,
    }
  }

  export function createUserAccountFailure(error) {
    return {
      type: CREATE_USER_ACCOUNT_FAILURE,
      error: error
    }
  }


  // **********************************************************************
  // **********************************************************************

  const UPDATE_USER_ACCOUNT_INFO = 'UPDATE_USER_ACCOUNT_INFO'
  const UPDATE_USER_ACCOUNT_INFO_SUCCESS = 'UPDATE_USER_ACCOUNT_INFO_SUCCESS'
  const UPDATE_USER_ACCOUNT_INFO_FAILURE = 'UPDATE_USER_ACCOUNT_INFO_FAILURE'

  const LOGGING_IN = 'LOGGING_IN'
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
  const LOGIN_FAILURE = 'LOGIN_FAILURE'
  const LOGGING_OUT = 'LOGGING_OUT'

  export function loggingIn () {
    return {
      type: LOGGING_IN
    }
  }

  export function loginSuccess(accessToken) {
    return {
      type: LOGIN_SUCCESS,
      accessToken: accessToken
    }
  }

  export function loginFailure() {
    return {
      type: LOGIN_FAILURE
    }
  }

  const FETCHING_USER_INFO = 'FETCHING_USER_INFO'
  const FETCHING_USER_INFO_SUCCESS = 'FETCHING_USER_INFO_SUCCESS'
  const FETCHING_USER_INFO_FAILURE = 'FETCHING_USER_INFO_FAILURE'

  export function fectchingUserInfo() {
    return {
      type: FETCHING_USER_INFO,
      isFetching: true
    }
  }

  export function fetchingUserInfoSuccess (isAStudent, info) {
    if(isAStudent) {
      return {
        type: FETCHING_USER_INFO_SUCCESS,
        isFetching: false,
        studentProfile: info
      }
    } else {
        return {
          type: FETCHING_USER_INFO_SUCCESS,
          isFetching: false,
          employerProfile: info
        }
    }
  }

  export function fetchingUserInfoFailure () {
    return {
      type: FETCHING_USER_INFO_FAILURE,
      isFetching: false
    }
  }


// ============================================================ //
// ======================= USER REDUCER ======================= //
// ============================================================ //

const initialState = {
  uid: '',
  isLoggingIn: false,
  isCreatingAccount: false,
  isFetching: false,
  isAuthenticated: false,
  studentProfile: {},
  employerProfile: {},
  isAStudent: true,
  accessToken: '',
  emailVerified: false,
  error: ''
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case SWITCHED_TO_USER_TYPE_STUDENT :
      return {
        ...state,
        isAStudent: true,
        isCreatingAccount: false
      }
    case SWITCHED_TO_USER_TYPE_EMPLOYER :
      return {
        ...state,
        isAStudent: false,
        isCreatingAccount: false
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
        isCreatingAccount: false,
        isAuthenticated: true
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
    case LOGGING_IN: 
      return {
        ...state,
        isLoggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        accessToken: action.accessToken
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false
      }
    case LOGGING_OUT:
      return {
        ...state,
        isAuthenticated: false,
        accessToken: ''
      }
    default :
      return state
  }
}

// ============================================================ //
// ================== STUDENT PROFILE REDUCER ================= //
// ============================================================ //

const initialStudentProfileState = {
  is_profile_completed: '',
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