
 /*
  * redux/modules/dashboard/inviteStudentModal.js
  *
  * This file contains all of the redux state that pertains to the invite student modal
  * on the employer screen when they want to invite a student.
  */

  import { inviteStudent } from 'helpers/dashboard'

 /*
  * Actions
  */

  const INVITING_STUDENT_TO_JOB = "INVITING_STUDENT_TO_JOB"
  const INVITING_STUDENT_TO_JOB_SUCCESS = "INVITING_STUDENT_TO_JOB_SUCCESS"
  const INVITING_STUDENT_TO_JOB_FAILURE = "INVITING_STUDENT_TO_JOB_FAILURE"

  const INVITE_STUDENT_MODAL_OPEN = 'INVITE_STUDENT_MODAL_OPEN'
  const SELECT_JOB_INVITE_MODAL = 'SELECT_JOB_INVITE_MODAL'

 /*
  * Initial State
  */

  const initialInviteStudentModalState = {
    maxApplicants: 0,
    currentApplicants: 0,
    isInviting: false,
    success: false,
    selectedJob: {},
    selectedStudent: {},
    error: ''
  }

 /*
  * Action Creators
  */

  function invitingStudent () {
    return {
      type: INVITING_STUDENT_TO_JOB
    }
  }

  function inviteStudentSuccess () {
    return {
      type: INVITING_STUDENT_TO_JOB_SUCCESS
    }
  }

  function inviteStudentFailure(error) {
    return {
      type: INVITING_STUDENT_TO_JOB_FAILURE,
      error
    }
  }

  export function openInviteStudentModal (student) {
    return {
      type: INVITE_STUDENT_MODAL_OPEN,
      student
    }
  }

  export function selectJobInviteModal (job) {
    return {
      type: SELECT_JOB_INVITE_MODAL,
      job
    }
  }

 /*
  * inviteStudentToJob
  *
  * [Employer]: Invite a student to a job
  */

  function inviteStudentToJob (jobId, studentId) {
    return function(dispatch) {

     /*
      * First, we need to dispatch the action that we're 
      * inviting a student to a job.
      * 
      * This is important because we want to constrain the 
      * user from being able to break away from the screen while
      * this is happening until some result happens.
      */

      dispatch(invitingStudent())

      inviteStudent(jobId, studentId)

        .then((result) => {
          console.log(result)

          if (result.status === 200) {
            dispatch(inviteStudentSuccess())
          }

          else {
            
            dispatch(inviteStudentFailure())

          } 

        })

        .catch((err) => {
          var errorMessage = ''
          
          if (err.status == 409) {
            errorMessage = 'Already invited student to this job!'
          }

          else {
            errorMessage = 'Oh geez. Something went wrong on our end. Try that again.'
          }

          dispatch(inviteStudentFailure(errorMessage))

        })
      
    }
  }

  function inviteStudentModal (state = initialInviteStudentModalState, action) {
    switch(action.type) {
      case INVITE_STUDENT_MODAL_OPEN:
        return {
          maxApplicants: 0,
          currentApplicants: 0,
          isInviting: false,
          success: false,
          selectedJob: {},
          error: '',
          selectedStudent: action.student
        }
      case SELECT_JOB_INVITE_MODAL:
        return {
          ...state,
          maxApplicants: action.job.max_applicants,
          currentApplicants: action.job.applicants.length,
          selectedJob: action.job
        }
      case INVITING_STUDENT_TO_JOB:
        return {
          ...state,
          isInviting: true,
          error: ''
        }
      case INVITING_STUDENT_TO_JOB_SUCCESS:
        return {
          ...state,
          isInviting: false,
          success: true
        }
      case INVITING_STUDENT_TO_JOB_FAILURE:
        return {
          ...state,
          isInviting: false,
          success: false,
          error: action.error
        }
      default:
        return state
    }
  }

  export default {
      actions: {
          INVITING_STUDENT_TO_JOB,
          INVITING_STUDENT_TO_JOB_SUCCESS,
          INVITING_STUDENT_TO_JOB_FAILURE,
          INVITE_STUDENT_MODAL_OPEN,
          SELECT_JOB_INVITE_MODAL
      },
      actionCreators: {
          inviteStudentToJob,
          openInviteStudentModal,
          selectJobInviteModal
      },
      initialState: initialInviteStudentModalState,
      reducers: {
        inviteStudentModal
      }
  }