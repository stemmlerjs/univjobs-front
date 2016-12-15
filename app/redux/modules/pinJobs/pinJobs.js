import { getPinnedJobs, getQuestions, getJobTypes, 
	getIndustries, studentApply } from 'helpers/pinJobs'
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
const FETCHED_PINNED_JOBS_FAILURE = 'FETCHED.PINNED_JOBS_FAILURE'

const FETCHING_QUESTIONS = 'FETCHING_QUESTIONS'
const FETCHED_QUESTIONS_SUCCESS = 'FETCHED_QUESTIONS_SUCCESS'
const FETCHED_QUESTIONS_FAILURE = 'FETCHED_QUESTIONS_FAILURE'

const MODAL_CLICKED = 'MODAL_CLICKED'
const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'
const MODAL_FAILURE = 'HIDE_MODAL'

const UNPIN_CLICKED = 'UNPIN_CLICKED'
const UNPIN_SUCCESS = 'UNPIN_SUCCESS'
const UNPIN_FAILURE = 'UNPIN_FAILURE'

const UPDATE_ANSWER_FIELD = 'UPDATE_ANSWER_FIELD'

const SUBMITTING_ANSWERS = 'SUBMITTING_ANSWERS'
const SUBMIT_ANSWERS_SUCCESS = 'SUBMIT_ANSWERS_SUCCESS'
const SUBMIT_ANSWERS_FAILURE = 'SUBMIT_ANSWERS_FAILURE'

const FETCHING_JOB_TYPES = 'FETCHING_JOB_TYPES'
const FETCHED_JOB_TYPES_SUCCESS = 'FETCHED_JOB_TYPES_SUCCESS'
const FETCHED_JOB_TYPES_FAILURE = 'FETCHED_JOB_TYPES_FAILURE'

const FETCHING_INDUSTRIES = 'FETCHING_INDUSTRIES'
const FETCHED_INDUSTRIES_SUCCESS = 'FETCHED_INDUSTRIES_SUCCESS'
const FETCHED_INDUSTRIES_FAILURE = 'FETCHING_INDUSTRIES_FAILURE'

const FETCHING_LIST = 'FETCHING_LIST'
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
/**************GET QUESTIONS**********************/
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

/***************INDUSTRIES***************/
export function fetchingIndustries() {
  return {
	  type: FETCHING_INDUSTRIES,
  }
}

export function fetchedIndustriesSuccess(industries) {
   return {
	   type: FETCHED_INDUSTRIES_SUCCESS,
	   industries
  }
}

export function fetchedIndustriesFailure(error) {
  return {
	  type: FETCHED_INDUSTRIES_FAILURE,
	  error
  }
}
/***************JOB TYPES***************/
export function fetchingJobTypes() {
  return {
	  type: FETCHING_JOB_TYPES,
  }
}

export function fetchedJobTypesSuccess(jobTypes) {
   return {
	   type: FETCHED_JOB_TYPES_SUCCESS,
	   jobTypes
  }
}

