/* This file helps retrieved the list of jobs from the student side
 *
 */
import axios from 'axios'
import config from 'config'
//import { getJobList } from 'redux/modules/dashboard/studentDashboard'

export function getJobs(store) {
 const promise = new Promise((resolve, reject) => {
  axios.get(config.baseUrl + 'job_list')
  .then((response) => {
    store.dispatch(getJobList('GENERAL_JOBS', response.data))
	resolve(true);
  })
  .catch(()=> {
    resolve(false);
  })
 })
 return promise;
}
