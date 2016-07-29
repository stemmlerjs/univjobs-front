import { validateEmployerEmail, validatePassword } from 'helpers/utils'
import { login, setAccessToken, getUserInfo } from 'helpers/auth'
import { loggingIn, loginSuccess, loginFailure } from 'redux/modules/user/user'

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

export function submitLoginForm(email, password) {
  return function(dispatch) {

    // ACTION: DISPATCH (SUBMIT_LOGIN_FORM)
    actuallySubmitLoginFormDispatch()

    const promise = new Promise((resolve, reject) => {
      if(!validateEmployerEmail(email)) {
        // ACTION: DISPATCH (SUBMIT_LOGIN_FORM_ERROR)
        dispatch(submitLoginFormError('Please enter a valid email address'))
        reject(false)
        return;
      }

      // ACTION: DISPATCH (LOGGING_IN)
      dispatch(loggingIn())

      //TODO: TEST THIS WITH REAL EMAIL AND PASSWORD AFTER JULIO TAKES OFF CSRF TOKENS

      login(email, password)
        .then((response) => {
          // ACTION: DISPATCH (LOGIN_SUCCESS)
          dispatch(submitLoginFormSuccess())

          var token = response.data.token

          setAccessToken(token)

          // ACTION: DISPATCH (LOGIN_SUCCESS)
          dispatch(loginSuccess(token, 
            response.data.user.is_a_student, 
            response.data.user.is_profile_completed
          ))

          // Now decide if they are a student or 
          resolve({
            isAStudent: response.data.user.is_a_student, 
            isProfileCompleted: response.data.user.is_profile_completed
          })
        })
        .catch((err) => { 
          if(err.status === 400){
            // ACTION: DISPATCH (SUBMIT_LOGIN_FORM_ERROR)
            dispatch(submitLoginFormError('Either username or password is incorrect.'))

            // ACTION: DISPATCH (LOGIN_FAILURE)
            dispatch(loginFailure('Either username or password is incorrect.'))
          } else {
            // ACTION: DISPATCH (SUBMIT_LOGIN_FORM_ERROR)
            dispatch(submitLoginFormError('Network error'))

            // ACTION: DISPATCH (LOGIN_FAILURE)
            dispatch(loginFailure('Network error'))
          }
          console.log("error", err)
          reject(false)
        })
    })  
    return promise;
  }
}

export function submitLoginFormError(error) {
  return {
    type: SUBMIT_LOGIN_FORM_ERROR,
    error
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
