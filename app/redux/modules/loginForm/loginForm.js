import { validateEmployerEmail, validatePassword } from 'helpers/utils'
import { login, setAccessToken, errorMsg, getAccessToken } from 'helpers/auth'
import { getUserInfo } from 'helpers/profile'
import { loggingIn, loginSuccess, loginFailure, fetchingUserInfoSuccess } from 'redux/modules/user/user'
import { fetchingProfileInfoSuccess } from 'redux/modules/profile/profile'
import * as profileActions from '../profile/profile'
import _ from 'lodash'

const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM'
// const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM'
const SUBMIT_LOGIN_FORM_ERROR = 'SUBMIT_LOGIN_FORM_ERROR'
const SUBMIT_LOGIN_FORM = 'SUBMIT_LOGIN_FORM'
const SUBMIT_LOGIN_FORM_SUCCESS = 'SUBMIT_LOGIN_FORM_SUCCESS'

export function updateLoginForm(fieldName, newValue) {
  return {
    type: UPDATE_LOGIN_FORM,
    fieldName,
    newValue
  }
}

export function actuallySubmitLoginFormDispatch() {
  return {
    type: SUBMIT_LOGIN_FORM
  }
}

export function submitLoginFormSuccess() {
  return {
    type: SUBMIT_LOGIN_FORM_SUCCESS
  }
}

export function submitLoginFormError(error) {
  return {
    type: SUBMIT_LOGIN_FORM_ERROR,
    error
  }
}

export function submitLoginForm(email, password) {
  return function(dispatch) {

    // ACTION: DISPATCH (SUBMIT_LOGIN_FORM)
    actuallySubmitLoginFormDispatch()

    const promise = new Promise((resolve, reject) => {


     /* 
      * Validate the employer email before trying to login.
      * (Must be an email)
      */

      if(!validateEmployerEmail(email)) {

       /*
        * If it wasn't an email, alert user.
        */

        // ACTION: DISPATCH (SUBMIT_LOGIN_FORM_ERROR)
        dispatch(submitLoginFormError('Please enter a valid email address'))
        reject(false)
        return;
      }

     /*
      * If email looks valid, do the HTTP login.
      */

      // ACTION: DISPATCH (LOGGING_IN)
      dispatch(loggingIn())

      login(email, password)
        .then((response) => {

         /*
          * If login successful, take the token 
          * and save it to local storage. Now we can use 
          * the token to make subsequent requests.
          */

          // ACTION: DISPATCH (LOGIN_SUCCESS)
          dispatch(submitLoginFormSuccess())

          var token = response.data.token
          setAccessToken(token)
          dispatch(profileActions.fetchingProfileInfo())
          // ACTION: DISPATCH (LOGIN_SUCCESS)
         })

        /*
         * With the newly obtained token, use it to get all the user
         * info for this user.
         */

        .then(getUserInfo)
        .then((response) => {

            // User Details
            const dateJoined = response.data.student !== undefined ? null : response.data.employer.createdAt
            const email = response.data.student !== undefined ? response.data.student.user_email : response.data.employer.user_email 
            const firstName = response.data.student !== undefined ? response.data.student.user_firstname : response.data.employer.user_firstName
            const lastName = response.data.student !== undefined ? response.data.student.user_lastname : response.data.employer.user_lastName 
            const mobile = response.data.student !== undefined ? null : response.data.employer.user_mobile

            // Profile Details
            const isAStudent = response.data.student !== undefined ? true : false
            const isProfileCompleted = response.data.student !== undefined ? response.data.student.is_profile_complete : response.data.employer.is_profile_complete

            let profileInfo = response.data.student !== undefined ? response.data.student : response.data.employer
            profileInfo.tags = profileInfo.is_a_student === 1 ? response.data.tags : ''


            //debugger
            // ACTION: USER - DISPATCH (FETCHING_USER_INFO_SUCCESS)
            dispatch(fetchingUserInfoSuccess(
              isAStudent, dateJoined, email, firstName, lastName, mobile
            ))

            // ACTION: PROFILE - DISPATCH (FETCHING_PROFILE_INFO_SUCCESS)
            dispatch(profileActions.fetchedProfileInfoSuccess(
              isProfileCompleted,
              profileInfo,
              isAStudent
            ))

            // ACTION: DISPATCH (LOGGING_IN_SUCCESS)
            dispatch(loginSuccess(getAccessToken(),
              isAStudent,
              isProfileCompleted
            ))

            resolve({
              isAStudent,
              isProfileCompleted
            })
        })
        .catch((err) => {
          console.log(err.status)

          switch (err.status) {
            case 400: 
              // ACTION: DISPATCH (SUBMIT_LOGIN_FORM_ERROR)
              dispatch(submitLoginFormError('Either username or password is incorrect.'))

              // ACTION: DISPATCH (LOGIN_FAILURE)
              dispatch(loginFailure('Either username or password is incorrect.'))
              break;
            case 401: 
              // ACTION: DISPATCH (SUBMIT_LOGIN_FORM_ERROR)
              dispatch(submitLoginFormError('Either username or password is incorrect.'))

              // ACTION: DISPATCH (LOGIN_FAILURE)
              dispatch(loginFailure('Either username or password is incorrect.'))
              break;
            case 404: 
              // ACTION: DISPATCH (SUBMIT_LOGIN_FORM_ERROR)
              dispatch(submitLoginFormError("Can't find this user. Are you sure you signed up?"))

              // ACTION: DISPATCH (LOGIN_FAILURE)
              dispatch(loginFailure("Can't find this user. Are you sure you signed up?"))
              break;
            default: 
              // ACTION: DISPATCH (SUBMIT_LOGIN_FORM_ERROR)
              dispatch(submitLoginFormError("Couldn't connect to Univjobs. Please check your network connection."))

              // ACTION: DISPATCH (LOGIN_FAILURE)
              dispatch(loginFailure("Couldn't connect to Univjobs. Please check your network connection."))
              break;
          }

          console.log("error", err)
          reject(false)
        })
    })
    return promise;
  }
}

// ================================================================== //
// ======================= LOGIN FORM REDUCER ======================= //
// ================================================================== //

const initialState = {
  email: '',
  password: '',
  error: '',
  isSubmittingForm: false
}

export default function loginForm (state = initialState, action) {
  switch(action.type) {
    case UPDATE_LOGIN_FORM:
      return {
        ...state,
        [action.fieldName]: action.newValue,
        error: ''
      }
    case SUBMIT_LOGIN_FORM:
      return {
        ...state,
        isSubmittingForm: true
      }
    case SUBMIT_LOGIN_FORM_SUCCESS:
      return {
        ...state,
        isSubmittingForm: false
      }
    case SUBMIT_LOGIN_FORM_ERROR:
      return {
        ...state,
        error: action.error,
        isSubmittingForm: false
      }
    default :
      return state
  }
}
