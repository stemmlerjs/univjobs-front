// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const GET_STUDENTS = 'EMPLOYER.GET_STUDENTS'
const GET_STUDENTS_SUCCESS = 'EMPLOYER.GET_STUDENTS_SUCCESS'
const GET_STUDENTS_FAILURE = 'EMPLOYER.GET_STUDENTS_FAILURE'

const FETCHING_JOBS = 'STUDENT.FETCHING_JOBS'
const FETCHED_JOBS_SUCCESS = 'STUDENT.FETCHED_JOBS_SUCCESS'
const FETCHED_JOBS_ERROR = 'STUDENT.FETCHED_JOBS_FAILURE'

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
	  type: FETCHED_JOBS_ERROR,
	  error
  }
}

export function fetchedJobSuccess(jobs) {
   return {
	   type: FETCHED_JOBS_SUCCESS,
	   jobs
  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialDashboardState = {
	studentDashboard: {},
	employerDashboard: {},
	error: ''
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
		case FETCHED_JOBS_ERROR:
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
		case FETCHED_JOBS_ERROR:
			return {
				...state,
				studentDashboard: studentDasboard(state.studentDashboard, action)
			}
		default:
			return state
	}
}
