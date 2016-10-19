import axios from 'axios'
import config from 'config'
import { fetchingJobs, fetchedJobSuccess, fetchedJobErrors, 
	getStudentsSuccess, getStudentsError, fetchingJobTypes,
	fetchList, fetchIndustries, fetchingIndustries, dashboard } from 'redux/modules/dashboard/dashboard'

/*NOTE: Reference to dashboard.js and lists.js
 * 	
 * 	Since this functions are used in different containers
 * 	In what way could we refactor these functions to be reusable to each container
 * 	which uses different action creators for the associated reducers?
 *
 *
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
     store.dispatch(fetchedJobErrors(err))
      resolve(false)
   })//catch
 })//promise
 return promise;
}//getJobs*/


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
        store.dispatch(getStudentsFailure('Error occurred while trying to retrieve students'))
        resolve(true)
      })
  })
  
  return promise
}

/*
 * getJobTypes 
 *
 * TODO: Testing the actionCreators being passed to stop mutable lists
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

export function getIndustries(store, actionCreators) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/industries')
    .then((response) => {
	console.log('********GET INDUSTRIES FIRE!!!!!!!!!!!************')
	console.log(response)
	debugger
	store.dispatch(actionCreators.fetchList('INDUSTRIES', response.data))
	resolve(true);
    })
    .catch(() => {
      resolve(false)
    })
  })
  return promise
}
