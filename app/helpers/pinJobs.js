import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { sanitize } from 'helpers/utils'

 /*
  * getPinnedJobs 
  *
  * Get all jobs
  */

export function getPinnedJobs() {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'jobs/pins/',
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		}
	})
}

export function pinAJob (jobId) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'PUT',
		url: config.baseUrl + 'jobs/pins/' + sanitize(jobId),
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		}
	})
}

export function unPinAJob (jobId) {
  const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'DELETE',
		url: config.baseUrl + 'jobs/pins/' + sanitize(jobId),
		headers: {
			'Authorization':  accessToken,
			'X-CSRFToken' : csrfToken
		}
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
