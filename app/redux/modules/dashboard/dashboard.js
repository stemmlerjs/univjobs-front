import { getJobs, getIndustries, getJobTypes, pinJob, studentApply, unPinAJob } from 'helpers/dashboard'
// =======================================================
// ====================== ACTIONS ========================
// =======================================================

const GET_STUDENTS = 'EMPLOYER.GET_STUDENTS'
const GET_STUDENTS_SUCCESS = 'EMPLOYER.GET_STUDENTS_SUCCESS'
const GET_STUDENTS_FAILURE = 'EMPLOYER.GET_STUDENTS_FAILURE'

/*NOTE: 
 *   Might have to rename the strings passed into variables,
 *   into a generic names, employer and student are going to be
 *   using the jobs, questions, and answers.
 * */
const DASHBOARD_FETCHING_JOBS = 'DASHBOARD_FETCHING_JOBS'
const DASHBOARD_FETCHED_JOBS_SUCCESS = 'DASHBOARD_FETCHED_JOBS_SUCCESS'
const DASHBOARD_FETCHED_JOBS_FAILURE = 'DASHBOARD_FETCHED_JOBS_FAILURE'


const DASHBOARD_FETCHING_JOB_TYPES = 'DASHBOARD_FETCHING_JOB_TYPES'
const DASHBOARD_FETCHED_JOB_TYPES_SUCCESS = 'DASHBOARD_FETCHED_JOB_TYPES_SUCCESS'
const DASHBOARD_FETCHED_JOB_TYPES_FAILURE = 'DASHBOARD_FETCHED_JOB_TYPES_FAILURE'

const DASHBOARD_FETCHING_INDUSTRIES = 'DASHBOARD_FETCHING_INDUSTRIES'
const DASHBOARD_FETCHED_INDUSTRIES_SUCCESS = 'DASHBOARD_FETCHED_INDUSTRIES_SUCCESS'
const DASHBOARD_FETCHED_INDUSTRIES_FAILURE = 'DASHBOARD_FETCHING_INDUSTRIES_FAILURE'

const MODAL_CLICKED = 'MODAL_CLICKED'
const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'

const PIN_CLICKED = 'PIN_CLICKED'
const PIN_SUCCESS = 'PIN_SUCCESS'
const PIN_FAILURE = 'PIN_FAILURE'

const UNPIN_CLICKED = 'UNPIN_CLICKED'
const UNPIN_SUCCESS = 'UNPIN_SUCCESS'
const UNPIN_FAILURE = 'UNPIN_FAILURE'

const UPDATE_ANSWER_FIELD = 'UPDATE_ANSWER_FIELD'
const DASHBOARD_SUBMITTING_ANSWERS = 'DASHBOARD_SUBMITTING_ANSWERS'
const DASHBOARD_SUBMIT_ANSWERS_SUCCESS = 'DASHBOARD_SUBMIT_ANSWERS_SUCCESS'
const DASHBOARD_SUBMIT_ANSWERS_FAILURE = 'DASHBOARD_SUBMIT_ANSWERS_FAILURE'

// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

/*TODO: Convert word error into failure
 *
 * */

/**************GET STUDENTS***********************/
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

/**************GET JOBS***********************/
export function dashboardFetchingJobs() {
  return {
	  type: DASHBOARD_FETCHING_JOBS,
  }
}

export function dashboardFetchedJobsSuccess(jobs) {
   return {
	   type: DASHBOARD_FETCHED_JOBS_SUCCESS,
	   jobs
  }
}

export function dashboardFetchedJobsFailure(error) {
  return {
	  type: DASHBOARD_FETCHED_JOBS_FAILURE,
	  error
  }
}
/***************INDUSTRIES***************/
export function dashboardFetchingIndustries() {
  return {
	  type: DASHBOARD_FETCHING_INDUSTRIES,
  }
}

export function dashboardFetchedIndustriesSuccess(industries) {
   return {
	   type: DASHBOARD_FETCHED_INDUSTRIES_SUCCESS,
	   industries
  }
}

