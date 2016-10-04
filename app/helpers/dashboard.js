/* This file helps retrieved the list of jobs from the student side
 *
 */
import axios from 'axios'
import config from 'config'
//import { getJobList } from 'redux/modules/dashboard/dashboard'

export function getJobs(store) {
 const promise = new Promise(function(resolve, reject)  {
   console.log("****** GET JOBS CHECK *********")
    axios.get(config.baseUrl + 'job/')
     .then((response) => {
       //store.dispatch(getJobList('FETCH_JOBS', response.data))
         console.log(response.data)
	 resolve(true);
     })//respone
   .catch(function(err) {
      console.log(err)
      reject(false)
   })//catch
 })//promise
 return promise;
}//getJobs
