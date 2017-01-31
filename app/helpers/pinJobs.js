import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'

/*NOTE: Reference to dashboard.js and lists.js
 * TODO: Unify functions of dashboard.js	
 *

/**
  * getPinnedJobs 
  *
  * Get all jobs
  *
  * @param store - Object
  * @return Promise
  *
  * NOTE: axios url is job/r/pin/
  */

export function getPinnedJobs() {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'job/r/pins/',
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		}
	})
}

/**
  * getQuestions 
  *
  * Gets all questions 
  * 
  * TODO: Get questions with jobs displayed? 
  *                  OR
  *       Get pins with question in them?
  *
  * @return Promise
  */

export function getQuestions() {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'job/questions/',
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		},
	})
}

/**
  * getJobTypes 
  *
  * @return Promise
  */

export function getJobTypes() {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'list/jobtypes/',
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		},
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

export function getIndustries() {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'list/industries/',
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		},
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

export function studentApply(data) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'job/new/student/apply/',
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
