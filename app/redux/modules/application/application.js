// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const FETCHING_APPLICATIONS = 'STUDENT.FETCHING_STUDENTS_APPLICATIONS'
const FETCHED_STUDENTS_APPLICATIONS_SUCCESS = 'FETCHED_STUDENTS_APPLICATIONS_SUCCESS'
const FETCHED_STUDENTS_APPLICATIONS_FAILURE = 'FETCHED_STUDENTS_APPLICATIONS_FAILURE'

const FETCHING_JOBS = 'STUDENT.FETCHING_JOBS'
const FETCHED_JOBS_SUCCESS = 'STUDENT.FETCHED_JOBS_SUCCESS'
const FETCHED_JOBS_FAILURE = 'STUDENT.FETCHED_JOBS_FAILURE'

const FETCHING_QUESTIONS = 'STUDENT.FETCHING_QUESTIONS'
const FETCHED_QUESTIONS_SUCCESS = 'STUDENT.FETCHED_QUESTIONS_SUCCESS'
const FETCHED_QUESTIONS_FAILURE = 'STUDENT.FETCHED_QUESTIONS_FAILURE'
const MODAL_CLICKED = 'MODAL_CLICKED'
const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'

/******************** DASHBOARD List GETTER ACTIONS ******************/
const FETCH_JOB_TYPES = 'DASHBOARD.LIST.FETCH_JOB_TYPES'
const FETCH_INDUSTRIES = 'DASHBOARD.LIST.FETCH_INDUSTRIES'


/******************** DASHBOARD List SUCCESS ACTIONS ******************/
const FETCHED_LIST = 'DASHBOARD.LIST.FETCHED'

const FETCHED_JOB_TYPES = 'DASHBOARD.FETCHED_JOB_TYPES'
const FETCHED_INDUSTRIES = 'DASHBOARD.FETCHED_INDUSTRIES'

// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

export function fetchingApplications() {
  return {
	  type: FETCHING_APPLICATIONS,
  }
}

export function fetchedApplicationsSuccess(applications) {
   return {
	   type: FETCHED_STUDENTS_APPLICATIONS_SUCCESS,
	   applications
  }
}

export function fetchedApplicationsFailure(error) {
   return {
	   type: FETCHED_STUDENTS_APPLICATIONS_SUCCESS,
	   error
  }
}

export function fetchingJobs() {
  return {
	  type: FETCHING_APPLICATIONS,
  }
}

export function fetchedJobsSuccess(jobs) {
   return {
	   type: FETCHED_JOBS_SUCCESS,
	   jobs
  }
}

export function fetchedJobsFailure(error) {
   return {
	   type: FETCHED_JOBS_FAILURE,
	   error
  }
}
export function fetchingQuestions() {
  return {
	  type: FETCHING_QUESTIONS,
  }
}

export function fetchedQuestionsSuccess(questions) {
   return {
	   type: FETCHED_QUESTIONS_SUCCESS,
	   questions
  }
}

export function fetchedQuestionsFailure(error) {
  return {
	  type: FETCHED_QUESTIONS_FAILURE,
	  error
  }
}

export function modalClicked(jobId) {
   return {
   	   type: MODAL_CLICKED,
	   jobId
   }
}

export function showModal(job, questions, answers) {
   return {
   	  type: SHOW_MODAL,
	  job,
	  questions
   }
}

export function hideModal(jobId) {
   return {
          type: HIDE_MODAL
   }
}

export function fetchList(listName, listArray) {
	switch(listName) {
		case 'INDUSTRIES': {
		     return {
			     type: FETCHED_LIST,
			     listType: FETCHED_INDUSTRIES,
			     list: listArray
		     }
		}
		case 'JOB_TYPES': {
		    return {
			    type: FETCHED_LIST,
		  	    listType: FETCHED_JOB_TYPES,
			    list: listArray
		    }
		}
		default:
		     return 
	}
}//fetchList

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialApplicationsState = {
	studentApplications: {},
	lists: {},
	//hired: {},
	//invited: {},
	error: ''
}

const initialStudentApplicationsState = {
	jobsAppliedTo: [],
	//questions: [],
	//answers: [],
	isFetching: false,
	error: '',
}

// ================================================================== //
// ======================= APPLICATION REDUCER ======================= //
// ================================================================== //
function studentApplications(state = intialStudentApplicationsState, action) {
	switch(action.type) {
		case FETCHING_JOBS:
			return {
				...state,
				isFetching: true,
			}
		case FETCHED_JOBS_SUCCESS:
			return {
				...state,
				jobsAppliedTo: action.jobs,
				isFetching: false,
			}
		case FETCHED_JOBS_FAILURE:
			return {
				...state,
				isFetching: false,
			}
		default:
			return state
	}
}

export default function application(state = initialApplicationsState, action) {
  switch(action.type) {
	  case FETCHING_JOBS:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action)
		}
	  case FETCHED_JOBS_SUCCESS:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action)
		}
	  case FETCHED_JOBS_FAILURE:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action),
			error: 'Error in fetching jobs, ' + action.error
		}
	  default :
		return state
  }
}
