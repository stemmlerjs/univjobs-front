
import { submitPasswordReset as passwordResetHTTP, 
        verifyPasswordResetCode as verifyCodeHTTP,
        submitPasswordUpdate as passwordUpdateHTTP } from 'helpers/reset'

const UPDATE_INPUT = 'UPDATE_INPUT'

const SUBMITTING_EMAIL_RESET = 'SUBMITTING_EMAIL_RESET'
const SUBMIT_EMAIL_RESET_SUCCESS = 'SUBMIT_EMAIL_RESET_SUCCESS'
const SUBMIT_EMAIL_RESET_FAILURE = 'SUBMIT_EMAIL_RESET_FAILURE'

const VERIFYING_CODE = 'VERIFYING_CODE'
const VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS'
const VERIFY_CODE_FAILURE = 'VERIFY_CODE_FAILURE'

const SUBMITTING_PASSWORD_UPDATE = 'SUBMITTING_PASSWORD_UPDATE'
const SUBMIT_PASSWORD_UPDATE_SUCCESS = 'SUBMIT_PASSWORD_UPDATE_SUCCESS'
const SUBMIT_PASSWORD_UPDATE_FAILURE = 'SUBMIT_PASSWORD_UPDATE_FAILURE'

const initialState = {
  email: '',
  newPassword: '',
  confirmNewPassword: '',
  isSubmitting: false,
  submitSuccess: false,
  isVerifying: false,
  verifySuccess: false,
  isSubmittingPasswordUpdate: false,
  submitPasswordUpdateSuccess: false
}

function submittingPasswordUpdate () {
  return {
    type: SUBMITTING_PASSWORD_UPDATE
  }
}

function submitPasswordUpdateSuccess () {
  return {
    type: SUBMIT_PASSWORD_UPDATE_SUCCESS
  }
}

function submitPasswordUpdateFailure () {
  return {
    type: SUBMIT_PASSWORD_UPDATE_FAILURE
  }
}

export function submitPasswordUpdate (code, password, successCallback, failureCallback) {
  return function (dispatch) {

    /*
     * First, dispatch that we're about to take action
     */

    dispatch(submittingPasswordUpdate())

    passwordUpdateHTTP(code, password)

      .then(() => {

        submitPasswordUpdateSuccess()

        successCallback()

      })

      .catch((err) => {

        submitPasswordUpdateFailure()

        failureCallback()

      })
      
  }
}

function verifyingCode () {
  return {
    type: VERIFYING_CODE
  }
}

function verifyCodeSuccess () {
  return {
    type: VERIFY_CODE_SUCCESS
  }
}

function verifyCodeFailure () {
  return {
    type: VERIFY_CODE_FAILURE
  }
}

export function verifyPasswordResetCode (code, successCallback, failureCallback) {
  return function (dispatch) {

    dispatch(verifyingCode())

    verifyCodeHTTP(code)

      .then((result) => {

        dispatch(verifyCodeSuccess())

        successCallback()

      })

      .catch((err) => {

        dispatch(verifyCodeFailure())

        failureCallback(err.status)

      })

  }
}

function submitPasswordResetFailure () {
  return {
    type: SUBMIT_EMAIL_RESET_FAILURE
  }
}

function submitPasswordResetSuccess () {
  return {
    type: SUBMIT_EMAIL_RESET_SUCCESS
  }
}

function submittingPasswordReset () {
  return {
    type: SUBMITTING_EMAIL_RESET
  }
}

export function submitPasswordReset (email, successCallback, failureCallback) {
  return function (dispatch) {

   /*
    * Start
    */

    dispatch(submittingPasswordReset())


    passwordResetHTTP(email)
      
      .then((result) => {

        dispatch(submitPasswordResetSuccess())

        successCallback()

      })

      .catch((err) => {

        var errorMessage = "Something went wrong with that."

        if (err.status === 400) {
          errorMessage = "Enter a valid email address."
        }

        if (err.status === 500) {
          errorMessage = "Something went wrong on our end. Please let us know you're having trouble."
        }

        if (err.status === 404) {
          errorMessage = "Couldn't find a user with that email address."
        }

        dispatch(submitPasswordResetFailure())

        failureCallback(errorMessage)

      })

  }
}

export function updateField (fieldName, newValue) {
  return {
    type: UPDATE_INPUT,
    fieldName,
    newValue
  }
}

export default function reset (state = initialState, action) {
  switch(action.type) {

    case UPDATE_INPUT:
      return {
        ...state,
        [action.fieldName]: action.newValue
      }
    case VERIFYING_CODE:
      return {
        ...state,
        isVerifying: true,
        verifySuccess: false
      }
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        isVerifying: false,
        verifySuccess: true
      }
    case VERIFY_CODE_FAILURE:
      return {
        ...state,
        isVerifying: false,
        verifySuccess: false
      }
    case SUBMIT_EMAIL_RESET_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        submitSuccess: false
      }
    case SUBMIT_EMAIL_RESET_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        submitSuccess: true
      }
    case SUBMITTING_EMAIL_RESET:
      return {
        ...state,
        isSubmitting: true,
        submitSuccess: false
      }
    default:
      return state
  }
}