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
const LIST_FETCHING_JOB_TYPES = 'LIST.FETCHING_JOB_TYPES'

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
const LIST_FETCHED_JOB_TYPES_SUCCESS = 'LIST.FETCHED_JOB_TYPES_SUCCESS'


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
const LIST_FETCHED_JOB_TYPES_FAILURE = 'LIST.FETCHED_JOB_TYPES_FAILURE'

const LIST_GET_ALL_STATIC_LISTS = 'LIST_GET_ALL_STATIC_LISTS'
const LIST_GET_ALL_STATIC_LISTS_SUCCESS = 'LIST_GET_ALL_STATIC_LISTS_SUCCESS'
const LIST_GET_ALL_STATIC_LISTS_FAILURE = 'LIST_GET_ALL_STATIC_LISTS_FAILURE'

function gettingAllLists () {
  return {
    type: LIST_GET_ALL_STATIC_LISTS
  }
}

function getAllStaticListsSuccess (lists) {
  return {
    type: LIST_GET_ALL_STATIC_LISTS_SUCCESS,
    lists
  }
}

function getAllStaticListsFailure (error) {
  return {
    type: LIST_GET_ALL_STATIC_LISTS_FAILURE,
    error
  }
}

export function getAllStaticLists () {
  return function (dispatch) {

   /*
    * Being attempting to get all of the lists
    */

    dispatch(gettingAllLists())

    retrieve.getEssentialApplicationLists()

      .then((result) => {

        var lists = result.data;
        var majors = {}
        var genders = {}
        var industries = {}
        var eduLevels = {}
        var emailPreferences = {}
        var jobTypes = {}
        var studentStatus = {}
        var programsObj = {}

       /*
        * Some of these, we want to keep as arrays.
        */
        
        var industriesArray = lists.industries
        var emailPreferencesArray = lists.emailPref
        var eduLevelsArray = lists.eduLevel
        var majorsArray = lists.majors
        var gendersArray = lists.genders
        var studentStatusArray = lists.studentStatus

       /*
        * Convert the response arrays into objects for easier
        * accessibiliy throughout the application.
        */
        
        lists.majors.forEach((major) => {
          majors[major.id] = major.major_text
        })

        lists.genders.forEach((gender) => {
          genders[gender.id] = {
            code: gender.code,
            description: gender.gender_description
          }
        })

        lists.industries.forEach((industry) => {
          industries[industry.id] = industry.industry_text
        })

        lists.eduLevel.forEach((eduLevel) => {
          eduLevels[eduLevel.id] = eduLevel.description
        })

        lists.emailPref.forEach((pref) => {
          emailPreferences[pref.id] = pref.description
        })

        lists.jobTypes.forEach((jobType) => {
          jobTypes[jobType.id] = jobType.description
        })

        lists.studentStatus.forEach((sstatus) => {
          studentStatus[sstatus.id] = sstatus.status_text
        })
        
        lists.programs.forEach((program) => {
          programsObj[program.id] = program.name
        })

       /*
        * Add the object lists to the dispatch object.
        */

        lists.majors = majors
        lists.genders = genders 
        lists.industries = industries 
        lists.eduLevel = eduLevels
        lists.emailPref = emailPreferences
        lists.jobTypes = jobTypes
        lists.studentStatus = studentStatus
        lists.programsObj = programsObj

       /*
        * Add the array lists to the dispatch object.
        */
        
        lists.industriesArray = industriesArray
        lists.emailPreferencesArray = emailPreferencesArray
        lists.eduLevelsArray = eduLevelsArray
        lists.majorsArray = majorsArray
        lists.gendersArray = gendersArray
        lists.studentStatusArray = studentStatusArray

       /*
        * We were able to successfully get all of the lists.
        * This is good, it means we can continue with loading the application
        * because we'll be able to render various things now.
        */

        dispatch(getAllStaticListsSuccess(lists))

      })
      .catch((err) => {

       /*
        * An error occurred while trying to do this very important
        * part of the application. If we can't get this, then we're going
        * to have trouble with the rest of the app because things
        * cannot render properly. This should stop the application from
        * continuing if we can't get this.
        */

        dispatch(getAllStaticListsFailure(err.toString()))

      })

  }
}

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

