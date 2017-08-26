
import { getJobs, getAllInvitesForJob, closeJob as closeJobHTTP, updateJobDetails as updateJobDetailsHTTP  } from 'helpers/job'
import { validateEditJobDetails, compareJobDetailsSnapshot } from 'helpers/createjob'

const GET_ALL_MY_POSTINGS_JOBS = 'GET_ALL_MY_POSTINGS_JOBS'
const GET_ALL_MY_POSTINGS_JOBS_SUCCESS = 'GET_ALL_MY_POSTINGS_JOBS_SUCCESS'
const GET_ALL_MY_POSTINGS_JOBS_FAILURE = 'GET_ALL_MY_POSTINGS_JOBS_FAILURE'

const CHANGE_SELECTED_JOB = 'CHANGE_SELECTED_JOB'
const OPEN_JOB_SELECT = 'OPEN_JOB_SELECT'
const CLEAR_SELECTED_JOB = 'CLEAR_SELECTED_JOB'

const initialMyPostingsState = {
  openJobs: [],
  closedJobs: [],
  awaitingJobs: [],

  selectedOpenJob: {},
  selectedOpenJobInvites: [],

  selectedClosedJob: {},

  selectedAwaitingJob: {},

  isFetchingJobs: false,
  isFetchingJobsSuccess: false,
  isFetchingJobsFailure: false,
  jobSelectDropdownIsOpen: false,
  isFetchingInvites: false,
  isFetchingInvitesSuccess: false,
  isFetchingInvitesFailure: false,

  editViewEnabled: false,
  wereJobDetailsEditsMade: false,
  jobDetailsSnapshot: {},

  isSavingChanges: false,
  isSavingChangesSucces: false,
  isSavingChangesFailure: false,

  jobDetailsPropsErrorMap: {
    jobTitle: false,
    isPayingJob: false,
    startDate: false,
    responsibilities: false,
    qualifications: false,
    desiredSkills: false,
    internshipLocation: false,
    remoteWork: false,
    compensation: false,
  }
}

/*
 * ============================================
 * ======== 1. GETTING ALL JOBS ===============
 * ============================================
 */

function getAllEmployerJobs () {
  return {
    type: GET_ALL_MY_POSTINGS_JOBS
  }
}

function getAllEmployerJobsSuccess (openJobs, closedJobs, awaitingJobs) {
  return {
    type: GET_ALL_MY_POSTINGS_JOBS_SUCCESS,
    openJobs,
    closedJobs,
    awaitingJobs
  }
}

function getAllEmployerJobsFailure () {
  return {
    type: GET_ALL_MY_POSTINGS_JOBS_FAILURE
  }
}

/*
 * getAllJobsMyPostings
 *
 * Gets all jobs required for My Postings, sorts them by
 * open, closed and awaiting.
 */

