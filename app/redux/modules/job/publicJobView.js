
 /*
  * redux/modules/job/publicJobView.js
  *
  * This file contains all of the redux state that pertains to getting the
  * public job view for a job.
  */

   import { getPublicJobViewById } from 'helpers/job'

 /*
  * Actions
  */

  const FETCHING_PUBLIC_JOB_DETAILS = "FETCHING_PUBLIC_JOB_DETAILS"
  const FETCHING_PUBLIC_JOB_DETAILS_SUCCESS = "FETCHING_PUBLIC_JOB_DETAILS_SUCCESS"
  const FETCHING_PUBLIC_JOB_DETAILS_FAILURE = "FETCHING_PUBLIC_JOB_DETAILS_FAILURE"

 /*
  * Initial State
  */

  const initialPublicJobView = {
    job: {},
    isFetching: false,
    fetchJobSuccess: false,
    fetchJobFailure: false,
    error: ''
  }

 /*
  * Action Creators
  */

  function fetchingPublicJobDetails () {
    return {
      type: FETCHING_PUBLIC_JOB_DETAILS
    }
  }

  function fetchingPublicJobDetailsSuccess (job) {
    return {
      type: FETCHING_PUBLIC_JOB_DETAILS_SUCCESS,
      job
    }
  }

  function fetchingPublicJobDetailsFailure () {
    return {
      type: FETCHING_PUBLIC_JOB_DETAILS_FAILURE
    }
  }

  export function fetchPublicJobDetails (jobId, successCallback, failureCallback) {
    return function (dispatch) {

     /*
      * First, alert that we're trying to fetch this job.
      */
      
      dispatch(fetchingPublicJobDetails())


      /*
       * Now, let's attempt to actually make the HTTP call.
       */

      getPublicJobViewById(jobId)

      /*
       * Successfully got the job details.
       */

        .then((response) => {

          var job = response.data.job;

          dispatch(fetchingPublicJobDetailsSuccess(job))

          successCallback()

        })

      /*
       * Failure to get the job details.
       * We're going to have to show some sort of error
       * 
       * Maybe this job doesn't exist anymore (jobs that aren't verified
       * and jobs that aren't active shouldn't be able to be queried).
       */

        .catch(() => {

          dispatch(fetchingPublicJobDetailsFailure())

          failureCallback()

        })

    }
  }

  function publicJobView (state = initialPublicJobView, action) {
    switch(action.type) {
      case FETCHING_PUBLIC_JOB_DETAILS:
        return {
          ...state,
          isFetching: true,
          fetchJobSuccess: false,
          fetchJobFailure: false
        }
      case FETCHING_PUBLIC_JOB_DETAILS_SUCCESS:
        return {
          ...state,
          job: action.job,
          isFetching: false,
          fetchJobSuccess: true,
          fetchJobFailure: false
        }
      case FETCHING_PUBLIC_JOB_DETAILS_FAILURE:
        return {
          ...state,
          isFetching: false,
          fetchJobSuccess: false,
          fetchJobFailure: true
        }
      default:
        return state
    }
  }

  export default {
      actions: {
          FETCHING_PUBLIC_JOB_DETAILS,
          FETCHING_PUBLIC_JOB_DETAILS_SUCCESS,
          FETCHING_PUBLIC_JOB_DETAILS_FAILURE
      },
      actionCreators: {
          fetchPublicJobDetails
      },
      initialState: initialPublicJobView,
      reducers: {
        publicJobView
      }
  }