import { validateFirstName, validateLastName, validateCompanyName,
  validatePhoneNumber, validateEmail, validatePassword } from 'helpers/utils'
import { createStudentAccount, createEmployerAccount, setAccessToken } from 'helpers/auth'
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
    if(!validateEmail(email)) {
      dispatch(submitStudentFormError('Please enter in a valid email address'))
      resolve(false)
      return;
    }
    if(!validatePassword(password)) {
      dispatch(submitStudentFormError('Please enter a password with length greater than 6 characters'))
      resolve(false)
      return;
    }

    // If good, create user
    dispatch(userActions.creatingUserAccount())
    createStudentAccount(email, password)
      .then((response) => {
        const accessToken = response.data.key;
        setAccessToken(accessToken) // save access token as cookie
        dispatch(userActions.createUserAccountSuccess(accessToken)) // Bind access token to state
        resolve(true)
      })
      .catch((err) => {
        dispatch(userActions.createUserAccountFailure(err))
        
          // Dispatch different error messages
          dispatch(submitStudentFormError('This email address is already registered'))
        resolve(false)
      })
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
        dispatch(submitEmployerFormError('Please enter in a valid phone number'))
        resolve(false)
        return;
      }

      if(!validateEmail(email)) {
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
      dispatch(userActions.creatingUserAccount())
      createEmployerAccount(firstName, lastName, companyName, phone, email, password) 
        .then((key) => {
          dispatch(userActions.createUserAccountSuccess(key))
          resolve(true)
        })
        .catch(() => {
          dispatch(userActions.createUserAccountFailure(err))
          dispatch(submitEmployerFormError('This email address is already registered'))
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