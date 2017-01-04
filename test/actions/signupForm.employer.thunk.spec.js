import test from 'ava'
import config from 'config'
import nock from 'nock'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {
    submitEmployerSignupForm
} from 'redux/modules/signupForm/signupForm'
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

test.cb('submitEmployerSignupForm success action', t => {
    t.plan(4)

    var result = nock(config.baseUrl)
        .post('/register/business/')
        .reply(200, {
            token: 'testToken',
            user: {
                //???
                user: {
                    is_a_student: false,
                    is_profile_completed: false
                }
            }
        })

    const expectedActions = [{
        type: 'CREATING_USER_ACCOUNT'
    },{
        type: 'FETCHING_USER_INFO'
    },{
        type: 'CREATE_USER_ACCOUNT_SUCCESS'
    },{
        type: 'LOGIN_SUCCESS'
    }]

    t.context.store.dispatch(submitEmployerSignupForm('Julio', 'Tain', 'None', '5138158545', 'juliosueiras@test.com', 'test123456')).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[2].type, expectedActions[2].type)
        t.deepEqual(t.context.store.getActions()[3].type, expectedActions[3].type)
        // t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        // t.deepEqual(t.context.store.getActions()[1].response.status, 200)
        t.end()
    })
})

test.cb('submitEmployerSignupForm failure action', t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .post('/register/business/')
        .reply(404, {
            token: 'testToken',
            user: {
                //???
                user: {
                    is_a_student: false,
                    is_profile_completed: false
                }
            }
        })

    const expectedActions = [{
        type: 'CREATING_USER_ACCOUNT'
    },{
        type: 'FETCHING_USER_INFO'
    },{
        type: 'CREATE_USER_ACCOUNT_FAILURE'
    }]

    t.context.store.dispatch(submitEmployerSignupForm('Julio', 'Tain', 'None', '5138158545', 'juliosueiras@test.com', 'test123456')).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[2].type, expectedActions[2].type)
        t.end()
    })
})
