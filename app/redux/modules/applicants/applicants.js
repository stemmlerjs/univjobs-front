
import { rejectStudent as rejectStudentHTTPRequest } from 'helpers/applicant'

// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const CHANGE_SELECTED_JOB = 'CHANGE_SELECTED_JOB'
const CHANGE_SELECTED_STUDENT = 'CHANGE_SELECTED_STUDENT'

const REJECTING_STUDENT = 'REJECTING_STUDENT'
const REJECT_STUDENT_SUCCESS = 'REJECT_STUDENT_SUCCESS'
const REJECT_STUDENT_FAILURE = 'REJECT_STUDENT_FAILURE'

const OPEN_STUDENT_PROFILE_AND_ANSWERS_MODAL = 'OPEN_STUDENT_PROFILE_AND_ANSWERS_MODAL'

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

export function rejectStudentSuccess (jobId, studentId) {
  return {
    type: REJECT_STUDENT_SUCCESS,
    jobId,
    studentId
  }
}

export function rejectStudentFailure (error) {
  return {
    type: REJECT_STUDENT_FAILURE,
    error
  }
}

export function rejectStudent (jobId, studentId) {
  return function (dispatch, other) {

   /*
    * First, lets notify that we are going to start
    * the API call of rejecting the student so that 
    * we can display a spinner or something.
    */

    dispatch(rejectingStudent())

    return rejectStudentHTTPRequest(jobId, studentId)
    
      .then((response) => {

       /*
        * If the response came back at all, this means that 
        * it was a success.
        */
        
        dispatch(rejectStudentSuccess(jobId, studentId))

      })

     /*
      * 
      */

      .catch((err) => {

        dispatch(rejectStudentFailure(err.toString()))

      })

  }
}

export function openStudentProfileAndAnswersModal (studentObject) {
  return {
    type: OPEN_STUDENT_PROFILE_AND_ANSWERS_MODAL,
    studentObject
  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialApplicationsState = {
	currentSelectedJob: {},
	currentSelectedStudent: {},
  hiddenStudents: [],
  isRejecting: false,
  rejectSuccess: false,
  error: '',
  studentProfileAndAnswersModal: {}
}

// =======================================================
// ===================== REDUCER =========================
// =======================================================

export default function applicants (state = initialApplicationsState, action) {
  switch(action.type) {
    case OPEN_STUDENT_PROFILE_AND_ANSWERS_MODAL:

      /*
			* We need to display the student's sports in a comma delimited list.
			* Create this string and append it for the 'sports'
			*/
			
			var sportsString = "";
			var sports = Object.keys(action.studentObject.sports);

			for (var i = 0; i < sports.length; i++) {
				if (i !== sports.length - 1) {
					sportsString = sportsString + action.studentObject.sports[sports[i]] + ", "
				} else {
					sportsString = sportsString + action.studentObject.sports[sports[i]]
				}
			}

			action.studentObject.sportsString = sportsString

		 /*
			* Additionally, we have to do the same thing with clubs.
			*/

			var clubsString = "";
			var clubs = Object.keys(action.studentObject.clubs)

			for (var j = 0; j < clubs.length; j++) {
				if (j !== clubs.length - 1) {
					clubsString = clubsString + action.studentObject.clubs[clubs[j]] + ", "
				} else {
					clubsString = clubsString + action.studentObject.clubs[clubs[j]]
				}
			}

			action.studentObject.clubsString = clubsString

      return {
        ...state,
        studentProfileAndAnswersModal: {
          student: action.studentObject
        }
      }
    case REJECT_STUDENT_FAILURE:
      return {
        ...state,
        isRejecting: false,
        error: action.error
      }
    case REJECT_STUDENT_SUCCESS:
    var hiddenStudents = state.hiddenStudents;
    hiddenStudents.push({
      studentId: action.studentId,
          jobId: action.jobId
    })
      return {
        ...state,
        isRejecting: false,
        error: '',
        rejectSuccess: true,
        hiddenStudents: hiddenStudents
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
