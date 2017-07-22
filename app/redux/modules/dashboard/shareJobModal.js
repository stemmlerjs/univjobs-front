
 /*
  * redux/modules/dashboard/shareJobModal.js
  *
  * This file contains all of the redux state that pertains to the share job
  * modal on the dashboard pages.
  */


 /*
  * Actions
  */

  const SELECT_JOB_TO_SHARE = "SELECT_JOB_TO_SHARE"


 /*
  * Initial State
  */

  const initialShareJobModalState = {
    job: {},
    error: ''
  }

 /*
  * Action Creators
  */

  export function openShareJobModal (job) {
    return {
      type: SELECT_JOB_TO_SHARE,
      job
    }
  }

  function shareJobModal (state = initialShareJobModalState, action) {
    switch(action.type) {
      case SELECT_JOB_TO_SHARE:
        return {
          ...state,
          job: action.job
        }
      default:
        return state
    }
  }

  export default {
      actions: {
          SELECT_JOB_TO_SHARE
      },
      actionCreators: {
          openShareJobModal
      },
      initialState: initialShareJobModalState,
      reducers: {
        shareJobModal
      }
  }