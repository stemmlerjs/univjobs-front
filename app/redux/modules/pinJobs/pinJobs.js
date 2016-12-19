import { getPinnedJobs, getJobTypes, getIndustries, studentApply, unPinAJob } from 'helpers/pinJobs'
import { findJobId } from 'helpers/utils' 
// =======================================================
// ====================== ACTIONS ========================
// =======================================================


/*NOTE: 
 *   Might have to rename the strings passed into variables,
 *   into a generic names, employer and student are going to be
 *   using the jobs, questions, and answers.
 * */
const FETCHING_PINNED_JOBS = 'FETCHING_PINNED_JOBS'
const FETCHED_PINNED_JOBS_SUCCESS = 'FETCHED_PINNED_JOBS_SUCCESS'
const FETCHED_PINNED_JOBS_FAILURE = 'FETCHED_PINNED_JOBS_FAILURE'

const PINJOBS_MODAL_CLICKED = 'PINJOBS_MODAL_CLICKED'
const PINJOBS_SHOW_MODAL = 'PINJOBS_SHOW_MODAL'
const PINJOBS_HIDE_MODAL = 'PINJOBS_HIDE_MODAL'

const PINJOBS_UNPIN_CLICKED = 'PINJOBS_UNPIN_CLICKED'
const PINJOBS_UNPIN_SUCCESS = 'PINJOBS_UNPIN_SUCCESS'
const PINJOBS_UNPIN_FAILURE = 'PINJOBS_UNPIN_FAILURE'

const PINJOBS_UPDATE_ANSWER_FIELD = 'PINJOBS_UPDATE_ANSWER_FIELD'

const PINJOBS_SUBMITTING_ANSWERS = 'PINJOBS_SUBMITTING_ANSWERS'
const PINJOBS_SUBMIT_ANSWERS_SUCCESS = 'PINJOBS_SUBMIT_ANSWERS_SUCCESS'
const PINJOBS_SUBMIT_ANSWERS_FAILURE = 'PINJOBS_SUBMIT_ANSWERS_FAILURE'

const PINJOBS_FETCHING_JOB_TYPES = 'PINJOBS_FETCHING_JOB_TYPES'
const PINJOBS_FETCHED_JOB_TYPES_SUCCESS = 'PINJOBS_FETCHED_JOB_TYPES_SUCCESS'
const PINJOBS_FETCHED_JOB_TYPES_FAILURE = 'PINJOBS_FETCHED_JOB_TYPES_FAILURE'

const PINJOBS_FETCHING_INDUSTRIES = 'PINJOBS_FETCHING_INDUSTRIES'
const PINJOBS_FETCHED_INDUSTRIES_SUCCESS = 'PINJOBS_FETCHED_INDUSTRIES_SUCCESS'
const PINJOBS_FETCHED_INDUSTRIES_FAILURE = 'PINJOBS_FETCHING_INDUSTRIES_FAILURE'

// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

/*TODO: Convert word error into failure
 *
 * */
/**************GET JOBS***********************/
export function fetchingPinnedJobs() {
  return {
	  type: FETCHING_PINNED_JOBS,
  }
}

export function fetchedPinnedJobsSuccess(jobs) {
   return {
	   type: FETCHED_PINNED_JOBS_SUCCESS,
	   jobs
  }
}

export function fetchedPinnedJobsFailure(error) {
  return {
	  type: FETCHED_PINNED_JOBS_FAILURE,
	  error
  }
}

/***************INDUSTRIES***************/
export function pinJobsFetchingIndustries() {
  return {
	  type: PINJOBS_FETCHING_INDUSTRIES,
  }
}

export function pinJobsFetchedIndustriesSuccess(industries) {
   return {
	   type: PINJOBS_FETCHED_INDUSTRIES_SUCCESS,
	   industries
  }
}

export function pinJobsFetchedIndustriesFailure(error) {
  return {
	  type: PINJOBS_FETCHED_INDUSTRIES_FAILURE,
	  error
  }
}
/***************JOB TYPES***************/
export function pinJobsFetchingJobTypes() {
  return {
	  type: PINJOBS_FETCHING_JOB_TYPES,
  }
}

export function pinJobsFetchedJobTypesSuccess(jobTypes) {
   return {
	   type: PINJOBS_FETCHED_JOB_TYPES_SUCCESS,
	   jobTypes
  }
}

export function pinJobsFetchedJobTypesFailure(error) {
  return {
	  type: PINJOBS_FETCHED_JOB_TYPES_FAILURE,
	  error
  }
}
/**************MODALS***********************/
export function pinJobsModalClicked(jobId) {
   return {
   	   type: PINJOBS_MODAL_CLICKED,
	   jobId
   }
}

