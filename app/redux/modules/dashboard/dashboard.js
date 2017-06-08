
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

const DASHBOARD_UPDATE_ANSWER_FIELD = 'DASHBOARD_UPDATE_ANSWER_FIELD'
const DASHBOARD_SUBMITTING_ANSWERS = 'DASHBOARD_SUBMITTING_ANSWERS'
const DASHBOARD_SUBMIT_ANSWERS_SUCCESS = 'DASHBOARD_SUBMIT_ANSWERS_SUCCESS'
const DASHBOARD_SUBMIT_ANSWERS_FAILURE = 'DASHBOARD_SUBMIT_ANSWERS_FAILURE'

const UPDATE_FILTER_SETTINGS = 'UPDATE_FILTER_SETTINGS'

const TOGGLE_FILTER_MENU = 'TOGGLE_FILTER_MENU'

// =======================================================
// ================== ACTIONS CREATORS ===================
// =======================================================

export function toggleFilterMenu () {
	return {
		type: TOGGLE_FILTER_MENU
	}
}

export function updateFilterSettings (filterConfig, isAStudent) {
	return {
		type: UPDATE_FILTER_SETTINGS,
		filterConfig,
		isAStudent
	}
}


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
	filterConfig: {
		jobType: {
			'otg': true,
			'summer': true,
			'winter': true,
			'rep': true,
			'freelance': true,
			'pt': true
		},
		keyword: '',
		city: ''
	},
	filterMenuOpen: false
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

		 /*
			* We need to display the student's sports in a comma delimited list.
			* Create this string and append it for the 'sports'
			*/
			
			var sportsString = "";
			var sports = Object.keys(action.student.sports);

			for (var i = 0; i < sports.length; i++) {
				if (i !== sports.length - 1) {
					sportsString = sportsString + action.student.sports[sports[i]] + ", "
				} else {
					sportsString = sportsString + action.student.sports[sports[i]]
				}
			}

			action.student.sportsString = sportsString

		 /*
			* Additionally, we have to do the same thing with clubs.
			*/

			var clubsString = "";
			var clubs = Object.keys(action.student.clubs)

			for (var j = 0; j < clubs.length; j++) {
				if (j !== clubs.length - 1) {
					clubsString = clubsString + action.student.clubs[clubs[j]] + ", "
				} else {
					clubsString = clubsString + action.student.clubs[clubs[j]]
				}
			}

			action.student.clubsString = clubsString

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
		 * Filtering
		 */

		case TOGGLE_FILTER_MENU:
			return {
				...state,
				filterMenuOpen: !state.filterMenuOpen
			}

		case UPDATE_FILTER_SETTINGS:
			return {
				...state,
				filterConfig: action.filterConfig
			}
    
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
		default:	
			return state 
	}
}


export default function dashboard(state = initialDashboardState, action) {
	switch(action.type) {

	/*
	 * [DASHBOARD]: Filtering jobs
	 */

		case TOGGLE_FILTER_MENU:
			return {
				...state,
				studentDashboard: studentDashboard(state.studentDashboard, action)
			}

		case UPDATE_FILTER_SETTINGS:
			if (action.isAStudent) {
				return {
					studentDashboard: studentDashboard(state.studentDashboard, action)
				}	
			}

			else {
				return {
					employerDashboard: employerDashboard(state.employerDashboard, action)
				}	
			}

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
		default:
			return state
	}
}