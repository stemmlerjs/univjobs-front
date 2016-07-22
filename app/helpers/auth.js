import axios from 'axios'
import config from 'config'
import cookie from 'react-cookie'
import { loggingIn, loginSuccess, loginFailure } from 'redux/modules/user/user'

export function getUserInfo(accessToken) {
  // const requestConfig = {
  //   headers: {
  //     'authorization': 'JWT ' + accessToken
  //   },
  //   data: {
  //     'dummy': '2'
  //   }
  // }
  // debugger;

  // return axios.get(config.baseUrl + 'account/', requestConfig)

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/api/account/",
  "method": "GET",
  "headers": {
    "authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjkyMDg5MDksInVzZXJfaWQiOjEyLCJlbWFpbCI6ImtqaGtqZHNrYUBzaGVyaWRhbmNvbGxlZ2UuY2EiLCJ1c2VybmFtZSI6ImtqaGtqZHNrYUBzaGVyaWRhbmNvbGxlZ2UuY2EiLCJvcmlnX2lhdCI6MTQ2OTIwODYwOX0.ZN3Y4c6kpo2-GwhVcjP540Cp6zPEAeaOO7_TCut9ciM",
    "cache-control": "no-cache",
    "postman-token": "251b4e35-7975-aa58-8e1e-0c0e1bc2354c"
  },
  data: {
    'yo': 'yo'
  }
}

return $.ajax(settings)

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

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/api/account/",
  "method": "GET",
  "headers": {
    'Content-Type': 'text/plain',
    "authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NjkyMDg5MDksInVzZXJfaWQiOjEyLCJlbWFpbCI6ImtqaGtqZHNrYUBzaGVyaWRhbmNvbGxlZ2UuY2EiLCJ1c2VybmFtZSI6ImtqaGtqZHNrYUBzaGVyaWRhbmNvbGxlZ2UuY2EiLCJvcmlnX2lhdCI6MTQ2OTIwODYwOX0.ZN3Y4c6kpo2-GwhVcjP540Cp6zPEAeaOO7_TCut9ciM",
    "cache-control": "no-cache",
    "postman-token": "251b4e35-7975-aa58-8e1e-0c0e1bc2354c"
  },
  data: {
    'yo': 'yo'
  }
}

$.ajax(settings).done(function(result){
  console.log(result)
})

// Check if user is currently authenticated
export function checkIfAuthed (store) {
  const promise = new Promise(function(resolve, reject) {
    console.log("******************* CHECKING TOKEN EXPIRY *******************")
    const stillAuthed = store.getState().user.isAuthenticated
    if(stillAuthed) {
      console.log("still authed from state")
      resolve(true)
    } else {
      debugger;
      const accessToken = cookie.load('univjobs-access-token');
      if(accessToken === undefined) {
        console.log("No access token found, head to main screen")
        reject(false)
      } else {
        // Check to see if token is still valid
        // ACTION: DISPATCH (LOGGING_IN)

        store.dispatch(loggingIn())
        getUserInfo(accessToken)
          .then(function(response) {
            console.log("access token from cookie is still valid", response)

            // ACTION: DISPATCH (LOGGING_IN_SUCCESS)
            store.dispatch(loginSuccess(accessToken))
            resolve(true)
          })
          .catch(function(err){
            console.log('NOPE, access token from cookie is not valid- we should go home', err)
            cookie.remove('univjobs-access-token')
            
            // ACTION: DISPATCH (LOGGING_IN_FAILURE)
            store.dispatch(loginFailure())
            reject(false)
          })
      }
    }
    console.log("*************************************************************")
  })
  return promise;
}

// Create Student Account
export function createStudentAccount(email, password) {
  return axios.post(config.baseUrl + 'register/', {
    email: email,
    password: password
  })
}

// Create Employer Account
export function createEmployerAccount(firstName, lastName, companyName, mobile, email, password) {
  return axios.post(config.baseUrl + 'register/business/', {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName,
    company_name: companyName,
    mobile: mobile
  })
}

