
import { rejectStudent as rejectStudentHTTPRequest, 
  contactStudent as contactStudentHTTPRequest, hireStudent as hireStudentHTTPRequest } from 'helpers/applicant'

import jobInfoSidebar from './jobInfoSidebar'

// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const CHANGE_SELECTED_JOB = 'CHANGE_SELECTED_JOB'
const CHANGE_SELECTED_STUDENT = 'CHANGE_SELECTED_STUDENT'

const REJECTING_STUDENT = 'REJECTING_STUDENT'
const REJECT_STUDENT_SUCCESS = 'REJECT_STUDENT_SUCCESS'
const REJECT_STUDENT_FAILURE = 'REJECT_STUDENT_FAILURE'

const CONTACTING_STUDENT = 'CONTACTING_STUDENT'
const CONTACT_STUDENT_SUCCESS = 'CONTACT_STUDENT_SUCCESS'
const CONTACT_STUDENT_FAILURE = 'CONTACT_STUDENT_FAILURE'

const HIRING_STUDENT = 'HIRING_STUDENT'
const HIRE_STUDENT_SUCCESS = 'HIRE_STUDENT_SUCCESS'
const HIRE_STUDENT_FAILURE = 'HIRE_STUDENT_FAILURE'

const OPEN_STUDENT_PROFILE_AND_ANSWERS_MODAL = 'OPEN_STUDENT_PROFILE_AND_ANSWERS_MODAL'

const ADD_CONTACT_INFO = 'APPLICANTS.ADD_CONTACT_INFO'

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

 /*
  * Rejecting a student
  */

function rejectingStudent () {
  return {
    type: REJECTING_STUDENT
  }
}

function rejectStudentSuccess (jobId, studentId) {
  return {
    type: REJECT_STUDENT_SUCCESS,
    jobId,
    studentId
  }
}

function rejectStudentFailure (error) {
  return {
    type: REJECT_STUDENT_FAILURE,
    error
  }
}

export function rejectStudent (jobId, studentId, successCallback, failureCallback) {
  return function (dispatch, other) {

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
        
        dispatch(rejectStudentSuccess(jobId, studentId))

        successCallback()

      })

     /*
      * 
      */

      .catch((err) => {

        dispatch(rejectStudentFailure(err.toString()))

        failureCallback()

      })

  }
}

 /*
  * Contacting a student
  */

function contactingStudent () {
  return {
    type: CONTACTING_STUDENT
  }
}

function contactStudentSuccess () {
  return {
    type: CONTACT_STUDENT_SUCCESS
  }
}

function contactStudentFailure () {
  return {
    type: CONTACT_STUDENT_FAILURE
  }
}


export function contactStudent (jobId, studentId, updateJobs, successCallback, failureCallback) {
  return function (dispatch) {

   /*
    * First, let's dispatch that we're starting this process.
    * This should lock the CONTACT button and display some sort of spinner
    * on it perhaps.
    */

    dispatch(contactingStudent())

    /*
    * Then, we'll actually go ahead with the API call.
    */

    contactStudentHTTPRequest(jobId, studentId)

      .then((result) => {

        var newApplicantInfo = result.data.applicant

        dispatch(contactStudentSuccess())

       /*
        * Update the store, jobs with the new changes.
        */

        dispatch(updateJobs(newApplicantInfo))

       /*
        * Update the store, applicants.currentSelectedJob.applicants AND applicants.studentProfileAndAnswersModal 
        */

        dispatch(addContactInfo(newApplicantInfo))

        successCallback()

      })

      .catch((err) => {

        dispatch(contactStudentFailure(err.toString()))

        failureCallback()

      })


  }
}

 /*
  * After contacting a student
  */

function addContactInfo (applicantUpdateObj) {
  return {
    type: ADD_CONTACT_INFO,
    applicantUpdateObj
  }
}

 /*
  * Hire a student
  */

function hiringStudent () {
  return {
    type: HIRING_STUDENT
  }
}

function hireStudentSuccess () {
  return {
    type: HIRE_STUDENT_SUCCESS
  }
}

function hireStudentFailure () {
  return {
    type: HIRE_STUDENT_FAILURE
  }
}

