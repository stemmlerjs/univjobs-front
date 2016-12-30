import test from 'ava'
import { creatingUserAccount,createUserAccountSuccess,createUserAccountFailure } from 'redux/modules/user/user'
import { actionTest } from 'redux-ava'

test('createingUserAccount action', actionTest(creatingUserAccount, 'test', { type: 'CREATING_USER_ACCOUNT'}))
test('createUserAccountSuccess action', actionTest(createUserAccountSuccess, 'test', { type: 'CREATE_USER_ACCOUNT_SUCCESS', accessToken: 'test'}))
test('createUserAccountFailure action', actionTest(createUserAccountFailure, 'none',{ type: 'CREATE_USER_ACCOUNT_FAILURE', error: 'none'}))

