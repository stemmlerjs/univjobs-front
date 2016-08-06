// =======================================================
// ==================== ACTIONS ==========================
// =======================================================

// ********** Profile List GETTER actions **************
const GET_INDUSTRIES = 'PROFILE.LIST.GET_INDUSTRIES'
const GET_EMAIL_PREFERENCES = 'PROFILE.LIST.GET_EMAIL_PREFERENCES'
const GET_STUDENT_STATUSES = 'PROFILE.LIST.GET_STUDENT_STATUSES'
const GET_EDU_LEVELS = 'PROFILE.LIST.GET_EDU_LEVELS'
const GET_MAJORS = 'PROFILE.LIST.GET_MAJORS'
const GET_GENDERS = 'PROFILE.LIST.GET_GENDERS'
const GET_SPORTSTEAMS = 'PROFILE.LIST.GET_SPORTSTEAMS'
const GET_SCHOOL_CLUBS = 'PROFILE.LIST.GET_SCHOOL_CLUBS'
const GET_LANGUAGES = 'PROFILE.LIST.GET_LANGUAGES'
const GET_CITIES = 'PROFILE.LIST.GET_CITIES'

// ********** Base form actions **************
const UPDATE_PROFILE_FIELD = 'PROFILE.UPDATE_PROFILE_FIELD'
const SAVE_PROFILE_ERROR = 'PROFILE.SAVE_PROFILE_ERROR'
const SAVE_PROFILE_SUCCESS = 'PROFILE.SAVE_PROFILE_SUCCESS'

// =======================================================
// ================== ACTION CREATORS ====================
// =======================================================

export function updateProfileField(fieldName, newValue, isAStudent) {
  return {
    type: UPDATE_PROFILE_FIELD,
    fieldName,
    newValue,
    isAStudent
  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialState = {
  employerProfile: {},
  studentProfile: {},
  error: '',
  isSubmittingForm: false
}

const initialEmployerProfileState = {
  companyName: '',
  industry: '',
  website: '',
  description: '',
  employeeCount: '',
  officeAddress: '',
  officeCity: '',
  officePostalCode: '',
  logoUrl: ''
}

const initialStudentProfileState = {

}

// =======================================================
// ==================== REDUCER ==========================
// =======================================================

export default function profile (state = initialState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      if(action.isAStudent) {
        return {
          ...state,
          studentProfile: studentProfile(state.studentProfile, action.newValue),
          error: ''
        }
      } else {
        return {
          ...state,
          [action.fieldName]: employerProfile(state.employerProfile, action.newValue),
          error: ''
        }
      }
    default :
      return state
  }
}

function employerProfile(state = initialEmployerProfileState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD: 
      return {
        ...state,
        [action.fieldName]: action.newValue
      }
    default: 
      return state
  }
}

function studentProfile(state = initialEmployerProfileState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD: 
      return {
        ...state,
        [action.fieldName]: action.newValue
      }
    default: 
      return state
  }
}