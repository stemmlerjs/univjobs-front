import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { listRetrieved } from 'redux/modules/profile/profile'
import { listRetrieved as CREATE_JOB_listRetrived } from 'redux/modules/createjob/createjob'

 /*
  * getEssentialApplicationLists
  *
  * This API call should return all of the essential lists for the application such as:
  * industries, emailPrefs, student statuses, education levels, majors, genders, job types.
  *
  * These are all lists that should not change dramatically over time.
  */

export function getEssentialApplicationLists () {
	const accessToken = getAccessToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'list/all',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getIndustries() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/industry',
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


export function getLanguages() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/language',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getSports() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/sports',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getClubs() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/club',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function getJobTypes() {
    const accessToken = getAccessToken()
	return axios({
		method: 'get',
		url: config.baseUrl + 'list/jobtype',
		headers: {
			'Authorization':  accessToken,
		}
	})
}
