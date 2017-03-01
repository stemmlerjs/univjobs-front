import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { listRetrieved } from 'redux/modules/profile/profile'
import { listRetrieved as CREATE_JOB_listRetrived } from 'redux/modules/createjob/createjob'


export function getIndustries(store) {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/industries',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getEmailPref() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/emailpref',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getStudentStatus() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/ststatus',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getEducationLevels() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/edu',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getMajors() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/major',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getGenders() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/gender',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

/*
 * getLanguages might have choices, but how will students be able to pick more than one?
 *
 * */
export function getLanguages(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/languages')
    .then((response) => {
      store.dispatch(listRetrieved('LANGUAGES', response.data))
	resolve(true);
    })
    .catch((error) => {
      console.log(error)
      resolve(false);
    })
  })
  return promise;
}
