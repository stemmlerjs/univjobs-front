
 /*
  * redux/modules/dashboard/employerProfileModal.js
  *
  * This file contains all of the redux state that pertains to the employer 
  * profile modal that students use to look at the employer profile information.
  */

 /*
  * Actions
  */

  const EMPLOYER_PROFILE_MODAL_OPEN = 'EMPLOYER_PROFILE_MODAL_OPEN'
  const EMPLOYER_PROFILE_MODAL_CLOSED = 'EMPLOYER_PROFILE_MODAL_CLOSED'
  const TOGGLE_ABOUT_SECTION_OPEN = 'TOGGLE_ABOUT_SECTION_OPEN'

 /*
  * Action Creators
  */

  function toggleAboutSection () {
    return {
      type: TOGGLE_ABOUT_SECTION_OPEN
    }
  }

  function employerProfileModalOpened (employerInfo) {
    return {
      type: EMPLOYER_PROFILE_MODAL_OPEN,
      employerInfo
    }
  }

  function employerProfileModalClosed () {
    return {
      type: EMPLOYER_PROFILE_MODAL_CLOSED
    }
  }

 /*
  * Initial State
  */

  var initialEmployerProfileModalState = {
    isOpen: false,
    isAboutSectionOpen: false,
    employerInfo: {}
  }

  export function employerProfileModal (state = initialEmployerProfileModalState, action) {
    switch(action.type) {
      case TOGGLE_ABOUT_SECTION_OPEN:
        return {
          ...state,
          isAboutSectionOpen: !state.isAboutSectionOpen
        }
      case EMPLOYER_PROFILE_MODAL_OPEN:
        return {
          ...state,
          isAboutSectionOpen: false,
          isOpen: true,
          employerInfo: action.employerInfo
        }
      case EMPLOYER_PROFILE_MODAL_CLOSED:
        return {
          ...state,
          employerInfo: {},
          isOpen: false,
          isAboutSectionOpen: false
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
        TOGGLE_ABOUT_SECTION_OPEN,
        EMPLOYER_PROFILE_MODAL_OPEN,
        EMPLOYER_PROFILE_MODAL_CLOSED
    },
    actionCreators: {
        toggleAboutSection,
        employerProfileModalOpened,
        employerProfileModalClosed
    },
    initialState: initialEmployerProfileModalState,
    reducers: {
      employerProfileModal
    }
  }