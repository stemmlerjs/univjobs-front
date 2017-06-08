
import { getJobs } from 'helpers/job'
import { pinAJob as pinJobHTTPRequest, unPinAJob as unpinJobHTTPRequest, getPinnedJobs } from 'helpers/pinJobs'
import { toggleApplication } from 'helpers/application'

// =======================================================
// ====================== ACTIONS ========================
// =======================================================

/*NOTE: 
 *   Might have to rename the strings passed into variables,
 *   into a generic names, employer and student are going to be
 *   using the jobs, questions, and answers.
 * */

const FETCHING_EMPLOYER_JOBS = 'FETCHING_EMPLOYER_JOBS'
const FETCHED_EMPLOYER_JOBS_SUCCESS = 'FETCHED_EMPLOYER_JOBS_SUCCESS'
const FETCHED_EMPLOYER_JOBS_FAILURE = 'FETCHED_EMPLOYER_JOBS_FAILURE'

const FETCHING_STUDENT_JOBS_VIEW = 'FETCHING_STUDENT_JOBS_VIEW'
const FETCHED_STUDENT_JOBS_VIEW_SUCCESS = 'FETCHED_STUDENT_JOBS_VIEW_SUCCESS'
const FETCHED_STUDENT_JOBS_VIEW_FAILURE = 'FETCHED_STUDENT_JOBS_VIEW_FAILURE'

const FETCHING_JOB_TYPES = 'FETCHING_JOB_TYPES'
const FETCHED_JOB_TYPES_SUCCESS = 'FETCHED_JOB_TYPES_SUCCESS'
const FETCHED_JOB_TYPES_FAILURE = 'FETCHED_JOB_TYPES_FAILURE'

const ADD_CONTACT_INFO = 'JOBS.ADD_CONTACT_INFO'

const UPDATE_APPLIED_JOB = 'UPDATE_APPLIED_JOB'

const PINNING_JOB = 'PINNING_JOB'
const PIN_JOB_SUCCESS = 'PIN_JOB_SUCCESS'
const PIN_JOB_FAILURE = 'PIN_JOB_FAILURE'

const UNPINNING_JOB = 'UNPINNING_JOB'
const UNPIN_JOB_SUCCESS = 'UNPIN_JOB_SUCCESS'
const UNPIN_JOB_FAILURE = 'UNPIN_JOB_FAILURE'

const REMOVING_JOB = 'REMOVING_JOB'
const REMOVE_JOB_SUCCESS = 'REMOVE_JOB_SUCCESS'
const REMOVE_JOB_FAILURE = 'REMOVE_JOB_FAILURE'

const UNDOING_REMOVE = 'UNDOING_REMOVE'
const UNDO_REMOVE_SUCCESS = 'UNDO_REMOVE_SUCCESS'
const UNDO_REMOVE_FAILURE = 'UNDO_REMOVE_FAILURE'

const UPDATE_FILTERED_JOBS = 'UPDATE_FILTERED_JOBS'


// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

  export function updateFilteredJobs (jobs) {
    return {
      type: UPDATE_FILTERED_JOBS,
      jobs
    }
  }

  function undoingRemove () {
    return {
      type: UNDOING_REMOVE
    }
  }

  function undoRemoveSuccess (jobId) {
    return {
      type: UNDO_REMOVE_SUCCESS
    }
  }

  function undoRemoveFailure () {
    return {
      type: UNDO_REMOVE_FAILURE
    }
  }

  export function undoRemoveJobFromApplicants (jobId, successCallback, failureCallback) {
    return function (dispatch) {

      dispatch(undoingRemove())

      toggleApplication(jobId, true)

        .then((result) => {

          dispatch(undoRemoveSuccess(jobId))

          successCallback()

        })

        .catch((err) => {

          dispatch(undoRemoveFailure())

          failureCallback()

        })

    }
  }
  
  function removingJob () {
    return {
      type: REMOVING_JOB
    }
  }

  function removeJobSuccess (jobId) {
    return {
      type: REMOVE_JOB_SUCCESS,
      jobId
    }
  }

  function removeJobError () {
    return {
      type: REMOVE_JOB_FAILURE
    }
  }

  export function removeJobFromApplicants (jobId, successCallback, failureCallback) {
    return function (dispatch) {

     /*
      * Alert that we're removing a job.
      */

      dispatch(removingJob())

     /*
      * Now perform the HTTP call.
      */

      toggleApplication(jobId, false)

        /*
        * Success, dispatch success.
        */
        
        .then((result) => {
          
          dispatch(removeJobSuccess(jobId))

          successCallback()
         
        })

       /*
        * Error, dispatch error.
        */

        .catch((err) => {

          dispatch(removeJobError())

          failureCallback()

        })

    }
  }

  function pinningJob () {
    return {
      type: PINNING_JOB
    }
  }

  function pinJobSuccess (jobId) {
    return {
      type: PIN_JOB_SUCCESS,
      jobId
    }
  }

  function pinJobFailure (error) {
    return {
      type: PIN_JOB_FAILURE,
      error
    }
  }

  export function pinJob (jobId, successCallback, failureCallback) {
    return function (dispatch) {

     /*
      * Start the process, pinning a job.
      */

      dispatch(pinningJob())

      pinJobHTTPRequest(jobId)

        .then((result) => {

          // If success, update the job to pinned == 1

          dispatch(pinJobSuccess(jobId))

          successCallback()

        })

        .catch((err) => {

          // Failure
          
          dispatch(pinJobFailure('Could not pin job.'))

          failureCallback()

        })
    }
  }
  
  function unpinningJob () {
    return {
      type: UNPINNING_JOB
    }
  }

  function unpinJobSuccess (jobId) {
    return {
      type: UNPIN_JOB_SUCCESS,
      jobId
    }
  }

  function unpinJobFailure (error) {
    return {
      type: UNPIN_JOB_FAILURE,
      error
    }
  }

  export function unpinJob (jobId, successCallback, failureCallback) {
    return function (dispatch) {

      /*
      * Start the process, unpinning a job.
      */

      dispatch(unpinningJob())

      unpinJobHTTPRequest(jobId)

        .then((result) => {

          // If success, update the job to pinned == 1

          dispatch(unpinJobSuccess(jobId))

          successCallback()

        })

        .catch((err) => {

          // Failure
          
          dispatch(unpinJobFailure('Could not unpin job.'))

          failureCallback()

        })

    }
  }

 /* ===============================
  *   After applying to a job
  * ===============================
  */

export function updateAppliedJob (jobId) {
  return {
    type: UPDATE_APPLIED_JOB,
    jobId
  }
}

/* ===============================
 * After contacting a student
 * ===============================
 */

export function jobs__addContactInfo(applicantUpdateObj) {
  return {
    type: ADD_CONTACT_INFO,
    applicantUpdateObj
  }
}


/* ===============================
 * Employer jobs view
 * ===============================
 */

  export function fetchingEmployerJobs () {
    return {
      type: FETCHING_EMPLOYER_JOBS,
    }
  }

  export function fetchedEmployerJobsSuccess(jobs) {
    return {
      type: FETCHED_EMPLOYER_JOBS_SUCCESS,
      jobs
    }
  }

  export function fetchedEmployerJobsFailure(error) {
    return {
      type: FETCHED_EMPLOYER_JOBS_FAILURE,
      error
    }
  }

/* ===============================
 * Student jobs view
 * ===============================
 */

  export function fetchingStudentJobsView () {
    return {
      type: FETCHING_STUDENT_JOBS_VIEW,
    }
  }

  export function fetchedStudentJobsViewSuccess(jobs) {
    return {
      type: FETCHED_STUDENT_JOBS_VIEW_SUCCESS,
      jobs
    }
  }

  export function fetchedStudentJobsViewFailure(error) {
    return {
      type: FETCHED_STUDENT_JOBS_VIEW_FAILURE,
      error
    }
  }

/***************JOB TYPES***************/
  export function fetchingJobTypes() {
    return {
      type: FETCHING_JOB_TYPES,
    }
  }

  export function fetchedJobTypesSuccess(jobTypes) {
    return {
      type: FETCHED_JOB_TYPES_SUCCESS,
      jobTypes
    }
  }

  export function fetchedJobTypesFailure(error) {
    return {
      type: FETCHED_JOB_TYPES_FAILURE,
      error
    }
  }


// =======================================================
// ===================== THUNK ===========================
// =======================================================
// REF: https://github.com/ReactjsProgram/Redux-Immutable/commit/c1b261b21150e472c6199dcda7bcb792a81678f8
// https://online.reacttraining.com/courses/redux-and-immutablejs/lectures/946352

