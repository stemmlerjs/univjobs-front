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
const LIST_FETCHING_STUDENT_STATUSES = 'LIST.FETCHING_STUDENT_STATUSES'
const LIST_FETCHING_SPORTSTEAMS = 'LIST.FETCHING_SPORTSTEAMS'

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
const LIST_FETCHED_SPORTSTEAMS_SUCCESS = 'LIST.FETCHED_SPORTSTEAMS_SUCCESS'
const LIST_FETCHED_STUDENT_STATUSES_SUCCESS = 'LIST.FETCHED_STUDENT_STATUSES_SUCCESS'

// ********** Profile List FAILURE actions **************
const LIST_FETCHED_CITIES_FAILURE = 'LIST.FETCHED_CITIES_FAILURE'
const LIST_FETCHED_EDU_LEVELS_FAILURE = '.LIST.FETCHED_EDU_LEVELS_FAILURE'
const LIST_FETCHED_EMAIL_PREFERENCES_FAILURE = 'LIST.FETCHED_EMAIL_PREFERENCES_FAILURE'
const LIST_FETCHED_INDUSTRIES_FAILURE = 'LIST.FETCHED_INDUSTRIES_FAILURE'
const LIST_FETCHED_GENDERS_FAILURE = 'LIST.FETCHED_GENDERS_FAILURE'
const LIST_FETCHED_LANGUAGES_FAILURE = 'LIST.FETCHED_LANGUAGES_FAILURE'
const LIST_FETCHED_MAJORS_FAILURE = 'LIST.FETCHED_MAJORS_FAILURE'
const LIST_FETCHED_SCHOOL_CLUBS_FAILURE = 'LIST.FETCHED_SCHOOL_CLUBS_FAILURE'
const LIST_FETCHED_STUDENT_STATUSES_FAILURE = 'LIST.FETCHED_STUDENT_STATUSES_FAILURE'
const LIST_FETCHED_SPORTSTEAMS_FAILURE = 'LIST.FETCHED_SPORTSTEAMS_FAILURE'

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

export function fetchedEduLevelsSuccess(edu) {
  return {
    type: LIST_FETCHED_EDU_LEVELS_SUCCESS,
    edu
  }
}

export function fetchedEduLevelsFailure(error) {
  return {
    type: LIST_FETCHED_EDU_LEVELS_FAILURE,
    error
  }
}

export function fetchingEmailPref() {
    return {
        type: LIST_FETCHING_EMAIL_PREF
    }
}
export function fetchedEmailPrefSuccess(emailPref) {
  return {
    type: LIST_FETCHED_EMAIL_PREF_SUCCESS,
    emailPref
  }
}

export function fetchedEmailPrefFailure(error) {
  return {
    type: LIST_FETCHED_EMAIL_PREF_FAILURE,
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

export function fetchingSportsTeams() {
    return {
        type: LIST_FETCHING_SPORTS_TEAMS
    }
}
export function fetchedSportsTeamSuccess(sportsTeam) {
  return {
    type: LIST_FETCHED_SPORTS_TEAM_SUCCESS,
    sportsTeam
  }
}

export function fetchedSportsTeamFailure(error) {
  return {
    type: LIST_FETCHED_SPORTS_TEAM_FAILURE,
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
        //ACTION: FETCHING_USER_PROFILE 
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

// =======================================================
// ================== INITIAL STATE ======================
// =======================================================

const initialListsState = {
  cities: [],
  genders: [],
  industries: [],
  eduLevels: [],
  emailPreferences: [],
  languages: [],
  majors: [],
  studentStatuses: [],
  sportsTeams: [],
  schoolClubs: [],
}

// =======================================================
// ==================== REDUCERS =========================
// =======================================================

function lists (state = initialListsState, action) {
  switch(action.listType) {
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
    case FETCHING_EMAIL_PREFERENCES:
      return {
        ...state,
      }
    case FETCHED_EMAIL_PREFERENCES_SUCCESS:
      return {
        ...state,
        emailPreferences: action.list
      }
    case FETCHED_EMAIL_PREFERENCES_FAILURE:
      return {
        ...state,
        error
      }
    case FETCHING_STUDENT_STATUSES:
      return {
        ...state,
      }
    case FETCHED_STUDENT_STATUSES_SUCCESS:
      return {
        ...state,
        studentStatuses: action.list
      }
    case FETCHED_STUDENT_STATUSES_FAILURE:
      return {
        ...state,
        error
      }
    case FETCHING_EDU_LEVELS:
      return {
        ...state,
      }
    case FETCHED_EDU_LEVELS_SUCCESS:
      return {
        ...state,
        eduLevels: action.list
      }
    case FETCHED_EDU_LEVELS_FAILURE:
      return {
        ...state,
        error
      }
    case FETCHING_MAJORS:
      return {
        ...state,
      }
    case FETHCED_MAJORS_SUCCESS:
      return {
        ...state,
        majors: action.list
      }
    case FETHCED_MAJORS_FAILURE:
      return {
        ...state,
        majors: action.list
      }
    case FETCHING_GENDERS:
      return {
        ...state,
      }
    case FETCHED_GENDERS_SUCCESS:
      return {
        ...state,
        genders: action.list
      }
    case FETCHED_GENDERS_FAILURES:
      return {
        ...state,
        errors
      }
    case FETCHING_SPORTSTEAMS:
      return {
        ...state,
      }
    case FETCHED_SPORTSTEAMS_SUCCESS:
      return {
        ...state,
        sportsTeams: action.list
      }
    case FETCHED_SPORTSTEAMS_FAILURE:
      return {
        ...state,
        error
      }
    case FETCHING_SCHOOL_CLUBS:
      return {
        ...state
      }
    case FETCHED_SCHOOL_CLUBS_SUCCESS:
      return {
        ...state,
        schoolClubs: action.list
      }
    case FETCHED_SCHOOL_CLUBS_FAILURE:
      return {
        ...state,
        error
      }
    case FETCHING_LANGUAGES:
      return {
        ...state,
      }
    case FETCHED_LANGUAGES_SUCCSS:
      return {
        ...state,
        languages: action.list
      }
    case FETCHED_LANGUAGES_FAILURE:
      return {
        ...state,
        error
      }
    case RETRIEVED_CITIES:
      return {
        ...state,
        cities: action.list
      }
  }
}
