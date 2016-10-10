/*===========================================
 *  		ACTIONS 
 *==========================================
*/

//** GETTER actions **//
const FETCHING_JOBS = 'DASHBOARD.FETCHING_JOBS'

//** Dasbord List SUCCESS actions **//
const FETCHED_JOBS_SUCCESS = 'DASHBOARD.FETCHED_JOBS_SUCCESS'

//** Dasbord List FAILURE actions **//
const FETCHED_JOBS_ERROR = 'DASHBOARD.FETCHED_JOBS_ERROR'
/*===========================================
 *  		ACTION CREATORS
 *==========================================
*/

export function fetchingJobs() {
	console.log("*******fetchingJob*******")
	return {
		type: FETCHING_JOBS,
	}
}

export function fetchedJobErrors(err) {
	console.log("*******fetchJobError*******")
	console.log(err)
	return {
		type: FETCHED_JOBS_ERROR,
		error: err
	}
}

export function fetchedJobSuccess(jobs) {
	console.log("*******fetchJobSuccess*******")
	return {
		type: FETCHED_JOBS_SUCCESS,
		jobs: jobs
	}
}

/*===========================================
 *  		LISTENERS
=============================================
*/

/*===========================================
 *  		REDUCERS
=============================================
*/

const initialState = {
	isFetching: false,
	error: '',
	jobs: []
}

export default function jobs(state=initialState, action) {
	switch(action.type) {
	    case FETCHING_JOBS:
	      return {
		...state,
		isFetching: true,
	      }		
	    case FETCHED_JOBS_SUCCESS:
	      return {
		      ...state,
		      jobs: action.jobs,
		      isFetching: false,
	      }
	    case FETCHED_JOBS_ERROR:
	      return {
		      ...state,
		      isFetching: false,
		      error: action.error,
	      }
	    default:	
	      return state
	}//switch
}
