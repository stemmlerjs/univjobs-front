import axios from 'axios'
import config from 'config'
import { fetchingJobs, fetchedJobSuccess, fetchedJobFailure, 
	getStudentsSuccess, getStudentsError, fetchingJobTypes,
	fetchList, fetchIndustries, fetchingIndustries, dashboard } from 'redux/modules/dashboard/dashboard'

/*NOTE: Reference to dashboard.js and lists.js
 * 	
 * 	- Since this functions are used in different containers
 * 	  In what way could we refactor these functions to be reusable to each container
 * 	  which uses different action creators for the associated reducers?
 *	- Also, do we need to wrap the axios call into promises?
 *
 * */


/*
 *getJobs
 *
 *  TODO: Test out passing actionCreators
 * */
export function getJobs(store) {
 const promise = new Promise((resolve, reject) => {
   store.dispatch(fetchingJobs())
    axios.get(config.baseUrl + 'job/')
     .then((response) => {
	console.log('*******GETJOBS*********')
	 store.dispatch(fetchedJobSuccess(response.data))
         console.log(response.data)
	 resolve(true);
     })//resposne
   .catch((err) => {
     store.dispatch(fetchedJobFailure(err))
      resolve(false)
   })//catch
 })//promise
 return promise;
}//getJobs*/

export function getQuestions(store, actionCreators) {
  const promise = new Promise((resolve, reject) => {
    store.dispatch(actionCreators.fetchingQuestions())
    axios.get(config.baseUrl + 'job/questions')
    .then((response) => {
	console.log('********GET QUESTIONS FIRE!!!!!!!!!!!************')
	console.log(response)
	store.dispatch(actionCreators.fetchedQuestionsSuccess(response.data))
	resolve(true);
    })
    .catch((err) => {
      store.dispatch(actionCreators.fetchedQuestionsFailure(err))
      resolve(false)
    })
  })
  return promise
}
export function getStudents(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'student/')
      .then((response) => {
        // DISPATCH - GET_STUDENT_SUCCESS
        store.dispatch(getStudentsSuccess(response.data))
        resolve(true)
      })
      .catch((err) => {
        console.log(err)
        // DISPATCH - GET_STUDENT_FAILURE
        store.dispatch(getStudentsFailure(err))
        resolve(true)
      })
  })
  
  return promise
}

/*
 * getJobTypes *
 *
 * */
export function getJobTypes(store, actionCreators) {
  const promise =  new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/jobtypes')
    .then((response) => {
	console.log('********GETJOBTYPES FIRE!!!!!!!!!!!************')
	console.log(response)
	store.dispatch(actionCreators.fetchList('JOB_TYPES', response.data))
	resolve(true);
    })
    .catch(() => {
      resolve(false)
    })
  })//Promise
  return promise
}//getJobTypes


/*
 * getIndustries 
 *
 * */
export function getIndustries(store, actionCreators) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/industries')
    .then((response) => {
	console.log('********GET INDUSTRIES FIRE!!!!!!!!!!!************')
	console.log(response)
	store.dispatch(actionCreators.fetchList('INDUSTRIES', response.data))
	resolve(true);
    })
    .catch(() => {
      resolve(false)
    })
  })
  return promise
}

