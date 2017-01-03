import test from 'ava'
import { switchedToStudent, switchedToEmployer, switchedUserType } from 'redux/modules/user/user'
import { actionTest } from 'redux-ava'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

test('switchedToStudent action', actionTest(switchedToStudent, { type: 'SWITCHED_TO_USER_TYPE_STUDENT' }))
test('switchedToEmployer action', actionTest(switchedToEmployer, { type: 'SWITCHED_TO_USER_TYPE_EMPLOYER' }))


test('switchedUserType action', t => {
  return new Promise((resolve, reject) => {
    const mockStore = configureStore([thunkMiddleware])
    const store = mockStore({ data: [] })
    const expectedActions = [{ type: 'SWITCHED_TO_USER_TYPE_EMPLOYER' }]

    store.dispatch(switchedUserType(false))
    // console.log(store.getActions());
    t.deepEqual(store.getActions(), expectedActions)
    resolve()
  })
})