export function getAllJobsQuestionsAnswersForEmployer () {
  return function (dispatch) {

   /*
    * As an employer, making a request to /jobs will return
    * all of our jobs, answers and questions.
    */

    dispatch(fetchingEmployerJobs())

    getJobs()

      .then((result) => {

        /*
        * If the request was successful, we must now take from
        * the request and put the jobs, questions, answers and
        * applicants neatly in the redux store.
        */

        var jobs = result.data.jobs;
        var questions = result.data.questions;
        var answers = result.data.answers;
        var applicants = result.data.applicants;
        var invites = result.data.invites

        for(var i = 0; i < jobs.length; i++) {

         /*
          * For each job, place the answers and questions onto 
          * the job object.
          */

          jobs[i].questions = []
          jobs[i].answers = []
          jobs[i].applicants = []
          jobs[i].invites = []

          questions.forEach(function(question) {
            if (question.job_id == jobs[i].job_id) {
              jobs[i].questions.push(question)
            }
          })

          answers.forEach(function(answer) {
            if (answer.job_id == jobs[i].job_id) {
              jobs[i].answers.push(answer)
            }
          })

          applicants.forEach(function(applicant) {
            if (applicant.job_id == jobs[i].job_id) {
              jobs[i].applicants.push(applicant)
            }
          })

          invites.forEach(function(invite) {
            if (invite.job_id == jobs[i].job_id) {
              jobs[i].invites.push(invite)
            }
          })

        }

       /*
        * Finally, place each of the jobs into the redux 
        * store.
        */

        dispatch(fetchedEmployerJobsSuccess(jobs))

      })

      .catch((err) => {

       /*
        * If we were unable to get the jobs for this employer,
        * we should present some sort of error.
        */
        
        var errorMsg = "Some error occurred while attempting to retrieve all jobs."

        dispatch(fetchedEmployerJobsFailure(errorMsg))

      })
  }
}

