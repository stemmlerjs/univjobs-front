import test from 'ava'
import { loggingIn,loginSuccess,loggingOut,logoutSuccess, loginFailure, logoutFailure } from 'redux/modules/user/user'
import { actionTest } from 'redux-ava'

test('loggingIn action', actionTest(loggingIn, { type: 'LOGGING_IN' }))
test('loggingOut action', actionTest(loggingOut, { type: 'LOGGING_OUT', isLoggingOut: true }))
test('loginSuccess action', actionTest(loginSuccess, 'none', true, false,  { type: 'LOGIN_SUCCESS', accessToken: 'none', isAStudent: true, isProfileCompleted: false }))
test('logoutSuccess action', actionTest(logoutSuccess, { type: 'LOGOUT_SUCCESS', accessToken: '', isAuthenticated: false }))
test('loginFailure action', actionTest(loginFailure, { type: 'LOGIN_FAILURE', isLoggingIn: false }))
test('logoutFailure action', actionTest(logoutFailure, { type: 'LOGOUT_FAILURE', isLoggingOut: false }))

