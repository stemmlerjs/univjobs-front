
// ================================================================== //
// ======================= APPLICATION REDUCER ======================= //
// ================================================================== //

/*This reducer is used to show an overlay when the browser detects that the device length is < than n size.
 *
 * */

const MOBILE_HIDE_OVERLAY = 'MOBILE_HIDE_OVERLAY'

export function mobileHideOverlay() {
  return {
    type: MOBILE_HIDE_OVERLAY,
  }
}

const mobileLoadInitialState = {
  isMobileOverlayActive: true,
}

export default function mobileLoad (state = mobileLoadInitialState, action) {
  switch(action.type) {
    case MOBILE_HIDE_OVERLAY:
      return {
        ...state,
        isMobileOverlayActive: false
      }
    default :
      return state
  }
}
