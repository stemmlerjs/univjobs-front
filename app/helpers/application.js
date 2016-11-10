import axios from 'axios'
import config from 'config'
import { fetchingJobs, fetchedJobsSuccess, fetchedJobsFailure } from 'redux/modules/application/application'


/*
 *getJobs
 *
 * NOTE: 
 * 	 It fetches all the jobs that the student applied to
 * */
export function getJobs(store, actionCreators) {
 const promise = new Promise((resolve, reject) => {
   store.dispatch(actionCreators.fetchingJobs())
    axios.get(config.baseUrl + 'job/my_applications')
     .then((response) => {
	console.log('*******GETJOBS IN APPLICATIONS*********')
	debugger
	 store.dispatch(actionCreators.fetchedJobsSuccess(response.data))
         console.log(response.data)
	 resolve(true);
     })//resposne
   .catch((err) => {
     store.dispatch(actionCreators.fetchedJobsFailure(err))
      resolve(false)
   })//catch
 })//promise
 return promise;
}//getJobs*/

export function getQuestions(store, actionCreators, questions) {
  console.log('In getQuestions applications')
  console.log(questions)
  const promise = new Promise((resolve, reject) => {
    store.dispatch(actionCreators.fetchingQuestions())
    axios.get(config.baseUrl + 'job/questions')
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
  
export function getAnswers(store, actionCreators) {
  const promise = new Promise((resolve, reject) => {
    store.dispatch(actionCreators.fetchingAnswers())
    axios.get(config.baseUrl + 'job/answers')
    .then((response) => {
	console.log('********GET ANSWERS FIRE!!!!!!!!!!!************')
	console.log(response)
	store.dispatch(actionCreators.fetchedAnswersSuccess(response.data))
	resolve(true);
    })
    .catch((err) => {
      store.dispatch(actionCreators.fetchedAnswersFailure(err))
      resolve(false)
    })
  })
  return promise
}
