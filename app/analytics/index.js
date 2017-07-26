
/*
 * app/analytics/index.js
 * 
 * Combine all of the events maps that we want to push to Google Analytics
 * in this file.
 * 
 * https://rangle.github.io/redux-beacon/docs/targets/google-analytics.html
 */

import jobEventsMap from './job'
import userEventsMap from './user'

const pageView = (action) => {
  return {
    hitType: 'pageview',
    page: action.payload.pathname,
    location: window.location.href.substring(0, window.location.href.indexOf("?"))
  }
}

/*
 * Create the root eventsMap object with all of the events 
 * app wide that we want to report on.
 */

const eventsMap = {
  ...jobEventsMap,
  ...userEventsMap,
  '@@router/LOCATION_CHANGE': pageView,
}

export default eventsMap