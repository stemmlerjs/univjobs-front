
import { getJobs } from 'helpers/job'

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

export function getAllJobsMyApplicants () {
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

          if (invites !== undefined) {
            invites.forEach(function(invite) {
              if (invite.job_id == jobs[i].job_id) {
                jobs[i].invites.push(invite)
              }
            })
          }
        }

        dispatch(getAllJobsSuccess(jobs))

      })

      /*
       * Failed to get all jobs
       */

      .catch((err) => {

        dispatch(getAllJobsFailure())

      })

  }
}

const initialMyApplicantsState = {
  jobs: [],
  selectedJob: {},
  isFetchingJobs: false,
  isFetchingJobsSuccess: false,
  isFetchingJobsFailure: false
}

export default function myapplicants (state = initialMyApplicantsState, action) {
  switch (action.type) {
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

