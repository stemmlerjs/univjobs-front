import axios from 'axios'
import config from 'config'
import { getAccessToken } from 'helpers/auth'
import { validateCompanyName, validateAddress, validateCity, validatePostalCode} from 'helpers/utils'

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

export function employerProfilePATCH(data) {
  let formData = new FormData();
  const accessToken = getAccessToken();

  for(let key in data) {
    formData.append(key, data[key])
  }

  return axios({
    method: 'patch',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization": "JWT " + accessToken
    },
    data: formData
  })
}

export function validateEmployerProfileFields(profileInfo, next) {
  let submitErrorsExist = false;
  let profileFieldErrors = {
    companyName: false,
    industry: false,
    logoUrl: false,
    website: false,
    description: false,
    employeeCount: false,
    officeAddress: false,
    officeCity: false,
    officePostalCode: false
  }
  
  // Validate each field in it's own unique way
  profileFieldErrors.companyName = validateCompanyName(profileInfo.companyName) ? false : true
  //profileFieldErrors.industry = typeof profileInfo.industry == "object" || typeof profileInfo.industry == "number" ? false : true
  profileFieldErrors.industry = profileInfo.industry != "" ? false : true
  profileFieldErrors.employeeCount = profileInfo.employeeCount > 0 ? false : true
  profileFieldErrors.officeAddress = validateAddress(profileInfo.officeAddress) && profileInfo.officeAddress != "" ? false : true
  profileFieldErrors.officePostalCode = validatePostalCode(profileInfo.officePostalCode) ? false : true 
  profileFieldErrors.officeCity = validateCity(profileInfo.officeCity) ? false : true
  profileFieldErrors.logoUrl =  profileInfo.logoUrl != "" ? false : true

  // If an error exists in the map, then submitErrorsExist === true
  for (var attr in profileFieldErrors) {
    if (profileFieldErrors[attr] === true) submitErrorsExist = true;
  }

  next(submitErrorsExist, profileFieldErrors)
}

export function compareToSnapshot(oldProfile, newProfile, callback) {
  for(var prop in newProfile) {
    if(newProfile[prop] == oldProfile[prop]) {
      delete newProfile[prop]
    }
  }
  callback(newProfile)
}