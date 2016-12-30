import test from 'ava'
import { fetchingUserInfo, fetchingUserInfoSuccess, fetchingUserInfoFailure } from 'redux/modules/user/user'
import { actionTest } from 'redux-ava'

test('fetchingUserInfo action', actionTest(fetchingUserInfo, { type: 'FETCHING_USER_INFO' }))

test('fetchingUserInfoSuccess action', actionTest(fetchingUserInfoSuccess, true, '2016-12-30', 'test@gmail.com', 'John', 'Doe', '912-343-4545',{
    type: 'FETCHING_USER_INFO_SUCCESS',
    isFetching: false,
    isAStudent: true,
    dateJoined: '2016-12-30',
    email: 'test@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    mobile: '912-343-4545'
}))

test('fetchingUserInfoFailure action', actionTest(fetchingUserInfoFailure, {
      type: 'FETCHING_USER_INFO_FAILURE',
      isFetching: false
}))

