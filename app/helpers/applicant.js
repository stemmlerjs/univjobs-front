
import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'

export function rejectStudent(jobId, studentId) {
  const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'applicants/reject/' + jobId + "/" + studentId,
		headers: {
			'Authorization':  accessToken
		}
	})
}

export function contactStudent (jobId, studentId) {
	const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'applicants/contact/reveal/' + jobId + "/" + studentId,
		headers: {
			'Authorization': accessToken
		}
	})
}

export function hireStudent (jobId, studentId) {
	const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'applicants/hire/' + jobId + "/" + studentId,
		headers: {
			'Authorization': accessToken
		}
	})	
}

