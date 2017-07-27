
/*
 * app/analytics/user.js
 * 
 * Return all of the important Google analytics events pertinent to the 'user' event category.
 */

var userEvent = (action) => {
  return {
    eventCategory: 'user',
    eventAction: 'userAction',
    eventLabel: 'User Actions',
    eventValue: action.job.job_id
  }
}

var userEventsMap = {
  'SOME_EVENT': userEvent
}

export default userEventsMap
