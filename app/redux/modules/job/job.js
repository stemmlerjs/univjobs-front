import { getJobs } from 'helpers/job'

// =======================================================
// ====================== ACTIONS ========================
// =======================================================

/*NOTE: 
 *   Might have to rename the strings passed into variables,
 *   into a generic names, employer and student are going to be
 *   using the jobs, questions, and answers.
 * */
const FETCHING_JOBS = 'FETCHING_JOBS'
const FETCHED_JOBS_SUCCESS = 'FETCHED_JOBS_SUCCESS'
const FETCHED_JOBS_FAILURE = 'FETCHED_JOBS_FAILURE'

const FETCHING_JOB_TYPES = 'FETCHING_JOB_TYPES'
const FETCHED_JOB_TYPES_SUCCESS = 'FETCHED_JOB_TYPES_SUCCESS'
const FETCHED_JOB_TYPES_FAILURE = 'FETCHED_JOB_TYPES_FAILURE'



// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

/*TODO: Convert word error into failure
 *
 * */

/**************GET JOBS***********************/
export function fetchingJobs() {
  return {
	  type: FETCHING_JOBS,
  }
}

export function fetchedJobsSuccess(jobs) {
   return {
	   type: FETCHED_JOBS_SUCCESS,
	   jobs
  }
}

export function fetchedJobsFailure(error) {
  return {
	  type: FETCHED_JOBS_FAILURE,
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
    }//dispatch
}//handleGetJobs


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
	employerJobs: {},
    jobTypes: [],
	error: '',
}

const initialEmployerJobState = {
	jobs: [],
	searchField: '',
	campusFilter: '',
	gradDateFilter: '',
	error: '',
}



// =======================================================
// ===================== REDUCERS ========================
// =======================================================

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


export default function job(state = initialJobState, action) {
	switch(action.type) {
		case FETCHING_JOBS:
			return {
				...state,
				employerJobs: employerJobs(state.employerJobs, action)
			}
		case FETCHED_JOBS_SUCCESS:
			return {
				...state,
				employerJobs: employerJobs(state.employerJobs, action)
			}
		case FETCHED_JOBS_FAILURE:
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
	}//switch
}//job
