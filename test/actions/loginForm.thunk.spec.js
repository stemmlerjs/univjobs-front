import test from 'ava'
import config from 'config'
import nock from 'nock'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {
    submitLoginForm
} from 'redux/modules/loginForm/loginForm'
import { actionTest } from 'redux-ava'

test.beforeEach(t => {
    t.context.mockStore = configureStore([thunkMiddleware])
    t.context.store = t.context.mockStore({})
    t.context.data = {
    }
})

test.afterEach(t => {
    t.context.store.clearActions()
    nock.cleanAll()
});

test('submitLoginForm success action', async t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .post('/login/')
        .reply(200, {
            token: 'testToken',
            user: {
                is_a_student: true,
                is_profile_completed: false
            }
        })

    const expectedActions = [{
        type: 'DASHBOARD_SUBMITTING_ANSWERS'
    },{
        type: 'DASHBOARD_SUBMIT_ANSWERS_SUCCESS'
    }]

    await t.context.store.dispatch(submitLoginForm('juliosueiras@gmail.com', 'test'))

    console.log(t.context.store.getActions())
    t.deepEqual(t.context.store.getActions()[0], expectedActions[0])
    t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
    t.deepEqual(t.context.store.getActions()[1].response.status, 200)
})