export function getAllJobsStudentJobView () {
  return function (dispatch) {

   /*
    * The student job view exposes all jobs so that they
    * may see them in their Student Dashboard.
    */

    dispatch(fetchingStudentJobsView())

    getJobs()

      .then((result) => {
        console.log("HERE")
        
       /*
        * If successful, we will add all of the jobs to the
        * studentJobsView (part of the redux store). 
        * This is where students will pull 
        * in jobs from the store.
        *
        * The API call returns jobs and questions.
        */

        var jobs = result.data.jobs;
        var questions = result.data.questions;
        var answers = result.data.answers
        var pinned = result.data.pinnedJobs;

        for(var i = 0; i < jobs.length; i++) {

         /*
          * For each job, place the questions onto 
          * the job object.
          */

          jobs[i].questions = []

          questions.forEach(function(question) {
            if (question.job_id == jobs[i].job_id) {
              jobs[i].questions.push(question)
            }
          })

         /*
          * For each job, place the answers onto 
          * the job object.
          */

          jobs[i].answers = []

          answers.forEach(function(answer) {
            if (answer.job_id == jobs[i].job_id) {
              jobs[i].answers.push(answer)
            }
          })

        }

        dispatch(fetchedStudentJobsViewSuccess(jobs))

      })

      .catch((err) => {

       /*
        * If we were unable to get the jobs,
        * we should present some sort of error.
        */
        
        var errorMsg = "Some error occurred while attempting to retrieve all jobs."

        dispatch(fetchedStudentJobsViewFailure(errorMsg))

      })
  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialJobState = {
	employerJobs: [],
	studentJobsView: [],
	jobTypes: [],
	error: '',
  isFetching: false,
  isPinningJob: false,
  pinJobSuccess: false,
  isRemovingJob: false,
  removeJobSuccess: false,
  isUndoingRemove: false,
  undoRemoveSuccess: false,
  removedJobId: null
}


// =======================================================
// ===================== REDUCERS ========================
// =======================================================

export default function job (state = initialJobState, action) {
	switch(action.type) {

   /*
    * Student actions
    */

    case UPDATE_FILTERED_JOBS:
      return {
        ...state,
        studentJobsView: action.jobs
      }

   /*
    * ===============================
    *     remove job 
    * ===============================
    */
    
    case REMOVING_JOB:
      return {
        ...state,
        isRemovingJob: true,
        removeJobSuccess: false
      }

    case REMOVE_JOB_SUCCESS:
      var studentJobsView = state.studentJobsView

      for (var i = 0; i < studentJobsView.length; i++) {
        if (studentJobsView[i].job_id == action.jobId) {
          studentJobsView[i].hidden = 1
          break;
        }
      }

      return {
        ...state,
        studentJobsView: studentJobsView,
        isRemovingJob: false,
        removeJobSuccess: true,
        removedJobId: action.jobId
      }
    
    case REMOVE_JOB_FAILURE:
      return {
        ...state,
        isRemovingJob: false,
        removeJobSuccess: false
      }
    
    case UNDOING_REMOVE:
      return {
        ...state,
        isUndoingRemove: true,
        undoRemoveSuccess: false
      }
    
    case UNDO_REMOVE_SUCCESS:
      var studentJobsView = state.studentJobsView

      for (var i = 0; i < studentJobsView.length; i++) {
        if (studentJobsView[i].job_id == action.jobId) {
          studentJobsView[i].hidden = 0
          break;
        }
      }

      return {
        ...state,
        isUndoingRemove: false,
        undoRemoveSuccess: true
      }
    
    case UNDO_REMOVE_FAILURE:
      return {
        ...state,
        isRemovingJob: false,
        removeJobSuccess: false
      }

   /*
    * =============================
    * pin jobs
    * =============================
    */

    case PINNING_JOB:
      return {
        ...state,
        isPinningJob: true,
        pinJobSuccess: false
      }
    case PIN_JOB_SUCCESS:

      var studentJobsView = state.studentJobsView

      for (var i = 0; i < studentJobsView.length; i++) {
        if (studentJobsView[i].job_id == action.jobId) {
          studentJobsView[i].pinned = 1
          break;
        }
      }

      return {
        ...state,
        isPinningJob: false,
        pinJobSuccess: true,
        studentJobsView: studentJobsView
      }
    case PIN_JOB_FAILURE:
      return {
        ...state,
        isPinningJob: false,
        pinJobSuccess: false
      }
    
    case UNPINNING_JOB:
      return {
        ...state,
        isPinningJob: true,
        pinJobSuccess: false
      }

    case UNPIN_JOB_SUCCESS:
    
      var studentJobsView = state.studentJobsView

      for (var i = 0; i < studentJobsView.length; i++) {
        if (studentJobsView[i].job_id == action.jobId) {
          studentJobsView[i].pinned = 0
          break;
        }
      }

      return {
        ...state,
        isPinningJob: false,
        pinJobSuccess: true,
        studentJobsView: studentJobsView
      }
    case UNPIN_JOB_FAILURE:
      return {
        ...state,
        isPinningJob: false,
        pinJobSuccess: false
      }

   /*
    * =============================
    * update jobs after applying
    * =============================
    */

    case UPDATE_APPLIED_JOB:

      var studentJobsView = state.studentJobsView

      for (var i = 0; i < studentJobsView.length; i++) {
        if (studentJobsView[i].job_id == action.jobId) {
          studentJobsView[i].applied = 1
          studentJobsView[i].pinned = 0
          break;
        }
      }

      return {
        ...state,
        studentJobsView: studentJobsView
      }
    case FETCHING_STUDENT_JOBS_VIEW:
      return {
        ...state,
        isFetching: true
      }
    case FETCHED_STUDENT_JOBS_VIEW_SUCCESS:
      return {
        ...state,
        isFetching: false,
        studentJobsView: action.jobs
      }
    case FETCHED_STUDENT_JOBS_VIEW_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

   /*
    * Employer actions
    */
    case ADD_CONTACT_INFO:

     /*
      * We've acquired the contact info for one student. We need to add 
      * this to the jobs object for this particular applicant.
      */

      var employerJobs = state.employerJobs;

      var preferredEmail = action.applicantUpdateObj.preferred_email

      var targetJobId = action.applicantUpdateObj.job_id
      var targetStudentId = action.applicantUpdateObj.student_id

      for(var i = 0; i < employerJobs.length; i++) {

       /*
        * Find the target job id
        */

        if (employerJobs[i].job_id == targetJobId) {
          console.log("found matching one", employerJobs[i].job_id)

         /*
          * Find the target applicant and add the email to the 
          * property. Also, set the state to CONTACTED.
          */

          employerJobs[i].applicants = employerJobs[i].applicants.map((applicant) => {

            if (applicant.student_id == targetStudentId) {
              applicant.preferred_email = preferredEmail
              applicant.state = 'CONTACTED'
            }

            return applicant

          })
        }
      }

      return {
        ...state,
        employerJobs: employerJobs
      }

		case FETCHING_EMPLOYER_JOBS:
			return {
				...state,
        isFetching: true
			}
		case FETCHED_EMPLOYER_JOBS_SUCCESS:
			return {
				...state,
				employerJobs: action.jobs
			}
		case FETCHED_EMPLOYER_JOBS_FAILURE:
			return {
				...state,
				error: action.error
			}

   /*
    * General Actions
    */

		case FETCHING_JOB_TYPES:
			return {
				...state,
			}
		case FETCHED_JOB_TYPES_SUCCESS:
			return {
				...state,
				jobTypes: action.jobTypes
			}
		case FETCHED_JOB_TYPES_FAILURE:
			return {
				...state,
				error: action.error
			}
		default:
			return state
	}
}

function employerJobs(state = initialEmployerJobState, action) {
	switch(action.type) {
		case FETCHING_JOBS:
			return {
				...state,
			}		
		case FETCHED_JOBS_SUCCESS:
			return {
				...state,
				jobs: action.jobs,
			}
		case FETCHED_JOBS_FAILURE:
			return {
				...state,
				error: action.error,
			}
		default:
			return state
	}
}


