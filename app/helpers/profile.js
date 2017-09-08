import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { validatePersonalEmail, validateFirstName, validateLastName,
	validateCompanyName, validateAddress, validateCity,
	postalCodeCheck, validateGPA, validateLanguages,
    validateWebURL, sanitize } from 'helpers/utils'

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
	return axios({
		method: 'get',
		url: config.baseUrl + 'me/',
		headers: {
			'Authorization':  accessToken,
		}
	})
}

export function employerProfilePUT(data) {
  let formData = new FormData();
  const accessToken = getAccessToken();
  const csrfToken = getCSRFToken()

  for(let key in data) {

    var lineItem = data[key];

    /*
     * Sanitize all fields that aren't files.
     */

    if (key !== "logo") {
      lineItem = sanitize(lineItem)
    }

    formData.append(key, lineItem)
  }

  return axios({
    method: 'put',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization":  accessToken,
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
    var lineItem = data[key];

    /*
     * Sanitize all fields that aren't files.
     */

    if (key !== "logo") {
      lineItem = sanitize(lineItem)
    }

    formData.append(key, lineItem)
  }

  return axios({
    method: 'patch',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization":  accessToken,
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
  profileFieldErrors.officePostalCode = postalCodeCheck(profileInfo.officePostalCode, 'ca') ? false : true
  profileFieldErrors.officeCity = validateCity(profileInfo.officeCity) ? false : true
  // profileFieldErrors.logoUrl =  profileInfo.logoUrl != "" ? false : true
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

  for (let key in data) {

    var lineItem = data[key];

    /*
     * Sanitize all fields that aren't files.
     */

    if (key == "has_car") console.log("tis is has car", data[key])

    if (key !== "profilepicture" && key !== "resume") {
      lineItem = sanitize(lineItem)
    }
    
    formData.append(key, lineItem)
  }

  return axios({
    method: 'put',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization":  accessToken
    },
    data: formData
  })
}

export function studentProfilePATCH(data) {
  let formData = new FormData();
  const accessToken = getAccessToken();

  for(let key in data) {
    var lineItem = data[key]

    /*
     * Sanitize all fields that aren't files
     */

    if (key !== "profilepicture" && key !== "resume") {
      lineItem = sanitize(lineItem)
    }

    formData.append(key, lineItem)
  }

  return axios({
    method: 'patch',
    url: config.baseUrl + 'me/',
    headers: {
      "Authorization":  accessToken
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

  profileFieldErrors.gpa = !validateGPA(profileInfo.gpa)
  profileFieldErrors.personalEmail = validatePersonalEmail(profileInfo.personalEmail) ? false : true
  //profileFieldErrors.gender = profileInfo.gender != "" ? false : true
  //profileFieldErrors.sportsTeam = profileInfo.sportsTeam != "" ? false : true
  //profileFieldErrors.schoolClub = profileInfo.schoolClub != "" ? false : true

  /*NOTE: languages is not required, english is default*/
  profileFieldErrors.languages = validateLanguages(profileInfo.languages)
  //profileFieldErrors.hasCar = typeof profileInfo.hasCar == "boolean" ? false : true

  /*
   * If company name and position are not both included, then the user needs to provide
   * a fun fact.
   * 
   */

  if (profileInfo.companyName == "" || profileInfo.position == "") {

    if (profileInfo.funFacts == "") profileFieldErrors.funFacts = true

  }

  /*
   * Alternatively, if fun fact is included, then they need to provide both company name and position
   */

  if (profileInfo.funFacts == "") {

    if (profileInfo.companyName == "") {
      profileFieldErrors.companyName = true
    }

    if (profileInfo.position == "") {
      profileFieldErrors.position = true
    }

  }

  profileFieldErrors.hometown = profileInfo.hometown != "" ? false : true
  profileFieldErrors.hobbies= profileInfo.hobbies != "" ? false : true
  // profileFieldErrors.photo = profileInfo.photo != "" ? false : true
  // profileFieldErrors.resume = profileInfo.resume != "" ? false : true

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
  
 /*
  * Look at every prop in newProfile. For every prop that is exactly
  * the same as in oldProfile, we'll not send that.
  * We send an altered version of newProfile in the API request through
  * deleting things that don't need to be updated.
  */

  for(var prop in newProfile) {

   /*
    * Right away. If the new prop is the same as the old prop, delete it.
    */

    if(newProfile[prop] == oldProfile[prop]) {
      delete newProfile[prop]
    }

    /*
     * If we're looking at a speciial kind of object (languages, clubs or sports),
     * we have to do a little bit more to decide what we need to do with the object that we
     * send.
     */

    if(prop === 'languages' || prop === 'clubs' || prop === 'sports') {
   
       /*
        * We'll need to decrypt the newProfile[prop] from the version it's in.
        */

        let tempObj = JSON.parse(atob(newProfile[prop]))

       /*
        * If there are any NEW tags that need to get created, we'll:
        * //pass through if it's not empty
        */

        if(tempObj.new.length == 0) {

            //1.) compare both i'ds length
            //2.) for every element of tempObj.id compare it to oldProfile.tags ids
            //3.) delete if true

            if(tempObj.ids.length == oldProfile.tags[prop].length && tempObj.ids.every(function(e, i) {
                return e === oldProfile.tags[prop][i].id 
            })) {
              //only delete if comparison is true
              delete newProfile[prop]
            }

           /*
            * Otherwise, something has changed between the two objects.
            * If we've REMOVED a tag or something, we're going to need to figure out
            * which tags we need to delete on the backend. 
            *
            * We'll add this to the object as del: ['3', '4', '2',..]
            */

            else {
              tempObj.del = [];

              oldProfile.tags[prop].forEach((oldTagId) => {
                
                var shouldDelete = true;

                for(var i = 0; i < tempObj.ids.length; i++) {

                  /*
                   * If the old temp id is still in the new ids object,
                   * then we shouldn't delete it.
                   */

                  if (oldTagId.id == tempObj.ids[i]) shouldDelete = false;
                }

                if (shouldDelete) {
                  tempObj.del.push(oldTagId.id)
                }

              });
              
              /*
               * Once we're done going through each of these and we know
               * which tags are no longer present in the current tags object,
               * let's update the encoded tags object to where it belongs.
               */

              var encodedTagsString = btoa(JSON.stringify(tempObj))

              newProfile[prop] = encodedTagsString;

            }
        }
    }

    if (prop === 'logo') {
      if (newProfile['logo'] === oldProfile['logo_url']) {
        delete newProfile['logo']
      }
    }

    if(prop === 'enroll_date' || prop === 'grad_date') {
        if(new Date(newProfile[prop]).toString() === new Date(oldProfile[prop]).toString()) {
            delete newProfile[prop]
        }//
    }//end

      //Check the profilepicture 
      if(prop === 'profilepicture') {
            if(newProfile[prop] === oldProfile['photo_url']) {
                delete newProfile[prop]
            }
      }

      //Check the resume
      if(prop === 'resume') {
            if(newProfile[prop] === oldProfile['resume_url']) {
                delete newProfile[prop]
            }
      }
      
  }//end for loop
  callback(newProfile)
}


/* extractLanguageId
 *
 * returns an array of id's from language object
 * */
export const extractLanguageId = (languages) => {

    return {
        'ids': languages.map((language) => language.id),
        'new': []
    }
}

/**
 * TODO: Add basic clubs at the backend
 *extractClubsObject 
 *
 * returns an object, which contains array id's of clubs and array names of new clubs 
 **/
export const extractClubsObject = (clubs, profileInfo) => {

    //id's: cross referrence clubsList, if the list contains current club get id
    //new: cross referrence clubList, if the list does not contain the club append the name into the array
    return {
        'ids': clubs.filter((club) => club.id).map((club) => club.id),
        'new': clubs.filter((club) => !club.id).map((club) => club.club_name)
    }
}

/**
 * TODO: Add basic sports at the backend
 *extractSportsObject
 *
 * returns an object, which contains array id's of sports and array names of new cls 
 **/
export const extractSportsObject = (sports, profileInfo) => {


    //id's: cross referrence sportsList, if the list contains current sport get id
    //new: cross referrence sportsList, if the list does not contain the sport append the name into the array
    return {
            'ids': sports.filter((sport) => sport.id).map((sport) => sport.id),
            'new': sports.filter((sport) => !sport.id).map((sport) => sport.sport)
    }
}

export const mobileProfileHelper = {

  /*
   * validateStudentProfilePage1
   * 
   * Validate all of the profile fields on Page 1 of the mobile
   * version of the student profile.
   */

  validateStudentProfilePage1: (profileInfo, next) => {

    let submitErrorsExist = false;
    let profileFieldErrors = {
      firstName: false,
      lastName: false,
      gender: false,
      hometown: false,
    }

    /*
     * Validate the fields that need validation
     */

    profileFieldErrors.firstName = validateFirstName(profileInfo.firstName) ? false : true
    profileFieldErrors.lastName = validateLastName(profileInfo.lastName) ? false : true
    profileFieldErrors.hometown = profileInfo.hometown != "" ? false : true

    /*
     * If an error exists in the map, then submitErrorsExist === true
     */
    
    for (var attr in profileFieldErrors) {
      if (profileFieldErrors[attr] === true) submitErrorsExist = true;
    }
  
    /*
     * Return the results.
     */

    next(submitErrorsExist, profileFieldErrors)

  },

  /*
   * validateStudentProfilePage2
   * 
   * Validate all of the profile fields on Page 2 of the mobile
   * version of the student profile.
   */

  validateStudentProfilePage2: (profileInfo, next) => {

    let submitErrorsExist = false;
    let profileFieldErrors = {
      studentStatus: false,
      educationLevel: false,
      major: false
    }

    /*
     * Validate the fields that need validation
     */

    profileFieldErrors.studentStatus = profileInfo.studentStatus != "" ? false : true
    profileFieldErrors.educationLevel= profileInfo.educationLevel != "" ? false : true
    profileFieldErrors.major = profileInfo.major != "" ? false : true

    /*
     * If an error exists in the map, then submitErrorsExist === true
     */
    
    for (var attr in profileFieldErrors) {
      if (profileFieldErrors[attr] === true) submitErrorsExist = true;
    }
  
    /*
     * Return the results.
     */

    next(submitErrorsExist, profileFieldErrors)

  },

  validateStudentProfilePage3: (profileInfo, next) => {

    let submitErrorsExist = false;
    let profileFieldErrors = {
      gpa: false
    }

    /*
     * Validate the fields that need validation
     */

    profileFieldErrors.gpa = !validateGPA(profileInfo.gpa)

    /*
     * If an error exists in the map, then submitErrorsExist === true
     */
    
    for (var attr in profileFieldErrors) {
      if (profileFieldErrors[attr] === true) submitErrorsExist = true;
    }
  
    /*
     * Return the results.
     */

    next(submitErrorsExist, profileFieldErrors)

  },

  validateStudentProfilePage4: (profileInfo, next) => {

    let submitErrorsExist = false;
    let profileFieldErrors = {
      funFacts: false,
      hobbies: false
    }

    /*
     * Validate the fields that need validation
     */

    profileFieldErrors.funFacts = profileInfo.funFacts!= "" ? false : true
    profileFieldErrors.hobbies= profileInfo.hobbies != "" ? false : true

    /*
     * If an error exists in the map, then submitErrorsExist === true
     */
    
    for (var attr in profileFieldErrors) {
      if (profileFieldErrors[attr] === true) submitErrorsExist = true;
    }
  
    /*
     * Return the results.
     */

    next(submitErrorsExist, profileFieldErrors)

  },

  validateStudentProfilePage7: (profileInfo, next) => {

    let submitErrorsExist = false;
    let profileFieldErrors = {
      personalEmail: false
    }

    /*
     * Validate the fields that need validation
     */

    profileFieldErrors.personalEmail = validatePersonalEmail(profileInfo.personalEmail) ? false : true

    /*
     * If an error exists in the map, then submitErrorsExist === true
     */
    
    for (var attr in profileFieldErrors) {
      if (profileFieldErrors[attr] === true) submitErrorsExist = true;
    }
  
    /*
     * Return the results.
     */

    next(submitErrorsExist, profileFieldErrors)

  },

  validateEmployerProfilePage1: (profileInfo, next) => {

    let submitErrorsExist = false;

    let profileFieldErrors = {
      companyName: false,
      officeAddress: false,
      officePostalCode: false,
      officeCity: false
    }

    /*
     * Validate the fields that need validation
     */

    profileFieldErrors.companyName = validateCompanyName(profileInfo.companyName) ? false : true
    profileFieldErrors.officeAddress = validateAddress(profileInfo.officeAddress) && profileInfo.officeAddress != "" ? false : true
    profileFieldErrors.officePostalCode = postalCodeCheck(profileInfo.officePostalCode, 'ca') ? false : true
    profileFieldErrors.officeCity = validateCity(profileInfo.officeCity) ? false : true

    /*
     * If an error exists in the map, then submitErrorsExist === true
     */
    
    for (var attr in profileFieldErrors) {
      if (profileFieldErrors[attr] === true) submitErrorsExist = true;
    }
  
    /*
     * Return the results.
     */

    next(submitErrorsExist, profileFieldErrors)

  },

  validateEmployerProfilePage2: (profileInfo, next) => {

    let submitErrorsExist = false;
    let profileFieldErrors = {
      industry: false,
      employeeCount: false,
      website: false
    }

    /*
     * Validate the fields that need validation
     */

    profileFieldErrors.industry = profileInfo.industry != "" ? false : true
    profileFieldErrors.employeeCount = profileInfo.employeeCount > 0 ? false : true
    profileFieldErrors.website = validateWebURL(profileInfo.website) ? false : true
    
    /*
     * If an error exists in the map, then submitErrorsExist === true
     */
    
    for (var attr in profileFieldErrors) {
      if (profileFieldErrors[attr] === true) submitErrorsExist = true;
    }
  
    /*
     * Return the results.
     */

    next(submitErrorsExist, profileFieldErrors)

  }
}

/*
 * craftSportsString
 * 
 * @param {Object} object from student profile containing
 * all of the sports for a student.
 */

export function craftSportsString (sportsObject) {
  var sportsString = "";

  if (sportsObject !== null && sportsObject !== undefined) {
    var sportsKeys = Object.keys(sportsObject);
  
    for (var i = 0; i < sportsKeys.length; i++) {
      if (i !== sportsKeys.length - 1) {
        sportsString = sportsString + sportsObject[sportsKeys[i]] + ", "
      } else {
        sportsString = sportsString + sportsObject[sportsKeys[i]]
      }
    }
  }


  return sportsString;
}

export function craftClubsString (clubsObject) {
  var clubsString = "";

  if (clubsObject !== null && clubsObject !== undefined) {
    var clubKeys = Object.keys(clubsObject);
  
    for (var i = 0; i < clubKeys.length; i++) {
      if (i !== clubKeys.length - 1) {
        clubsString = clubsString + clubsObject[clubKeys[i]] + ", "
      } else {
        clubsString = clubsString + clubsObject[clubKeys[i]]
      }
    }
  }

  return clubsString;
} 

export function craftLanguagesString (languagesObject) {
  var languagesString = "";

  if (languagesObject !== null && languagesObject !== undefined) {
    var languageKeys = Object.keys(languagesObject);
  
    for (var i = 0; i < languageKeys.length; i++) {
      if (i !== languageKeys.length - 1) {
        languagesString = languagesString + languagesObject[languageKeys[i]] + ", "
      } else {
        languagesString = languagesString + languagesObject[languageKeys[i]]
      }
    }
  }

  return languagesString;
}

