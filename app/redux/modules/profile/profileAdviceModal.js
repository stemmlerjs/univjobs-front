
 /*
  * redux/modules/profile/profileAdviceModal.js
  *
  * This file contains all of the redux state that pertains to the job application
  * modal that pops up when a student clicks a job in the student dashboard.
  */


 /*
  * Actions
  */

  const ADVICE_MODAL_OPEN = "ADVICE_MODAL_OPEN"
  const ADVICE_MODAL_CLOSE = 'ADVICE_MODAL_CLOSE'

 /*
  * Action Creators
  */

  export function openAdviceModal () {
    return {
      type: ADVICE_MODAL_OPEN
    }
  }

  export function closeAdviceModal () {
    return {
      type: ADVICE_MODAL_CLOSE
    }
  }

 /*
  * Initial State
  */

  var initialProfileAdviceModal = {
    isOpen: false,
    isPicturePresent: true,
    isResumePresent: true,
    isAStudent: false
  }

  export function profileAdviceModal(state = initialProfileAdviceModal, action) {
    switch(action.type) {
      case ADVICE_MODAL_OPEN:
        return {
          ...state,
          isOpen: true
        }
      case ADVICE_MODAL_CLOSE:
        return {
          ...state,
          isOpen: false
        }
      default:
        return;
    }
  }

 /*
  * Reducer
  */

  export default {
    actions: {
        ADVICE_MODAL_OPEN,
        ADVICE_MODAL_CLOSE
    },
    actionCreators: {
        openAdviceModal,
        closeAdviceModal
    },
    initialState: initialProfileAdviceModal,
    reducers: {
      profileAdviceModal
    }
  }