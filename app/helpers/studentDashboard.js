/* This file helps retrieved the list of jobs from the student side
 *
 */
import axios from 'axios'
import config from 'config'
import { getJobList } from 'redux/modules/dashboard/dashboard'

export function getJobs(store) {
 const promise = new Promise((resolve, reject) => {

   //Check if user is a student && isProfileCompleted
   if(store.user.isAStudent && store.user.isProfileCompeleted) {
	   axios.get(config.baseUrl + 'job')
		   .then((response) => {
			   //store.dispatch(getJobList('FETCH_JOBS', response.data))
			   console.log(response.data)
			   resolve(true);
		   })
   } else if(store.user.isAStudent && !store.user.isProfileCompleted) {
   	//Route back to student profile
	console.log('isAStudent && profile not completed')
	console.log('Route back to student profile')
   } else if(!store.user.isAStudent && store.user.isProfileCompleted) {
    	//Route back to employer profile
	console.log('Is not a student && profile completed')
	console.log('Route back to employer categories')
   } else {
   	//Logout user? 
	console.log('logout user')
   }
  .catch(()=> {
    resolve(false);
  })
 })
 return promise;
}
