
import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { sanitize } from 'helpers/utils'

export function rejectStudent(jobId, studentId) {
  const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'applicants/reject/' + sanitize(jobId) + "/" + sanitize(studentId),
		headers: {
			'Authorization':  accessToken
		}
	})
}

export function contactStudent (jobId, studentId) {
	const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'applicants/contact/reveal/' + sanitize(jobId) + "/" + sanitize(studentId),
		headers: {
			'Authorization': accessToken
		}
	})
}

export function hireStudent (jobId, studentId) {
	const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'applicants/hire/' + sanitize(jobId) + "/" + sanitize(studentId),
		headers: {
			'Authorization': accessToken
		}
	})	
}

