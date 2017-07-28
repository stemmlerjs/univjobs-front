import axios from 'axios'
import config from 'config'
import { getAccessToken, getCSRFToken } from 'helpers/auth'
import { validateJobTitle, validateResponsibilities,
        validateQualifications, validateDesiredSkills, validateJobLocation, validateCompensation } from 'helpers/utils'
import { sanitize } from 'helpers/utils'

export function createNewJobPOST (
  job_type,
  title,
  paid,
  start_date,
  responsibilities,
  qualifications,
  compensation,
  address,
  question_one_text,
  question_two_text,
  max_applicants,
  active,
  verified,
  remoteWork,
  desiredSkills,
  numPositions) {

  const accessToken = getAccessToken();
  const csrfToken = getCSRFToken();
  debugger;

  //debugger
  job_type = sanitize(job_type)
  title = sanitize(title)
  paid = sanitize(JSON.stringify(paid))
  responsibilities = sanitize(responsibilities)
  qualifications = sanitize(qualifications)
  compensation = sanitize(compensation)
  address = sanitize(address)
  question_one_text = sanitize(question_one_text)
  question_two_text = sanitize(question_two_text)
  max_applicants = sanitize(JSON.stringify(max_applicants))
  active = sanitize(JSON.stringify(active))
  desiredSkills = sanitize(desiredSkills)
  remoteWork = sanitize(JSON.stringify(remoteWork))

  return axios({
    method: 'post',
    url: config.baseUrl + 'jobs/new',
    headers: {
      "Authorization":  accessToken,
      'X-CSRFToken': csrfToken
    },
    data: {
      job_type,                   // INTEGER (0 for now?)
      title,                  // STRING
      paid,                   // O, 1 (INTEGER)
      start_date,             // yyyy-mm-dd
      responsibilities,       // STRING
      qualifications,          // STRING
      compensation,           // STRING
      address,                // STRING
      //city,                   // STRING
      question_one_text,              // STRING
      question_two_text,              // STRING

     /*
      * For now, each question will be of type 1 (this is the standard
      * type of question).
      */

      question_one_type: 1,
      question_two_type: 1,
      max_applicants,        // INTEGER > 1
      // active,                  // boolean?
      // verified                // boolean?
      remote_work: remoteWork,
      desired_skills: desiredSkills,
      num_positions: numPositions
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
    page1Errors.responsibilities = validateResponsibilities(pageProps.responsibilities) ? false : true
    page1Errors.qualifications = validateQualifications(pageProps.qualifications) ? false : true
    page1Errors.desiredSkills = validateDesiredSkills(pageProps.desiredSkills) ? false : true

   /*
    * If remote work is selected === true, then this means that we don't need to validate
    * the internshipLocation.
    */

    if (pageProps.remoteWork) {
      page1Errors.internshipLocation = false;
    }
    else {
      page1Errors.internshipLocation = validateJobLocation(pageProps.internshipLocation) ? false : true
    }

    page1Errors.compensation = validateCompensation(pageProps.compensation) ? false : true

    // If an error exists in the map, then errorsExist === true
    for (var attr in page1Errors) {
      if (page1Errors[attr] === true) errorsExist = true;
    }

    next(errorsExist, page1Errors)

  }

  // =================================================================== //
  // =================== PAGE 2 ERROR VALIDATION ======================= //
  // =================================================================== //

 /*
  * Note that these questions are optional. We don't have to ask a question.
  * We can also ask only 1 question instead of 2.
  *
  */

  else if (currentPage === 2) {

    let page2Errors = {
      question1: false,
      question2: false,
    }

   /*
    * TODO: commenting this out because either field is allowed to be blank.
    * Questions are optional. They don't HAVE to answer them.
    *
    * We should validate these fields by checking for any weird user input.
    *
    // Validate each field in it's own unique way
    page2Errors.question1 = pageProps.question1 != "" ? false : true
    page2Errors.question2 = pageProps.question2 != "" ? false : true
    */

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
    page3Errors.numPositions = pageProps.numPositions >= 1 ? false : true

    // If an error exists in the map, then errorsExist === true
    for (var attr in page3Errors) {
      if (page3Errors[attr] === true) errorsExist = true;
    }

    next(errorsExist, page3Errors)

  } else if (currentPage === 4) {

  }

}