export function getAllJobsMyPostings (currentJobId, page) {

  /*
   * In the future, we don't want to do an API call every single time for this and have it go
   * through, we want some sort of caching to happen.
   */

  return function (dispatch) {


    /*
     * First, we dispatch our intention to fetch all jobs.
     */

    dispatch(getAllEmployerJobs())

    /*
     * Then, we go ahead and fetch all of those jobs.
     */

    getJobs()

    /*
     * On successful HTTP request.
     */

      .then((result) => {

        /*
        * If the request was successful, we must now take from
        * the request and put the jobs, questions, answers and
        * applicants neatly in the redux store.
        */

        var jobs = result.data.jobs;
        var questions = result.data.questions;
        var answers = result.data.answers;
        var applicants = result.data.applicants;
        var invites = result.data.invites

        for(var i = 0; i < jobs.length; i++) {

         /*
          * For each job, place the answers and questions onto
          * the job object.
          */

          jobs[i].questions = []
          jobs[i].answers = []
          jobs[i].applicants = []
          jobs[i].invites = []

          if (questions !== undefined) {
            questions.forEach(function(question) {
              if (question.job_id == jobs[i].job_id) {
                jobs[i].questions.push(question)
              }
            })
          }

          if (answers !== undefined) {
            answers.forEach(function(answer) {
              if (answer.job_id == jobs[i].job_id) {
                jobs[i].answers.push(answer)
              }
            })
          }

          if (applicants !== undefined) {
            applicants.forEach(function(applicant) {
              if (applicant.job_id == jobs[i].job_id) {
                jobs[i].applicants.push(applicant)
              }
            })
          }

          // if (invites !== undefined) {
          //   invites.forEach(function(invite) {
          //     if (invite.job_id == jobs[i].job_id) {
          //       jobs[i].invites.push(invite)
          //     }
          //   })
          // }

        }

        /*
         * Finally, sort them by open, closed and awaiting.
         * Additionally, set current job if we ask for it.
         */

        var openJobs = []
        var closedJobs = []
        var awaitingJobs = []
        var currentJob = null;

        jobs.forEach((job) => {

          /*
           * If we're visiting this off of a refresh,
           * we need to get the current job for this current job id.
           */

          if (currentJobId) {
            if (job.job_id == Number(currentJobId)) {
              currentJob = job;
            }
          }

          if (job.verified === 1 && job.active == 1) {
            openJobs.push(job)
          }

          else if (job.verified === 1 && job.active === 0) {
            closedJobs.push(job)
          }

          else if (job.verified === 0) {
            awaitingJobs.push(job)
          }

        })

        console.log(`[Univjobs]: My Postings - Successfully got all Jobs. Open=${openJobs.length}, Closed=${closedJobs.length}, Awaiting=${awaitingJobs.length}.`)
        console.log(openJobs, closedJobs, awaitingJobs)

        dispatch(getAllEmployerJobsSuccess(openJobs, closedJobs, awaitingJobs))

        /*
         * If we found the current job from refreshing the page,
         * also set the current job.
         */

        if (currentJob !== null) {
          console.log(`[Univjobs]: My Postings - Current job selected`, currentJob)
        }

        dispatch(changeSelectedJob(currentJob, page))

      })

      /*
       * On failed HTTP request.
       */

      .catch((err) => {

        console.log(err)
        dispatch(getAllEmployerJobsFailure())

      })

  }
}

/*
 * ============================================
 * ============ 2. DROPDOWN BOX ===============
 * ============================================
 */

export function openJobSelect () {
  return {
    type: OPEN_JOB_SELECT
  }
}

//getAllInvitesForJob

function deferredChangeSelectedJob (newSelectedJob, page) {
  return {
    type: CHANGE_SELECTED_JOB,
    newSelectedJob,
    page
  }
}

function asyncGetInvitesForSelectedJob (dispatch, newSelectedJob) {

  /*
  * 1. GET INVITES for current selected job
  */

  dispatch(fetchingInvites())

  getAllInvitesForJob(newSelectedJob.job_id)

    /*
      * Retrieved the invites for this current selected job.
      */

    .then((response) => {

      var invites = response.data.invites;
      console.log(`[Univjobs]: Fetched invites for job=${newSelectedJob.job_id}`, invites)

      /*
        * Sort by applied
        */

      invites.sort((a, b) => {
        if (a.applied == 0 && b.applied == 1) {
          return 1
        }
        if (a.applied == 1 && b.applied == 0) {
          return -1
        }
        return 0;
      })

      dispatch(fetchingInvitesSuccess(invites))
    })

    /*
      * Couldn't retrieve the invites for this current selected job.
      */

    .catch((err) => {
      console.log(err)

      dispatch(fetchingInvitesFailure())
    })
}

export function changeSelectedJob (newSelectedJob, page) {

  /*
   * If we're changing to a job on the OPEN jobs page,
   * then we want to use a redux thunk. We want to do this
   * because we're probably going to want to load more data (like invites).
   */

  if (page == "open") {
    return function (dispatch) {

      /*
       * Get invites for current selected job
       */

      asyncGetInvitesForSelectedJob(dispatch, newSelectedJob)

      /*
       * Finally, dispatch.
       */

      dispatch(deferredChangeSelectedJob(newSelectedJob, page))

    }
  }

  /*
   * Regular page change.
   */

  else {
    return {
      type: CHANGE_SELECTED_JOB,
      newSelectedJob,
      page
    }
  }
}

export function clearSelectedJob (page) {
  return {
    type: CLEAR_SELECTED_JOB,
    page
  }
}

