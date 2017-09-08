
import { getJobs } from 'helpers/job'
import { rejectApplicants as rejectApplicantsHTTP, 
  contactStudents as contactStudentsHTTP,
  hireStudents as hireStudentsHTTP } from 'helpers/applicant'

/*
 * =============================================
 *  1. Getting jobs and selecting current jobs
 * =============================================
 */

const GET_ALL_MY_APPLICANTS_JOBS = 'GET_ALL_MY_APPLICANTS_JOBS'
const GET_ALL_MY_APPLICANTS_JOBS_SUCCESS = 'GET_ALL_MY_APPLICANTS_JOBS_SUCCESS'
const GET_ALL_MY_APPLICANTS_JOBS_FAILURE = 'GET_ALL_MY_APPLICANTS_JOBS_FAILURE'

const CHANGE_SELECTED_JOB = 'MY_APPLICANTS_CHANGE_SELECTED_JOB'
const OPEN_JOB_SELECT = 'MY_APPLICANTS_OPEN_JOB_SELECT'
const CLEAR_SELECTED_JOB = 'MY_APPLICANTS_CLEAR_SELECTED_JOB'

function getAllJobs () {
  return {
    type: GET_ALL_MY_APPLICANTS_JOBS
  }
}

function getAllJobsSuccess (jobs) {
  return {
    type: GET_ALL_MY_APPLICANTS_JOBS_SUCCESS,
    jobs
  }
}

function getAllJobsFailure () {
  return {
    type: GET_ALL_MY_APPLICANTS_JOBS_FAILURE
  }
}

export function getAllJobsMyApplicants (currentJobId) {
  return function (dispatch) {

    /*
     * Dispatch intent to get all jobs.
     */

    dispatch(getAllJobs())

    /*
     * Actually get all the jobs
     */

    getJobs()

      /*
       * Successfully got all jobs
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

          if (applicants !== undefined) {
            applicants.forEach(function(applicant) {
              if (applicant.job_id == jobs[i].job_id) {

                /*
                * We need to count the number of applicant types for each job.
                */

                const state = applicant.state;
                
                switch (state) {
                  case "INITIAL":
                    if (jobs[i].applicants_INITIAL == undefined) {
                      jobs[i].applicants_INITIAL = [];
                    }
                    
                    jobs[i].applicants_INITIAL.push(applicant)
                    break;
                  case "CONTACTED":
                    if (jobs[i].applicants_POOLED == undefined) {
                      jobs[i].applicants_POOLED = [];
                    }

                    jobs[i].applicants_POOLED.push(applicant)
                    break;
                  case "HIRED":
                    if (jobs[i].applicants_HIRED == undefined) {
                      jobs[i].applicants_HIRED = [];
                    }
                    
                    jobs[i].applicants_HIRED.push(applicant)
                    break;
                }

                jobs[i].applicants.push(applicant)
              }
            })
          }
          
          /*
           * Put the answers to jobs in the corresponding 
           * applicant object.
           */

          if (answers !== undefined) {
            answers.forEach(function(answer) {
              if (answer.job_id == jobs[i].job_id) {

                // Add it to all answers
                jobs[i].answers.push(answer)

                // Also add it to the corresponding applicant
                jobs[i].applicants.map((jobApplicant) => {
                  if (jobApplicant.student_id == answer.student) {
                    
                    if (jobApplicant.answers == undefined) {
                      jobApplicant.answers = []
                    }

                    jobApplicant.answers.push(answer)
                  }
                  return jobApplicant;
                }) 
              }
            })
          }

          if (invites !== undefined) {
            invites.forEach(function(invite) {
              if (invite.job_id == jobs[i].job_id) {
                jobs[i].invites.push(invite)
              }
            })
          }

        }

        dispatch(getAllJobsSuccess(jobs))

        // If current jobId was present in the request, set
        // the current job to it.

        if (currentJobId) {

          for (var i = 0; i < jobs.length; i++) {
            if (jobs[i].job_id == currentJobId) {
              dispatch(changeSelectedJob(jobs[i]))
            }
          }

        }

      })

      /*
       * Failed to get all jobs
       */

      .catch((err) => {
        console.log(err)
        dispatch(getAllJobsFailure())

      })

  }
}

export function changeSelectedJob (job) {
  return {
    type: CHANGE_SELECTED_JOB,
    job
  }
}

export function clearSelectedJob () {
  return {
    type: CLEAR_SELECTED_JOB
  }
}

