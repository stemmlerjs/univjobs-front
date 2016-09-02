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
  page1Errors.jobTitle = validateJobTitle(pageProps.companyName) ? false : true
  page1Errors.industry = pageProps.industry != "" ? false : true
  page1Errors.employeeCount = pageProps.employeeCount > 0 ? false : true
  page1Errors.officeAddress = validateAddress(pageProps.officeAddress) && pageProps.officeAddress != "" ? false : true
  page1Errors.officePostalCode = validatePostalCode(pageProps.officePostalCode) ? false : true 
  page1Errors.officeCity = validateCity(pageProps.officeCity) ? false : true
  page1Errors.logoUrl =  pageProps.logoUrl != "" ? false : true

  // If an error exists in the map, then errorsExist === true
  for (var attr in page1Errors) {
    if (page1Errors[attr] === true) errorsExist = true;
  }

  next(errorsExist, page1Errors)
}