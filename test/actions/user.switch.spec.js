import test from 'ava'
import { switchedToStudent, switchedToEmployer, switchedUserType } from 'redux/modules/user/user'
import { actionTest } from 'redux-ava'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

test('switchedToStudent action', actionTest(switchedToStudent, { type: 'SWITCHED_TO_USER_TYPE_STUDENT' }))
test('switchedToEmployer action', actionTest(switchedToEmployer, { type: 'SWITCHED_TO_USER_TYPE_EMPLOYER' }))


test('switchedUserType action', async t => {
    const mockStore = configureStore([thunkMiddleware])
    const store = mockStore({})

    const expectedActionsStoE = [{ type: 'SWITCHED_TO_USER_TYPE_EMPLOYER' }]
    store.dispatch(switchedUserType(true))
    t.deepEqual(store.getActions(), expectedActionsStoE)

    store.clearActions()

    const expectedActionsEtoS = [{ type: 'SWITCHED_TO_USER_TYPE_STUDENT' }]
    store.dispatch(switchedUserType(false))
    t.deepEqual(store.getActions(), expectedActionsEtoS)
})
