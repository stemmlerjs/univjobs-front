import axios from 'axios'
import config from 'config'
import { listRetrieved } from 'redux/modules/profile/profile'
import { listRetrieved as CREATE_JOB_listRetrived } from 'redux/modules/createjob/createjob'


export function getIndustries(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/industries')
    .then((response) => {
      store.dispatch(listRetrieved('INDUSTRIES', response.data))
      resolve(true);
    })
    .catch(()=> {
      resolve(false);
    })
  })
  return promise;
}

export function getJobTypes(store) {
  const promise = new Promise((resolve, reject) => {
    axios.get(config.baseUrl + 'list/jobtypes')
    .then((response) => {
      store.dispatch(CREATE_JOB_listRetrived('JOBTYPES', response.data))
      resolve(true);
    })
    .catch(()=> {
      resolve(false);
    })
  })
  return promise;
}