import axios from 'axios'
import config from 'config'

/*
 *getJobs
 *
 * NOTE: 
 * 	 It fetches all the jobs that the student applied to
 * 	 including answers and questions associatd to the job
 * */
export function getStudentApplications(store, actionCreators) {
 const promise = new Promise((resolve, reject) => {
   store.dispatch(actionCreators.fetchingStudentApplications())
    axios.get(config.baseUrl + 'job/my_applications')
     .then((response) => {
	 store.dispatch(actionCreators.fetchedStudentApplicationsSuccess(response.data))
         console.log(response.data)
	 resolve(true);
     })//resposne
   .catch((err) => {
     store.dispatch(actionCreators.fetchedStudentApplicationsFailure(err))
      resolve(false)
   })//catch
 })//promise
 return promise;
}//getJobs*/

