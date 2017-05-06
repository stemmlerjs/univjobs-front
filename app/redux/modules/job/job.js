
import { getJobs } from 'helpers/job'

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

// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

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

        for(var i = 0; i < jobs.length; i++) {

         /*
          * For each job, place the answers and questions onto 
          * the job object.
          */

          jobs[i].questions = []
          jobs[i].answers = []
          jobs[i].applicants = []

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

       /*
        * If successful, we will add all of the jobs to the
        * studentJobsView. This is where students will pull 
        * in jobs from the store.
        *
        * The API call returns jobs and questions.
        */

        var jobs = result.data.jobs;
        var questions = result.data.questions;

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

export function handleGetJobs(userId) {
    return function(dispatch) {
	    dispatch(fetchingJobs())
	    return getJobs(userId)
	        .then((resp) => 
		        dispatch(fetchedJobsSuccess(resp.data.jobs))
	        )
	        .catch((err) => 
		        dispatch(fetchedJobsFailure(err))
	        )
    }
}


export function handleGetJobTypes() {
    return function(dispatch) {
	    dispatch(fetchingJobTypes)
	    return getJobTypes()
	        .then((resp) => 
		        dispatch(fetchedJobTypesSuccess(resp))
	        )
	        .catch((err) => 
		        dispatch(fetchedJobTypesFailure(err))
	        )
    }//dispatch
}//handleGetJobTypes

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialJobState = {
	employerJobs: [],
	studentJobsView: [],
	jobTypes: [],
	error: '',
  isFetching: false
}


// =======================================================
// ===================== REDUCERS ========================
// =======================================================

export default function job(state = initialJobState, action) {
	switch(action.type) {
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