/*
 * ============================================
 * ============ 3. MISC DATA    ===============
 * ============================================
 */

const FETCHING_JOB_INVITES = 'FETCHING_JOB_INVITES'
const FETCHING_JOB_INVITES_SUCCESS = 'FETCHING_JOB_INVITES_SUCCESS'
const FETCHING_JOB_INVITES_FAILURE = 'FETCHING_JOB_INVITES_FAILURE'

function fetchingInvites () {
  return {
    type: FETCHING_JOB_INVITES
  }
}

function fetchingInvitesSuccess (currentSelectedJobInvites) {
  return {
    type: FETCHING_JOB_INVITES_SUCCESS,
    currentSelectedJobInvites
  }
}

function fetchingInvitesFailure () {
  return {
    type: FETCHING_JOB_INVITES_FAILURE
  }
}

/*
 * ============================================
 * ============ 4. CLOSING A JOB    ===============
 * ============================================
 */

const CLOSING_JOB = 'CLOSING_JOB'
const CLOSE_JOB_SUCCESS = 'CLOSE_JOB_SUCCESS'
const CLOSE_JOB_FAILURE = 'CLOSE_JOB_FAILURE'

function closingJob () {
  return {
    type: CLOSING_JOB
  }
}

function closeJobSuccess () {
  return {
    type: CLOSE_JOB_SUCCESS
  }
}

function closeJobFailure () {
  return {
    type: CLOSE_JOB_FAILURE
  }
}

/*
 * closeJob
 *
 * @param {Number} the job id of the job you wish to close
 * @param {Function} what to do after successfully closing the job
 * @param {Function} what to do if it fails to close the job
 */

export function closeJob (jobId, successCallback, failureCallback) {
  return function (dispatch) {

    /*
     * Dispatch our intent
     */

    dispatch(closingJob())

    /*
     * Attempt HTTP call to close job
     */

    closeJobHTTP(jobId)

      /*
       * On successful close of the job,
       * dispatch functions and success callback
       */

      .then((result) => {

        console.log('[Univjobs]: Closed job.')

        dispatch(closeJobSuccess())

        successCallback()

      })

      /*
       * On failed close of the job,
       * determine what the error was and show an
       * error message.
       */

      .catch((err) => {

        console.log(err)

        dispatch(closeJobFailure())

        failureCallback()

      })

  }
}

/*
 * ============================================
 * ============ 5. EDIT JOB DETAILS    ===============
 * ============================================
 */

const SAVING_DETAILS_CHANGES = 'SAVING_DETAILS_CHANGES'
const SAVING_DETAILS_CHANGES_SUCCESS = 'SAVING_DETAILS_CHANGES_SUCCESS'
const SAVING_DETAILS_CHANGES_FAILURE = 'SAVING_DETAILS_CHANGES_FAILURE'
const ENTER_EDIT_JOB_DETAILS_VIEW = 'ENTER_EDIT_JOB_DETAILS_VIEW'
const LEAVE_EDIT_JOB_DETAILS_VIEW = 'LEAVE_EDIT_JOB_DETAILS_VIEW'

const UPDATE_JOB_DETAILS_FIELD = 'UPDATE_JOB_DETAILS_FIELD'

function savingDetails () {
  return {
    type: SAVING_DETAILS_CHANGES
  }
}

function savingDetailsSuccess () {
  return {
    type: SAVING_DETAILS_CHANGES_SUCCESS
  }
}

function savingDetailsFailure (propsErrorMap) {
  return {
    type: SAVING_DETAILS_CHANGES_FAILURE,
    propsErrorMap
  }
}

/*
 * Initiates the enter job details view.
 */

export function enterEditJobDetailsView (page) {
  return {
    type: ENTER_EDIT_JOB_DETAILS_VIEW,
    page
  }
}

export function exitJobDetailsView (page) {
  return {
    type: LEAVE_EDIT_JOB_DETAILS_VIEW,
    page
  }
}

export function updateJobDetailsField (newValue, fieldName, page) {
  return {
    type: UPDATE_JOB_DETAILS_FIELD,
    newValue,
    fieldName,
    page
  }
}

