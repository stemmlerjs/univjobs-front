// REMEMEBER TO EXPORT ALL ACTION CREATORS

  // ACTIONS
  const SWITCHED_TO_USER_TYPE_STUDENT = 'SWITCHED_TO_USER_TYPE_STUDENT'
  const SWITCHED_TO_USER_TYPE_EMPLOYER = 'SWITCHED_TO_USER_TYPE_EMPLOYER'

  const LOGGING_IN = 'LOGGING_IN'
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
  const LOGIN_FAILURE = 'LOGIN_FAILURE'
  const LOGGING_OUT = 'LOGGING_OUT'

  const FETCHING_USER_INFO = 'FETCHING_USER_INFO'
  const FETCHING_USER_INFO_SUCCESS = 'FETCHING_USER_INFO_SUCCESS'
  const FETCHING_USER_INFO_FAILURE = 'FETCHING_USER_INFO_FAILURE'


  // ACTION CREATORS
  export function switchedToStudent () {
    return {
      type: SWITCHED_TO_USER_TYPE_STUDENT
    }
  }

  export function switchedToEmployer () {
    return {
      type: SWITCHED_TO_USER_TYPE_EMPLOYER
    }
  }

  export function switchedUserType(wasAStudent) {
    return function (dispatch) {
      if(!wasAStudent) {
        dispatch(switchedToStudent())
      }

      if(wasAStudent) {
        dispatch(switchedToEmployer())
      }
    }
  }

// Initial State
const initialState = {
  isAStudent: true
}

// USERS REDUCER
export default function users (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SWITCHED_TO_USER_TYPE_STUDENT :
      return {
        ...state,
        isAStudent: true
      }
    case SWITCHED_TO_USER_TYPE_EMPLOYER :
      return {
        ...state,
        isAStudent: false
      }
    default :
      return state
  }
}