export function dashboardFetchedIndustriesFailure(error) {
  return {
	  type: DASHBOARD_FETCHED_INDUSTRIES_FAILURE,
	  error
  }
}

/***************JOB TYPES***************/
export function dashboardFetchingJobTypes() {
  return {
	  type: DASHBOARD_FETCHING_JOB_TYPES,
  }
}

export function dashboardFetchedJobTypesSuccess(jobTypes) {
   return {
	   type: DASHBOARD_FETCHED_JOB_TYPES_SUCCESS,
	   jobTypes
  }
}

export function dashboardFetchedJobTypesFailure(error) {
  return {
	  type: DASHBOARD_FETCHED_JOB_TYPES_FAILURE,
	  error
  }
}
/**************MODALS***********************/
export function modalClicked(jobId) {
   return {
   	   type: MODAL_CLICKED,
	   jobId
   }
}

export function showModal(job, questions) {
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

/**************PINS***********************/
function pinClicked(job) {
   return {
   	  type: PIN_CLICKED,
	  job,
   }
}

/* Returns a success reponse
 *  @params(response) an object containing:
 *         { pinned: True, 
 *           jobId: number 
 *         }
 *  NOTE: find the jobId and changed the pinned status to true in the store
 * */
function pinSuccess(response) {
   debugger
   return {
       type: PIN_SUCCESS,
       fill: {color: 'red'},
       response
   }
}

function pinFailure(error) {
   debugger
   return {
          type: PIN_FAILURE,
          error,
   }
}

/**************UNPINS***********************/
export function unPinClicked(job) {
   return {
   	  type: UNPIN_CLICKED,
	  job,
   }
}

/* Returns a success reponse
 *  @params(response) an object containing:
 *         { pinned: False, 
 *           jobId: number 
 *         }
 *  NOTE: find the jobId and changed the pinned status to true in the store
 * */
export function unPinSuccess(response) {
   return {
          type: UNPIN_SUCCESS,
	  fill: {color: 'none'},
	  response
   }
}

export function unPinFailure(error) {
   return {
          type: UNPIN_FAILURE,
	  error,
   }
}

/**************UPDATE FIELDS***********************/
export function updateAnswerField(fieldName, newValue) {
  return {
	  type: UPDATE_ANSWER_FIELD,
	  newValue, 
	  fieldName
  }
}

/**************SUBMIT ANSWERS***********************/
/*NOTE:
 *  Pass the questionIds with the associated answers
 * */

function dashboardSubmittingAnswers() {
	return {
		type: DASHBOARD_SUBMITTING_ANSWERS
	}
}

export function dashboardSubmitAnswersSuccess(response) {
   return {
   	  type: DASHBOARD_SUBMIT_ANSWERS_SUCCESS,
	  response
   }
}

export function dashboardSubmitAnswersFailure(error) {
   return {
      type: DASHBOARD_SUBMIT_ANSWERS_FAILURE,
      error
   }
}

// =======================================================
// ===================== THUNK ===========================
// =======================================================
// REF: https://github.com/ReactjsProgram/Redux-Immutable/commit/c1b261b21150e472c6199dcda7bcb792a81678f8
// https://online.reacttraining.com/courses/redux-and-immutablejs/lectures/946352
export function handleGetJobs() {
    return function(dispatch) {
	    //ACTION: FETCHING_PINNED_JOBS 
	    dispatch(dashboardFetchingJobs())
	    return getJobs()
	        .then((resp) => 
		        //ACTION: DASHBOARD_FETCHED_JOBS_SUCCESS
		        dispatch(dashboardFetchedJobsSuccess(resp))
	        )
	        .catch((err) => 
		        //ACTION: FETCHED_PINNED_JOBS_FAILURE
		        dispatch(dashboardFetchedJobsFailure(err))
	        )
    }//dispatch
}//handleGetJobs

export function handleGetIndustries() {
    return function(dispatch) {
	    //ACTION: FETCHING_INDUSTRIES
	    dispatch(dashboardFetchingIndustries)
	    return getIndustries()
	        .then((resp) => 
		    //ACTION: FETCHED_INDUSTRIES_SUCCESS
		    dispatch(dashboardFetchedIndustriesSuccess(resp))
	        )
	        .catch((err) => 
		    //ACTION: FETCHED_QUESTIONS_FAILURE
		    dispatch(dashboardFetchedIndustriesFailure(err))
	        )
    }//dispatch
}//handleGetIndustries

export function handleGetJobTypes() {
    return function(dispatch) {
	    //ACTION: FETCHING_INDUSTRIES
	    dispatch(dashboardFetchingJobTypes)
	    return getJobTypes()
	        .then((resp) => 
		    //ACTION: FETCHED_INDUSTRIES_SUCCESS
		    dispatch(dashboardFetchedJobTypesSuccess(resp))
	        )
	        .catch((err) => 
		    //ACTION: FETCHED_QUESTIONS_FAILURE
		    dispatch(dashboardFetchedJobTypesFailure(err))
	        )
    }//dispatch
}//handleGetIndustries

export function handlePinJob(job) {
    return function(dispatch) {
	    //ACTION: PIN_CLICKED
	    dispatch(pinClicked(job))
	    return pinAJob({'job': job.id})
	        .then((resp) => 
		    //ACTION: PIN_SUCCESS
		    
		    dispatch(pinSuccess(resp))
	        )
	        .catch((err) => 
		    //ACTION: PIN_FAILURE
		    dispatch(pinFailure(err))
	        )
    }//dispatch
}//handlePinJob

export function handleUnPinJob(job) {
    return function(dispatch) {
	    //ACTION: PIN_CLICKED
	    dispatch(unPinClicked(job))
	    return unPinAJob({'job': job.id})
	        .then((resp) => 
		    //ACTION: UNPIN_SUCCESS
		    
		    dispatch(unPinSuccess(resp))
	        )
	        .catch((err) => 
		    //ACTION: UNPIN_FAILURE
		    dispatch(unPinFailure(err))
	        )
    }//dispatch
}//handlePinJob

export function handleSubmitAnswers(answersData) {
    return function(dispatch) {
	// DISPATCH (SUBMITTING_ANSWERS)
	debugger
	dispatch(dashboardSubmittingAnswers())
	return studentApply(answersData)
	    .then((response) => {
		// DISPATCH (SUBMIT_ANSWERS_SUCCESS)
		dispatch(dashboardSubmitAnswersSuccess(response))
	    })
	    .catch((err) => {
		// DISPATCH (SUBMIT_ANSWERS_FAILURE)
		dispatch(dashboardSubmitAnswersFailure(err))
	    })
    }
}
// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialDashboardState = {
	studentDashboard: {},
	employerDashboard: {},
    jobTypes: [],
    industries: [],
	error: '',
	modal: {},
	answer: {}
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
	jobs: [],
	questions: [],
	pin: {},
}

