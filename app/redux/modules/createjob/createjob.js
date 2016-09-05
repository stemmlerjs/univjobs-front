import {validateCreateJobFields} from 'helpers/createjob'

const PAGE_ERRORS_EXIST = 'PAGE_ERRORS_EXIST'
const NEXT_PAGE = 'NEXT_PAGE'
const PREV_PAGE = 'PREV_PAGE'
const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD'
const CLEAR_FORM = 'CLEAR_FORM'
const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS'
const CREATE_JOB_FAILURE = 'CREATE_JOB_FAILURE'
const RETRIEVED_LIST = 'CREATE_JOB.RETRIEVED_LIST'
const RETRIEVED_JOBTYPES = 'RETRIEVED_JOBTYPES'

export function updateFormField(fieldName, newValue, page) {
  return {
    type: UPDATE_FORM_FIELD,
    newValue, 
    fieldName,
    page
  }
}

export function pageErrorsExist(profileErrorsObj, error, page) {
  return {
    type: PAGE_ERRORS_EXIST,
    profileErrorsObj,
    error,
    page
  }
}

export function prevPage(currentPage) {
  return {
    type: PREV_PAGE,
    newPage: currentPage - 1
  }
}

export function nextPage(currentPage, formProps) {
  return function(dispatch) {
    if(currentPage != 4) {
      validateCreateJobFields(currentPage, formProps, (errorsExist, pageErrors) => {
        if(errorsExist) {

            // DISPATCH - SAVE_PROFILE_ERROR
            dispatch(pageErrorsExist(pageErrors, [
              "Can't advance to next page.",
              'Please fill in missing fields first.'
            ], currentPage))

          } else {
            // Go to next page
            dispatch({
              type: NEXT_PAGE,
              newPage: currentPage + 1
            })
          }
      })
    }
  }
}

export function clearForm() {
  return {
    type: CLEAR_FORM
  }
}

export function listRetrieved(listName, listArray) {
  switch(listName) {
    case 'JOBTYPES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_JOBTYPES,
        list: listArray
      }
    }
    default:
      return;
  }
}

// TODO: CREATE NEW JOB THUNK
export function createNewJob(props) {
  return function(dispatch) {

  }
}

/* ==============================================================
*   CREATE JOB FORM (MAIN)
* ===============================================================
*/

const createJobFormInitialState = {
  currentPage: 1,
  page1: {},
  page2: {},
  page3: {},
  page4: {},
  errorsExist: false,
  errors: '',
  lists: {}
}

export default function createJob (state = createJobFormInitialState, action) {
  switch(action.type) {
    case UPDATE_FORM_FIELD:
      switch(action.page) {
        case 1:
          return {
            ...state,
            page1: page1(state.page1, action),
            errorsExist: false
          }
        case 2:
          return {
            ...state,
            page2: page2(state.page2, action),
            errorsExist: false
          }
        case 3:
          return {
            ...state,
            page3: page3(state.page3, action),
            errorsExist: false
          }
        case 4:
          return {
            ...state,
            page4: page4(state.page4, action),
            errorsExist: false
          }
        default:
          return state;
      }
    case PAGE_ERRORS_EXIST:
      switch(action.page) {
        case 1:
          return {
            ...state,
            page1: page1(state.page1, action),
            errors: action.error,
            errorsExist: true
          }
        case 2:
          return {
            ...state,
            page2: page2(state.page2, action),
            errors: action.error,
            errorsExist: true
          }
        case 3:
          return {
            ...state,
            page3: page3(state.page3, action),
            errors: action.error,
            errorsExist: true
          }
        case 4:
          return {
            ...state,
            page4: page4(state.page4, action),
            errors: action.error,
            errorsExist: true
          }
        default:
          return state
      }
    case CLEAR_FORM:
      return {
        currentPage: 1,
        page1: {},
        page2: {},
        page3: {},
        page4: {},
        errorsExist: false,
        errors: '', 
        lists: {}
      }
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: action.newPage
      }
    case PREV_PAGE:
      return {
        ...state,
        currentPage: action.newPage
      }
    case RETRIEVED_LIST:
      return {
        ...state,
        lists: lists(state.lists, action)
      }
    default:
      return state
  }
}

