import { getJobs } from 'helpers/dashboard'

/*==================================================
 *
 *  STUDENT & EMPLOYER  DASHBOARD INITIAL STATE
 *===============================================
*/
const intialState = {
  jobs: {},
  error: ''
}


/*===========================================
 *  		ACTIONS 
 *==========================================
*/

//** GETTER actions **//
const FETCH_JOBS = 'DASHBOARD.FETCH_JOBS'

//** Dasbord List SUCCESS actions **//
const FETCHED_JOBS_SUCCESS = 'DASHBOARD.FETCHED_JOBS_SUCCESS'

//** Dasbord List FAILURE actions **//
const FETCHED_JOBS_ERROR = 'DASHBOARD.FETCHED_JOBS_ERROR'
/*===========================================
 *  		ACTION CREATORS
 *==========================================
*/

//# FIXME: 
export function fetchJobs() {
	return {
		type: FETCH_JOBS,
	}
}

export function fetchJobsErrors(error) {
	console.warn(error)
	return {
		type: FETCHED_JOBS_ERROR,
		error: 'Error fetching jobs'
	}
}

export function fetchJobsSuccess(jobs) {
	console.log(jobs)
	return {
		type: FETCHED_JOBS_SUCCESS,
		jobs,
	}
}
/*===========================================
 *  		REDUCERS
=============================================
*/

const initialJobListState = {
	id: '',
	type: '',
	title: '',
	paid: '',
	start_date: '',
	responsibilities: '',
	qualification: '',
	address: '',
	city: '',
	compensation: '',
	max_applicants: '',
	active: '',
	verified: '',
	isFetching: true,
	propsErrorMap: {}
}

export default function jobs(state= initialJobListState, action) {
	switch(action.type) {
	    case FETCH_JOBS:
	      return {
		...state,
		jobs: getJobs(action), 
	      }		

	    default:	
	      return state
	}//switch
}
