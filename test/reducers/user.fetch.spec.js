import test from 'ava'
import reducer, { fetchingUserInfo, fetchingUserInfoSuccess, fetchingUserInfoFailure } from 'redux/modules/user/user'
import { reducerTest } from 'redux-ava'

test('Fetching User Info', reducerTest(
    reducer,
    {},
    fetchingUserInfo(),
    {
        isFetching: true
    }
))

test('Fetching User Info Successful', reducerTest(
    reducer,
    {},
    fetchingUserInfoSuccess(true, '2016-12-30', 'test@gmail.com', 'John', 'Doe', '912-343-4545'),
    {
        isFetching: false,
        isAStudent: true,
        dateJoined: '2016-12-30',
        email: 'test@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        mobile: '912-343-4545'
    }
))

test('Fetching User Info Failure', reducerTest(
    reducer,
    {},
    fetchingUserInfoFailure(),
    {
        isFetching: false
    }
))