export function hireStudent(jobId, studentId, successCallback, failureCallback) {
  return function (dispatch) {

   /*
    * First, start by acknowledging that we're attempting to
    * hire this student.
    */

    dispatch(hiringStudent())

   /*
    * Now lets actually perform the request
    */
    hireStudentHTTPRequest(jobId, studentId)

      .then((result) => {

        dispatch(hireStudentSuccess())

        successCallback()

      })

      .catch((err) => {

        dispatch(hireStudentFailure(err.toString()))

        failureCallback()
        
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
  studentProfileAndAnswersModal: {},
  isContacting: false,
  contactSuccess: false,
  isHiring: false,
  hireSuccess: false,
  jobInfoSidebar: {}
}

// =======================================================
// ===================== REDUCER =========================
// =======================================================

export default function applicants (state = initialApplicationsState, action) {
  switch(action.type) {

   /*
    * ==================================
    *       JOB INFO SIDEBAR
    * ==================================
    */

    case jobInfoSidebar.actions.JOB_INFO_SIDEBAR_OPEN:
      return {
        ...state,
        jobInfoSidebar: jobInfoSidebar.reducers.jobInfoSidebar(state.jobInfoSidebar, action)
      }
    case jobInfoSidebar.actions.JOB_INFO_SIDEBAR_CLOSED:
      return {
        ...state,
        jobInfoSidebar: jobInfoSidebar.reducers.jobInfoSidebar(state.jobInfoSidebar, action)
      }
    case jobInfoSidebar.actions.TOGGLE_QUALIFICATIONS_SECTION:
      return {
        ...state,
        jobInfoSidebar: jobInfoSidebar.reducers.jobInfoSidebar(state.jobInfoSidebar, action)
      }
    case jobInfoSidebar.actions.TOGGLE_DESIRED_SKILLS_SECTION:
      return {
        ...state,
        jobInfoSidebar: jobInfoSidebar.reducers.jobInfoSidebar(state.jobInfoSidebar, action)
      }
    case jobInfoSidebar.actions.TOGGLE_COMPENSATION_SECTION:
      return {
        ...state,
        jobInfoSidebar: jobInfoSidebar.reducers.jobInfoSidebar(state.jobInfoSidebar, action)
      }
    case jobInfoSidebar.actions.TOGGLE_RESPONSIBILITIES_SECTION:
      return {
        ...state,
        jobInfoSidebar: jobInfoSidebar.reducers.jobInfoSidebar(state.jobInfoSidebar, action)
      } 

   /*
    * ==================================
    *       Hiring a student
    * ==================================
    */

    case HIRING_STUDENT:
      return {
        ...state,
        isHiring: true,
        hireSuccess: false,
        error: ''
      }
    case HIRE_STUDENT_SUCCESS:
      return {
        ...state,
        isHiring: false,
        hireSuccess: true,
        error: ''
      }
    case HIRE_STUDENT_FAILURE:
      return {
        ...state,
        isHiring: false,
        hireSuccess: false,
        error: action.error
      }

   /*
    * ==================================
    *       Rejecting a student
    * ==================================
    */

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

   /*
    * ==================================
    *       Contacting a student
    * ==================================
    */  

    case CONTACTING_STUDENT:
      return {
        ...state,
        isContacting: true,
        contactStudent: false,
        error: ''
      }
    case CONTACT_STUDENT_SUCCESS:
      
     /*
      * We are going to need to somehow keep 
      * track of the new student information, very likely.
      * Maybe a TODO here.
      */

      return {
        ...state,
        isContacting: false,
        contactSuccess: true,
        error: ''
      }
    case CONTACT_STUDENT_FAILURE:
      return {
        ...state,
        isContacting: false,
        contactSuccess: false,
        error: action.error
      }
    
    case ADD_CONTACT_INFO:

     /*
      * We've collected contact info for one of these applicants so we 
      * need to update everywhere that it is important to have this.
      * These two places are state.currentSelectedJob.applicants and 
      * state.studentProfileAndAnswersModal.
      */

      var currentSelectedJob = state.currentSelectedJob
      var studentProfileAndAnswersModal = state.studentProfileAndAnswersModal

      var preferredEmail = action.applicantUpdateObj.preferred_email

      var targetJobId = action.applicantUpdateObj.job_id
      var targetStudentId = action.applicantUpdateObj.student_id

      /*
      * First, we'll update the currentSelectedJob attribute on the store.
      */

      currentSelectedJob.applicants = currentSelectedJob.applicants.map((applicant) => {

        if (applicant.student_id == targetStudentId) {
          applicant.preferred_email = preferredEmail
          applicant.state = 'CONTACTED'
        }

        return applicant
      })

     /*
      * Next, we'll update the studentProfileAndAnswersModal
      */

      studentProfileAndAnswersModal.student.preferred_email = preferredEmail
      studentProfileAndAnswersModal.student.state = 'CONTACTED'

      return {
        ...state,
        currentSelectedJob: currentSelectedJob,
        studentProfileAndAnswersModal: studentProfileAndAnswersModal
      }

   /*
    * ==================================
    *       Other: Selecting a job, choosing a student
    * ==================================
    */  

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

      /*
			 * Lastly, we want to do the same thing with Languages.
			 * If the object is empty, we will just return 'ENGLISH'
			 */

			var languagesString = "";
			var languages = Object.keys(action.studentObject.languages)

			if (languages.length == 0) {
				languagesString = "English"
			}

			else {
				for (var k = 0; k < languages.length; k++) {
					if (k !== languages.length - 1) {
						languagesString = languagesString + action.studentObject.languages[languages[k]] + ", "
					} else {
						languagesString = languagesString + action.studentObject.languages[languages[k]]
					}
				}
			}
			
			action.studentObject.languagesString = languagesString

      return {
        ...state,
        studentProfileAndAnswersModal: {
          student: action.studentObject
        }
      }
	  default:
			return state
  }
}
