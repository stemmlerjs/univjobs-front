// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const FETCHING_STUDENT_APPLICATIONS = 'FETCHING_STUDENT_APPLICATIONS'
const FETCHED_STUDENT_APPLICATIONS_SUCCESS = 'FETCHED_STUDENT_APPLICATIONS_SUCCESS'
const FETCHED_STUDENT_APPLICATIONS_FAILURE = 'FETCHED_STUDENT_APPLICATIONS_FAILURE'

// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================
export function fetchingStudentApplications() {
  return {
	  type: FETCHING_STUDENT_APPLICATIONS,
  }
}

export function fetchedStudentApplicationsSuccess(applications) {
   return {
	   type: FETCHED_STUDENT_APPLICATIONS_SUCCESS,
	   applications
  }
}

export function fetchedStudentApplicationsFailure(error) {
   return {
	   type: FETCHED_STUDENT_APPLICATIONS_FAILURE,
	   error
  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialApplicationsState = {
	studentApplications: {},
	//hired: {},
	//invited: {},
	error: ''
}

const initialStudentApplicationsState = {
	applications: [],
	error: '',
}
// ================================================================== //
// ======================= APPLICATION REDUCER ======================= //
// ================================================================== //
function studentApplications(state = intialStudentApplicationsState, action) {
	switch(action.type) {
		case FETCHING_STUDENT_APPLICATIONS:
			return {
				...state,
			}
		case FETCHED_STUDENT_APPLICATIONS_SUCCESS:
			return {
				...state,
				applications: action.applications,
			}
		case FETCHED_STUDENTS_APPLICATIONS_FAILURE:
			return {
				...state,
			}
		default:
			return state
	}
}

export default function application(state = initialApplicationsState, action) {
  switch(action.type) {
	  case FETCHING_STUDENT_APPLICATIONS:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action)
		}
	  case FETCHED_STUDENT_APPLICATIONS_SUCCESS:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action)
		}
	  case FETCHED_STUDENT_APPLICATIONS_FAILURE:
		return {
			...state,
			studentApplications: studentApplications(state.studentApplications, action),
			error: action.error
		}
	  default:
		return state
  }
}
