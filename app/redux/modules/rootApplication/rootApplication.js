
// ================================================================== //
// ======================= APPLICATION REDUCER ======================= //
// ================================================================== //

const HIDE_OVERLAY = 'HIDE_OVERLAY'

export function hideOverlay() {
  return {
    type: HIDE_OVERLAY,

  }
}

const rootApplicationInitialState = {
  isOverlayActive: true,
}

export default function rootApplication (state = rootApplicationInitialState, action) {
  switch(action.type) {
    case HIDE_OVERLAY:
      return {
        ...state,
        isOverlayActive: false
      }
    default :
      return state
  }
}
