import { getJobs } from 'helpers/dashboard'

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

//# FIXME: 
function fetchingJobs() {
	console.log("*******fetchingJob*******")
	return {
		type: FETCHING_JOBS,
	}
}

function fetchJobsErrors(error) {
	console.log("*******fetchJobError*******")
	console.warn(error)
	return {
		type: FETCHED_JOBS_ERROR,
		error: 'Error fetching jobs'
	}
}

function fetchJobsSuccess(jobs) {
	console.log("*******fetchJobSuccess*******")
	console.log(jobs)
	return {
		type: FETCHED_JOBS_SUCCESS,
		jobs: jobs
	}
}

export function fetchJobs() {
	console.log("*******Initiate Job Fetching**********") 
	return (dispatch) =>  {
		//ACTION: DISPATCH (FETCHING_JOBS)
		fetchingJobs()
	    const promise = new Promise((resolve, reject) => {

	    })
	
	
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

const initialJobListState = {
	id: '',
	user: {
	  website: '',
	  first_name: '',
	  logo: '',
	  office_city: '',
	  last_name: '',
	  employee_count: '',
	  office_postal_code: '',
	  company_name: '',
	  industry: '',
	  office_address: '',
	  mobile: '',
	  description: '',
	},
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
	isFetching: false,
	propsErrorMap: {}
}

	//FIXME: Might want to have the job id as the root in the api structure of the api
	//
	function job(state=initialJobListState, action) {
	  switch(action.type) {
	    case FETCHING_JOB_SUCCESS:
	      return {
	  	...state,
		job: action.job
		/*
		...state,
		//FIXME: Is there a way to pass everything without typeing too much? [action.id]: user: action.user?
		id: action.id,
		user: {
			website: action.user.website,
			logo: action.user.logo,
			office_city: action.user.office_city,
			employee_count: action.user.employee_count,
			office_postal_code: action.user.office_postal_code,
			company_name: action.user.company_name,
			industry: action.user.industry,
			office_address: action.user.office_address,
			mobile: action.user.mobile,
			description: action.user.description
		},
		type: action.type,
		title: action.title,
		paid: action.paid,
		start_date: action.start_date,
		responsibilities: action.responsibilities,
		qualification: action.qualification,
		address: action.address,
		city: action.city,
		compensation: action.compensation,
		max_applicants: action.max_applicants,
		active: action.active,
		//TODO: Leave out jobs in the future that are unverified, might be done at the backend.
		verified: action.verified,
		*/
	      }//return
	  }//action
	}//job

	const initialState = {
		isFetching: true,
		error: '',
		jobs: {}
	}

export default function jobs(state= initialJobListState, action) {
	switch(action.type) {
	    case FETCHING_JOBS:
	      return {
		...state,
		isFetching: true,
	      }		
	    case FETCHED_JOBS_SUCCESS:
	      return action.id === null ? {
		      ...state,
		      isFetching: false,
		      error: 'No jobs found',
	      } : {
	      }
	    case FETCHED_JOBS_ERROR:
	      return {
	      	...state,
		isFetching: true,
		[action.uid]: job(state[action.uid], action),
	      }
	    default:	
	      return state
	}//switch
}
