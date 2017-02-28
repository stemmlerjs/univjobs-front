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

export function getJobTypes(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/jobtypes')
    .then((response) => {
      store.dispatch(CREATE_JOB_listRetrived('JOBTYPES', response.data))
      resolve(true);
    })
    .catch((error) => {
      console.log(error)
      resolve(false);
    })
  })
  return promise;
}

export function getStudentStatus(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/status')
    .then((response) => {
      store.dispatch(listRetrieved('STUDENT_STATUSES', response.data))
	resolve(true);
    })
    .catch((error) => {
      console.log(error)
      resolve(false);
    })
  })
  return promise;
}

export function getEducationLevel(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/edulevels')
    .then((response) => {
      store.dispatch(listRetrieved('EDU_LEVELS', response.data))
	resolve(true);
    })
    .catch((error) => {
      console.log(error)
      resolve(false);
    })
  })
  return promise;
}

export function getMajor(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/majors')
    .then((response) =>{
      store.dispatch(listRetrieved('MAJORS', response.data))
	resolve(true);
    })
    .catch((error) => {
      console.log(error)
      resolve(false);
    })
  })
  return promise;
}

export function getGender(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/gender')
    .then((response) => {
      store.dispatch(listRetrieved('GENDERS', response.data))
	resolve(true);
    })
    .catch((error) => {
      console.log(error)
      resolve(false);
    })
  })
  return promise;
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
