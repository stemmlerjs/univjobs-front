
  import { createStudentAccount, resendVerifyAccountEmail as resendVerifyAccountEmailHTTP,
      attemptCompleteVerifyAccount as attemptCompleteVerifyAccountHTTP } from 'helpers/auth'


  // **********************************************************************
  // **********************************************************************

  /*
   * Deactivate Account
   * 
   * This section is concerned with deactivating the user's account.
   */

  
  


  // **********************************************************************
  // **********************************************************************
  
  /*
   * Verify Account
   * 
   * This section is concerned with verifying the user's account and
   * resending the account verification email.
   * 
   * We do the EMAIL resending and the TOKEN confirmation with this 
   * section of redux.
   */

  const RESEND_VERIFY_ACCOUNT_EMAIL = 'RESEND_VERIFY_ACCOUNT_EMAIL'
  const RESEND_VERIFY_ACCOUNT_EMAIL_SUCCESS = 'RESEND_VERIFY_ACCOUNT_EMAIL_SUCCESS'
  const RESEND_VERIFY_ACCOUNT_EMAIL_FAILURE = 'RESEND_VERIFY_ACCOUNT_EMAIL_FAILURE'

  const CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN = 'CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN'
  const CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN_SUCCESS = 'CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN_SUCCESS'
  const CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN_FAILURE = 'CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN_FAILURE'


  function doCompleteVerifyAccount () {
    return {
      type: CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN
    }
  }

  function completeVerifyAccountSuccess () {
    return {
      type: CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN_SUCCESS
    }
  }

  function completeVerifyAccountFailure () {
    return {
      type: CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN_FAILURE
    }
  }

  export function attemptCompleteVerifyAccount (token, successCallback, failureCallback) {
    return function (dispatch) {

      doCompleteVerifyAccount()
      
      attemptCompleteVerifyAccountHTTP(token)

        .then((result) => {

          completeVerifyAccountSuccess()

          successCallback()

        })

        .catch((err) => {

          completeVerifyAccountFailure()

          failureCallback()

        })

    }
  }

  export function resendVerifyAccountEmail (successCallback, failureCallback) {
    return function (dispatch) {

      doResendVerifyAccountEmail()

      resendVerifyAccountEmailHTTP()

        .then((result) => {

          resendVerifyAccountEmailSuccess()

          successCallback()

        }) 

        .catch((err) => {

          resendVerifyAccountEmailFailure()

          failureCallback('Problem resending verify account email. Try again later.')

        })
      
    }
  }

  function doResendVerifyAccountEmail () {
    return {
      type: RESEND_VERIFY_ACCOUNT_EMAIL
    }
  }

  function resendVerifyAccountEmailSuccess() {
    return {
      type: RESEND_VERIFY_ACCOUNT_EMAIL_SUCCESS
    }
  }

  function resendVerifyAccountEmailFailure () {
    return {
      type: RESEND_VERIFY_ACCOUNT_EMAIL_FAILURE
    }
  }

  export function setProfileCompleteThenReloadToDashboard(then) {
    return function(dispatch) {

      dispatch(setProfileCompleted())

      then()
    }
  }


  // **********************************************************************
  // **********************************************************************

  /*
   * User Accounts
   * 
   * This section is mostly concerned with the Signup page before we
   * even create an account / we can switch between user types.
   */
  
  const SWITCHED_TO_USER_TYPE_STUDENT = 'SWITCHED_TO_USER_TYPE_STUDENT'
  const SWITCHED_TO_USER_TYPE_EMPLOYER = 'SWITCHED_TO_USER_TYPE_EMPLOYER'

  const SET_PROFILE_COMPLETED = 'SET_PROFILE_COMPLETED'

  function setProfileCompleted () {
    return {
      type: SET_PROFILE_COMPLETED
    }
  }

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
  const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
  const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

  export function loggingIn () {
    return {
      type: LOGGING_IN
    }
  }

  export function loggingOut () {
    return {
      type: LOGGING_OUT,
      isLoggingOut: true
    }
  }

  export function loginSuccess(accessToken, isAStudent, isProfileCompleted, isEmailVerified) {
    return {
      type: LOGIN_SUCCESS,
      accessToken: accessToken,
      isAStudent,
      isProfileCompleted,
      isEmailVerified
    }
  }

  export function logoutSuccess () {
    return {
      type: LOGOUT_SUCCESS,
      accessToken: '',
      isAuthenticated: false
    }
  }

  export function loginFailure() {
    return {
      type: LOGIN_FAILURE,
      isLoggingIn: false
    }
  }

  export function logoutFailure() {
    return {
      type: LOGOUT_FAILURE,
      isLoggingOut: false
    }
  }

  const FETCHING_USER_INFO = 'FETCHING_USER_INFO'
  const FETCHING_USER_INFO_SUCCESS = 'FETCHING_USER_INFO_SUCCESS'
  const FETCHING_USER_INFO_FAILURE = 'FETCHING_USER_INFO_FAILURE'

  export function fetchingUserInfo() {
    return {
      type: FETCHING_USER_INFO
    }
  }

  export function fetchingUserInfoSuccess (isAStudent, dateJoined, email, firstName, lastName, mobile) {
    return {
      type: FETCHING_USER_INFO_SUCCESS,
      isFetching: false,
      isAStudent,
      dateJoined,
      email,
      firstName,
      lastName,
      mobile
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
  isLoggingOut: false,
  isCreatingAccount: false,
  isFetching: false,
  isAuthenticated: false,
  isAStudent: true,
  isProfileCompleted: 0,
  accessToken: '',

  emailVerified: false,
  isResendingVerifyEmail: false,
  resendingVerifyEmailSuccess: false,
  isConfirmingAccountVerified: false,
  confirmAccountVerifiedSuccess: false,

  dateJoined: '',
  email: '',
  firstName: '',
  lastName: '',
  mobile: '',
  error: ''
}

export default function user (state = initialState, action) {
  switch (action.type) {

    case CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN:
      return {
        ...state,
        isConfirmingAccountVerified: true,
        confirmAccountVerifiedSuccess: false
      }

    case CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN_SUCCESS:
      return {
        ...state,
        isConfirmingAccountVerified: false,
        confirmAccountVerifiedSuccess: true,
        emailVerified: true
      }
    
    case CHECK_VALID_ACCOUNT_CONFIRMATION_TOKEN_FAILURE:
      return {
        ...state,
        isConfirmingAccountVerified: false,
        confirmAccountVerifiedSuccess: false
      }

    case RESEND_VERIFY_ACCOUNT_EMAIL_FAILURE:
      return {
        ...state,
        isResendingVerifyEmail: false,
        resendingVerifyEmailSuccess: false
      }
    case RESEND_VERIFY_ACCOUNT_EMAIL_SUCCESS:
      return {
        ...state,
        isResendingVerifyEmail: false,
        resendingVerifyEmailSuccess: true
      }
    case RESEND_VERIFY_ACCOUNT_EMAIL:
      return {
        ...state,
        isResendingVerifyEmail: true,
        resendingVerifyEmailSuccess: false
      }
    case SET_PROFILE_COMPLETED: 
      return {
        ...state,
        isProfileCompleted: 1
      }
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
    // case UPDATE_USER_ACCOUNT_INFO: 
    //   if(state.isAStudent) {
    //     return {
    //       ...state,
    //       // Initially, studentProfile will be null, other times, we will just be patching pieces of it on an update function.
    //       // We still need to maintain the state of the profile data as it's being constructored. Probably
    //       // on a separate modal or something.
    //       // action.profileData will have it 
    //       studentProfile: studentProfileInfo(state.studentProfile, action)
    //     }
    //   } 
    //   // else {
    //   //   ...state,
    //   //   employerProfile: employerProfileInfo(state.studentProfile, action)
    //   // }
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
        accessToken: action.accessToken,
        isAStudent: action.isAStudent,
        isProfileCompleted: action.isProfileCompleted,
        emailVerified: action.isEmailVerified
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
    case FETCHING_USER_INFO:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USER_INFO_SUCCESS: 
      if(action.isAStudent) {
         return {
          ...state,
          isFetching: false,
          //studentProfile: action.profileInfo,
          isAStudent: action.isAStudent,
          dateJoined: action.dateJoined,
          email: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          mobile: action.mobile,
          // isProfileCompleted: action.isProfileCompleted,
          // emailVerified: action.isEmailVerified
        }
      } else {
        return {
          ...state,
          isFetching: false,
          //employerProfile: action.profileInfo,
          isAStudent: action.isAStudent,
          // isProfileCompleted: action.isProfileCompleted
          dateJoined: action.dateJoined,
          email: action.email,
          firstName: action.firstName,
          lastName: action.lastName,
          mobile: action.mobile
        }
      }
    case FETCHING_USER_INFO_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    default :
      return state
  }
}

