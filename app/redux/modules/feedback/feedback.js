
/*
 * redux/feedback/feedback.js
 * 
 * Feedback from redux logic.
 */

import { submitFeedbackForm as submitFeedbackFormHTTP } from 'helpers/feedback'

const TOGGLE_FORM_OPEN = 'TOGGLE_FORM_OPEN'
const UPDATE_FORM = 'UPDATE_FORM'

const SUBMITTING_FEEDBACK_FORM = 'SUBMITTING_FEEDBACK_FORM'
const SUBMIT_FEEDBACK_FORM_SUCCESS = 'SUBMIT_FEEDBACK_FORM_SUCCESS'
const SUBMIT_FEEDBACK_FORM_ERROR = 'SUBMIT_FEEDBACK_FORM_ERROR'

const ERRORS_EXIST_IN_FORM = 'ERRORS_EXIST_IN_FORM'
const ERRORS_FIXED_IN_FORM = 'ERRORS_FIXED_IN_FORM'

const SHOW_LONG_REQUEST_MESSAGE = 'SHOW_LONG_REQUEST_MESSAGE'


function showLongRequestMessage () {
  return {
    type: SHOW_LONG_REQUEST_MESSAGE
  }
}

export function submitFeedbackForm (title, description, screenshot) {
  return function(dispatch) {

    /*
     * First, check to see if there are any errors
     * 
     * Title: 40 characters max
     * Description: 500 characters max 
     */

    if (title.length > 40 || title.length == 0) {
       dispatch(errorsExistInForm('title'))
    } 

    else if (description.length > 500) {
      dispatch(errorsExistInForm('description'))
    } 
    
    /*
     * Otherwise, continue with sending the form.
     */

    else {
      /*
       * Let the app know that we are submitting now,
       * display any animations or whatever
       */

      dispatch(submittingForm())

      /*
       * Set timer
       */

      setTimeout(()=> {
        dispatch(showLongRequestMessage())
      }, 10000)

      submitFeedbackFormHTTP(title, description, screenshot)

        .then((result) => {

          dispatch(submitFeedbackFormSuccess())

        })

        .catch((err) => {

          dispatch(submitFeedbackFormFailure())

        })

    }

  }
}

function submitFeedbackFormSuccess() {
  return {
    type: SUBMIT_FEEDBACK_FORM_SUCCESS
  }
}

function submitFeedbackFormFailure () {
  return {
    type: SUBMIT_FEEDBACK_FORM_ERROR
  }
}

function submittingForm () {
  return {
    type: SUBMITTING_FEEDBACK_FORM
  }
}

function errorsExistInForm (field) {
  return {
    type: ERRORS_EXIST_IN_FORM,
    field
  }
}

function errorsFixedInForm (field) {
  return {
    type: ERRORS_FIXED_IN_FORM,
    field
  }
}

export function checkForFeedbackFormErrors (title, description) {
  return function (dispatch) {
    if (title.length > 40) {
       dispatch(errorsExistInForm('title'))
    } else {
      dispatch(errorsFixedInForm('title'))
    }


    if (description.length > 500) {
      dispatch(errorsExistInForm('description'))
    } else {
      dispatch(errorsFixedInForm('description'))
    }
  }
}

export function updateFeedbackForm (field, newValue) {
  return {
    type: UPDATE_FORM,
    field,
    newValue
  }
}

export function toggleFeedbackFormOpen() {
  return {
    type: TOGGLE_FORM_OPEN
  }
}

const initialFeedbackFormState = {
  isOpen: false,
  description: '',
  title: '',
  screenshot: null,
  errorsMap: {
    description: false,
    title: false
  },
  isSubmitting: false,
  submitSuccess: false,
  submitFailure: false,
  showLongRequestMessage: false
}

export default function feedback (state = initialFeedbackFormState, action) {
  switch(action.type) {
    case SHOW_LONG_REQUEST_MESSAGE:
      return {
        ...state,
        showLongRequestMessage: true
      }
    case SUBMIT_FEEDBACK_FORM_ERROR:
      return {
        ...state,
        isSubmitting: false,
        submitSuccess: false,
        submitFailure: true,
        showLongRequestMessage: false
      }
    case SUBMIT_FEEDBACK_FORM_SUCCESS:

    /*
     * On successful submit, we want to erase the form so we can resubmit.
     */

      return {
        ...state,
        submitFailure: false,
        submitSuccess: true,
        isSubmitting: false,
        description: '',
        title: '',
        screenshot: null,
        showLongRequestMessage: false
      }
    case SUBMITTING_FEEDBACK_FORM:
      return {
        ...state,
        isSubmitting: true,
        submitSuccess: false,
        submitFailure: false
      }
    case ERRORS_EXIST_IN_FORM:
      let errorsExistMap = state.errorsMap;
      errorsExistMap[action.field] = true;

      return {
        ...state,
        errorsMap: errorsExistMap
      }
    case ERRORS_FIXED_IN_FORM: 
      let errorsFixedMap = state.errorsMap;
      errorsFixedMap[action.field] = false;

      return {
        ...state,
        errorsMap: errorsFixedMap
      }
    case UPDATE_FORM:
      return {
        ...state,
        [action.field]: action.newValue,
        isSubmitting: false,
        submitSuccess: false,
        submitFailure: false
      }
    case TOGGLE_FORM_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    default :
      return state
  }
}