export function pinJobsShowModal(job) {
   return {
   	  type: PINJOBS_SHOW_MODAL,
	  job,
   }
}

export function pinJobsHideModal() {
   return {
          type: PINJOBS_HIDE_MODAL
   }
}

/**************UNPINS***********************/
export function pinJobsUnPinClicked(job) {
   return {
   	  type: PINJOBS_UNPIN_CLICKED,
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
export function pinJobsUnPinSuccess(response) {
   return {
        type: PINJOBS_UNPIN_SUCCESS,
        fill: {color: 'none'},
	    response
   }
}

export function pinJobsUnPinFailure(error) {
   return {
        type: PINJOBS_UNPIN_FAILURE,
	    error,
   }
}


/**************UPDATE FIELDS***********************/
export function pinJobsUpdateAnswerField(fieldName, newValue) {
  return {
	  type: PINJOBS_UPDATE_ANSWER_FIELD,
	  newValue, 
	  fieldName
  }
}

/**************SUBMIT ANSWERS***********************/
/*NOTE:
 *  Pass the questionIds with the associated answers
 * */

function pinJobsSubmittingAnswers() {
    return {
	    type: PINJOBS_SUBMITTING_ANSWERS
    }
}

export function pinJobsSubmitAnswersSuccess(response) {
   return {
	    type: PINJOBS_SUBMIT_ANSWERS_SUCCESS,
	    response
   }
}

export function pinJobsSubmitAnswersFailure(error) {
   return {
        type: PINJOBS_SUBMIT_ANSWERS_FAILURE,
        error
   }
}

// =======================================================
// ===================== THUNK ===========================
// =======================================================
// REF: https://github.com/ReactjsProgram/Redux-Immutable/commit/c1b261b21150e472c6199dcda7bcb792a81678f8
// https://online.reacttraining.com/courses/redux-and-immutablejs/lectures/946352
//
export function handleGetPinnedJobs() {
    return function(dispatch) {
	    //ACTION: FETCHING_PINNED_JOBS 
	    dispatch(fetchingPinnedJobs())
	    return getPinnedJobs()
	        .then((resp) => 
		    //ACTION: FETCHED_PINNED_JOBS_SUCCESS
		    dispatch(fetchedPinnedJobsSuccess(resp))
	        )
	        .catch((err) => 
		    //ACTION: FETCHED_PINNED_JOBS_FAILURE
		    dispatch(fetchedPinnedJobsFailure(err))
	        )
    }//dispatch
}//handleGetPinnedJobs

export function handleGetIndustries() {
    return function(dispatch) {
	        dispatch(pinJobsFetchingIndustries)
	    return getIndustries()
	        .then((resp) => 
		        dispatch(pinJobsFetchedIndustriesSuccess(resp))
	        )
	        .catch((err) => 
		        dispatch(pinJobsFetchedIndustriesFailure(err))
	        )
    }//dispatch
}//handlePinJob

export function handleGetJobTypes() {
    return function(dispatch) {
	    dispatch(pinJobsFetchingJobTypes)
	    return getJobTypes()
	        .then((resp) => 
		        dispatch(pinJobsFetchedJobTypesSuccess(resp))
	        )
	        .catch((err) => 
		        dispatch(pinJobsFetchedJobTypesFailure(err))
	        )
    }//dispatch
}//handlePinJob

export function handleSubmitAnswers(answersData) {
    return function(dispatch) {
	// DISPATCH (SUBMITTING_ANSWERS)
	dispatch(pinJobsSubmittingAnswers())
	return studentApply(answersData)
	    .then((response) => {
	    	dispatch(pinJobsSubmitAnswersSuccess(response))
	    })
	    .catch((err) => {
		    dispatch(pinJobsSubmitAnswersFailure(err))
	    })
    }
}

export function handleUnPinJob(job) {
    return function(dispatch) {
	    //ACTION: PIN_CLICKED
	    dispatch(pinJobsUnPinClicked(job))
	    return unPinAJob({'job': job.id})
	        .then((resp) => 
		        dispatch(pinJobsUnPinSuccess(resp))
	        )
	        .catch((err) => 
		        dispatch(pinJobsUnPinFailure(err))
	        )
    }//dispatch
}//handleUnPinJob

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialPinJobsState = {
	jobs: [],
	questions: [],
	jobTypes: [],
	industries: [],
	answer: {},
	modal: {},
	lists: {},
	pin: {},
	error: '',
}

const initialPinState = {
	job: '',
	response: '',
	error: '',
	pinColor: ''
}
const initialModalState = {
	isClicked: false,
	isOpen: false,
	job: '',
	jobId: '',
}


const initialAnswerState = {
	jobId: '',
	questionOneId: '',
	questionTwoId: '',
	answerOne: '',
	answerTwo: '',
	response: '',
	isSubmitting: false,
	error: ''
}

   
// =======================================================
// ===================== REDUCERS ========================
// =======================================================

export default function pinJobs(state = initialPinJobsState, action) {
	switch(action.type) {
		case FETCHING_PINNED_JOBS:
			debugger
			return {
				...state,
			}		
		case FETCHED_PINNED_JOBS_SUCCESS:
			debugger
			return {
				...state,
				jobs: action.jobs,
			}
		case FETCHED_PINNED_JOBS_FAILURE:
			debugger
			return {
				...state,
				error: action.error,
			}
		case PINJOBS_FETCHING_INDUSTRIES:
			return {
				...state,
			}
		case PINJOBS_FETCHED_INDUSTRIES_SUCCESS:
			return {
				...state,
				industries: action.industries
			}
		case PINJOBS_FETCHED_INDUSTRIES_FAILURE:
			return {
				...state,
				error: action.error
			}
		case PINJOBS_FETCHING_JOB_TYPES:
			return {
				...state,
			}
		case PINJOBS_FETCHED_JOB_TYPES_SUCCESS:
			return {
				...state,
				jobTypes: action.jobTypes
			}
		case PINJOBS_FETCHED_JOB_TYPES_FAILURE:
			return {
				...state,
				jobTypes: action.jobTypes
			}
		case PINJOBS_MODAL_CLICKED:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case PINJOBS_SHOW_MODAL:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case PINJOBS_HIDE_MODAL:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case PINJOBS_UPDATE_ANSWER_FIELD:
			return {
				...state,
				answer: answer(state.answer, action)
			}
		case PINJOBS_SUBMITTING_ANSWERS:
			debugger
			return {
				...state,
				answer: answer(state.answer, action)
			}		
		case PINJOBS_SUBMIT_ANSWERS_SUCCESS:
			debugger
            /* Find the position of job applied to
             * Delete the instance of job in the state
             * */
			let index = state.jobs.data.findIndex((job) => job.id === state.modal.jobId)
			index != -1 ? state.jobs.data.splice(index, 1) : ''  
			return {
				...state,
				answer: answer(state.answer, action)
			}
		case PINJOBS_SUBMIT_ANSWERS_FAILURE:
			debugger
			return {
				...state,
				answer: answer(state.answer, action),
				error: action.error
			}
		case PINJOBS_UNPIN_CLICKED:
   			debugger
			return {
				...state,
				pin: pin(state.pin, action)
			}
		case PINJOBS_UNPIN_SUCCESS:
   			debugger
			//Change the attribute for pinned to true locally
            //Then delete it in pinnedJobs 
			state.jobs.data.map((job => {
			    if(job.id === action.response.data.job) {
			        job.pinned = false
			    }
			}))
            /* Find the position of job applied to
             * Delete the instance of job in the state
             * */
			let element = state.jobs.data.findIndex((job) => job.id === action.response.data.job)
			element != -1 ? state.jobs.data.splice(element, 1) : ''  
			return {
				...state,
				pin: pin(state.pin, action)
			}
		case PINJOBS_UNPIN_FAILURE:
   			debugger
			return {
				...state,
				pin: pin(state.pin, action),
				error: action.error
			}
		default:
			return state
	}
}

function pin(state = initialPinState, action) {	
	switch(action.type) {
		case PINJOBS_UNPIN_CLICKED:
   			debugger
			return {
			    ...state,
			    job: action.jobs
			}
		case PINJOBS_UNPIN_SUCCESS:
   			debugger
			return {
			    ...state,
			    response: action.response,
			    pinColor: action.fill,
			}
		case PINJOBS_UNPIN_FAILURE:
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

function modal(state = initialModalState, action) {	
	switch(action.type) {
		case PINJOBS_MODAL_CLICKED:
			return {
				...state,
				isClicked: true,
				jobId: action.jobId,
			}
		case PINJOBS_SHOW_MODAL:
			return {
				...state,
				isOpen: true,
				job: action.job,
			}
		case PINJOBS_HIDE_MODAL:
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
		case PINJOBS_UPDATE_ANSWER_FIELD:
			return {
				...state,
				[action.fieldName]: action.newValue,
			}
		case PINJOBS_SUBMITTING_ANSWERS:
			debugger
			return {
				...state,
				isSubmitting: true
			}		
		case PINJOBS_SUBMIT_ANSWERS_SUCCESS:
			debugger
			return {
				...state,
				response: action.response,
				isSubmitting: false
			}
		case PINJOBS_SUBMIT_ANSWERS_FAILURE:
			debugger
			return {
				...state,
				error: action.error,
				isSubmitting: false,
			}
		default:
			return state
	
	}

}

