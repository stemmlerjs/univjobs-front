
/*
 * app/analytics/job.js
 * 
 * Return all of the important Google analytics events pertinent to the 'job' event category.
 */

var openJobAppModalEvent = (action) => {
  return {
    eventCategory: 'job',
    eventAction: 'viewJobInModal',
    eventLabel: 'User Actions',
    eventValue: action.job.job_id
  }
}

var jobEventsMap = {
  'JOB_APP_MODAL_OPEN': openJobAppModalEvent
}

export default jobEventsMap