export function fetchedJobTypesFailure(error) {
  return {
	  type: FETCHED_JOB_TYPES_FAILURE,
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

export function hideModal() {
   return {
          type: HIDE_MODAL
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

export function unPinFailure(response) {
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

function submittingAnswers() {
    return {
	type: SUBMITTING_ANSWERS
    }
}

export function submitAnswersSuccess(response) {
   return {
	type: SUBMIT_ANSWERS_SUCCESS,
	response
   }
}

export function submitAnswersFailure(response) {
   return {
        type: SUBMIT_ANSWERS_FAILURE,
        response
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

export function handleGetQuestions() {
    return function(dispatch) {
	    //ACTION: FETCHING_QUESTIONS
	    dispatch(fetchingQuestions())
	    return getQuestions()
	        .then((resp) => 
		    //ACTION: FETCHED_QUESTIONS_SUCCESS
		    dispatch(fetchedQuestionsSuccess(resp))
	        )
	        .catch((err) => 
		    //ACTION: FETCHED_QUESTIONS_FAILURE
		    dispatch(fetchedQuestionsFailure(err))
	        )
    }//dispatch
}//handlePinJob

export function handleGetIndustries() {
    return function(dispatch) {
	    //ACTION: FETCHING_INDUSTRIES
	    dispatch(fetchingIndustries)
	    return getIndustries()
	        .then((resp) => 
		    //ACTION: FETCHED_INDUSTRIES_SUCCESS
		    dispatch(fetchedIndustriesSuccess(resp))
	        )
	        .catch((err) => 
		    //ACTION: FETCHED_QUESTIONS_FAILURE
		    dispatch(fetchedIndustriesFailure(err))
	        )
    }//dispatch
}//handlePinJob

export function handleGetJobTypes() {
    return function(dispatch) {
	    //ACTION: FETCHING_JOB_TYPES
	    dispatch(fetchingJobTypes)
	    return getJobTypes()
	        .then((resp) => 
		    //ACTION: FETCHED_JOB_TYPES_SUCCESS
		    dispatch(fetchedJobTypesSuccess(resp))
	        )
	        .catch((err) => 
		    //ACTION: FETCHED_JOB_TYPES_FAILURE
		    dispatch(fetchedJobTypesFailure(err))
	        )
    }//dispatch
}//handlePinJob

//TODO: Refactor
export function handleSubmitAnswers(answersData) {
    return function(dispatch) {
	// DISPATCH (SUBMITTING_ANSWERS)
	dispatch(submittingAnswers())
	return studentApply(answersData)
	    .then((response) => {
		// DISPATCH (SUBMIT_ANSWERS_SUCCESS)
		dispatch(submitAnswersSuccess(response))
	    })
	    .catch((err) => {
		// DISPATCH (SUBMIT_ANSWERS_FAILURE)
		dispatch(submitAnswersFailure(err))
	    })
    }
}

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

const intialPinState = {
	job: '',
	response: '',
	error: '',
	pinColor: ''
}
const intialModalState = {
	isClicked: false,
	isOpen: false,
	job: '',
	jobId: '',
	questions: '' 
}


const intialAnswersState = {
	jobId: '',
	questionOneId: '',
	questionTwoId: '',
	answerOne: '',
	answerTwo: '',
	response: '',
	isSubmitting: false
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
		case FETCHING_QUESTIONS:
			return {
				...state,
			}		
		case FETCHED_QUESTIONS_SUCCESS:
			return {
				...state,
				questions: action.questions,
			}
		case FETCHED_QUESTIONS_FAILURE:
			return {
				...state,
				error: action.error,
			}
		case FETCHING_INDUSTRIES:
			return {
				...state,
			}
		case FETCHED_INDUSTRIES_SUCCESS:
			return {
				...state,
				industries: action.industries
			}
		case FETCHED_INDUSTRIES_FAILURE:
			return {
				...state,
				error: action.error
			}
		case FETCHING_JOB_TYPES:
			return {
				...state,
			}
		case FETCHED_JOB_TYPES_SUCCESS:
			return {
				...state,
				jobTypes: action.jobTypes
			}
		case FETCHED_JOB_TYPES_FAILURE:
			return {
				...state,
				jobTypes: action.jobTypes
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
		case SUBMITTING_ANSWERS:
			debugger
			return {
				...state,
				answer: answer(state.answer, action)
			}		
		case SUBMIT_ANSWERS_SUCCESS:
			debugger
			/*TODO: Not working index return is undefined
			 * The following sequence will happen once this scope is executed
			 * 	- Find & return jobIds index
			 * 	- Delete job in store
			 * 	- Database delete of the job pinned automatically
			 * 	  In NewJobApplicantView
			 **/
			let index = state.jobs.data.findIndex(() => state.modal.jobId)
			index != -1 ? state.jobs.data.splice(index, 1) : ''  
			return {
				...state,
				answer: answer(state.answer, action)
			}
		case SUBMIT_ANSWERS_FAILURE:
			debugger
			return {
				...state,
				answer: answer(state.answer, action),
				error: action.error
			}
		case UNPIN_CLICKED:
   			debugger
			return {
				...state,
				pin: pin(state.pin, action)
			}
		case UNPIN_SUCCESS:
   			debugger
			return {
				...state,
				pin: pin(state.pin, action)
			}
		case UNPIN_FAILURE:
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

function pin(state = intialPinState, action) {	
	switch(action.type) {
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
		case SUBMITTING_ANSWERS:
			debugger
			return {
				...state,
				isSubmitting: true
			}		
		case SUBMIT_ANSWERS_SUCCESS:
			debugger


			return {
				...state,
				response: action.response,
				isSubmitting: false
			}
		case SUBMIT_ANSWERS_FAILURE:
			debugger
			return {
				...state,
				response: action.response,
				isSubmitting: false,
			}
		default:
			return state
	
	}

}
