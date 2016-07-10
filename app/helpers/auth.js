import axios from 'axios'
import config from 'config'
import cookie from 'react-cookie'

function checkTokenExpiry (token) {
  return axios.get(config.baseUrl + 'user/', {
    params: {
      token: token
    }
  })
}

export function setAccessToken (token) {
  cookie.save('univjobs-access-token', token, {
   path: '/'
 });
}

// Check if user is currently authenticated
export function checkIfAuthed (store) {
  const stillAuthed = store.getState().user.isAuthenticated;
  if(stillAuthed) {
    return true
  } else {
    const accessToken = cookie.load('univjobs-access-token');
    if(accessToken === undefined) {
      console.log("No access token found, head to main screen")
      return false;
    } else {
      // Check to see if token is still valid
      checkTokenExpiry()
        .then(function(response) {
          console.log("test", response)
        })
        .catch(function(err){
          console.log('NOPE', err)
        })
        console.log("checking token expirt")
    }
  }
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

