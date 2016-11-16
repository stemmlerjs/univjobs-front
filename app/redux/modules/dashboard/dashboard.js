import { studentApply } from 'helpers/dashboard'
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
const FETCHING_JOBS = 'STUDENT.FETCHING_JOBS'
const FETCHED_JOBS_SUCCESS = 'STUDENT.FETCHED_JOBS_SUCCESS'
const FETCHED_JOBS_FAILURE = 'STUDENT.FETCHED_JOBS_FAILURE'

const FETCHING_QUESTIONS = 'STUDENT.FETCHING_QUESTIONS'
const FETCHED_QUESTIONS_SUCCESS = 'STUDENT.FETCHED_QUESTIONS_SUCCESS'
const FETCHED_QUESTIONS_FAILURE = 'STUDENT.FETCHED_QUESTIONS_FAILURE'

const MODAL_CLICKED = 'MODAL_CLICKED'
const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'

const UPDATE_ANSWER_FIELD = 'UPDATE_ANSWER_FIELD'
const SUBMITTING_ANSWERS = 'STUDENT.SUBMITTING_ANSWERS'
const SUBMIT_ANSWERS_SUCCESS = 'STUDENT.SUBMIT_SUCCESS'
const SUBMIT_ANSWERS_FAILURE = 'STUDENT.SUBMIT_FAILURE'

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

/*TODO: Convert word error into failure
 *
 * */

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

export function fetchedJobFailure(error) {
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

export function updateAnswerField(fieldName, newValue) {
  return {
	  type: UPDATE_ANSWER_FIELD,
	  newValue, 
	  fieldName
  }
}
/*NOTE:
 *  Pass the questionIds with the associated answers
 * */
export function submitAnswers(answersData) {
	return function(dispatch) {
		const promise = new Promise((resolve, reject) => {
			// DISPATCH (SUBMITTING_ANSWERS)
			dispatch(submittingAnswers())

			studentApply(answersData)
				.then((response) => {

					// DISPATCH (SUBMIT_ANSWERS_SUCCESS)
						dispatch(submitAnswersSuccess())

						resolve()

				})
				.catch((err) => {
					debugger;
					// DISPATCH (SUBMIT_ANSWERS_FAILURE)
						dispatch(submitAnswersFailure())

						reject()
				})
		})
	}
}

function submittingAnswers() {
	return {
		type: SUBMITTING_ANSWERS
	}
}

export function submitAnswersSuccess(serverMessage) {
   return {
   	  type: SUBMIT_ANSWERS_SUCCESS,
	  	serverMessage
   }
}

export function submitAnswersFailure(error) {
   return {
      type: SUBMIT_ANSWERS_FAILURE,
	  	error
   }
}
// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialDashboardState = {
	studentDashboard: {},
	employerDashboard: {},
	error: '',
	modal: {},
	lists: {},
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
}

const intialModalState = {
	isClicked: false,
	isOpen: false,
	jobId: '',
	job: ''
}

const initialListState = {
	jobTypes: [],
	industries: []
}

const intialAnswersState = {
	jobId: '',
	questionOneId: '',
	questionTwoId: '',
	answerOne: '',
	answerTwo: '',
	serverMessage: '',
	isSubmitting: false
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

function lists (state = initialListState, action) {
	switch(action.listType) {
	    case FETCHED_INDUSTRIES:
		return {
		    ...state,
		    industries: action.list
		}

	    case FETCHED_JOB_TYPES:
		return {
		    ...state,
		    jobTypes: action.list
		}
	    default: 
		return state

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
			return {
				...state,
				isSubmitting: true
			}		
		case SUBMIT_ANSWERS_SUCCESS:
			return {
				...state,
				serverMessage: action.serverMessage,
				isSubmitting: false
			}
		case SUBMIT_ANSWERS_FAILURE:
			return {
				...state,
				serverMessage: action.serverMessage,
				isSubmitting: false,
				error: action.error
			}
		default:
			return state
	
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
		case FETCHED_QUESTIONS_SUCCESS:
			return {
				...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case FETCHED_QUESTIONS_FAILURE:
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
		case UPDATE_ANSWER_FIELD:
			return {
				...state,
				answer: answer(state.answer, action)
			}
		case SUBMITTING_ANSWERS:
			return {
				...state,
				answer: answer(state.answer, action)
			}		
		case SUBMIT_ANSWERS_SUCCESS:
			return {
				...state,
				answer: answer(state.answer, action)
			}
		case SUBMIT_ANSWERS_FAILURE:
			return {
				...state,
				answer: answer(state.answer, action)
			}
		default:
			return state
	}
}
