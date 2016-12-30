import test from 'ava'
import { switchedToStudent, switchedToEmployer } from 'redux/modules/user/user'
import { actionTest } from 'redux-ava'

test('switchedToStudent action', actionTest(switchedToStudent, { type: 'SWITCHED_TO_USER_TYPE_STUDENT' }))
test('switchedToEmployer action', actionTest(switchedToEmployer, { type: 'SWITCHED_TO_USER_TYPE_EMPLOYER' }))