export function saveJobDetailsChanges (selectedJob, snapshot, successCallback, failureCallback) {
  return function (dispatch) {

    /*
     * Validate fields
     */
    validateEditJobDetails (selectedJob, (errorsExist, propsErrorMap) => {

      /*
       * Errors exist in the edit job fields screen.
       * We need to go ahead and present what these errors are.
       */

      if (errorsExist) {

        console.log('[Univjobs]: Could not save job because field errors have occurred.')

        console.log(propsErrorMap)

        dispatch(savingDetailsFailure(propsErrorMap))

        failureCallback('FIELD_ERRORS_EXIST');

      }

      /*
       * No errors were present in these fields.
       * Next, determine if anything was different + get the different fields.
       *
       * Compare the snapshot with the edited selected job.
       */

      else {

        compareJobDetailsSnapshot(snapshot, selectedJob, (changes) => {

          /*
           * There were no changes.
           * No need to save.
           */

          if (Object.keys(changes).length === 0) {

            console.log('[Univjobs]: No changes to save.')

          }

          /*
           * There are changes to save.
           * Let's PATCH it.
           */

          else {

           /*
            * Do the HTTP request
            */

            console.log('[Univjobs]: Changes to save found for the job, ', changes)

            dispatch(savingDetails())

            updateJobDetailsHTTP(selectedJob.job_id, changes)

              .then((result) => {
  
                dispatch(savingDetailsSuccess())

                successCallback()
              })

              .catch((err) => {

                dispatch(savingDetailsFailure())

                failureCallback('HTTP ERROR')
              })

          }

        })

      }

    })




    /*
     * Show the callback
     */


  }
}

/*
 * =================================================================
 *  SELECTED OPEN JOB
 * =================================================================
 */

const initialSelectedOpenJobState = {}

function selectedOpenJob (state = initialSelectedOpenJobState, action) {
  switch (action.type) {
    case UPDATE_JOB_DETAILS_FIELD:

      /*
       * If the field that changes is remote work, then we'll
       * clear location.
       */

      if (action.fieldName == "remote_work" && action.newValue == 0) {
        var newObj = Object.assign({}, state)
        newObj.location = ""

        return {
          ...newObj,
          [action.fieldName]: action.newValue
        }
      }

      /*
       * If it's any other field, we'll simply update.
       */

      else {
        return {
          ...state,
          [action.fieldName]: action.newValue
        }
      }
  }
}

/*
 * =================================================================
 *  SELECTED AWAITING JOB
 * =================================================================
 */

const initialSelectedAwaitingJobState = {}

function selectedAwaitingJob (state = initialSelectedAwaitingJobState, action) {
  switch (action.type) {
    case UPDATE_JOB_DETAILS_FIELD:

      if (action.fieldName == "remote_work" && action.newValue == 1) {
        return {
          ...state,
          "location": "",
          [action.fieldName]: action.newValue,
        }
      }

      else {
        return {
          ...state,
          [action.fieldName]: action.newValue
        }
      }
  }
}

