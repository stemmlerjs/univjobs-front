import test from 'ava'
import reducer, { creatingUserAccount, createUserAccountSuccess, createUserAccountFailure } from 'redux/modules/user/user'
import { reducerTest } from 'redux-ava'

test('Creating a User Account', reducerTest(
    reducer,
    {},
    creatingUserAccount(),
    {
        isCreatingAccount: true
    }
))

test('Creating a User Account Successful', reducerTest(
    reducer,
    { accessToken: 'none' },
    createUserAccountSuccess('none'),
    {
        accessToken: 'none',
        isCreatingAccount: false,
        isAuthenticated: true
    }
))

test('Creating a User Account Failure', reducerTest(
    reducer,
    {},
    createUserAccountFailure('none'),
    {
        isCreatingAccount: false,
        error: 'none'
    }
))