/*
 * =============================================
 *  2. Selecting applicants
 * =============================================
 */

const VIEW_APPLICANT_DETAILS = "VIEW_APPLICANT_DETAILS"
const CLEAR_CURRENT_APPLICANT_DETAILS = "CLEAR_CURRENT_APPLICANT_DETAILS"

export function viewApplicantDetails (applicant) {
  return {
    type: VIEW_APPLICANT_DETAILS,
    applicant
  }
}

export function clearCurrentApplicantDetails () {
  return {
    type: CLEAR_CURRENT_APPLICANT_DETAILS
  }
}

/*
 * =============================================
 *  3. Multi-Selecting applicants
 * =============================================
 */

const MULTI_SELECT_APPLICANT_ADD = "MULTI_SELECT_APPLICANT_ADD"
const MULTI_SELECT_APPLICANT_REMOVE = "MULTI_SELECT_APPLICANT_REMOVE"
const MULTI_SELECT_SELECT_ALL = "MULTI_SELECT_SELECT_ALL"
const MULTI_SELECT_DESELECT_ALL = "MULTI_SELECT_DESELECT_ALL"

export function multiSelectSelectAll (ids) {
  return {
    type: MULTI_SELECT_SELECT_ALL,
    ids
  }
}

export function multiSelectDeselectAll () {
  return {
    type: MULTI_SELECT_DESELECT_ALL
  }
}

export function multiSelectAdd (applicantId) {
  return {
    type: MULTI_SELECT_APPLICANT_ADD,
    applicantId
  }
}

export function multiSelectRemove (applicantId) {

  return {
    type: MULTI_SELECT_APPLICANT_REMOVE,
    applicantId
  }
}

/*
 * =============================================
 *  4. Dropdown Change Jobs
 * =============================================
 */

const TOGGLE_JOB_SELECT = 'TOGGLE_JOB_SELECT'

export function openJobSelect () {
  return {
    type: TOGGLE_JOB_SELECT
  }
}

/*
 * =============================================
 *  5. Reject applicants
 * =============================================
 */

const REJECTING_APPLICANTS = 'REJECTING_APPLICANTS'
const REJECTING_APPLICANTS_SUCCESS = "REJECTING_APPLICANTS_SUCCESS"
const REJECTING_APPLICANTS_FAILURE = "REJECTING_APPLICANTS_FAILURE"

function rejectApplicantsSuccess () {
  return {
    type: REJECTING_APPLICANTS_SUCCESS
  }
}

function rejectApplicantsFailure () {
  return {
    type: REJECTING_APPLICANTS_FAILURE
  }
}

/*
 * rejectApplicants
 * 
 * @desc This redux thunk allows us to reject multiple applicants all at the 
 * same time by passing in the ids of the applicants and the job id of the
 * job that the applicants belong to.
 * 
 * @param {Number} jobId
 * @param {Array} applicantIds
 */

export function rejectApplicants (jobId, applicantIds, successCallback, failureCallback) {
  return function (dispatch) {

    /*
     * Signal intent
     */

    dispatch({
      type: REJECTING_APPLICANTS
    })

    /*
     * Attempt http call to reject the applicants from this job.
     */

    rejectApplicantsHTTP(jobId, applicantIds)

      /*
       * Successfully rejected applicants
       */

      .then((result) => {
        console.log("successfully rejected these applicants", result)

        var affectedRowCount = result.data.affectedIds.length;

        dispatch(rejectApplicantsSuccess())

        successCallback(affectedRowCount)
        
      })

      /*
       * Failed to reject applicants
       */

      .catch((err) => {
        console.log(err)

        dispatch(rejectApplicantsFailure())

        failureCallback()
      })
  }
}

/*
 * =============================================
 *  6. Contact applicants
 * =============================================
 */

const CONTACTING_APPLICANTS = 'CONTACTING_APPLICANTS'
const CONTACTING_APPLICANTS_SUCCESS = "CONTACTING_APPLICANTS_SUCCESS"
const CONTACTING_APPLICANTS_FAILURE = "CONTACTING_APPLICANTS_FAILURE"

function contactApplicantsSuccess () {
  return {
    type: CONTACTING_APPLICANTS_SUCCESS
  }
}

function contactApplicantsFailure () {
  return {
    type: CONTACTING_APPLICANTS_FAILURE
  }
}

