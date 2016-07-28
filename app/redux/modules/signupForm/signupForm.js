import { validateFirstName, validateLastName, validateCompanyName,
  validatePhoneNumber, validateStudentEmail, validateEmployerEmail, validatePassword } from 'helpers/utils'
import { createStudentAccount, createEmployerAccount, setAccessToken, getAccessToken } from 'helpers/auth'
import * as userActions from '../user/user'

// ACTIONS
const UPDATE_STUDENT_FORM = 'UPDATE_STUDENT_FORM'
const SUBMIT_STUDENT_FORM_ERROR = 'SUBMIT_STUDENT_FORM_ERROR'

const UPDATE_EMPLOYER_FORM = 'UPDATE_EMPLOYER_FORM'
const SUBMIT_EMPLOYER_FORM_ERROR = 'SUBMIT_EMPLOYER_FORM_ERROR'

// ACTION CREATORS
export function updateStudentForm (fieldName, newValue) {
  return {
    type: UPDATE_STUDENT_FORM,
    fieldName,
    newValue
  }
}

export function updateEmployerForm(fieldName, newValue) {
  return {
    type: UPDATE_EMPLOYER_FORM,
    fieldName,
    newValue
  }
}

export function submitStudentFormError(error) {
  return {
    type: SUBMIT_STUDENT_FORM_ERROR,
    error
  }
}

export function submitEmployerFormError(error) {
  return {
    type: SUBMIT_EMPLOYER_FORM_ERROR,
    error
  }
}

export function submitStudentSignupForm(email, password) {
  return function(dispatch) {
    const promise = new Promise((resolve, reject) => {
      // Do form validation
      validateStudentEmail(email, (success, message) => {
        // EMAIL IS NOT VALID
        if(!success) {
          dispatch(submitStudentFormError(message))
          resolve(false)

        // EMAIL IS VALID
        } else {
          // Validate Password
          if(!validatePassword(password)) {
            dispatch(submitStudentFormError('Please enter a password with length greater than 6 characters'))
            resolve(false)
          } else {
            // EMAIL AND PASSWORD VALID
            // ACTION: DISPATCH (CREATING_USER_ACCOUNT)
            dispatch(userActions.creatingUserAccount())

            // ACTION: DISPATCH (FETCHING_USER_INFO)
            dispatch(userActions.fetchingUserInfo())
            createStudentAccount(email, password)
              .then((response) => {

                const token = response.data.token
                const userInfo = response.data.user
                debugger;

                // save access token as cookie
                setAccessToken(token) 

                // ACTION: DISPATCH (CREATING_USER_ACCOUNT_SUCCESS)
                dispatch(userActions.createUserAccountSuccess(token)) 

                // ACTION: DISPATCH (FETCHING_USER_INFO_SUCCESS)
                dispatch(userActions.fetchingUserInfoSuccess(
                  true, // (isAStudent)
                  userInfo
                ))

                resolve(true)
              })
              .catch((err) => {
                var errMsg = "";
                
                if(err.data.email) {
                  errMsg = errMsg + err.data.email[0]
                }
                
                // ACTION: DISPATCH (CREATING_USER_ACCOUNT_FAILURE)
                dispatch(userActions.createUserAccountFailure(errMsg))

                // ACTION: DISPATCH (FETCHING_USER_INFO_FAILURE)
                dispatch(userActions.fetchingUserInfoFailure())

                // ACTION: DISPATCH (SUBMIT_STUDENT_FORM_ERROR)
                dispatch(submitStudentFormError(errMsg))

                resolve(false)
              })
          }
        }
      }) // End of validateStudentEmail
    })
    return promise;
  }
}

