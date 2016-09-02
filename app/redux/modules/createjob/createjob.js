
const PAGE_ERRORS_EXIST = 'PAGE_ERRORS_EXIST'
const NEXT_PAGE = 'NEXT_PAGE'
const PREV_PAGE = 'PREV_PAGE'
const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD'
const CLEAR_FORM = 'CLEAR_FORM'

export function updateFormField(fieldName, newValue, page) {
  return {
    type: UPDATE_FORM_FIELD,
    newValue, 
    fieldName,
    page
  }
}

// TODO: continue here
export function nextPage(currentPage, formProps) {
  return function(dispatch) {
    if(currentPage != 4) {
      validateCreateJobFields(currentPage, formProps, (errorsExist, pageErrors) => {

      })
    }
  }
}

export function clearForm() {
  return {
    type: CLEAR_FORM
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
  errors: ''
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
            errorsExist: true
          }
        case 2:
          return {
            ...state,
            page2: page2(state.page2, action),
            errorsExist: true
          }
        case 3:
          return {
            ...state,
            page3: page3(state.page3, action),
            errorsExist: true
          }
        case 4:
          return {
            ...state,
            page4: page4(state.page4, action),
            errorsExist: true
          }
        default:
          return state
      }
    case CLEAR_FORM:
      return {
        state: createJobFormInitialState
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
        [action.fieldName]: action.newValue
      }
    case PAGE_ERRORS_EXIST:
      return {
        ...state,
        page1PropsErrorMap: page1Errors(state.page1PropsErrorMap, action)
      }
    default:
      return;
  }
}

function page1Errors(state = page1PropsErrorMap, action) {
  switch(action.type) {
    case PAGE_ERRORS_EXIST:
      return {
        ...state, 

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
  page2PropsErrorMap: {}
}

/* ===============================================================
*   PAGE 3
* ================================================================
*/

const page3InitialState = {
  maxApplicants: '',
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