export default function mypostings (state = initialMyPostingsState, action) {
  switch(action.type) {

    /*
     * EDIT JOB
     */
    case SAVING_DETAILS_CHANGES_FAILURE:
      return {
        ...state,
        jobDetailsPropsErrorMap: action.propsErrorMap
      }
    case UPDATE_JOB_DETAILS_FIELD:
      switch(action.page) {
        case "open":

          /*
           * DEVELOPER NOTE:
           *
           * Whenever we're updating an {} on the redux state, we can't
           * change the value of an attribute and expect redux to update.
           *
           * It doesn't update because Redux only updates when the reference to
           * the object changes. It doesn't change if we just change the value of a field
           * because objects are immutable in Redux.
           *
           * Therefore, we need to create an entirely new object from the old one
           * so that Redux updates the {} with an entirely newly referenced one.
           *
           * This explains the var newObjectOnStore =  Object.assign({}, oldObjectOnStore)
           */
          return {
            ...state,
            selectedOpenJob: selectedOpenJob(state.selectedOpenJob, action),
            jobDetailsPropsErrorMap: initialMyPostingsState.jobDetailsPropsErrorMap,
            wereJobDetailsEditsMade: true
          }
        case "awaiting":
          return {
            ...state,
            selectedAwaitingJob: selectedAwaitingJob(state.selectedAwaitingJob, action),
            jobDetailsPropsErrorMap: initialMyPostingsState.jobDetailsPropsErrorMap,
            wereJobDetailsEditsMade: true
          }
      }
    case LEAVE_EDIT_JOB_DETAILS_VIEW:
      debugger;
      switch (action.page) {
        case "open":
          return {
            ...state,
            selectedOpenJob: state.jobDetailsSnapshot,
            editViewEnabled: false,
            wereJobDetailsEditsMade: false
          }
        case "awaiting":
          return {
            ...state,
            selectedAwaitingJob: state.jobDetailsSnapshot,
            editViewEnabled: false,
            wereJobDetailsEditsMade: false
          }
      }
    case ENTER_EDIT_JOB_DETAILS_VIEW:

      /*
       * Only enter the view if you're not already in the
       * view because we also set the snapshot by doing this.
       *
       * We don't want to lose the snapshot.
       * It holds the initial state of the job from before we entered
       * the view.
       */
      switch (action.page) {
        case "open":
          if (!state.editViewEnabled) {
            return {
              ...state,
              editViewEnabled: true,
              jobDetailsSnapshot: state.selectedOpenJob
            }
          }
        case "awaiting":
          if (!state.editViewEnabled) {
            return {
              ...state,
              editViewEnabled: true,
              jobDetailsSnapshot: state.selectedAwaitingJob
            }
          }
      }
      

    /*
     * FETCH INVITES
     */

    case FETCHING_JOB_INVITES:
      return {
        ...state,
        isFetchingInvites: true,
        isFetchingInvitesFailure: false,
        isFetchingInvitesSuccess: false
      }
    case FETCHING_JOB_INVITES_SUCCESS:
      return {
        ...state,
        selectedOpenJobInvites: action.currentSelectedJobInvites,
        isFetchingJobs: false,
        isFetchingJobsSuccess: true,
        isFetchingJobsFailure: false
      }
    case FETCHING_JOB_INVITES_FAILURE:
      return {
        ...state,
        isFetchingJobs: false,
        isFetchingJobsSuccess: false,
        isFetchingJobsFailure: true
      }

    /*
     * CHANGE JOBS
     */

    case OPEN_JOB_SELECT:
      return {
        ...state,
        jobSelectDropdownIsOpen: !state.jobSelectDropdownIsOpen
      }
    case CLEAR_SELECTED_JOB:
      switch (action.page) {
        case "open":
          return {
            ...state,
            selectedOpenJob: {},
            jobSelectDropdownIsOpen: false,
          }
        case "closed":
          return {
            ...state,
            selectedClosedJob: {},
            jobSelectDropdownIsOpen: false
          }
        case "awaiting":
          return {
            ...state,
            selectedAwaitingJob: {},
            jobSelectDropdownIsOpen: false
          }
      }
    case CHANGE_SELECTED_JOB:
      switch (action.page) {
        case "open":
          return {
            ...state,
            selectedOpenJob: action.newSelectedJob,
            jobSelectDropdownIsOpen: false
          }
        case "closed":
          return {
            ...state,
            selectedClosedJob: action.newSelectedJob,
            jobSelectDropdownIsOpen: false
          }
        case "awaiting":
          return {
            ...state,
            selectedAwaitingJob: action.newSelectedJob,
            jobSelectDropdownIsOpen: false
          }
      }

    /*
     * GET ALL JOBS
     */

    case GET_ALL_MY_POSTINGS_JOBS:
      return {
        ...state,
        isFetchingJobs: true,
        isFetchingJobsSuccess: false,
        isFetchingJobsFailure: false
      }
    case GET_ALL_MY_POSTINGS_JOBS_SUCCESS:
      return {
        ...state,
        isFetchingJobs: false,
        isFetchingJobsSuccess: true,
        isFetchingJobsFailure: false,
        openJobs: action.openJobs,
        closedJobs: action.closedJobs,
        awaitingJobs: action.awaitingJobs
      }
    case GET_ALL_MY_POSTINGS_JOBS_FAILURE:
      return {
        ...state,
        isFetchingJobs: false,
        isFetchingJobsSuccess: false,
        isFetchingJobsFailure: true
      }
    default:
      return state
  }
}
