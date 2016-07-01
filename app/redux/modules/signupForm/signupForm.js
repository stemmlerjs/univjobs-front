import { validateEmail, validatePassword } from 'helpers/utils'
import { createStudentAccount } from 'helpers/auth'
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

export function submitStudentFormError(error) {
  return {
    type: SUBMIT_STUDENT_FORM_ERROR,
    error
  }
}

export function submitStudentSignupForm(email, password) {
  return function(dispatch) {
    // Do form validation
    if(!validateEmail(email)) {
      return dispatch(submitStudentFormError('Please enter in a valid email address'))
    }
    if(!validatePassword(password)) {
      return dispatch(submitStudentFormError('Please enter a password with length greater than 6 characters'))
    }

    // If good, create user
    dispatch(userActions.creatingUserAccount())
    return createStudentAccount(email, password)
      .then((key) => dispatch(userActions.createUserAccountSuccess(key)))
      .catch((err) => dispatch(userActions.createUserAccountFailure(err)))
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
  password: ''
}

function employerSignupForm(state = employerSignupFormInitialState, action) {
  
}