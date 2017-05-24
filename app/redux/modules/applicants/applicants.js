
import { rejectStudent as rejectStudentHTTPRequest } from 'helpers/applicant'

// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const CHANGE_SELECTED_JOB = 'CHANGE_SELECTED_JOB'
const CHANGE_SELECTED_STUDENT = 'CHANGE_SELECTED_STUDENT'

const REJECTING_STUDENT = 'REJECTING_STUDENT'
const REJECT_STUDENT_SUCCESS = 'REJECT_STUDENT_SUCCESS'
const REJECT_STUDENT_FAILURE = 'REJECT_STUDENT_FAILURE'

// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

export function changeSelectedJob (job) {
	return {
		type: CHANGE_SELECTED_JOB,
		job
	}
}

export function changeSelectedStudent (student) {
	return {
		type: CHANGE_SELECTED_STUDENT,
		student
	}
}

export function rejectingStudent () {
  return {
    type: REJECTING_STUDENT
  }
}

export function rejectStudentSuccess () {
  return {
    type: REJECT_STUDENT_SUCCESS
  }
}

export function rejectStudentFailure (error) {
  return {
    type: REJECT_STUDENT_FAILURE,
    error
  }
}

export function rejectStudent (jobId, studentId) {
  return function (dispatch) {

   /*
    * First, lets notify that we are going to start
    * the API call of rejecting the student so that 
    * we can display a spinner or something.
    */

    dispatch(rejectingStudent())

    rejectStudentHTTPRequest(jobId, studentId)
    
      .then((response) => {

       /*
        * If the response came back at all, this means that 
        * it was a success.
        */

        dispatch(rejectStudentSuccess())

      })

     /*
      * 
      */

      .catch((err) => {

        dispatch(rejectStudentFailure(err.toString()))

      })

  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialApplicationsState = {
	currentSelectedJob: {},
	currentSelectedStudent: {},
  isRejecting: false,
  rejectSuccess: false,
  error: ''
}

// =======================================================
// ===================== REDUCER =========================
// =======================================================

export default function applicants (state = initialApplicationsState, action) {
  switch(action.type) {
    case REJECT_STUDENT_FAILURE:
      return {
        ...state,
        isRejecting: false,
        error: action.error
      }
    case REJECT_STUDENT_SUCCESS:
      return {
        ...state,
        isRejecting: false,
        error: '',
        rejectSuccess: true
      }
    case REJECTING_STUDENT:
      return {
        ...state,
        isRejecting: true,
        rejectSuccess: false,
        error: ''
      }
	  case CHANGE_SELECTED_JOB:
			return {
				...state,
				currentSelectedJob: action.job
			}
	  case CHANGE_SELECTED_STUDENT:
      return {
        ...state,
        currentSelectedStudent: action.student
      }
	  default:
			return state
  }
}
