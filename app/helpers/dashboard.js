import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { fetchingJobs, fetchedJobSuccess, fetchedJobFailure, 
	getStudentsSuccess, getStudentsError, fetchingJobTypes,
	fetchList, fetchIndustries, fetchingIndustries, dashboard } from 'redux/modules/dashboard/dashboard'

/*NOTE: Reference to dashboard.js and lists.js
 * 	
 * 	- Since this functions are used in different containers
 * 	  In what way could we refactor these functions to be reusable to each container
 * 	  which uses different action creators for the associated reducers?
 *	- Also, do we need to wrap the axios call into promises?
 *
 *  KS - 2016-11-15:
 *  - These 'are' reusable however they shouldn't be executed directly from containers.
 *    You should be executing these RESTful HTTP calls inside of Redux Thunks. That being said,
 *    you should be directly calling on Redux Thunks from your containers- not RESTful HTTP calls.
 *    This removes you from having to pass in the store and actionCreator you want to dispatch on each call.
 *    Not going to refactor this now, but its definitely a candidate for something to change very soon.
 *
 *  - Axios returns a promise by default. You can simply return the axios invocation. If you're dispatching actions
 *    in how I mentioned from the above comment (from within Redux Thunks), then you don't need to manage the .then
 *    or .catch from within THESE helper functions. You handle those accordingly in the Redux Thunk (and dispatch the
 *    appropriate ACTION such as GET_STUDENTS_FAILURE or GET_STUDENT_SUCCESS). Not to be done here.
 *
 * */


/* KS - 2016-11-15
 *  - You shouldn't see "store" or "actionCreators" being passed into any of these methods. No dispatching actions from here.
 *    Pure HTTP calls only for the future.
 */

/**
  * getJobs 
  *
  * Get all jobs
  *
  * @param store - Object
  * @return Promise
  *
  * NOTE: axios url is job/r/list
  */

export function getJobs (userId) {
    const accessToken = getAccessToken()
  //  const csrfToken = getCSRFToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'job/r/list/',
		headers: {
			'Authorization':  accessToken
		}
	})
}


/**
  * getStudents 
  *
  * Gets all students via /api/student/
  *
  * @return Promise
  */

export function getAllStudents() {
  const accessToken = getAccessToken()
  const csrfToken = getCSRFToken()
  
  return axios({
		method: 'get',
		url: config.baseUrl + 'students/',
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		}
	})
}


/**
  * getIndustries 
  *
  * Gets all industries via /api/list/industries
  *
  * @param store - Object
  * @param actionCreators - Object
  * @return Promise
  */

export function getIndustries(){
    const accessToken = getAccessToken()
    const csrfToken = getCSRFToken()

    return axios({
	    method: 'get',
		url: config.baseUrl + 'list/industries',
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		}
	})
}

/**
  * studentApply
  *
  *  Performs a POST to  /job/new/student/apply to effecively apply to a new job.
  *  @param data - Object
  *         keys: (job, student, answers)
  *  @return Promise
  */

export function applyToJob (answers, jobId) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'jobs/' + jobId + '/apply',
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken,
      'Content-Type': 'application/json'
		},
		data: {
      "answers": answers
    }
	})
}

/**
  * pinAJob
  *
  *  Performs a DELETE to  /job/pin/ to effecively pin the job.
  *  @param data - Object
  *         keys: (id)
  *  @return Promise
  */
export function pinAJob(data) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

		return axios({
			method: 'post',
			url: config.baseUrl + 'job/pin/',
			headers: {
				'Authorization':  accessToken,
				'X-CSRFToken' : csrfToken
			},
			data: data
		})
}

/**
  * unPinAJob
  *
  *  Performs a DELETE to  /job/pin/ to effecively unpin the job.
  *  @param data - Object
  *         keys: (id)
  *  @return Promise
  */
export function unPinAJob(data) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

		return axios({
			method: 'delete',
			url: config.baseUrl + 'job/pin/',
			headers: {
				'Authorization':  accessToken,
				'X-CSRFToken' : csrfToken
			},
			data: data
		})
}

export function inviteStudent (jobId, studentId) {
  const accessToken = getAccessToken()
  
  return axios({
    method: 'post',
    url: config.baseUrl + 'jobs/invite/' + jobId + "/" + studentId,
    headers: {
      'Authorization': accessToken
    }
  })
}

export function getGoogleMapsLink (sourceAddress, destinationAddress) {

  // Example: https://www.google.ca/maps/dir/1430+Trafalgar+Rd,+Oakville,+ON+L6H+2L1/1255+Eglinton+Ave+W,+Mississauga,+ON+L5V
  // Source: 1430 Trafalgar Road Oakville
  // Destination: 1255 Eglinton Ave West, Mississauga 

  let baseMapsAPIUrl = 'https://www.google.ca/maps/dir/'
  let parsedSourceAddress = sourceAddress.replace(/ /g, '+')
  let parsedDestinatinonAddress = destinationAddress.replace(/ /g, '+')

  return baseMapsAPIUrl + parsedSourceAddress + '/' + parsedDestinatinonAddress
  
}