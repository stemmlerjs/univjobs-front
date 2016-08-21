import axios from 'axios'
import config from 'config'
import { getAccessToken } from 'helpers/auth'

export function employerProfilePUT(data) {
  let formData = new FormData();
  const accessToken = getAccessToken();

  for(let key in data) {
    formData.append(key, data[key])
  }

  return axios({
    method: 'put',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization": "JWT " + accessToken
    },
    data: formData
  })
}