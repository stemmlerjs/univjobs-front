import { getJobs } from 'helpers/studentdashboard'

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
const FETCHED_JOBS = 'DASHBOARD.FETCHED_JOBS'

/*===========================================
 *  		ACTION CREATORS
 *==========================================
*/

//# FIXME: 
export function getJobList( ,jobList) {
	return {
		type: FETCH_JOBS,
		listType: FETCHED_JOBS,
		list: jobList
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
	//NOTE: q1 & q2 will be deleted due to new tables added
	question_1: '',
	question_2: '',
	max_applicants: '',
	active: '',
	verified: '',
	propsErrorMap: {}
}

export default function jobs(state= initialJobListState, action) {
	switch(action.type) {
	    case FETCH_JOBS:
	      return {
		...state,
		jobs: getJobs(action) 
	      }		

	    default:	
	      return state
	}//switch
}