/*
 * contactApplicants
 * 
 * @desc This redux thunk allows us to contact multiple applicants all at the 
 * same time by passing in the ids of the applicants and the job id of the
 * job that the applicants belong to.
 * 
 * @param {Number} jobId
 * @param {Array} applicantIds
 */

export function contactApplicants (jobId, applicantIds, successCallback, failureCallback) {
  return function (dispatch) {

    /*
     * Signal intent
     */

    dispatch({
      type: CONTACTING_APPLICANTS
    })

    /*
     * Attempt http call to contact the applicants from this job.
     */

    contactStudentsHTTP(jobId, applicantIds)

      /*
       * Successfully contacted applicants
       */

      .then((result) => {
        console.log("successfully contacted these applicants", result)

        var affectedRowCount = result.data.affectedIds.length;

        dispatch(contactApplicantsSuccess())

        successCallback(affectedRowCount);
        
      })

      /*
       * Failed to contact applicants
       */

      .catch((err) => {
        console.log(err)

        dispatch(contactApplicantsFailure())

        failureCallback();
      })
  }
}

/*
 * =============================================
 *  6. Hire applicants
 * =============================================
 */

const HIRING_APPLICANTS = 'HIRING_APPLICANTS'
const HIRING_APPLICANTS_SUCCESS = "HIRING_APPLICANTS_SUCCESS"
const HIRING_APPLICANTS_FAILURE = "HIRING_APPLICANTS_FAILURE"

function hireApplicantsSuccess () {
  return {
    type: HIRING_APPLICANTS_SUCCESS
  }
}

function hireApplicantsFailure () {
  return {
    type: HIRING_APPLICANTS_FAILURE
  }
}

/*
 * hireApplicants
 * 
 * @desc This redux thunk allows us to hire multiple applicants all at the 
 * same time by passing in the ids of the applicants and the job id of the
 * job that the applicants belong to.
 * 
 * @param {Number} jobId
 * @param {Array} applicantIds
 */

export function hireApplicants (jobId, applicantIds, successCallback, failureCallback) {
  return function (dispatch) {

    /*
     * Signal intent
     */

    dispatch({
      type: HIRING_APPLICANTS
    })

    /*
     * Attempt http call to contact the applicants from this job.
     */

    hireStudentsHTTP(jobId, applicantIds)

      /*
       * Successfully hire applicants
       */

      .then((result) => {
        console.log("successfully hired these applicants", result)

        var affectedRowCount = result.data.affectedIds.length;

        dispatch(hireApplicantsSuccess())

        successCallback(affectedRowCount);
        
      })

      /*
       * Failed to hire applicants
       */

      .catch((err) => {
        console.log(err)

        dispatch(hireApplicantsFailure())

        failureCallback();
      })
  }
}


const initialMyApplicantsState = {
  jobs: [],
  selectedJob: {},
  isFetchingJobs: false,
  isFetchingJobsSuccess: false,
  isFetchingJobsFailure: false,

  selectedApplicant: {},

  multiSelectViewActive: false,
  multiSelectedApplicantIds: [], // these are student ids

  jobSelectDropdownIsOpen: false,

  isRejectingApplicants: false,
  isRejectingApplicantsSuccess: false,
  isRejectingApplicantsFailure: false,

  isContactingApplicants: false,
  isContactingApplicantsSuccess: false,
  isContactingApplicantsFailure: false,

  isHiringApplicants: false,
  isHiringApplicantsSuccess: false,
  isHiringApplicantsFailure: false
}