/* ===============================================================
*   PAGE 1
* ================================================================
*/

const page1InitialState = {
  jobTitle: '',
  isPayingJob: true,
  startDate: '',
  responsibilities: '',
  qualifications: '',
  desiredSkills: '',
  internshipLocation: '',
  remoteWork: false,
  compensation: '',
  MAX_CHARS_responsibilities: 5500,
  MAX_CHARS_qualifications: 1400,
  MAX_CHARS_desiredSkills: 100,
  MAX_CHARS_compensation: 380,
  page1PropsErrorMap: {}
}

const page1PropsErrorMap = {
  jobTitle: false,
  isPayingJob: false,
  startDate: false,
  responsibilities: false,
  qualifications: false,
  desiredSkills: false,
  internshipLocation: false,
  remoteWork: false,
  compensation: false,
}

function page1(state = page1InitialState, action) {
  switch(action.type) {
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
        page1PropsErrorMap: page1Errors(state.page1PropsErrorMap, action)
      }
    case PAGE_ERRORS_EXIST:
      return {
        ...state,
        page1PropsErrorMap: action.profileErrorsObj
      }
    default:
      return;
  }
}

function page1Errors(state = page1PropsErrorMap, action) {
  switch(action.type) {
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.fieldName]: false
      }
  }
}

/* ===============================================================
*   PAGE 2
* ================================================================
*/

const page2InitialState = {
  question1: '',
  question2: '',
  MAX_CHARS_question: 150,
  page2PropsErrorMap: {}
}

function page2(state = page2InitialState, action) {
  switch(action.type) {
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
        page2PropsErrorMap: page2Errors(state.page2PropsErrorMap, action)
      }
    case PAGE_ERRORS_EXIST:
      return {
        ...state,
        page2PropsErrorMap: action.profileErrorsObj
      }
    default:
      return;
  }
}

const page2PropsErrorMap = {
  question1: false,
  question2: false,
}

function page2Errors(state = page2PropsErrorMap, action) {
  switch(action.type) {
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.fieldName]: false
      }
  }
}

/* ===============================================================
*   PAGE 3
* ================================================================
*/

const page3InitialState = {
  maxApplicants: 20,
  costPerApplicant: 0,
  allowStudentsOption: {},
  applyFilters: false,
  filter1: false,
  filter2: false,
  filter3: false,
  filter4: false,
  filter5: false,
  filter6: false,
  filter7: false,
  filter8: false,
  page3PropsErrorMap: {}
}

function page3(state = page3InitialState, action) {
  switch(action.type) {
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.fieldName]: action.newValue,
        page3PropsErrorMap: page3Errors(state.page3PropsErrorMap, action)
      }
    case PAGE_ERRORS_EXIST:
      return {
        ...state,
        page3PropsErrorMap: action.profileErrorsObj
      }
    default:
      return;
  }
}

const page3PropsErrorMap = {
  maxApplicants: false
}

function page3Errors(state = page3PropsErrorMap, action) {
  switch(action.type) {
    case UPDATE_FORM_FIELD:
      return {
        ...state,
        [action.fieldName]: false
      }
  }
}

/* ===============================================================
*   PAGE 4
* ================================================================
*/

const page4InitialState = {
  numberOfCampuses: 1,
  numberOfPremiums: 0,
  promoCode: '',
  page4PropsErrorMap: {}
}

/* ===============================================================
*   LISTS
* ================================================================
*/

const listsInitialState = {
  jobTypes: []
}

function lists(state = listsInitialState, action) {
  switch(action.type) {
    case RETRIEVED_LIST:
      switch(action.listType) {
        case RETRIEVED_JOBTYPES:
          return {
            ...state,
            jobTypes: action.list
          } 
        default:
          return state
      }
    default:
      return;
  }
}
