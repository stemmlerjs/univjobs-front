
 /*
  * redux/modules/dashboard/jobAppModal.js
  *
  * This file contains all of the redux state that pertains to the job application
  * modal that pops up when a student clicks a job in the student dashboard.
  */

  import { applyToJob } from 'helpers/dashboard'

 /*
  * Actions
  */

  const APPLYING_TO_JOB = "APPLYING_TO_JOB"
  const APPLYING_TO_JOB_SUCCESS = "APPLYING_TO_JOB_SUCCESS"
  const APPLYING_TO_JOB_FAILURE = "APPLYING_TO_JOB_FAILURE"

  const JOB_APP_MODAL_OPEN = 'JOB_APP_MODAL_OPEN'
  const UPDATE_ANSWER_TEXT = 'UPDATE_ANSWER_TEXT'

 /*
  * Action Creators
  */

  function applyingToJob () {
    return {
      type: APPLYING_TO_JOB
    }
  }

  function applyingToJobSuccess () {
    return {
      type: APPLYING_TO_JOB_SUCCESS
    }
  }

  function applyingToJobFailure () {
    return {
      type: APPLYING_TO_JOB_FAILURE
    }
  }

  export function openJobAppModal (job) {
    return {
      type: JOB_APP_MODAL_OPEN,
      job
    }
  }

  export function updateAnswerText (answerNum, answerText) {
    return {
      type: UPDATE_ANSWER_TEXT,
      answerNum,
      answerText
    }
  }

  export function submitJobApplication (jobId, question_one_id, question_one_text, question_two_id, question_two_text, successCallback, failureCallback) {
    return function (dispatch) {

     /*
      * First, we set that we are applying to the job.
      */

      dispatch(applyingToJob())

      var answers = []
      var error = ""

     /*
      * Error checking. Check to make sure that each of the 
      * questions are answered.
      */

      if (question_one_id) {

        if (question_one_text == "") {

          error = "Question one needs to be answered!"

        }

      }

      if (question_two_id) {

        if (question_two_text == "") {

          error = "Question two needs to be answered!"

        }
      }

     /*
      * If there was an error, lets throw that error.
      */

      if (error !== "") {

        dispatch(applyingToJobFailure(error))

      }

     /*
      * If we're alright, we'll continue with the process 
      * to apply to the job.
      */

      else {

       /*
        * Push job 1 if it exists.
        */

        if (question_one_id) {

          answers.push({
            questionId: question_one_id,
            answer: question_one_text
          })

        }

       /*
        * Push job 2 if it exists.
        */

        if (question_two_id) {

          answers.push({
            questionId: question_two_id,
            answer: question_two_text
          })

        }

       /*
        * Now actually attempt to apply to the job with
        * the answers to the questions.
        */

        applyToJob(answers, jobId)

       /*
        * After applying to the job, if it went well, 
        * then we can say it was successful.
        */

        .then((response) => {

          dispatch(applyingToJobSuccess())

          successCallback()

        })

       /*
        * If there was a problem submitting the job,
        * dispatch an error.
        */

        .catch((err) => {

          var errorMsg = "Network error occurred while applying to the job :("

          dispatch(applyingToJobFailure(errorMsg))

          failureCallback(err)

        })

      }
      
      
    }
  }

 /*
  * Initial State
  */

  var initialJobAppModalState = {
    selectedJob: {},
    answerOne: '',
    answerTwo: '',
    isApplying: false,
    success: false,
    error: ''
  }

  export function jobAppModal(state = initialJobAppModalState, action) {
    switch(action.type) {
      case UPDATE_ANSWER_TEXT:
        if (action.answerNum == 1) {
          return {
            ...state,
            answerOne: action.answerText
          }
        } 
        else if (action.answerNum == 2) {
          return {
            ...state,
            answerTwo: action.answerText
          }
        }
      case APPLYING_TO_JOB_FAILURE:
        return {
          ...state,
          error: action.error,
          success: false
        }
      case APPLYING_TO_JOB_SUCCESS:
        return {
          ...state,
          isApplying: false,
          success: true
        }
      case APPLYING_TO_JOB:
        return {
          ...state,
          isApplying: true,
          error: ''
        }
      case JOB_APP_MODAL_OPEN:
      console.log(" we openin ", action)
        return {
          ...state,
          selectedJob: action.job,
          answerOne: '',
          answerTwo: '',
          error: '',
          success: false
        }
      default:
        return;
    }
  }

 /*
  * Reducer
  */

  export default {
    actions: {
        APPLYING_TO_JOB,
        JOB_APP_MODAL_OPEN,
        APPLYING_TO_JOB_SUCCESS,
        APPLYING_TO_JOB_FAILURE,
        UPDATE_ANSWER_TEXT
    },
    actionCreators: {
        openJobAppModal,
        updateAnswerText,
        submitJobApplication
    },
    initialState: initialJobAppModalState,
    reducers: {
      jobAppModal
    }
  }