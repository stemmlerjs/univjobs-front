// ACTIONS
const SHOW_EMPLOYER_SIGNUP_FORM = 'SHOW_EMPLOYER_SIGNUP_FORM'

// ACTION CREATORS
export function showEmployerSignupForm () {
  return {
    type: SHOW_EMPLOYER_SIGNUP_FORM
  }
}

// INITIAL STATE 
const initialState = {
  empFormVisible: false
}

// USERS REDUCER
export default function employerSignup (state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case SHOW_EMPLOYER_SIGNUP_FORM :
      return {
        ...state,
        empFormVisible: true
      }
    default :
      return state
  }
}

