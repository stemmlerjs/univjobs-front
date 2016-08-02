import axios from 'axios'
import config from 'config'
import cookie from 'react-cookie'
import { loggingIn, loginSuccess, loginFailure,
  fetchingUserInfo, loggingOut, logoutSuccess, logoutFailure, fetchingUserInfoSuccess, fetchingUserInfoFailure } from 'redux/modules/user/user'
import _ from 'lodash'

/**
  * attemptLogin
  *   - Retrieves access token from API through a GET to /account with the
  *       token included in the header of the request.
  *
  * @param (String) - email
  * @param (String) - 
  */

export function login (email, password) {
  let bodyData = {
    email,
    password
  }

  return axios({
    method: 'post',
    url: config.baseUrl + 'login/',
    headers: {
      "content-type": "application/json"
    },
    data: JSON.stringify(bodyData)
  })
}


export function logout(store, router) {
  // ACTION: DISPATCH (LOGGING_OUT)
  store.dispatch(loggingOut())

  axios({
    method: 'post',
    url: config.baseUrl + 'logout/'
  })
  .then((res) => {
    // ACTION: DISPATCH (LOGGING_OUT)
    store.dispatch(logoutSuccess())
    cookie.remove('univjobs-access-token')
    router.replace('/join')
  })
  .catch(() => {
    // ACTION: DISPATCH (LOGGING_OUT)
    store.dispatch(logoutFailure())

  })
}


/**
  * Get User Info
  *   - Retrieves access token from API through a GET to /account with the
  *       token included in the header of the request.
  *
  * @param (String) - token: the access token 
  * @return (Promise) - resolved if API call is successful
  */

export function getUserInfo(token) {
  const requestConfig = {
    headers: {
      'authorization': 'JWT ' + token
    }
  }
  return axios.get(config.baseUrl + 'me/', requestConfig)
}

/**
  * Set Access Token in Cookies
  *
  * @param (String) - token: the access token received from either...
  *   > Student LOGIN
  *   > Student REGISTER
  *   > Employer LOGIN
  *   > Employer REGISTER
  */

export function setAccessToken (token) {
  var d = new Date();
  d.setTime(d.getTime() + 30*60*1000); // set cookie to last 30 mins
  cookie.save('univjobs-access-token', token, {
    path: '/'
  }, {
    expires: d
  });
}

// 
/** 
  * Create Student Account
  *   - Makes a POST to /register to create a student account
  *   - Successful eturn response gives us our access token
  *
  * @param (String) - email: post-validated student's email
  * @param (String) - password: post-validated student password
  */
export function createStudentAccount(email, password) {
  return axios.post(config.baseUrl + 'register/', {
    email: email,
    password: password
  })
}

/**
  * Create Employer Account
  *   - Makes a POST to /register/business to create an employer account
  *   - Successful eturn response gives us our access token
  *
  * @param (String) - firstName, lastName, companyName, mobile, email, password
  */
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

/**
  * checkIfAuthed
  *
  * @param (object) - store : 
  * @return Promise : resolved if the user is authed, rejected if not.
*/
export function checkIfAuthed (store) {
  const promise = new Promise(function(resolve, reject) {
    console.log("******************* AUTHENTICATION CHECK *******************")

    /* If the user is simply flipping through pages, we can tell if they are in fact 
      authenticated or not through the use of the state.
    */
    const stillAuthed = store.getState().user.isAuthenticated
    if(stillAuthed) {
      console.log("still authed from state")
      resolve(true)
    } else {

      /* If the user reloads the page, state is lost and we cannot tell if they are 
        authenticated through the use of the store. We must now check the cookie.
      */
      const accessToken = cookie.load('univjobs-access-token');
      if(accessToken === undefined) {
        console.log("No access token found, head to main screen")
        reject(false)
      } else {
        // If the token was found, check to ensure that the token is still valid
        // ACTION: DISPATCH (LOGGING_IN)
        store.dispatch(loggingIn())

        /* We confirm if the token is still valid by attempting to make a call to
          /account. 
        */
        // ACTION: DISPATCH (FETCHING_USER_INFO)
        store.dispatch(fetchingUserInfo())

        getUserInfo(accessToken)
          .then(function(response) {
            console.log("access token from cookie is still valid", response)

            const isAStudent = response.data.user.is_a_student
            let profileInfo = _.cloneDeep(response.data);
            delete profileInfo.user

            // ACTION: DISPATCH (FETCHING_USER_INFO_SUCCESS)
            store.dispatch(fetchingUserInfoSuccess(
              isAStudent,
              profileInfo
            ))

            // ACTION: DISPATCH (LOGGING_IN_SUCCESS)
            store.dispatch(loginSuccess(accessToken,
              response.data.user.is_a_student,
              response.data.user.is_profile_completed))
            resolve(true)
          })
          .catch(function(err){
            console.log('NOPE, access token from cookie is not valid- we should go home', err)
            cookie.remove('univjobs-access-token')

            // ACTION: DISPATCH (FETCHING_USER_INFO_FAILURE)
            store.dispatch(fetchingUserInfoFailure())
            
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