const intialPinState = {
	job: '',
	response: '',
	error: '',
	pinColor: ''
}
const intialModalState = {
	isClicked: false,
	isOpen: false,
	jobId: '',
	job: ''
}

const intialAnswerState = {
	jobId: '',
	questionOneId: '',
	questionTwoId: '',
	answerOne: '',
	answerTwo: '',
	response: '',
	isSubmitting: false,
	error: '',
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
		case DASHBOARD_FETCHING_JOBS:
			return {
				...state,
				isFetching: true,
			}		
		case DASHBOARD_FETCHED_JOBS_SUCCESS:
			return {
				...state,
				jobs: action.jobs,
				isFetching: false,
			}
		case DASHBOARD_FETCHED_JOBS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.error,
			}
		case PIN_CLICKED:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case PIN_SUCCESS:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case PIN_FAILURE:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case UNPIN_CLICKED:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case UNPIN_SUCCESS:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case UNPIN_FAILURE:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		default:	
			return state 
	}
}


function pin(state = intialPinState, action) {	
	switch(action.type) {
		case PIN_CLICKED:
   			debugger
			return {
			    ...state,
			    job: action.jobs
			}
		case PIN_SUCCESS:
   			debugger
			//Change the attribute for pinned to true locally
			state.jobs.map((job => {
			    if(job.id === action.response.data.job) {
			        job.pinned = true
			    }
			}))
			return {
			    ...state,
			    response: action.response,
			    pinColor: action.fill,
			}
		case PIN_FAILURE:
   			debugger
			return {
			    ...state,
			    error: action.errors
			}
		case UNPIN_CLICKED:
   			debugger
			return {
			    ...state,
			    job: action.jobs
			}
		case UNPIN_SUCCESS:
   			debugger
			//Change the attribute for pinned to true locally
			state.jobs.map((job => {
			    if(job.id === action.response.data.job) {
			        job.pinned = false
			    }
			}))
			return {
			    ...state,
			    response: action.response,
			    pinColor: action.fill,
			}
		case UNPIN_FAILURE:
   			debugger
			return {
			    ...state,
			    error: action.errors
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
				questions: action.questions
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

function answer(state = initialAnswerState, action) {
	switch(action.type) {
		case UPDATE_ANSWER_FIELD:
			return {
				...state,
				[action.fieldName]: action.newValue,
			}
		case DASHBOARD_SUBMITTING_ANSWERS:
			return {
				...state,
				isSubmitting: true
			}		
		case DASHBOARD_SUBMIT_ANSWERS_SUCCESS:
			return {
				...state,
				resopnse: action.response,
				isSubmitting: false
			}
		case DASHBOARD_SUBMIT_ANSWERS_FAILURE:
			return {
				...state,
				error: action.error,
				isSubmitting: false,
			}
		default:
			return state
	
	}

}

export default function dashboard(state = initialDashboardState, action) {
	switch(action.type) {
		case DASHBOARD_FETCHING_JOBS:
			return {
				...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case DASHBOARD_FETCHED_JOBS_SUCCESS:
			return {
				...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case DASHBOARD_FETCHED_JOBS_FAILURE:
			return {
				...state,
				error: action.error
			}
		case DASHBOARD_FETCHING_INDUSTRIES:
			return {
				...state,
			}
		case DASHBOARD_FETCHED_INDUSTRIES_SUCCESS:
			return {
				...state,
				industries: action.industries
			}
		case DASHBOARD_FETCHED_INDUSTRIES_FAILURE:
			return {
				...state,
				error: action.error
			}
		case DASHBOARD_FETCHING_JOB_TYPES:
			return {
				...state,
			}
		case DASHBOARD_FETCHED_JOB_TYPES_SUCCESS:
			return {
				...state,
				jobTypes: action.jobTypes
			}
		case DASHBOARD_FETCHED_JOB_TYPES_FAILURE:
			return {
				...state,
				jobTypes: action.jobTypes
			}
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
		case UPDATE_ANSWER_FIELD:
			return {
				...state,
				answer: answer(state.answer, action)
			}
		case DASHBOARD_SUBMITTING_ANSWERS:
			debugger
			return {
				...state,
				answer: answer(state.answer, action)
			}		
		case DASHBOARD_SUBMIT_ANSWERS_SUCCESS:
			debugger
			let index = state.studentDashboard.jobs.findIndex((job) => job.id === state.modal.jobId)
			index != -1 ? state.studentDashboard.jobs.splice(index, 1) : ''  
			return {
				...state,
				answer: answer(state.answer, action)
			}
		case DASHBOARD_SUBMIT_ANSWERS_FAILURE:
			debugger
			return {
				...state,
				answer: answer(state.answer, action),
				error: action.error
			}
		case PIN_CLICKED:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case PIN_SUCCESS:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case PIN_FAILURE:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case UNPIN_CLICKED:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case UNPIN_SUCCESS:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case UNPIN_FAILURE:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		default:
			return state
	}
}
