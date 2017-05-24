
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

