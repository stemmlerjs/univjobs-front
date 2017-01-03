import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { validatePersonalEmail, validateFirstName, validateLastName,
	validateCompanyName, validateAddress, validateCity,
	validatePostalCode, validateGPA, validateLanguages,
    validateWebURL } from 'helpers/utils'

//********************** EMPLOYER *************************//

/**
  * Get User Info
  *   - Retrieves access token from API through a GET to /account with the
  *       token included in the header of the request.
  *
  * @param (String) - token: the access token
  * @return (Promise) - resolved if API call is successful
  */

export function getUserInfo() {
    const accessToken = getAccessToken()
    const csrfToken = getCSRFToken()

	return axios({
		method: 'get',
		url: config.baseUrl + 'me/',
		headers: {
			'Authorization': 'JWT ' + accessToken,
			'X-CSRFToken' : csrfToken
		}
	})
}

export function employerProfilePUT(data) {
  let formData = new FormData();
  const accessToken = getAccessToken();
  const csrfToken = getCSRFToken()

  for(let key in data) {
    formData.append(key, data[key])
  }

  return axios({
    method: 'put',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization": "JWT " + accessToken,
      'X-CSRFToken': csrfToken
    },
    data: formData
  })
}

export function employerProfilePATCH(data) {
  let formData = new FormData();
  const accessToken = getAccessToken();
  const csrfToken = getCSRFToken()

  for(let key in data) {
    formData.append(key, data[key])
  }

  return axios({
    method: 'patch',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization": "JWT " + accessToken,
      'X-CSRFToken': csrfToken
    },
    data: formData
  })
}

/**
  * validateEmployerProfileFields
  *   - Attempts to validate all form fields before the employer submits their profile.
  *
  * @param (Object) - profile info
  * @param (Function) - callback
  */

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
  profileFieldErrors.industry = profileInfo.industry != "" ? false : true
  profileFieldErrors.employeeCount = profileInfo.employeeCount > 0 ? false : true
  profileFieldErrors.officeAddress = validateAddress(profileInfo.officeAddress) && profileInfo.officeAddress != "" ? false : true
  profileFieldErrors.officePostalCode = validatePostalCode(profileInfo.officePostalCode) ? false : true
  profileFieldErrors.officeCity = validateCity(profileInfo.officeCity) ? false : true
  profileFieldErrors.logoUrl =  profileInfo.logoUrl != "" ? false : true
  profileFieldErrors.website = validateWebURL(profileInfo.website) ? false : true

  // If an error exists in the map, then submitErrorsExist === true
  for (var attr in profileFieldErrors) {
    if (profileFieldErrors[attr] === true) submitErrorsExist = true;
  }

  next(submitErrorsExist, profileFieldErrors)
}



//******************************STUDENT********************************//

export function studentProfilePUT(data) {
  let formData = new FormData();
  const accessToken = getAccessToken();
  const csrfToken = getCSRFToken()

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

export function studentProfilePATCH(data) {
  let formData = new FormData();
  const accessToken = getAccessToken();
  const csrfToken = getCSRFToken()

  for(let key in data) {
    formData.append(key, data[key])
  }

  return axios({
    method: 'patch',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization": "JWT " + accessToken,
      'X-CSRFToken': csrfToken
    },
    data: formData
  })
}
export function validateStudentProfileFields(profileInfo, next) {
  //debugger;
  let submitErrorsExist = false;
  let profileFieldErrors = {
	  emailPreferences: false,
	  firstName: false,
   	lastName: false,
  	studentStatus: false,
	  educationLevel: false,
   	school: false,
   	enrollmentDate: false,
   	graduationDate: false,
	  major: false,
   	gpa: false,
   	personalEmail: false,
	  gender: false,
   	sportsTeam: false,
   	schoolClub: false,
   	languages: false,
   	hasCar: false,
   	companyName: false,
   	position: false,
	  funFacts: false,
   	hometown: false,
   	hobbies: false,
 	  photo: false,
	  resume: false
  }

  profileFieldErrors.emailPreferences = profileInfo.emailPreferences != "" ? false : true
  profileFieldErrors.firstName = validateFirstName(profileInfo.firstName) ? false : true
  profileFieldErrors.lastName = validateLastName(profileInfo.lastName) ? false : true
  profileFieldErrors.studentStatus = profileInfo.studentStatus != "" ? false : true
  profileFieldErrors.educationLevel= profileInfo.educationLevel != "" ? false : true
  profileFieldErrors.school= profileInfo.school != "" ? false : true
  profileFieldErrors.enrollmentDate = profileInfo.enrollmentDate != "" ? false : true
  profileFieldErrors.graduationDate = profileInfo.graduationDate != "" ? false : true
  profileFieldErrors.major = profileInfo.major != "" ? false : true
  debugger;
  profileFieldErrors.gpa = validateGPA(profileInfo.gpa) ? false : true
  profileFieldErrors.personalEmail = validatePersonalEmail(profileInfo.personalEmail) ? false : true
  profileFieldErrors.gender = profileInfo.gender != "" ? false : true
  //profileFieldErrors.sportsTeam = profileInfo.sportsTeam != "" ? false : true
  //profileFieldErrors.schoolClub = profileInfo.schoolClub != "" ? false : true
  profileFieldErrors.languages = validateLanguages(profileInfo.languages) ? false : true
  profileFieldErrors.hasCar = typeof profileInfo.hasCar == "boolean" ? false : true
  //profileFieldErrors.companyName = profileInfo.companyName != "" ? false : true
  //profileFieldErrors.position = profileInfo.position != "" ? false : true
  profileFieldErrors.funFacts = profileInfo.funFacts!= "" ? false : true
  profileFieldErrors.hometown = profileInfo.hometown != "" ? false : true
  profileFieldErrors.hobbies= profileInfo.hobbies != "" ? false : true
  profileFieldErrors.photo = profileInfo.photo!= "" ? false : true
  //profileFieldErrors.resume = profileInfo.resume != "" ? false : true

  // If an error exists in the map, then submitErrorsExist === true
  for (var attr in profileFieldErrors) {
    if (profileFieldErrors[attr] === true) submitErrorsExist = true;
  }

  next(submitErrorsExist, profileFieldErrors)
}



//********************* COMPARISON ********************//
/*
 * Will compare the old profile to the new profile to determine
 * wether PUT or PATCH is used.
 *
 * ***************************************************/

export function compareToSnapshot(oldProfile, newProfile, callback) {
  for(var prop in newProfile) {
    if(newProfile[prop] == oldProfile[prop]) {
      delete newProfile[prop]
    }
  }
  callback(newProfile)
}