export function fetchingJobTypes() {
    return {
        type: LIST_FETCHING_JOB_TYPES
    }
}
export function fetchedJobTypesSuccess(jobTypes) {
  return {
    type: LIST_FETCHED_JOB_TYPES_SUCCESS,
    jobTypes
  }
}

export function fetchedJobTypesFailure(error) {
  return {
    type: LIST_FETCHED_JOB_TYPES_FAILURE,
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

export function handleGetIndustries(dispatch) {
    return function(dispatch) {
        dispatch(fetchingIndustries())
        return retrieve.getIndustries()
            .then((resp) => 
               dispatch(fetchedIndustriesSuccess(resp.data.industries))
            )
            .catch((err) => 
               dispatch(fetchedIndustriesFailure(err))
            )
    }
}

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

export function handleGetLanguages(dispatch) {
    return function(dispatch) {
        dispatch(fetchingLanguages())
        return retrieve.getLanguages()
            .then((resp) => 
               dispatch(fetchedLanguagesSuccess(resp.data.languages))
            )
            .catch((err) => 
               dispatch(fetchedLanguagesFailure(err))
            )
    }
}

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

export function handleGetJobTypes(dispatch) {
    return function(dispatch) {
        dispatch(fetchingJobTypes())
        return retrieve.getJobTypes()
            .then((resp) => 
                dispatch(fetchedJobTypesSuccess(resp.data.jobTypes))
            )
            .catch((err) => 
               dispatch(fetchedJobTypesFailure(err))
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
  programs: [],
  studentStatus: [],
  sports: [],
  schoolClubs: [],
  jobTypes: [],
  schools: [],
  isFetching: false,
  error: ''
}

// =======================================================
// ==================== REDUCERS =========================
// =======================================================

export default function list (state = initialState, action) {
  switch(action.type) {

   /*
    * Bulk lists acquiry
    */

    case LIST_GET_ALL_STATIC_LISTS_SUCCESS:
      return {
        ...state,

       /*
        * These lists are stored as objects for O(1) traversal and
        * being able to access them through their dot property in
        * JSX elements.
        */

        genders: action.lists.genders,
        industries: action.lists.industries,
        educationLevels: action.lists.eduLevel,
        majors: action.lists.majors,
        studentStatus: action.lists.studentStatus,
        jobTypes: action.lists.jobTypes,
        emailPreferences: action.lists.emailPref,
        programs: action.lists.programs,
        programsObj: action.lists.programsObj,

       /*
        * These lists (which have the same data as above) are stored
        * as arrays for places such as the react ComboBox that requires
        * the list be an array.
        */

        industriesArray: action.lists.industriesArray,
        emailPreferencesArray: action.lists.emailPreferencesArray,
        eduLevelsArray: action.lists.eduLevelsArray,
        majorsArray: action.lists.majorsArray,
        gendersArray: action.lists.gendersArray,
        studentStatusArray: action.lists.studentStatusArray,
        schools: action.lists.schools,
        isFetching: false
      }
    case LIST_GET_ALL_STATIC_LISTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case LIST_GET_ALL_STATIC_LISTS:
      return {
        ...state,
        isFetching: true,
        error: ''
      }

   /*
    * Specific Lists acquiry
    */

    case LIST_FETCHING_INDUSTRIES:
      return {
        ...state,
      }
    case LIST_FETCHED_INDUSTRIES_SUCCESS:
      return {
        ...state,
        industries: action.industries
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
    case LIST_FETCHING_JOB_TYPES:
      return {
        ...state,
      }
    case LIST_FETCHED_JOB_TYPES_SUCCESS:
      return {
        ...state,
        jobTypes: action.jobTypes
      }
    case LIST_FETCHED_JOB_TYPES_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default :
      return state
  }
}
