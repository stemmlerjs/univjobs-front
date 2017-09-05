
import { getJobs } from 'helpers/job'

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
                  case "CONTACT":
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

const initialMyApplicantsState = {
  jobs: [],
  selectedJob: {},
  isFetchingJobs: false,
  isFetchingJobsSuccess: false,
  isFetchingJobsFailure: false,

  selectedApplicant: {},

  multiSelectViewActive: false,
  multiSelectedApplicantIds: [], // these are student ids

}

export default function myapplicants (state = initialMyApplicantsState, action) {
  switch (action.type) {

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
      var multiSelectViewActive = state.multiSelectViewActive;
      
      var removeIndex = multiSelectedApplicantIds.indexOf(action.applicantId)

      if (removeIndex !== -1) {
        multiSelectedApplicantIds.splice(removeIndex, 1);
      }

      if (multiSelectedApplicantIds.length == 0) {
        multiSelectViewActive: false
      }

      return {
        ...state,
        multiSelectedApplicantIds: multiSelectedApplicantIds,
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
        selectedJob: {}
      }
    case CHANGE_SELECTED_JOB:
      return {
        ...state,
        selectedJob: action.job
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
        isFetchingJobsFailure: false
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

