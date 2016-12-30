import test from 'ava'
import reducer, { loggingIn,loginSuccess,loggingOut,logoutSuccess, loginFailure, logoutFailure } from 'redux/modules/user/user'
import { reducerTest } from 'redux-ava'

test('Logging in', reducerTest(
    reducer,
    {},
    loggingIn(),
    {
        isLoggingIn: true
    }
))

test('Logging out', reducerTest(
    reducer,
    {},
    loggingOut(),
    {
        isAuthenticated: false,
        accessToken: ''
    }
))

test('Login Successful', reducerTest(
    reducer,
    {},
    loginSuccess('none', true, false),
    {
        isLoggingIn: false,
        isAuthenticated: true,
        accessToken: 'none',
        isAStudent: true,
        isProfileCompleted: false
    }
))

test('Login Failure ', reducerTest(
    reducer,
    {},
    loginFailure(),
    {
        isLoggingIn: false,
        isAuthenticated: false
    }
))

test.todo("Logout Failure :never been used")
test.todo("Logout Success :never been used")
