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

// ********** Profile List SUCCESS actions **************
const RETRIEVED_LIST = 'PROFILE.RETRIEVED_LIST'

const RETRIEVED_INDUSTRIES = 'PROFILE.LIST.RETRIEVED_INDUSTRIES'
const RETRIEVED_EMAIL_PREFERENCES = 'PROFILE.LIST.RETRIEVED_EMAIL_PREFERENCES'
const RETRIEVED_STUDENT_STATUSES = 'PROFILE.LIST.RETRIEVED_STUDENT_STATUSES'
const RETRIEVED_EDU_LEVELS = 'PROFILE.LIST.RETRIEVED_EDU_LEVELS'
const RETRIEVED_MAJORS = 'PROFILE.LIST.RETRIEVED_MAJORS'
const RETRIEVED_GENDERS = 'PROFILE.LIST.RETRIEVED_GENDERS'
const RETRIEVED_SPORTSTEAMS = 'PROFILE.LIST.RETRIEVED_SPORTSTEAMS'
const RETRIEVED_SCHOOL_CLUBS = 'PROFILE.LIST.RETRIEVED_SCHOOL_CLUBS'
const RETRIEVED_LANGUAGES = 'PROFILE.LIST.RETRIEVED_LANGUAGES'
const RETRIEVED_CITIES = 'PROFILE.LIST.RETRIEVED_CITIES'

// ********** Base form actions **************
const UPDATE_PROFILE_FIELD = 'PROFILE.UPDATE_PROFILE_FIELD'
const SAVE_PROFILE_ERROR = 'PROFILE.SAVE_PROFILE_ERROR'
const SAVE_PROFILE_SUCCESS = 'PROFILE.SAVE_PROFILE_SUCCESS'

const FETCHING_PROFILE_INFO_SUCCESS = 'FETCHING_PROFILE_INFO_SUCCESS'

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

export function listRetrieved(listName, listArray) {
  switch(listName) {
    case 'INDUSTRIES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_INDUSTRIES,
        list: listArray
      }
    }
    case 'EMAIL_PREFERENCES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_EMAIL_PREFERENCES,
        list: listArray
      }
    }
    case 'STUDENT_STATUSES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_STUDENT_STATUSES,
        list: listArray
      }
    }
    case 'EDU_LEVELS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_EDU_LEVELS,
        list: listArray
      }
    }
    case 'MAJORS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_MAJORS,
        list: listArray
      }
    }
    case 'GENDERS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_GENDERS,
        list: listArray
      }
    }
    case 'SPORTS_TEAMS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_SPORTSTEAMS,
        list: listArray
      }
    }
    case 'SCHOOL_CLUBS': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_SCHOOL_CLUBS,
        list: listArray
      }
    }
    case 'LANGUAGES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_LANGUAGES,
        list: listArray
      }
    }
    case 'CITIES': {
      return {
        type: RETRIEVED_LIST,
        listType: RETRIEVED_CITIES,
        list: listArray
      }
    }
    default:
      return state
  }
}

export function fetchingProfileInfoSuccess (isProfileCompleted, profileInfo, isAStudent) {
  return {
    type: FETCHING_PROFILE_INFO_SUCCESS,
    isProfileCompleted,
    profileInfo,
    isAStudent
  }
}

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialState = {
  employerProfile: {},
  studentProfile: {},
  lists: {},
  error: '',
  isSubmittingForm: false,
  isProfileCompleted: false
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

const initialListsState = {
  industries: [],
  emailPreferences: [],
  studentStatuses: [],
  eduLevels: [],
  majors: [],
  genders: [],
  sportsTeams: [],
  schoolClubs: [],
  languages: [],
  cities: []
}

// =======================================================
// ==================== REDUCERS =========================
// =======================================================

// ========= BASE PROFILE REDUCER

export default function profile (state = initialState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD:
      if(action.isAStudent) {
        return {
          ...state,
          studentProfile: studentProfile(state.studentProfile, action),
          error: ''
        }
      } else {
        return {
          ...state,
          employerProfile: employerProfile(state.employerProfile, action),
          error: ''
        }
      }
    case RETRIEVED_LIST:
      return {
        ...state,
        lists: lists(state.lists, action)
      }
    case FETCHING_PROFILE_INFO_SUCCESS: 
    if(action.isAStudent) {
      return {
        ...state,
        isProfileCompleted: action.isProfileCompleted,
        studentProfile: studentProfile(state.studentProfile, action)
      }
    } else {
      return {
        ...state,
        isProfileCompleted: action.isProfileCompleted,
        employerProfile: employerProfile(state.employerProfile, action)
      }
    }
    default :
      return state
  }
}

// =========== EMPLOYER PROFILE (SUB-REDUCER)

function employerProfile(state = initialEmployerProfileState, action) {
  switch(action.type) {
    case UPDATE_PROFILE_FIELD: 
      return {
        ...state,
        [action.fieldName]: action.newValue
      }
    case FETCHING_PROFILE_INFO_SUCCESS:
      return {
        ...state,
          companyName: action.profileInfo.company_name,
          industry: action.profileInfo.industry,
          website: action.profileInfo.website,
          description: action.profileInfo.description,
          employeeCount: action.profileInfo.employee_count,
          officeAddress: action.profileInfo.office_address,
          officeCity: action.profileInfo.office_city,
          officePostalCode: action.profileInfo.office_postal_code,
          logoUrl: action.profileInfo.logo
      }
    default: 
      return state
  }
}

// =========== STUDENT PROFILE (SUB-REDUCER)

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

// =========== LISTS (SUB-REDUCER)

function lists (state = initialListsState, action) {
  switch(action.listType) {
    case RETRIEVED_INDUSTRIES:
      return {
        ...state,
        industries: action.list
      }

    case RETRIEVED_EMAIL_PREFERENCES:
      return {
        ...state,
        emailPreferences: action.list
      }

    case RETRIEVED_STUDENT_STATUSES:
      return {
        ...state,
        studentStatuses: action.list
      }
      
    case RETRIEVED_EDU_LEVELS:
      return {
        ...state,
        eduLevels: action.list
      }   

    case RETRIEVED_MAJORS:
      return {
        ...state,
        majors: action.list
      }  

    case RETRIEVED_GENDERS:
      return {
        ...state,
        genders: action.list
      }  

    case RETRIEVED_SPORTSTEAMS:
      return {
        ...state,
        sportsTeams: action.list
      }   

    case RETRIEVED_SCHOOL_CLUBS:
      return {
        ...state,
        schoolClubs: action.list
      }  

    case RETRIEVED_LANGUAGES:
      return {
        ...state,
        languages: action.list
      }  

    case RETRIEVED_CITIES:
      return {
        ...state,
        cities: action.list
      }    
  }
}
