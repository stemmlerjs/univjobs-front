import axios from 'axios'
import config from 'config'

export function getIndustries() {
  return axios.get(config.baseUrl + 'list/industries')
}