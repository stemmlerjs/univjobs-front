import test from 'ava'
import config from 'config'
import nock from 'nock'
import configureStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {
    handleSubmitAnswers,
    handlePinJob,
    handleUnPinJob,
    handleGetJobs,
    handleGetIndustries,
    handleGetJobTypes
} from 'redux/modules/dashboard/dashboard'
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

test.cb('handleSubmitAnswers success action', t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .post('/job/new/student/apply/')
        .reply(200, 'test')

    const expectedActions = [{
        type: 'DASHBOARD_SUBMITTING_ANSWERS'
    },{
        type: 'DASHBOARD_SUBMIT_ANSWERS_SUCCESS'
    }]

    t.context.store.dispatch(handleSubmitAnswers(t.context.data)).then(() => {
        t.deepEqual(t.context.store.getActions()[0], expectedActions[0])
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[1].response.status, 200)
        t.end()
    })
})


test.cb('handleSubmitAnswers failure action', t => {
    var result = nock(config.baseUrl)
        .post('/job/new/student/apply/')
        .reply(404, {})

    const expectedActions = [{
        type: 'DASHBOARD_SUBMITTING_ANSWERS'
    },{
        type: 'DASHBOARD_SUBMIT_ANSWERS_FAILURE'
    }]

    t.context.store.dispatch(handleSubmitAnswers(t.context.data)).then(() => {
        t.deepEqual(t.context.store.getActions()[0], expectedActions[0])
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[1].error.status, 404)
        t.end()
    })

})


test.cb('handlePinJob success action', t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .post('/job/pin/')
        .reply(200, 'test')

    const expectedActions = [{
        type: 'DASHBOARD_PIN_CLICKED'
    },{
        type: 'DASHBOARD_PIN_SUCCESS'
    }]

    t.context.store.dispatch(handlePinJob({ id: '1' })).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[1].response.status, 200)
        t.end()
    })

})

test.cb('handlePinJob failure action', t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .post('/job/pin/')
        .reply(404, 'test')

    const expectedActions = [{
        type: 'DASHBOARD_PIN_CLICKED'
    },{
        type: 'DASHBOARD_PIN_FAILURE'
    }]

    t.context.store.dispatch(handlePinJob({ id: '1' })).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[1].error.status, 404)
        t.end()
    })

})

test.cb('handleUnPinJob success action', t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .delete('/job/pin/')
        .reply(200, 'test')

    const expectedActions = [{
        type: 'DASHBOARD_UNPIN_CLICKED'
    },{
        type: 'DASHBOARD_UNPIN_SUCCESS'
    }]

    t.context.store.dispatch(handleUnPinJob({ id: '1' })).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[1].response.status, 200)
        t.end()
    })

})

test.cb('handleUnPinJob failure action', t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .delete('/job/pin/')
        .reply(404, 'test')

    const expectedActions = [{
        type: 'DASHBOARD_UNPIN_CLICKED'
    },{
        type: 'DASHBOARD_UNPIN_FAILURE'
    }]

    t.context.store.dispatch(handleUnPinJob({ id: '1' })).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[1].error.status, 404)
        t.end()
    })

})


test.cb('handleGetJobs success action', t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .get('/job/r/list/')
        .reply(200, 'test')

    const expectedActions = [{
        type: 'DASHBOARD_FETCHING_JOBS'
    },{
        type: 'DASHBOARD_FETCHED_JOBS_SUCCESS'
    }]

    t.context.store.dispatch(handleGetJobs()).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[1].jobs.status, 200)
        t.end()
    })

})

test.cb('handleGetJobs failure action', t => {
    t.plan(3)

    var result = nock(config.baseUrl)
        .get('/job/r/list/')
        .reply(404, {})

    const expectedActions = [{
        type: 'DASHBOARD_FETCHING_JOBS'
    },{
        type: 'DASHBOARD_FETCHED_JOBS_FAILURE'
    }]

    t.context.store.dispatch(handleGetJobs()).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[1].type, expectedActions[1].type)
        t.deepEqual(t.context.store.getActions()[1].error.status, 404)
        t.end()
    })

})

test.cb('handleGetIndustries success action', t => {
    t.plan(2)

    var result = nock(config.baseUrl)
        .get('/list/industries')
        .reply(200, 'test')

    const expectedActions = [{
        type: 'DASHBOARD_FETCHED_INDUSTRIES_SUCCESS'
    }]

    t.context.store.dispatch(handleGetIndustries()).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[0].industries.status, 200)
        t.end()
    })

})

test.cb('handleGetIndustries failure action', t => {
    t.plan(2)

    var result = nock(config.baseUrl)
        .get('/list/industries')
        .reply(404, {})

    const expectedActions = [{
        type: 'DASHBOARD_FETCHING_INDUSTRIES_FAILURE'
    }]

    t.context.store.dispatch(handleGetIndustries()).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[0].error.status, 404)
        t.end()
    })

})

test.cb('handleGetJobTypes success action', t => {
    t.plan(2)

    var result = nock(config.baseUrl)
        .get('/list/jobtypes')
        .reply(200, 'test')

    const expectedActions = [{
        type: 'DASHBOARD_FETCHED_JOB_TYPES_SUCCESS'
    }]

    t.context.store.dispatch(handleGetJobTypes()).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[0].jobTypes.status, 200)
        t.end()
    })

})

test.cb('handleGetJobTypes failure action', t => {
    t.plan(2)

    var result = nock(config.baseUrl)
        .get('/list/jobtypes')
        .reply(404, {})

    const expectedActions = [{
        type: 'DASHBOARD_FETCHED_JOB_TYPES_FAILURE'
    }]

    t.context.store.dispatch(handleGetJobTypes()).then(() => {
        t.deepEqual(t.context.store.getActions()[0].type, expectedActions[0].type)
        t.deepEqual(t.context.store.getActions()[0].error.status, 404)
        t.end()
    })

})
