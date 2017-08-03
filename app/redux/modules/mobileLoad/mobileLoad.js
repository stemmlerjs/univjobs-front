
// ================================================================== //
// ======================= APPLICATION REDUCER ======================= //
// ================================================================== //

/*This reducer is used to show an overlay when the browser detects that the device length is < than n size.
 *
 * */

import { createCookie, readCookie, eraseCookie } from 'helpers/utils'


const MOBILE_HIDE_OVERLAY = 'MOBILE_HIDE_OVERLAY'
const MOBILE_HIDE_NOTIFICATION_HEADER = 'MOBILE_HIDE_NOTIFICATION_HEADER'

export function mobileHideOverlay() {
  return {
    type: MOBILE_HIDE_OVERLAY,
  }
}

export function hideMobileNotificationHeader () {
  return {
    type: MOBILE_HIDE_NOTIFICATION_HEADER
  }
}


  /*
   * If we've never created the notificationheader,
   * lets create it and set that we should show it.
   */
  eraseCookie('notificationheader_show')
  createCookie('notificationheader_show', true)
  if (!readCookie('notificationheader')) {
    console.log('[Univjobs]: Initializing mobile notification header cookie')
    createCookie('notificationheader', true)
    createCookie('notificationheader_show', true)
  }

  /*
   * Otherwise, we've set the notification header,
   * lets check the value to see if we should render
   * the notification header or not.
   */

  else {
    console.log('[Univjobs]: Mobile notification header already exists. Decide to show or not.')
    var shouldShowNotificationHeader = readCookie('notificationheader_show') == "true" ? true : false

    if (shouldShowNotificationHeader) {
      console.log('[Univjobs]: We should show the notification header still.')
    }

    else {
      console.log('[Univjobs]: We should no longer show the notification header.')
    }
  }

const mobileLoadInitialState = {
  isMobileOverlayActive: true,
  showMobileNotificationHeader: shouldShowNotificationHeader
}

export default function mobileLoad (state = mobileLoadInitialState, action) {
  switch(action.type) {
    case MOBILE_HIDE_NOTIFICATION_HEADER:

      console.log('[Univjobs]: Changed notification header cookie. Will no longer show.')
      eraseCookie('notificationheader_show')
      createCookie('notificationheader_show', false)

      return {
        ...state,
        showMobileNotificationHeader: false
      }
    case MOBILE_HIDE_OVERLAY:
      return {
        ...state,
        isMobileOverlayActive: false
      }
    default :
      return state
  }
}
