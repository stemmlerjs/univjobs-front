
import { getJobs, pinAJob, 
    studentApply, unPinAJob, getAllStudents } from 'helpers/dashboard'
import { getJobTypes, getIndustries } from 'helpers/lists'

import inviteStudentModal from './inviteStudentModal'
import jobAppModal from './jobAppModal'

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

const DASHBOARD_MODAL_CLICKED = 'DASHBOARD_MODAL_CLICKED'
const DASHBOARD_SHOW_MODAL = 'DASHBOARD_SHOW_MODAL'
const DASHBOARD_HIDE_MODAL = 'DASHBOARD_HIDE_MODAL'

const DASHBOARD_PIN_CLICKED = 'DASHBOARD_PIN_CLICKED'
const DASHBOARD_PIN_SUCCESS = 'DASHBOARD_PIN_SUCCESS'
const DASHBOARD_PIN_FAILURE = 'DASHBOARD_PIN_FAILURE'

const DASHBOARD_UNPIN_CLICKED = 'DASHBOARD_UNPIN_CLICKED'
const DASHBOARD_UNPIN_SUCCESS = 'DASHBOARD_UNPIN_SUCCESS'
const DASHBOARD_UNPIN_FAILURE = 'DASHBOARD_UNPIN_FAILURE'

const DASHBOARD_UPDATE_ANSWER_FIELD = 'DASHBOARD_UPDATE_ANSWER_FIELD'
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
function attemptGetStudents () {
	return {
		type: GET_STUDENTS
	}
}

function getStudentsSuccess(students) {
	return {
		type: GET_STUDENTS_SUCCESS,
		students
	}
}

function getStudentsFailure(error) {
	return {
		type: GET_STUDENTS_FAILURE,
		error
	}
}

 /*
  * getStudents
  *
  * Redux thunk to get all the students.
  */

  export function getStudents () {
    return function (dispatch) {

     /*
      * Begin attempting to get all students
      */

      dispatch(attemptGetStudents())

      getAllStudents()

       /*
        * If we were able to get all the students, we'll 
        * dispatch the success action and we'll add the students
        * to the store.
        */

        .then((result) => {

          var students = result.data.students

          dispatch(getStudentsSuccess(students))

        })

       /*
        * If something bad happened, then we'll dispatch the failure 
        * action and show an error to the store.
        */

        .catch((err) => {

          dispatch(getStudentsFailure())

        })


    }
  }

/**************GET JOBS***********************/
function dashboardFetchingJobs() {
  return {
	  type: DASHBOARD_FETCHING_JOBS,
  }
}

function dashboardFetchedJobsSuccess(jobs) {
   return {
	   type: DASHBOARD_FETCHED_JOBS_SUCCESS,
	   jobs
  }
}

function dashboardFetchedJobsFailure(error) {
  return {
	  type: DASHBOARD_FETCHED_JOBS_FAILURE,
	  error
  }
}
/***************INDUSTRIES***************/
function dashboardFetchingIndustries() {
  return {
	  type: DASHBOARD_FETCHING_INDUSTRIES,
  }
}

function dashboardFetchedIndustriesSuccess(industries) {
   return {
	   type: DASHBOARD_FETCHED_INDUSTRIES_SUCCESS,
	   industries
  }
}

function dashboardFetchedIndustriesFailure(error) {
  return {
	  type: DASHBOARD_FETCHED_INDUSTRIES_FAILURE,
	  error
  }
}

/***************JOB TYPES***************/
function dashboardFetchingJobTypes() {
  return {
	  type: DASHBOARD_FETCHING_JOB_TYPES,
  }
}

function dashboardFetchedJobTypesSuccess(jobTypes) {
   return {
	   type: DASHBOARD_FETCHED_JOB_TYPES_SUCCESS,
	   jobTypes
  }
}

function dashboardFetchedJobTypesFailure(error) {
  return {
	  type: DASHBOARD_FETCHED_JOB_TYPES_FAILURE,
	  error
  }
}

