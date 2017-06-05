
import axios from 'axios'
import config from 'config'
import { getAccessToken } from 'helpers/auth'

export function submitPasswordReset (email) {
  const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'password/reset',
		headers: {
			'Authorization':  accessToken,
		},
    data: {
      email: email
    }
	})
}

export function verifyPasswordResetCode (code) {
  const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'password/confirm/' + code,
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function submitPasswordUpdate (code, password) {
	const accessToken = getAccessToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'password/reset/new',
		headers: {
			'Authorization':  accessToken,
		},
		data: {
			code: code,
			password: password
		}
	})
}