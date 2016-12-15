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
 *  KS - 2016-11-15:
 *  - These 'are' reusable however they shouldn't be executed directly from containers.
 *    You should be executing these RESTful HTTP calls inside of Redux Thunks. That being said,
 *    you should be directly calling on Redux Thunks from your containers- not RESTful HTTP calls.
 *    This removes you from having to pass in the store and actionCreator you want to dispatch on each call.
 *    Not going to refactor this now, but its definitely a candidate for something to change very soon.
 *
 *  - Axios returns a promise by default. You can simply return the axios invocation. If you're dispatching actions
 *    in how I mentioned from the above comment (from within Redux Thunks), then you don't need to manage the .then
 *    or .catch from within THESE helper functions. You handle those accordingly in the Redux Thunk (and dispatch the
 *    appropriate ACTION such as GET_STUDENTS_FAILURE or GET_STUDENT_SUCCESS). Not to be done here.
 *
 * */


/* KS - 2016-11-15
 *  - You shouldn't see "store" or "actionCreators" being passed into any of these methods. No dispatching actions from here.
 *    Pure HTTP calls only for the future.
 */

/**
  * getJobs 
  *
  * Get all jobs
  *
  * @param store - Object
  * @return Promise
  *
  * NOTE: axios url is job/r/list
  */

export function getJobs(store) {
  const accessToken = getAccessToken()
  const csrfToken = getCSRFToken()

 const promise = new Promise((resolve, reject) => {
   store.dispatch(fetchingJobs())
    axios.get(config.baseUrl + 'job/r/list/', {
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

/**
  * getQuestions 
  *
  * Gets all questions via /api/student/
  *
  * @param store - Object
  * @param actionCreators - Object
  * @return Promise
  */

export function getQuestions(store, actionCreators) {
  const accessToken = getAccessToken()
  const csrfToken = getCSRFToken()

  const promise = new Promise((resolve, reject) => {
    // DISPATCH (FETCHING_QUESTIONS)
    store.dispatch(actionCreators.fetchingQuestions())
    axios.get(config.baseUrl + 'job/questions/', {
      headers: {
        'Authorization': 'JWT ' + accessToken,
        'X-CSRFToken' : csrfToken
      }
    })
    .then((response) => {
      // DISPATCH (FETCHING_QUESTIONS_SUCCESS)
    	store.dispatch(actionCreators.fetchedQuestionsSuccess(response.data))
    	resolve(true);
    })
    .catch((err) => {
      // DISPATCH (FETCHING_QUESTIONS_FAILURE)
      store.dispatch(actionCreators.fetchedQuestionsFailure(err))
      resolve(false)
    })
  })
  return promise
}

/**
  * getStudents 
  *
  * Gets all students via /api/student/
  *
  * @param store - Object
  * @return Promise
  */

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

/**
  * getJobTypes 
  *
  * Gets all job types via /api/list/jobtypes
  *
  * @param store - Object
  * @param actionCreators - Object
  * @return Promise
  */

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


/**
  * getIndustries 
  *
  * Gets all industries via /api/list/industries
  *
  * @param store - Object
  * @param actionCreators - Object
  * @return Promise
  */

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

/**
  * studentApply
  *
  *  Performs a POST to  /job/new/student/apply to effecively apply to a new job.
  *  @param data - Object
  *         keys: (job, student, answers)
  *  @return Promise
  */

export function studentApply(data) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

	return axios({
		method: 'post',
		url: config.baseUrl + 'job/new/student/apply/',
		headers: {
			'Authorization': 'JWT ' + accessToken,
			'X-CSRFToken' : csrfToken
		},
			data: data
	})
}

/**
  * pinAJob
  *
  *  Performs a DELETE to  /job/pin/ to effecively pin the job.
  *  @param data - Object
  *         keys: (id)
  *  @return Promise
  */
export function pinAJob(data) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

		return axios({
			method: 'post',
			url: config.baseUrl + 'job/pin/',
			headers: {
				'Authorization': 'JWT ' + accessToken,
				'X-CSRFToken' : csrfToken
			},
			data: data
		})
}

/**
  * unPinAJob
  *
  *  Performs a DELETE to  /job/pin/ to effecively unpin the job.
  *  @param data - Object
  *         keys: (id)
  *  @return Promise
  */
export function unPinAJob(data) {
	const accessToken = getAccessToken()
	const csrfToken = getCSRFToken()

		return axios({
			method: 'delete',
			url: config.baseUrl + 'job/pin/',
			headers: {
				'Authorization': 'JWT ' + accessToken,
				'X-CSRFToken' : csrfToken
			},
			data: data
		})
}
