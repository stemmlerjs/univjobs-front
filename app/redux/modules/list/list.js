import { employerProfilePUT, employerProfilePATCH, validateEmployerProfileFields,
  studentProfilePUT, studentProfilePATCH, validateStudentProfileFields,
  compareToSnapshot, getUserInfo } from 'helpers/profile'
import { toISO } from 'helpers/utils'
import * as retrieve from 'helpers/lists'

// =======================================================
// ==================== ACTIONS ==========================
// =======================================================
// ********** Profile List SUCCESS actions **************
const LIST_FETCHING_CITIES = 'LIST.FETCHING_CITIES'
const LIST_FETCHING_EDU_LEVELS = '.LIST.FETCHING_EDU_LEVELS'
const LIST_FETCHING_EMAIL_PREFERENCES = 'LIST.FETCHING_EMAIL_PREFERENCES'
const LIST_FETCHING_INDUSTRIES = 'LIST.FETCHING_INDUSTRIES'
const LIST_FETCHING_GENDERS = 'LIST.FETCHING_GENDERS'
const LIST_FETCHING_LANGUAGES = 'LIST.FETCHING_LANGUAGES'
const LIST_FETCHING_MAJORS = 'LIST.FETCHING_MAJORS'
const LIST_FETCHING_SCHOOL_CLUBS = 'LIST.FETCHING_SCHOOL_CLUBS'
const LIST_FETCHING_STUDENT_STATUS = 'LIST.FETCHING_STUDENT_STATUS'
const LIST_FETCHING_SPORTS = 'LIST.FETCHING_SPORTS'

// ********** Profile List SUCCESS actions **************
const FETCHED_LIST = 'FETCHED_LIST'
const LIST_FETCHED_CITIES_SUCCESS = 'LIST.FETCHED_CITIES_SUCCESS'
const LIST_FETCHED_EDU_LEVELS_SUCCESS = '.LIST.FETCHED_EDU_LEVELS_SUCCESS'
const LIST_FETCHED_EMAIL_PREFERENCES_SUCCESS = 'LIST.FETCHED_EMAIL_PREFERENCES_SUCCESS'
const LIST_FETCHED_INDUSTRIES_SUCCESS = 'LIST.FETCHED_INDUSTRIES_SUCCESS'
const LIST_FETCHED_GENDERS_SUCCESS = 'LIST.FETCHED_GENDERS_SUCCESS'
const LIST_FETCHED_LANGUAGES_SUCCESS = 'LIST.FETCHED_LANGUAGES_SUCCESS'
const LIST_FETCHED_MAJORS_SUCCESS = 'LIST.FETCHED_MAJORS_SUCCESS'
const LIST_FETCHED_SCHOOL_CLUBS_SUCCESS = 'LIST.FETCHED_SCHOOL_CLUBS_SUCCESS'
const LIST_FETCHED_SPORTS_SUCCESS = 'LIST.FETCHED_SPORTS_SUCCESS'
const LIST_FETCHED_STUDENT_STATUS_SUCCESS = 'LIST.FETCHED_STUDENT_STATUS_SUCCESS'

// ********** Profile List FAILURE actions **************
const LIST_FETCHED_CITIES_FAILURE = 'LIST.FETCHED_CITIES_FAILURE'
const LIST_FETCHED_EDU_LEVELS_FAILURE = 'LIST.FETCHED_EDU_LEVELS_FAILURE'
const LIST_FETCHED_EMAIL_PREFERENCES_FAILURE = 'LIST.FETCHED_EMAIL_PREFERENCES_FAILURE'
const LIST_FETCHED_INDUSTRIES_FAILURE = 'LIST.FETCHED_INDUSTRIES_FAILURE'
const LIST_FETCHED_GENDERS_FAILURE = 'LIST.FETCHED_GENDERS_FAILURE'
const LIST_FETCHED_LANGUAGES_FAILURE = 'LIST.FETCHED_LANGUAGES_FAILURE'
const LIST_FETCHED_MAJORS_FAILURE = 'LIST.FETCHED_MAJORS_FAILURE'
const LIST_FETCHED_SCHOOL_CLUBS_FAILURE = 'LIST.FETCHED_SCHOOL_CLUBS_FAILURE'
const LIST_FETCHED_STUDENT_STATUS_FAILURE = 'LIST.FETCHED_STUDENT_STATUS_FAILURE'
const LIST_FETCHED_SPORTS_FAILURE = 'LIST.FETCHED_SPORTS_FAILURE'

export function fetchingCity() {
    return {
        type: LIST_FETCHING_CITY
    }
}
export function fetchedCitySuccess(city) {
  return {
    type: LIST_FETCHED_CITY_SUCCESS,
    city
  }
}

export function fetchedCityFailure(error) {
  return {
    type: LIST_FETCHED_CITY_FAILURE,
    error
  }
}

export function fetchingEduLevels() {
    return {
        type: LIST_FETCHING_EDU_LEVELS
    }
}

export function fetchedEduLevelsSuccess(educationLevels) {
  return {
    type: LIST_FETCHED_EDU_LEVELS_SUCCESS,
    educationLevels
  }
}

