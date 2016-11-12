import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
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
 *  
 * */
export function getJobs(store) {
  const accessToken = getAccessToken()
  const csrfToken = getCSRFToken()

 const promise = new Promise((resolve, reject) => {
   store.dispatch(fetchingJobs())
    axios.get(config.baseUrl + 'job/', {
      headers: {
        'Authorization': 'JWT ' + accessToken,
        'X-CSRFToken' : csrfToken
      }
    })
     .then((response) => {
    	  console.log('*******GETJOBS*********')
    	  store.dispatch(fetchedJobSuccess(response.data))
        console.log(response.data)
    	  resolve(true);
     })
    .catch((err) => {
      store.dispatch(fetchedJobFailure(err))
      resolve(false)
   })
 })
 return promise;
}

export function getQuestions(store, actionCreators) {
  const accessToken = getAccessToken()
  const csrfToken = getCSRFToken()

  const promise = new Promise((resolve, reject) => {
    store.dispatch(actionCreators.fetchingQuestions())
    axios.get(config.baseUrl + 'job/questions/', {
      headers: {
        'Authorization': 'JWT ' + accessToken,
        'X-CSRFToken' : csrfToken
      }
    })
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
  const accessToken = getAccessToken()
  const csrfToken = getCSRFToken()

  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'student/', {
      headers: {
        'Authorization': 'JWT ' + accessToken,
        'X-CSRFToken' : csrfToken
      }
    })
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
  const accessToken = getAccessToken()
  const csrfToken = getCSRFToken()

  const promise =  new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/jobtypes', {
      headers: {
        'Authorization': 'JWT ' + accessToken,
        'X-CSRFToken' : csrfToken
      }
    })
    .then((response) => {
    	console.log('********GETJOBTYPES FIRE!!!!!!!!!!!************')
    	console.log(response)
    	store.dispatch(actionCreators.fetchList('JOB_TYPES', response.data))
    	resolve(true);
    })
    .catch(() => {
      resolve(false)
    })
  })

  return promise
}


/*
 * getIndustries 
 *
 * */
export function getIndustries(store, actionCreators) {
  const accessToken = getAccessToken()
  const csrfToken = getCSRFToken()

  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/industries', {
      headers: {
        'Authorization': 'JWT ' + accessToken,
        'X-CSRFToken' : csrfToken
      }
    })
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

// /*
//  * addAnswers
//  *  A function that sends a POST to the database 
//  *
//  * #NOTE:
//  * 	Can axios use multiple POST?
//  */
// export function addAnswers(store, actionCreators, data) {
// 	const accessToken = getAccessToken()
// 	const csrfToken = getCSRFToken()
// 	console.log('*****DATA*****')

// 	store.dispatch(actionCreators.submitAnswers(data))
// 	return new Promise((resolve, reject) => {
// 		axios({
// 			method: 'post',
// 			url: config.baseUrl + 'job/new/answer/',
// 			headers: {
// 				'Authorization': 'JWT' + accessToken,
// 				'X-CSRFToken' : csrfToken
// 			},
// 			data: data
// 		})
// 		.then((response) => {
// 			//debugger
// 			console.log(response)
// 			store.dispatch(actionCreators.submitAnswersSuccess(response))
// 			resolve(true)
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 			store.dispatch(actionCreators.submitAnswersSuccess(error))
// 			resolve(false)

// 		})
// 	})
// }

export function studentApply(store, actionCreators, data) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return new Promise((resolve, reject) => {
		return axios({
			method: 'post',
			url: config.baseUrl + 'job/new/student/apply/',
			headers: {
				'Authorization': 'JWT ' + accessToken,
				'X-CSRFToken' : csrfToken
			},
			data: data
		})
	})
}
