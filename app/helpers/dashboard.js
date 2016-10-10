
import axios from 'axios'
import config from 'config'
import { getStudentsSuccess, getStudentsFailure } from 'redux/modules/dashboard/dashboard'

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
        reject(false)
      })
  })
  
  return promise
}