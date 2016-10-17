import axios from 'axios'
import config from 'config'
import { listRetrieved } from 'redux/modules/profile/profile'
import { listRetrieved as CREATE_JOB_listRetrived } from 'redux/modules/createjob/createjob'
import { fetchingJobTypes, fetchList } from 'redux/modules/dashboard/dashboard'


export function getIndustries(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/industries')
    .then((response) => {
      store.dispatch(listRetrieved('INDUSTRIES', response.data))
      resolve(true);
    })
    .catch((error) => {
      console.log(error)
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
    .catch((error) => {
      console.log(error)
      resolve(false);
    })
  })
    return promise
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

/*
 * getJobTypes 
 *
 * */
export function getJobTypes(store) {
  return new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/jobtypes')
    .then((response) => {
	console.log('********GETJOBTYPES FIRE!!!!!!!!!!!************')
	console.log(response)
	store.dispatch(fetchingJobTypes())
	debugger
	store.dispatch(fetchList('JOB_TYPES', response.data))
	resolve(true);
    })
    .catch((error) => {
      console.log(error)
      resolve(false);
    })
  })//Promise
}//getJobTypes