/**************PINS***********************/
function dashboardPinClicked(job) {
   return {
   	  type: DASHBOARD_PIN_CLICKED,
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
function dashboardPinSuccess(response) {
   return {
       type: DASHBOARD_PIN_SUCCESS,
       fill: {color: 'red'},
       response
   }
}

function dashboardPinFailure(error) {
   return {
          type: DASHBOARD_PIN_FAILURE,
          error,
   }
}

/**************UNPINS***********************/
export function dashboardUnPinClicked(job) {
   return {
   	  type: DASHBOARD_UNPIN_CLICKED,
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
export function dashboardUnPinSuccess(response) {
   return {
        type: DASHBOARD_UNPIN_SUCCESS,
	    fill: {color: 'none'},
        response
   }
}

export function dashboardUnPinFailure(error) {
   return {
        type: DASHBOARD_UNPIN_FAILURE,
        error,
   }
}

/**************UPDATE FIELDS***********************/
export function dashboardUpdateAnswerField(fieldName, newValue) {
  return {
	    type: DASHBOARD_UPDATE_ANSWER_FIELD,
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
	      .then((response) => {
				  var industries = response.data.industries;

			  	//ACTION: FETCHED_INDUSTRIES_SUCCESS
		    	dispatch(dashboardFetchedIndustriesSuccess(industries))
			  })
        .catch((err) => {

          //ACTION: FETCHED_QUESTIONS_FAILURE
          dispatch(dashboardFetchedIndustriesFailure(err))
          
			})
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
	    dispatch(dashboardPinClicked(job))
	    return pinAJob({'job': job.id})
	        .then((resp) => 
		        dispatch(dashboardPinSuccess(resp))
	        )
	        .catch((err) => 
		        dispatch(dashboardPinFailure(err))
	        )
    }//dispatch
}//handlePinJob

export function handleUnPinJob(job) {
    return function(dispatch) {
	    //ACTION: PIN_CLICKED
	    dispatch(dashboardUnPinClicked(job))
	    return unPinAJob({'job': job.id})
	        .then((resp) => 
		        dispatch(dashboardUnPinSuccess(resp))
	        )
	        .catch((err) => 
		        dispatch(dashboardUnPinFailure(err))
	        )
    }//dispatch
}//handlePinJob


const SHOW_MAX_APPLICANTS = "EMPLOYER.DASHBOARD.SHOW_MAX_APPLICANTS"

function showMaxApplicants (job) {
	return {
		type: SHOW_MAX_APPLICANTS,
	}
}


export function displayMaxApplicants (job) {
	return {

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

 /*
  * [EMPLOYER] Dashboard - Employer 
  *
  * The Employer dashboard shows a list of students.
  * Employers can invite student and browse them.
  *
  */

const initialEmployerDashboardState = {
	students: [],
	inviteStudentModal: {},
	studentProfileModal: {},
	searchField: '',
	campusFilter: '',
	gradDateFilter: ''
}

const initialStudentDashboardState = {
	isFetching: false,
  jobAppModal: {},
	error: '',
	jobs: [],
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

const initialStudentProfileModalState = {
	open: false,
	student: {}
}

const STUDENT_PROFILE_MODAL_OPEN = 'STUDENT_PROFILE_MODAL_OPEN'

export function openStudentProfileModal(student) {
   return {
      type: STUDENT_PROFILE_MODAL_OPEN,
      student
   }
}



// =======================================================
// ===================== REDUCERS ========================
// =======================================================

function studentProfileModal (state = initialStudentProfileModalState, action) {
	switch(action.type) {
		case STUDENT_PROFILE_MODAL_OPEN:
			return {
				...state,
				open: true,
				student: action.student
			}
		default:
			return state
	}
}

function employerDashboard(state = initialEmployerDashboardState, action) {
	switch(action.type) {
    case inviteStudentModal.actions.INVITING_STUDENT_TO_JOB:
      return {
        ...state,
        inviteStudentModal: inviteStudentModal.reducers.inviteStudentModal(state.inviteStudentModal, action)
      }
    case inviteStudentModal.actions.INVITING_STUDENT_TO_JOB_SUCCESS:
      return {
        ...state,
        inviteStudentModal: inviteStudentModal.reducers.inviteStudentModal(state.inviteStudentModal, action)
      }
    case inviteStudentModal.actions.INVITING_STUDENT_TO_JOB_FAILURE:
      return {
        ...state,
        inviteStudentModal: inviteStudentModal.reducers.inviteStudentModal(state.inviteStudentModal, action)
      }
    case inviteStudentModal.actions.INVITE_STUDENT_MODAL_OPEN:
      return {
        ...state,
        inviteStudentModal: inviteStudentModal.reducers.inviteStudentModal(state.inviteStudentModal, action)
      }
    case inviteStudentModal.actions.SELECT_JOB_INVITE_MODAL:
      return {
        ...state,
        inviteStudentModal: inviteStudentModal.reducers.inviteStudentModal(state.inviteStudentModal, action)
      }
		case STUDENT_PROFILE_MODAL_OPEN:
			return {
				...state,
				studentProfileModal: studentProfileModal(state.studentProfileModal, action)
			}
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
    
   /*
    * APPLY TO JOB MODAL [Student Dashboard]
    *
    * Actions include opening the modal, updating the answers and submitting
    * the application to the job.
    */

    case jobAppModal.actions.UPDATE_ANSWER_TEXT:
      return {
        ...state,
        jobAppModal: jobAppModal.reducers.jobAppModal(state.jobAppModal, action)
      }
    case jobAppModal.actions.JOB_APP_MODAL_OPEN:
      return {
        ...state,
        jobAppModal: jobAppModal.reducers.jobAppModal(state.jobAppModal, action)
      }
    case jobAppModal.actions.APPLYING_TO_JOB:
      return {
        ...state,
        jobAppModal: jobAppModal.reducers.jobAppModal(state.jobAppModal, action)
      }
    case jobAppModal.actions.APPLYING_TO_JOB_SUCCESS:
      return {
        ...state,
        jobAppModal: jobAppModal.reducers.jobAppModal(state.jobAppModal, action)
      }
    case jobAppModal.actions.APPLYING_TO_JOB_FAILURE:
      return {
        ...state,
        jobAppModal: jobAppModal.reducers.jobAppModal(state.jobAppModal, action)
      }

      // ==========

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
		case DASHBOARD_PIN_CLICKED:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case DASHBOARD_PIN_SUCCESS:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case DASHBOARD_PIN_FAILURE:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case DASHBOARD_UNPIN_CLICKED:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case DASHBOARD_UNPIN_SUCCESS:
   			debugger
			return {
				...state,
				pin: pin(state, action)
			}
		case DASHBOARD_UNPIN_FAILURE:
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
		case DASHBOARD_PIN_CLICKED:
   			debugger
			return {
			    ...state,
			    job: action.jobs
			}
		case DASHBOARD_PIN_SUCCESS:
   			debugger
			//Change the attribute for pinned to true locally
			state.jobs.data.map((job => {
			    if(job.id === action.response.data.job) {
			        job.pinned = true
			    }
			}))
			return {
			    ...state,
			    response: action.response,
			    pinColor: action.fill,
			}
		case DASHBOARD_PIN_FAILURE:
   			debugger
			return {
			    ...state,
			    error: action.errors
			}
		case DASHBOARD_UNPIN_CLICKED:
   			debugger
			return {
			    ...state,
			    job: action.jobs
			}
		case DASHBOARD_UNPIN_SUCCESS:
   			debugger
			//Change the attribute for pinned to true locally
			state.jobs.data.map((job => {
			    if(job.id === action.response.data.job) {
			        job.pinned = false
			    }
			}))
			return {
			    ...state,
			    response: action.response,
			    pinColor: action.fill,
			}
		case DASHBOARD_UNPIN_FAILURE:
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
		case DASHBOARD_MODAL_CLICKED:
			return {
				...state,
				isClicked: true,
				jobId: action.jobId,
			}
		case DASHBOARD_SHOW_MODAL:
			return {
				...state,
				isOpen: true,
				job: action.job,
			}
		case DASHBOARD_HIDE_MODAL:
			return {
				...state,
				isClicked: false,
				isOpen: false,
			}
		default:	
			return state
	}
}

function answer(state = initialAnswerState, action) {
	switch(action.type) {
		case DASHBOARD_UPDATE_ANSWER_FIELD:
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

   /*
    * APPLY TO JOB MODAL [Student Dashboard]
    *
    * Actions include opening the modal, updating the answers and submitting
    * the application to the job.
    */

    case jobAppModal.actions.UPDATE_ANSWER_TEXT:
      return {
        ...state,
        studentDashboard: studentDashboard(state.studentDashboard, action)
      }
    case jobAppModal.actions.JOB_APP_MODAL_OPEN:
      return {
        ...state,
        studentDashboard: studentDashboard(state.studentDashboard, action)
      }
    case jobAppModal.actions.APPLYING_TO_JOB:
      return {
        ...state,
        studentDashboard: studentDashboard(state.studentDashboard, action)
      }
    case jobAppModal.actions.APPLYING_TO_JOB_SUCCESS:
      return {
        ...state,
        studentDashboard: studentDashboard(state.studentDashboard, action)
      }
    case jobAppModal.actions.APPLYING_TO_JOB_FAILURE:
      return {
        ...state,
        studentDashboard: studentDashboard(state.studentDashboard, action)
      }
    
   /*
    * INVITE STUDENT MODAL [Employer Dashboard]
    */

    case inviteStudentModal.actions.INVITING_STUDENT_TO_JOB:
      return {
        ...state,
        employerDashboard: employerDashboard(state.employerDashboard, action)
      }
    case inviteStudentModal.actions.INVITING_STUDENT_TO_JOB_SUCCESS:
      return {
        ...state,
        employerDashboard: employerDashboard(state.employerDashboard, action)
      }
    case inviteStudentModal.actions.INVITING_STUDENT_TO_JOB_FAILURE:
      return {
        ...state,
        employerDashboard: employerDashboard(state.employerDashboard, action)
      }
    case inviteStudentModal.actions.INVITE_STUDENT_MODAL_OPEN:
      return {
        ...state,
        employerDashboard: employerDashboard(state.employerDashboard, action)
      }
    case inviteStudentModal.actions.SELECT_JOB_INVITE_MODAL:
      return {
        ...state,
        employerDashboard: employerDashboard(state.employerDashboard, action)
      }
		case STUDENT_PROFILE_MODAL_OPEN:
			return {
				...state,
				employerDashboard: employerDashboard(state.employerDashboard, action)
			}
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
				error: action.error
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
		case DASHBOARD_MODAL_CLICKED:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case DASHBOARD_SHOW_MODAL:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case DASHBOARD_HIDE_MODAL:
			return {
				...state,
				modal: modal(state.modal, action)
			}
		case DASHBOARD_UPDATE_ANSWER_FIELD:
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
            /*  - Find the position of the job in the state array which was applied to
             *  - Delete the job in the state after finding the job
             *  
             * */
			let index = state.studentDashboard.jobs.data.findIndex((job) => job.id === state.modal.jobId)
			index != -1 ? state.studentDashboard.jobs.data.splice(index, 1) : ''  
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
		case DASHBOARD_PIN_CLICKED:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case DASHBOARD_PIN_SUCCESS:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case DASHBOARD_PIN_FAILURE:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case DASHBOARD_UNPIN_CLICKED:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case DASHBOARD_UNPIN_SUCCESS:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		case DASHBOARD_UNPIN_FAILURE:
   			debugger
			return {
			        ...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}
		default:
			return state
	}
}