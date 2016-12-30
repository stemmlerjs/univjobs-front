import test from 'ava'
import reducer, { switchedToStudent, switchedToEmployer, switchedUserType } from 'redux/modules/user/user'
import { reducerTest } from 'redux-ava'

test('Switch to student', reducerTest(
  reducer,
    {},
    switchedToStudent(),
    {
        isAStudent: true,
        isCreatingAccount: false
    }
))

test('Switch to employer', reducerTest(
    reducer,
    {},
    switchedToEmployer(),
    {
        isAStudent: false,
        isCreatingAccount: false
    }
))
