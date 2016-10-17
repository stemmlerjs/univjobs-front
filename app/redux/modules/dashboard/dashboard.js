// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const GET_STUDENTS = 'EMPLOYER.GET_STUDENTS'
const GET_STUDENTS_SUCCESS = 'EMPLOYER.GET_STUDENTS_SUCCESS'
const GET_STUDENTS_FAILURE = 'EMPLOYER.GET_STUDENTS_FAILURE'

const FETCHING_JOBS = 'STUDENT.FETCHING_JOBS'
const FETCHED_JOBS_SUCCESS = 'STUDENT.FETCHED_JOBS_SUCCESS'
const FETCHED_JOBS_FAILURE = 'STUDENT.FETCHED_JOBS_FAILURE'

const MODAL_CLICKED = 'MODAL_CLICKED'
const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'

const FETCHING_JOB_TYPES = 'STUDENT.FETCHING_JOB_TYPES'
const FETCHED_JOB_TYPES_SUCCESS = 'STUDENT.FETCHED_JOB_TYPES_SUCCESS'
const FETCHED_JOB_TYPES_FAILURE = 'STUDENT.FETCHED_JOB_TYPES_FAILURE'

/***************BASE LIST SUCCESS*************/
const FETCHED_LIST = 'STUDENT.FETCHED_LIST'
// =======================================================
// ====================== ACTIONS ========================
// =======================================================

export function getStudentsSuccess(students) {
	return {
		type: GET_STUDENTS_SUCCESS,
		students
	}
}

export function getStudentsFailure(error) {
	return {
		type: GET_STUDENTS_FAILURE,
		error
	}
}

export function fetchingJobs() {
  return {
	  type: FETCHING_JOBS,
  }
}

export function fetchedJobErrors(error) {
  return {
	  type: FETCHED_JOBS_FAILURE,
	  error
  }
}

export function fetchedJobSuccess(jobs) {
   return {
	   type: FETCHED_JOBS_SUCCESS,
	   jobs
  }
}

export function modalClicked(jobId) {
   return {
   	   type: MODAL_CLICKED,
	   jobId
   }
}

export function showModal(job) {
   return {
   	  type: SHOW_MODAL,
	  job
   }
}

export function hideModal(jobId) {
   return {
          type: HIDE_MODAL
   }
}

export function fetchingJobTypes() {
   return {
	   type: FETCHING_JOB_TYPES
   }
}

export function fetchList(listName, listArray) {
	switch(listName) {
		case 'JOB_TYPES': {
		    return {
			    type: FETCHED_LIST,
		  	    listType: FETCHED_JOB_TYPES_SUCCESS,
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

const initialDashboardState = {
	studentDashboard: {},
	employerDashboard: {},
	error: '',
	modal: {},
	lists: {},
}

const initialEmployerDashboardState = {
	students: [],
	searchField: '',
	campusFilter: '',
	gradDateFilter: ''
}

const initialStudentDashboardState = {
	isFetching: false,
	error: '',
	jobs: []
}

const intialModalState = {
	isClicked: false,
	isOpen: false,
	jobId: '',
	job: ''
}

const initalListState = {
	jobTypes: []
}
// =======================================================
// ===================== REDUCERS ========================
// =======================================================

function employerDashboard(state = initialEmployerDashboardState, action) {
	switch(action.type) {
		case GET_STUDENTS_SUCCESS:
			return {
				...state,
				students: action.students
			}
		default:
			return state
	}
}

function studentDashboard(state = initialStudentDashboardState, action) {
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
				error: action.error,
			}
		default:	
			return {
				state
			}//switch
	}
}

function modal(state = intialModalState, action) {	
	switch(action.type) {
		case MODAL_CLICKED:
			return {
				...state,
				isClicked: true,
				jobId: action.jobId,
			}
		case SHOW_MODAL:
			return {
				...state,
				isOpen: true,
				job: action.job,
			}
		case HIDE_MODAL:
			return {
				...state,
				isClicked: false,
				isOpen: false,
			}
		default:	
			return {
				state
			}//switch
	}
}

function lists (state = intialListState, action) {
	switch(action.listType) {
	    case FETCHED_JOB_TYPES_SUCCESS:
		return {
		    ...state,
		    jobTypes: action.list
		}
	}
}

export default function dashboard(state = initialDashboardState, action) {
	switch(action.type) {
		case GET_STUDENTS_SUCCESS:
			return {
				...state,
				employerDashboard: employerDashboard(state.employerDashboard, action)
			}
		case GET_STUDENTS_FAILURE:
			return {
				...state,
				error: action.error
			}
		case FETCHED_JOBS_SUCCESS:
			return {
				...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case FETCHED_JOBS_FAILURE:
			return {
				...state,
				error: action.error
			}
		case MODAL_CLICKED:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case SHOW_MODAL:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case HIDE_MODAL:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case FETCHED_LIST: 
			return {
				...state,
				lists: lists(state.lists, action)
			}
		default:
			return state
	}
}