export default function myapplicants (state = initialMyApplicantsState, action) {
  switch (action.type) {

    /*
     * HIRING APPLICANTS
     */

    case HIRING_APPLICANTS:
      return {
        ...state,
        isHiringApplicants: true,
        isHiringApplicantsSuccess: false,
        isHiringApplicantsFailure: false
      }
    case HIRING_APPLICANTS_SUCCESS:
      return {
        ...state,
        isHiringApplicants: false,
        isHiringApplicantsSuccess: true,
        isHiringApplicantsFailure: false,
      }
    case HIRING_APPLICANTS_FAILURE:
      return {
        ...state,
        isHiringApplicants: false,
        isHiringApplicantsSuccess: false,
        isHiringApplicantsFailure: true
      }

    /*
     * CONTACTING APPLICANTS
     */

    case CONTACTING_APPLICANTS:
      return {
        ...state,
        isContactingApplicants: true,
        isContactingApplicantsSuccess: false,
        isContactingApplicantsFailure: false
      }
    case CONTACTING_APPLICANTS_SUCCESS:
      return {
        ...state,
        isContactingApplicants: false,
        isContactingApplicantsSuccess: true,
        isContactingApplicantsFailure: false
      }
    case CONTACTING_APPLICANTS_FAILURE:
      return {
        ...state,
        isContactingApplicants: false,
        isContactingApplicantsSuccess: false,
        isContactingApplicantsFailure: true
      }

    /*
     * REJECTING APPLICANTS
     */

    case REJECTING_APPLICANTS:
      return {
        ...state,
        isRejectingApplicants: true,
        isRejectingApplicantsSuccess: false,
        isRejectingApplicantsFailure: false
      }
    case REJECTING_APPLICANTS_SUCCESS:
      return {
        ...state,
        isRejectingApplicants: false,
        isRejectingApplicantsSuccess: true,
        isRejectingApplicantsFailure: false
      }
    case REJECTING_APPLICANTS_FAILURE:
      return {
        ...state,
        isRejectingApplicants: false,
        isRejectingApplicantsSuccess: false,
        isRejectingApplicantsFailure: true
      }

    /*
     * JOB SELECTION
     */

    case TOGGLE_JOB_SELECT:
      return {
        ...state,
        jobSelectDropdownIsOpen: !state.jobSelectDropdownIsOpen,
      }

    /*
     * MULTI SELECT APPLICANTS
     */

    case MULTI_SELECT_SELECT_ALL:
      return {
        ...state,
        multiSelectedApplicantIds: action.ids
      }

    case MULTI_SELECT_DESELECT_ALL:
      return {
        ...state,
        multiSelectedApplicantIds: [],
        multiSelectViewActive: false
      }

    case MULTI_SELECT_APPLICANT_ADD:

      /*
       * Add the aplicant id to the list of selected applicants
       * if it has not already been added.
       */

      var multiSelectedApplicantIds = state.multiSelectedApplicantIds.slice();

      if (multiSelectedApplicantIds.indexOf(action.applicantId) == -1) multiSelectedApplicantIds.push(action.applicantId)

      return {
        ...state,
        multiSelectViewActive: true,
        multiSelectedApplicantIds: multiSelectedApplicantIds
      }
    case MULTI_SELECT_APPLICANT_REMOVE:

      /*
       * Remove the applicant id from the list of multiselected
       * applicant ids and set the multiselect view active to false
       * if there are no more selected items.
       */

      var multiSelectedApplicantIds = state.multiSelectedApplicantIds;
      var multiSelectViewActive = true;
      
      var removeIndex = multiSelectedApplicantIds.indexOf(action.applicantId)

      if (removeIndex !== -1) {
        multiSelectedApplicantIds.splice(removeIndex, 1);
      }

      // new reference
      var newIds = multiSelectedApplicantIds.slice();

      if (newIds.length == 0) {
        multiSelectViewActive = false
      }

      return {
        ...state,
        multiSelectedApplicantIds: newIds,
        multiSelectViewActive: multiSelectViewActive
      }
    
    /*
     * Selecting Applicants
     */

    case CLEAR_CURRENT_APPLICANT_DETAILS:
      return {
        ...state,
        selectedApplicant: {}
      }
    case VIEW_APPLICANT_DETAILS:
      return {
        ...state,
        selectedApplicant: action.applicant
      }

    /*
     * SELECTING JOBS 
     */

    case CLEAR_SELECTED_JOB:
      return {
        ...state,
        selectedJob: {},
        jobSelectDropdownIsOpen: false,
        multiSelectedApplicantIds: [],
        multiSelectViewActive: false,
        selectedApplicant: {}
      }
    case CHANGE_SELECTED_JOB:
      return {
        ...state,
        selectedJob: action.job,
        jobSelectDropdownIsOpen: false,
        multiSelectedApplicantIds: [],
        multiSelectViewActive: false,
        selectedApplicant: {}
      }
    case GET_ALL_MY_APPLICANTS_JOBS:
      return {
        ...state,
        isFetchingJobs: false,
        isFetchingJobsSuccess: false,
        isFetchingJobsFailure: false
      }
    case GET_ALL_MY_APPLICANTS_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.jobs,
        isFetchingJobs: false,
        isFetchingJobsSuccess: true,
        isFetchingJobsFailure: false,
        selectedJob: {},
        multiSelectViewActive: false,
        multiSelectedApplicantIds: []

      }
    case GET_ALL_MY_APPLICANTS_JOBS_FAILURE:
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

