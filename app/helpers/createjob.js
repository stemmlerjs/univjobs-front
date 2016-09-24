import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { validateJobTitle } from 'helpers/utils'

export function createNewJobPOST (type, title, paid, start_date, responsibilities, qualification, compensation,
 address, city, question_1, question_2, max_participants, active, verified) {
  const accessToken = getAccessToken();
  const csrfToken = getCSRFToken();

  return axios({
    method: 'post',
    url: config.baseUrl + 'job/new/',
    headers: {
      "Authorization": "JWT " + accessToken,
      'X-CSRFToken': csrfToken
    },
    data: {
      type,                   // INTEGER (0 for now?)
      title,                  // STRING
      paid,                   // O, 1 (INTEGER)
      start_date,             // yyyy-mm-dd
      responsibilities,       // STRING
      qualification,          // STRING
      compensation,           // STRING
      address,                // STRING
      city,                   // STRING
      question_1,              // STRING
      question_2,              // STRING
      max_participants,        // INTEGER > 1
      active,                  // boolean?
      verified                // boolean?
    }
  })
}

export function validateCreateJobFields(currentPage, pageProps, next) {
  let errorsExist = false;

  // =================================================================== //
  // =================== PAGE 1 ERROR VALIDATION ======================= //
  // =================================================================== //

  if(currentPage === 1) {
    let page1Errors = {
      jobTitle: false,
      isPayingJob: false,
      startDate: false,
      responsibilities: false,
      qualifications: false,
      desiredSkills: false,
      internshipLocation: false,
      remoteWork: false,
      compensation: false,
    }
    
    // Validate each field in it's own unique way
    page1Errors.jobTitle = validateJobTitle(pageProps.jobTitle) ? false : true
    // page1Errors.isPayingJob = pageProps.isPayingJob != "" ? false : true
    page1Errors.startDate = pageProps.startDate != "" ? false : true
    page1Errors.responsibilities = pageProps.responsibilities != "" ? false : true
    page1Errors.qualifications = pageProps.qualifications != "" ? false : true 
    page1Errors.desiredSkills = pageProps.desiredSkills != "" ? false : true
    page1Errors.internshipLocation =  pageProps.internshipLocation != "" ? false : true
    page1Errors.compensation = pageProps.compensation != "" ? false : true

    // If an error exists in the map, then errorsExist === true
    for (var attr in page1Errors) {
      if (page1Errors[attr] === true) errorsExist = true;
    }

    next(errorsExist, page1Errors)

  // =================================================================== //
  // =================== PAGE 2 ERROR VALIDATION ======================= //
  // =================================================================== //

  } else if (currentPage === 2) {

    let page2Errors = {
      question1: false,
      question2: false,
    }
    
    // Validate each field in it's own unique way
    page2Errors.question1 = pageProps.question1 != "" ? false : true
    page2Errors.question2 = pageProps.question2 != "" ? false : true

    // If an error exists in the map, then errorsExist === true
    for (var attr in page2Errors) {
      if (page2Errors[attr] === true) errorsExist = true;
    }

    next(errorsExist, page2Errors)

  // =================================================================== //
  // =================== PAGE 3 ERROR VALIDATION ======================= //
  // =================================================================== //

  } else if (currentPage === 3) {

    let page3Errors = {
      maxApplicants: false,
    }
    
    // Validate each field in it's own unique way
    page3Errors.maxApplicants = pageProps.maxApplicants >= 20 ? false : true

    // If an error exists in the map, then errorsExist === true
    for (var attr in page3Errors) {
      if (page3Errors[attr] === true) errorsExist = true;
    }

    next(errorsExist, page3Errors)

  } else if (currentPage === 4) {

  }

}