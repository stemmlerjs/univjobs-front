// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const FETCHING_STUDENT_APPLICATIONS = 'FETCHING_STUDENT_APPLICATIONS'
const FETCHED_STUDENT_APPLICATIONS_SUCCESS = 'FETCHED_STUDENT_APPLICATIONS_SUCCESS'
const FETCHED_STUDENT_APPLICATIONS_FAILURE = 'FETCHED_STUDENT_APPLICATIONS_FAILURE'


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

export function applicationModalClicked(applicationId) {
   return {
   	   type: MODAL_CLICKED,
	   applicationId
   }
}

export function applicationShowModal(application) {
   return {
   	  type: SHOW_MODAL,
	  application
   }
}

export function applicationHideModal(applicationId) {
   return {
          type: HIDE_MODAL,
	  applicationId
   }
}
// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialApplicationsState = {
	studentApplications: {},
	applicationModal: {},
	//hired: {},
	//invited: {},
	error: ''
}

const initialStudentApplicationsState = {
	applications: [],
	isFetching: false,
	error: '',
}

const intialModalState = {
	isClicked: false,
	isOpen: false,
	applicationId: '',
	application: ''
}
// ================================================================== //
// ======================= APPLICATION REDUCER ======================= //
// ================================================================== //
function studentApplications(state = intialStudentApplicationsState, action) {
	switch(action.type) {
		case FETCHING_STUDENT_APPLICATIONS:
			return {
				...state,
				isFetching: true,
			}
		case FETCHED_STUDENT_APPLICATIONS_SUCCESS:
			return {
				...state,
				applications: action.applications,
				isFetching: false,
			}
		case FETCHED_STUDENTS_APPLICATIONS_FAILURE:
			return {
				...state,
				isFetching: false,
			}
		default:
			return state
	}
}

function applicationModal(state = intialModalState, action) {	
	switch(action.type) {
		case MODAL_CLICKED:
			return {
				...state,
				isClicked: true,
				applicationId: action.applicationId,
			}
		case SHOW_MODAL:
			return {
				...state,
				isOpen: true,
				application: action.application,
			}
		case HIDE_MODAL:
			return {
				...state,
				applicationId: action.applicationId,
				isClicked: false,
				isOpen: false,
			}
		default:	
			return {
				state
			}//switch
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
	  case MODAL_CLICKED:
		return {
			...state,
			applicationModal: applicationModal(state.applicationModal, action)
		}
	  case SHOW_MODAL:
		return {
			...state,
			applicationModal: applicationModal(state.applicationModal, action)
		}
	  case HIDE_MODAL:
		return {
			...state,
			applicationModal: applicationModal(state.applicationModal, action)
		}
	  default:
		return state
  }
}
