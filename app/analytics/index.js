
// Define an event

const pageView = (action) => {
  return {
    hitType: 'pageview',
    page: action.payload.pathname,
    location: window.location.href.substring(0, window.location.href.indexOf("?"))
  }
}

// Map the event to a Redux action
const eventsMap = {
    '@@router/LOCATION_CHANGE': pageView,
}

export default eventsMap