export function fetchedEduLevelsFailure(error) {
  return {
    type: LIST_FETCHED_EDU_LEVELS_FAILURE,
    error
  }
}

export function fetchingEmailPreferences() {
    return {
        type: LIST_FETCHING_EMAIL_PREFERENCES
    }
}
export function fetchedEmailPreferencesSuccess(emailPreferences) {
  return {
    type: LIST_FETCHED_EMAIL_PREFERENCES_SUCCESS,
    emailPreferences
  }
}

export function fetchedEmailPreferencesFailure(error) {
  return {
    type: LIST_FETCHED_EMAIL_PREFERENCES_FAILURE,
    error
  }
}

export function fetchingIndustries() {
    return {
        type: LIST_FETCHING_INDUSTRIES
    }
}
export function fetchedIndustriesSuccess(industries) {
  return {
    type: LIST_FETCHED_INDUSTRIES_SUCCESS,
    industries
  }
}

export function fetchedIndustriesFailure(error) {
  return {
    type: LIST_FETCHED_INDUSTRIES_FAILURE,
    error
  }
}

export function fetchingGenders() {
    return {
        type: LIST_FETCHING_GENDERS
    }
}
export function fetchedGendersSuccess(genders) {
  return {
    type: LIST_FETCHED_GENDERS_SUCCESS,
    genders
  }
}

export function fetchedGendersFailure(error) {
  return {
    type: LIST_FETCHED_GENDERS_FAILURE,
    error
  }
}

export function fetchingLanguages() {
    return {
        type: LIST_FETCHING_LANGUAGES
    }
}
export function fetchedLanguagesSuccess(languages) {
  return {
    type: LIST_FETCHED_LANGUAGES_SUCCESS,
    languages
  }
}

export function fetchedLanguagesFailure(error) {
  return {
    type: LIST_FETCHED_LANGUAGES_FAILURE,
    error
  }
}

export function fetchingMajors() {
    return {
        type: LIST_FETCHING_MAJORS
    }
}
export function fetchedMajorsSuccess(majors) {
  return {
    type: LIST_FETCHED_MAJORS_SUCCESS,
    majors
  }
}

export function fetchedMajorsFailure(error) {
  return {
    type: LIST_FETCHED_MAJORS_FAILURE,
    error
  }
}

export function fetchingSchoolClubs() {
    return {
        type: LIST_FETCHING_SCHOOL_CLUBS
    }
}
export function fetchedSchoolClubsSuccess(schoolClubs) {
  return {
    type: LIST_FETCHED_SCHOOL_CLUBS_SUCCESS,
    schoolClubs
  }
}

export function fetchedSchoolClubsFailure(error) {
  return {
    type: LIST_FETCHED_SCHOOL_CLUBS_FAILURE,
    error
  }
}

export function fetchingStudentStatus() {
    return {
        type: LIST_FETCHING_STUDENT_STATUS
    }
}
export function fetchedStudentStatusSuccess(studentStatus) {
  return {
    type: LIST_FETCHED_STUDENT_STATUS_SUCCESS,
    studentStatus
  }
}

export function fetchedStudentStatusFailure(error) {
  return {
    type: LIST_FETCHED_STUDENT_STATUS_FAILURE,
    error
  }
}

export function fetchingSports() {
    return {
        type: LIST_FETCHING_SPORTS
    }
}
export function fetchedSportsSuccess(sports) {
  return {
    type: LIST_FETCHED_SPORTS_SUCCESS,
    sports
  }
}

export function fetchedSportsFailure(error) {
  return {
    type: LIST_FETCHED_SPORTS_FAILURE,
    error
  }
}

// =======================================================
// ===================== THUNK ===========================
// =======================================================
// REF: https://github.com/ReactjsProgram/Redux-Immutable/commit/c1b261b21150e472c6199dcda7bcb792a81678f8
// https://online.reacttraining.com/courses/redux-and-immutablejs/lectures/946352
//
//
//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleGetEmailPref(dispatch) {
    return function(dispatch) {
        dispatch(fetchingEmailPreferences())
        return retrieve.getEmailPref()
            .then((resp) => 
               dispatch(fetchedEmailPreferencesSuccess(resp.data.emailPrefs))
            )
            .catch((err) => 
                dispatch(fetchedEmailPreferencesFailure(err))
            )
    }
}

//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleGetStudentStatus(dispatch) {
    return function(dispatch) {
        dispatch(fetchingStudentStatus())
        return retrieve.getStudentStatus()
            .then((resp) => 
               dispatch(fetchedStudentStatusSuccess(resp.data.status))
            )
            .catch((err) => 
               dispatch(fetchedStudentStatusFailure(err))
            )
    }
}

//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleGetEduLevels(dispatch) {
    return function(dispatch) {
        dispatch(fetchingEduLevels())
        return retrieve.getEducationLevels()
            .then((resp) => 
               dispatch(fetchedEduLevelsSuccess(resp.data.eduLevels))
            )
            .catch((err) => 
               dispatch(fetchedEduLevelsFailure(err))
            )
    }
}

