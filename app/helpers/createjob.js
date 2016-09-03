import { validateJobTitle } from 'helpers/utils'

export function validateCreateJobFields(currentPage, pageProps, next) {
  let errorsExist = false;
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
}