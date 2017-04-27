import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'

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
  * NOTE: axios url is jobs/
  */

export function getJobs(userId) {
    const accessToken = getAccessToken()
  //  const csrfToken = getCSRFToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'jobs/',
		headers: {
			'Authorization':  accessToken
		}
	})
	data: userId
}