//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleGetMajors(dispatch) {
    return function(dispatch) {
        dispatch(fetchingMajors())
        return retrieve.getMajors()
            .then((resp) => 
               dispatch(fetchedMajorsSuccess(resp.data.majors))
            )
            .catch((err) => 
               dispatch(fetchedMajorsFailure(err))
            )
    }
}

//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleGetGenders(dispatch) {
    return function(dispatch) {
        dispatch(fetchingGenders())
        return retrieve.getGenders()
            .then((resp) => 
               dispatch(fetchedGendersSuccess(resp.data.genders))
            )
            .catch((err) => 
               dispatch(fetchedGendersFailure(err))
            )
    }
}

//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleGetLanguages(dispatch) {
    return function(dispatch) {
        dispatch(fetchingLanguages())
        return retrieve.getLanguages()
            .then((resp) => 
               dispatch(fetchedLanguagesSuccess(resp.data.languages))
            )
            .catch((err) => 
               dispatch(fetchedLanguagessFailure(err))
            )
    }
}

//NOTE: Refer to signupform redux line 78, passing dispatch
export function handleGetSports(dispatch) {
    return function(dispatch) {
        dispatch(fetchingSports())
        return retrieve.getSports()
            .then((resp) => 
               dispatch(fetchedSportsSuccess(resp.data.sports))
            )
            .catch((err) => 
               dispatch(fetchedSportsFailure(err))
            )
    }
}

export function handleGetClubs(dispatch) {
    return function(dispatch) {
        dispatch(fetchingSchoolClubs())
        return retrieve.getClubs()
            .then((resp) => 
               dispatch(fetchedSchoolClubsSuccess(resp.data.clubs))
            )
            .catch((err) => 
               dispatch(fetchedSchoolClubsFailure(err))
            )
    }
}
// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialState = {
  cities: [],
  genders: [],
  industries: [],
  educationLevels: [],
  emailPreferences: [],
  languages: [],
  majors: [],
  studentStatus: [],
  sports: [],
  schoolClubs: [],
  error: ''
}

// =======================================================
// ==================== REDUCERS =========================
// =======================================================

export default function list (state = initialState, action) {
  switch(action.type) {
    case LIST_FETCHING_INDUSTRIES:
      return {
        ...state,
      }
    case LIST_FETCHED_INDUSTRIES_SUCCESS:
      return {
        ...state,
        industries: action.list
      }
    case LIST_FETCHED_INDUSTRIES_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LIST_FETCHING_EMAIL_PREFERENCES:
      return {
        ...state,
      }
    case LIST_FETCHED_EMAIL_PREFERENCES_SUCCESS:
      return {
        ...state,
        emailPreferences: action.emailPreferences
      }
    case LIST_FETCHED_EMAIL_PREFERENCES_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LIST_FETCHING_STUDENT_STATUS:
      return {
        ...state,
      }
    case LIST_FETCHED_STUDENT_STATUS_SUCCESS:
      return {
        ...state,
        studentStatus: action.studentStatus
      }
    case LIST_FETCHED_STUDENT_STATUS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LIST_FETCHING_EDU_LEVELS:
      return {
        ...state,
      }
    case LIST_FETCHED_EDU_LEVELS_SUCCESS:
      return {
        ...state,
        educationLevels: action.educationLevels
      }
    case LIST_FETCHED_EDU_LEVELS_FAILURE:
      return {
        ...state,
        error
      }
    case LIST_FETCHING_MAJORS:
      return {
        ...state,
      }
    case LIST_FETCHED_MAJORS_SUCCESS:
      return {
        ...state,
        majors: action.majors
      }
    case LIST_FETCHED_MAJORS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LIST_FETCHING_GENDERS:
      return {
        ...state,
      }
    case LIST_FETCHED_GENDERS_SUCCESS:
      return {
        ...state,
        genders: action.genders
      }
    case LIST_FETCHED_GENDERS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LIST_FETCHING_SPORTS:
      return {
        ...state,
      }
    case LIST_FETCHED_SPORTS_SUCCESS:
      return {
        ...state,
        sports: action.sports
      }
    case LIST_FETCHED_SPORTS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LIST_FETCHING_SCHOOL_CLUBS:
      return {
        ...state
      }
    case LIST_FETCHED_SCHOOL_CLUBS_SUCCESS:
      return {
        ...state,
        schoolClubs: action.schoolClubs
      }
    case LIST_FETCHED_SCHOOL_CLUBS_FAILURE:
      return {
        ...state,
        error
      }
    case LIST_FETCHING_LANGUAGES:
      return {
        ...state,
      }
    case LIST_FETCHED_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: action.languages
      }
    case LIST_FETCHED_LANGUAGES_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LIST_FETCHING_CITIES:
      return {
        ...state,
      }
    case LIST_FETCHED_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.list
      }
    case LIST_FETCHED_CITIES_FAILURE:
      return {
        ...state,
        error
      }
    default :
      return state
  }
}
