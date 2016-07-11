import axios from 'axios'
import config from 'config'
import cookie from 'react-cookie'
import { loggingIn, loginSuccess, loginFailure } from 'redux/modules/user/user'

function checkTokenExpiry (token) {
  return axios.post(config.baseUrl + 'token/verify/', {
    token: token
  })
}

export function setAccessToken (token) {
  cookie.save('univjobs-access-token', token, {
   path: '/'
 });
}

export function getAccessToken (email, password) {
  return axios.post(config.baseUrl + 'token/auth/', {
    email: email,
    password: password
  })
}

// Check if user is currently authenticated
export function checkIfAuthed (store) {
  const promise = new Promise(function(resolve, reject) {
    console.log("******************* CHECKING TOKEN EXPIRY *******************")
    const stillAuthed = store.getState().user.isAuthenticated
    if(stillAuthed) {
      console.log("still authed from state")
      resolve(true)
    } else {
      const accessToken = cookie.load('univjobs-access-token');
      if(accessToken === undefined) {
        console.log("No access token found, head to main screen")
        reject(false)
      } else {
        // Check to see if token is still valid
        store.dispatch(loggingIn())
        checkTokenExpiry(accessToken)
          .then(function(response) {
            console.log("access token from cookie is still valid", response)
            store.dispatch(loginSuccess(accessToken))
            resolve(true)
          })
          .catch(function(err){
            console.log('NOPE, access token from cookie is not valid- we should go home', err)
            store.dispatch(loginFailure())
            reject(false)
          })
      }
    }
  })
  return promise;
}

// Create Student Account
export function createStudentAccount(email, password) {
  return axios.post(config.baseUrl + 'register/', {
    email: email,
    password1: password,
    password2: password
  })
}

// Create Employer Account
export function createEmployerAccount(firstName, lastName, companyName, phone, email, password) {
  return axios.post(config.baseUrl + 'register/', {
    email: email,
    password1: password,
    password2: password
  })
}

