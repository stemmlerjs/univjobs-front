// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const FETCHING_APPLICATIONS = 'FETCHING_STUDENTS_APPLICATIONS'
const FETCHED_STUDENTS_APPLICATIONS_SUCCESS = 'FETCHED_STUDENTS_APPLICATIONS_SUCCESS'
const FETCHED_STUDENTS_APPLICATIONS_FAILURE = 'FETCHED_STUDENTS_APPLICATIONS_FAILURE'

const FETCHING_JOBS = 'FETCHING_JOBS'
const FETCHED_JOBS_SUCCESS = 'FETCHED_JOBS_SUCCESS'
const FETCHED_JOBS_FAILURE = 'FETCHED_JOBS_FAILURE'

const FETCHING_QUESTIONS = 'FETCHING_QUESTIONS'
const FETCHED_QUESTIONS_SUCCESS = 'FETCHED_QUESTIONS_SUCCESS'
const FETCHED_QUESTIONS_FAILURE = 'FETCHED_QUESTIONS_FAILURE'

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

export function fetchingJobs() {
  return {
	  type: FETCHING_JOBS,
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
	jobs: [],
	questions: [],
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
				jobs: action.jobs,
				isFetching: false,
			}
		case FETCHED_JOBS_FAILURE:
			return {
				...state,
				isFetching: false,
			}
		case FETCHING_QUESTIONS:
			return {
				...state,
				isFetching: true,
			}		
		case FETCHED_QUESTIONS_SUCCESS:
			return {
				...state,
				questions: action.questions,
				isFetching: false,
			}
		case FETCHED_QUESTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.error,
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
			error: action.error
		}
	  case FETCHING_QUESTIONS:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action)
			}
	  case FETCHED_QUESTIONS_SUCCESS:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action)
		}
	  case FETCHED_QUESTIONS_FAILURE:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action)
		}
	  default :
		return state
  }
}
