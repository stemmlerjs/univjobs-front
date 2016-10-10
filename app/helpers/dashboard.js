/* This file helps retrieved the list of jobs from the student side
 *
 */
import axios from 'axios'
import config from 'config'
import * as job from 'redux/modules/dashboard/dashboard'

export function getJobs(store) {
 const promise = new Promise(function(resolve, reject)  {
   store.dispatch(job.fetchingJobs())
    axios.get(config.baseUrl + 'job/')
     .then((response) => {
	 store.dispatch(job.fetchedJobSuccess(response.data))
         console.log(response.data)
	 resolve(true);
     })//respone
   .catch((err) => {
     store.dispatch(job.fetchedJobsError())
      console.log(err)
      resolve(false)
   })//catch
 })//promise
 return promise;
}//getJobs*/
