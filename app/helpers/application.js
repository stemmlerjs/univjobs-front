import axios from 'axios'
import config from 'config'
import { fetchingJobs, fetchedJobsSuccess, fetchedJobsFailure } from 'redux/modules/application/application'


/*
 *getJobs
 *
 * NOTE: This function can be reusable,
 * 	 It fetches all the jobs that the student applied to
 * */
export function getJobs(store) {
 const promise = new Promise((resolve, reject) => {
   store.dispatch(fetchingJobs())
    axios.get(config.baseUrl + 'job/my_applications')
     .then((response) => {
	console.log('*******GETJOBS IN APPLICATIONS*********')
	 store.dispatch(fetchedJobsSuccess(response.data))
         console.log(response.data)
	 resolve(true);
     })//resposne
   .catch((err) => {
     store.dispatch(fetchedJobsFailure(err))
      resolve(false)
   })//catch
 })//promise
 return promise;
}//getJobs*/
