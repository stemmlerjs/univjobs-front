import axios from 'axios'
import config from 'config'
import { listRetrieved } from 'redux/modules/profile/profile'


export function getIndustries(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/industries')
    .then((response) => {
      store.dispatch(listRetrieved('INDUSTRIES', response.data))
      resolve(true);
    })
    .catch(()=> {
      resolve(false);
    })
  })
  return promise;
}

export function getEmailPref(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/emailpref')
    .then((response) => {
      store.dispatch(listRetrieved('EMAIL_PREFERENCES', response.data))
	resolve(true);
    })
    .catch(()=> {
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
    .catch(()=> {
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
    .catch(()=> {
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
    .catch(()=> {
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
    .catch(()=> {
      resolve(false);
    })
  })
  return promise;
}

/*
 * getSportsTeams might not be needed as a list of choices. For now, 
export function getStudentStatus(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/status')
    .then((response) => {
      store.dispatch(listRetrieved('STUDENT_STATUSES', response.data))
	resolve(true);
    })
    .catch(()=> {
      resolve(false);
    })
  })
  return promise;
}
*
*/

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
    .catch(()=> {
      resolve(false);
    })
  })
  return promise;
}
