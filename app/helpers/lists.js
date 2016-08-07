import axios from 'axios'
import config from 'config'
import { listRetrieved } from 'redux/modules/profile/profile'


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