export function submitEmployerSignupForm(firstName, lastName, companyName, phone, email, password) {
  return function(dispatch) {
    const promise = new Promise((resolve, reject) => {
        // Do form validation
      if(!validateFirstName(firstName)) {
        dispatch(submitEmployerFormError('Please enter your first name'))
        resolve(false)
        return;
      }

      if(!validateLastName(lastName)) {
        dispatch(submitEmployerFormError('Please enter your last name'))
        resolve(false)
        return;
      }

      if(!validateCompanyName(companyName)) {
        dispatch(submitEmployerFormError('Please enter your company name'))
        resolve(false)
        return;
      }

      if(!validatePhoneNumber(phone)) {
        dispatch(submitEmployerFormError('Please enter in a valid phone 10 digit number'))
        resolve(false)
        return;
      }

      if(!validateEmployerEmail(email)) {
        dispatch(submitEmployerFormError('Please enter in a valid email address'))
        resolve(false)
        return;
      }

      if(!validatePassword(password)) {
        dispatch(submitEmployerFormError('Please enter a password with length greater than 6 characters'))
        resolve(false)
        return;
      }

      // If good, create user
      // ACTION: DISPATCH (CREATING_USER_ACCOUNT)
      dispatch(userActions.creatingUserAccount())

      // ACTION: DISPATCH (FETCHING_USER_INFO)
      dispatch(userActions.fetchingUserInfo())

      createEmployerAccount(firstName, lastName, companyName, phone, email, password) 
        .then((response) => {

          const token = response.data.token
          const userInfo = response.data.user

          // save access token as cookie
          setAccessToken(token) 

          // ACTION: DISPATCH (CREATING_USER_ACCOUNT_SUCCESS)
          dispatch(userActions.createUserAccountSuccess(token))

          // ACTION: DISPATCH (FETCHING_USER_INFO_SUCCESS)
          dispatch(userActions.fetchingUserInfoSuccess(false, userInfo))

          resolve(true)
        })
        .catch((err) => {

          let errorMessage = 'An error occurred';
          if(err.data.hasOwnProperty('email')){
            errorMessage = err.data.email[0];
          }

          // ACTION: DISPATCH (CREATING_USER_ACCOUNT_FAILURE)
          dispatch(userActions.createUserAccountFailure(errorMessage))

          // ACTION: DISPATCH (FETCHING_USER_INFO_FAILURE)
          dispatch(userActions.fetchingUserInfoFailure())

          // ACTION: DISPATCH (SUBMIT_STUDENT_FORM_ERROR)
          dispatch(submitEmployerFormError(errorMessage))

          resolve(false)
        })
    })
    return promise; 
  }
}


// ============================================================ //
// ======================= SIGNUP FORM REDUCER ======================= //
// ============================================================ //

const initialState = {
  studentSignupForm: {},
  employerSignupForm: {}
}

export default function signupForm (state = initialState, action) {
  switch(action.type) {
    case UPDATE_STUDENT_FORM:
      return {
        ...state,
        studentSignupForm: studentSignupForm(state.studentSignupForm, action)
      }
    case UPDATE_EMPLOYER_FORM:
      return {
        ...state,
        employerSignupForm: employerSignupForm(state.employerSignupForm, action)
      }
    case SUBMIT_STUDENT_FORM_ERROR: 
      return {
        ...state,
        studentSignupForm: studentSignupForm(state.studentSignupForm, action)
      }
    case SUBMIT_EMPLOYER_FORM_ERROR:
      return {
        ...state,
        employerSignupForm: employerSignupForm(state.employerSignupForm, action)
      }
    default :
      return state
  }
}

// ==================================================================== //
// ================== STUDENT SIGNUP FORM REDUCER ======================= //
// ==================================================================== //

const studentSignupFormInitialState = {
  email: '',
  password: '',
  error: ''
}

function studentSignupForm(state = studentSignupFormInitialState, action) {
  switch(action.type) {
    case UPDATE_STUDENT_FORM :
      return {
        ...state,
        [action.fieldName]: action.newValue,
        error: ''
      }
    case SUBMIT_STUDENT_FORM_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

// ==================================================================== //
// ================== EMPLOYER SIGNUP FORM REDUCER ======================= //
// ==================================================================== //


const employerSignupFormInitialState = {
  firstName: '',
  lastName: '',
  companyName: '',
  phone: '',
  email: '',
  password: '',
  error: ''
}

function employerSignupForm(state = employerSignupFormInitialState, action) {
  switch(action.type) {
    case UPDATE_EMPLOYER_FORM :
      return {
        ...state,
        [action.fieldName]: action.newValue,
        error: ''
      }
    case SUBMIT_EMPLOYER_FORM_ERROR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}